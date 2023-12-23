import path from "node:path";
import { PUBLIC_DIR } from "./constants";

/**
 * Returns a relative path to a file within the /public directory.
 * Throws if the file path is not within the /public directory.
 */
export function getPublicPath(filepath: string): string {
  return path.relative(PUBLIC_DIR, filepath);
}

/**
 * Returns a new path by calling path.join with the base and the relative path.
 * The new path is guaranteed to be under base (ie, given a base of "/foo/bar" and a relative path of '../baz', the new path will be '/foo/bar/baz')
 */
export function pathJoinNoTraversial(base: string, ...paths: string[]): string {
  // This works because trying to join '..' with '/' results in '/', then appending that to base will always result in a path under base.
  return path.join(base, path.join("/", ...paths));
}
