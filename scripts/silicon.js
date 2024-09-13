#!/usr/bin/env node
///@ts-check
import { spawn, spawnSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

{
  const thisDir = fileURLToPath(new URL(".", import.meta.url));
  process.chdir(path.join(thisDir, ".."));
}
/** @param {import("fs").PathLike} path */
const exists = path =>
  fs.access(path, fs.constants.F_OK).then(
    () => true,
    () => false
  );

/**
 * @param {string} dir
 * @returns {Promise<string>}
 */
async function getSiliconPath(dir = "node_modules") {
  const _silicon_dest = path.resolve(dir, "silicon");
  /**
   *  @param {string} path
   * @param {string} type
   */
  const use = (path, type) => {
    const proc = spawnSync(path, ["-V"]);
    if (proc.pid == 0 || proc.status != 0) return null;
    const version = proc.stdout.toString().trim();
    console.log(`Using ${type} Silicon (${version})`);
    return path;
  };

  const system = process.env.SILICON || "silicon";
  if (use(system, "system")) return system;
  if (use(_silicon_dest, "cached")) return _silicon_dest;

  const tar_dest = path.resolve(dir, "silicon.tar.gz");
  // If the last attempt failed, the tar file may still exist(is it corrupt? should we delete it?)
  if (!(await exists(tar_dest))) {
    const github_repo = "Aloxaf/silicon";

    const errMsg = `Failed while attempting to install ${github_repo}. Please manually install at https://github.com/${github_repo}/releases/latest`;

    console.log("Downloading Silicon from GitHub");
    const metadataRes = await fetch(
      `https://api.github.com/repos/${github_repo}/releases/latest`
    );
    if (!metadataRes.ok) throw new Error(errMsg);
    /**@type {{tag_name: string}} */ // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const metadata = await metadataRes.json();
    const version = metadata.tag_name;
    if (!version) throw new Error(errMsg);
    // NOTE: This only works for linux x86_64 systems
    const asset = `silicon-${version}-x86_64-unknown-linux-gnu.tar.gz`;
    const silicon_url = `https://github.com/${github_repo}/releases/download/${version}/${asset}`;

    console.log(`Downloading ${silicon_url} to ${tar_dest}`);
    await fetch(silicon_url)
      .then(res => res.arrayBuffer())
      .then(buf => fs.writeFile(tar_dest, Buffer.from(buf)));
  }

  console.log(`Extracting silicon to ${_silicon_dest}`);
  const tarCode = await spawnAsync("tar", ["-xzf", tar_dest, "silicon"], {
    cwd: dir,
  });
  if (tarCode != 0) throw new Error("Failed to extract silicon");

  await fs.chmod(_silicon_dest, "755");
  await fs.rm(tar_dest, { force: true });

  if (use(_silicon_dest, "downloaded")) return _silicon_dest;
  throw new Error("Failed to find or get silicon");
}
/** @param {import("fs").PathLike} filepath */
const subdirs = async filepath =>
  await fs
    .readdir(filepath, { withFileTypes: true })
    .then(files => files.filter(file => file.isDirectory()))
    .then(dirs => dirs.map(dir => path.join(dir.parentPath, dir.name)));

const silicon = await getSiliconPath();

/**
 * @param {Parameters<typeof import("child_process").spawn>} args
 * @returns {Promise<number>}
 */
function spawnAsync(...args) {
  const proc = spawn(...args);
  return new Promise((resolve, reject) => {
    proc.once("exit", resolve);
    proc.once("error", reject);
  });
}

/** @param {string} sol */
async function doBuild(sol) {
  const id = path.basename(sol);
  console.log("Building", id);
  const out = path.join(sol, `${id}.png`);
  const js = path.join(sol, `${id}.js`);
  if (!(await exists(js))) throw new Error(`Missing ${js}`);
  await fs.rm(out, { force: true });
  const code = await spawnAsync(silicon, [js, "-o", out], {});
  if (code != 0) throw new Error(`Failed to build ${id}`);
}

const sols = await subdirs("./public/solutions");
// for (const s of sols) await doBuild(s);
const res = await Promise.allSettled(sols.map(doBuild));
const failed = res.filter(r => r.status == "rejected");
if (failed.length > 0) {
  for (const f of failed) console.error(f.reason);
  process.exit(1);
}
