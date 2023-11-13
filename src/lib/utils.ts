import path from "path";

export function pathJoinNoTraversial(
  base: string,
  ...paths: string[]
): string | null {
  const absPrefix = path.resolve(base);
  const absAppend = path.resolve(path.join(base, ...paths));
  if (!absAppend.startsWith(absPrefix)) {
    return null;
  }
  return absAppend;
}

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return error;
}

export function isNodeError(value: unknown): value is NodeJS.ErrnoException {
  if (!(value instanceof Error)) return false;
  if ("code" in value && typeof value.code !== "string") return false; // code?: string | undefined;
  if ("path" in value && typeof value.path !== "string") return false; // path?: string | undefined;
  if ("syscall" in value && typeof value.syscall !== "string") return false; // syscall?: string | undefined;
  if ("errno" in value && typeof value.errno !== "number") return false; // errno?: number | undefined;
  return true;
}