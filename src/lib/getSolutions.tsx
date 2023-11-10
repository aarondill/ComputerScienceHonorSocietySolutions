import type { Dirent } from "fs";
import fs from "fs/promises";
import path from "path";
export const PUBLIC_DIR = path.resolve("public");
export const SOLUTIONS_DIR = path.join(PUBLIC_DIR, "solutions");
export const CODE_EXTENSIONS = [".js"];
export const VIDEO_EXTENSIONS = [".mp4", ".webm"];
export const SCREENSHOT_EXTENSIONS = [".png", ".jpg"];

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

export async function getSolutionFiles(name: string) {
  const namePath = path.join(SOLUTIONS_DIR, name);
  const files = await fs.readdir(namePath);

  const findFile = (exts: string[]) => {
    const f = files.find(n => {
      const ext = path.extname(n);
      // Check that project/project.valid -- not: project/code.valid
      return path.basename(n, ext) === name && exts.includes(ext);
    });
    return f && path.join(namePath, f);
  };

  return {
    video: findFile(VIDEO_EXTENSIONS),
    code: findFile(CODE_EXTENSIONS),
    screenshot: findFile(SCREENSHOT_EXTENSIONS),
    basedir: namePath,
  };
}
