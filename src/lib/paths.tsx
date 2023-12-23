import path from "node:path";
import { PUBLIC_DIR } from "./constants";

/**
 * Returns a relative path to a file within the /public directory.
 * Throws if the file path is not within the /public directory.
 */
export function getPublicPath(filepath: string): string {
  if (!isChild(PUBLIC_DIR, filepath)) {
    const msg = `File path ${filepath} is not within the public directory.`;
    throw new Error(msg);
  }
  return path.posix.relative(PUBLIC_DIR, filepath); // This is likely to be used as a URL.
}
/**
 * Returns an 'absolute' path to a file within the /public directory. This is intended to be used in the browser as a URL.
 * This assumes that /public/FILE can be accessed as /FILE
 */
export function getPublicURL(filepath: string): string {
  const relpath = getPublicPath(filepath);
  return path.posix.join("/", relpath);
}

/**
 * Returns a new path by calling path.join with the base and the relative path.
 * The new path is guaranteed to be under base (ie, given a base of "/foo/bar" and a relative path of '../baz', the new path will be '/foo/bar/baz')
 */
export function joinNoTraversial(base: string, ...paths: string[]): string {
  // This works because trying to join '..' with '/' results in '/', then appending that to base will always result in a path under base.
  return path.join(base, path.join("/", ...paths));
}

export function isChild(parent: string, child: string) {
  const parentAbs = path.resolve(parent);
  const childAbs = path.resolve(child);
  // This works because path.resolve will normalize seperators to path.sep.
  return childAbs.startsWith(parentAbs + path.sep);
}
