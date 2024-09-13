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

/** @param {Parameters<typeof String.raw>} args */
const dedent = (...args) => {
  const str = String.raw(...args);
  const lines = str.split("\n");
  const indent = lines.find(line => line.trim() !== "")?.match(/^\s*/)?.[0];
  if (indent === undefined) return str;
  return lines
    .map(line => (line.startsWith(indent) ? line.slice(indent.length) : line))
    .join("\n")
    .trim();
};

/**
 * @param {string} dir
 * @returns {Promise<string>}
 */
async function getSiliconPath(dir = "node_modules") {
  const silicon_dest = path.resolve(dir, "silicon");
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
  if (use(silicon_dest, "cached")) return silicon_dest;

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

  console.log(`Extracting silicon to ${silicon_dest}`);
  const tarCode = await spawnAsync("tar", ["-xzf", tar_dest, "silicon"], {
    cwd: path.dirname(silicon_dest),
  });
  if (tarCode != 0) throw new Error("Failed to extract silicon");

  await fs.chmod(silicon_dest, "755");
  await fs.rm(tar_dest, { force: true });

  if (use(silicon_dest, "downloaded")) return silicon_dest;
  throw new Error(
    dedent`
    Failed to find or get silicon. Please ensure dependencies are installed.
    If using vercel, ensure nodejs version is 20.x or higher. This will ensure the correct version of glibc is available.
    `
  );
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
