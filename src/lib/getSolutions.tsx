import type { Dirent, PathLike } from "fs";
import fs from "fs/promises";
import path from "path";
import z from "zod";
import {
    CODE_EXTENSIONS,
    SCREENSHOT_EXTENSIONS,
    SOLUTIONS_DIR,
    TEST_EXTENSIONS,
    VIDEO_EXTENSIONS,
} from "./constants";

export async function solutionExists(name: string): Promise<boolean> {
  const namePath = path.join(SOLUTIONS_DIR, name);
  const stat = await fs.stat(namePath).catch(() => null);
  return stat?.isDirectory() ?? false;
}

export async function getSolutions(): Promise<string[]> {
  return await fs
    .readdir(SOLUTIONS_DIR, { withFileTypes: true })
    .then(cont => cont.filter(v => v.isDirectory()).map(d => d.name));
}
// Finds a file based on the given matcher
export async function getSolutionFile(
  name: string,
  match: string | string[] | RegExp | ((name: string, file: Dirent) => boolean)
): Promise<string | null> {
  const namePath = path.join(SOLUTIONS_DIR, name);
  const dir = await fs.opendir(namePath);
  for (let file = await dir.read(); file !== null; file = await dir.read()) {
    if (typeof match === "function" && !match(file.name, file)) continue;
    if (typeof match === "string" && file.name !== match) continue;
    if (Array.isArray(match) && !match.includes(file.name)) continue;
    if (match instanceof RegExp && !match.test(file.name)) continue;

    return path.join(namePath, file.name);
  }
  return null;
}

async function exists(filepath: PathLike): Promise<boolean> {
  try {
    await fs.stat(filepath);
    return true;
  } catch {
    return false;
  }
}
const metadataSchema = z.object({
  name: z.string(),
  description: z.string(),
  createdOn: z.coerce.date(),
});
export async function getSolutionMetadata(name: string) {
  const namePath = path.join(SOLUTIONS_DIR, name);
  const stat = await fs.stat(namePath).catch(() => null);
  if (!stat) return null;
  const metadataPath = path.join(namePath, "metadata.json");
  if (!(await exists(metadataPath))) return null;

  const contents = await fs.readFile(metadataPath, "utf8");
  const data = JSON.parse(contents) as unknown;
  return await metadataSchema.parseAsync(data);
}

export async function getSolutionFiles(name: string) {
  const basedir = path.join(SOLUTIONS_DIR, name);

  async function findFile(exts: string[]): Promise<string | null> {
    for (const ext of exts) {
      const f = path.join(basedir, name + ext);
      if (await exists(f)) return f;
    }
    return null;
  }

  const [video, code, screenshot, test] = await Promise.all([
    findFile(VIDEO_EXTENSIONS),
    findFile(CODE_EXTENSIONS),
    findFile(SCREENSHOT_EXTENSIONS),
    findFile(TEST_EXTENSIONS),
  ]);
  return { video, code, screenshot, test, basedir };
}
