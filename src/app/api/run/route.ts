import { ensureError, isNodeError, pathJoinNoTraversial } from "@/lib/utils";
import type { NextRequest } from "next/server";
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs/promises";
type RunNodeReturn =
  | { error: string; success: false }
  | { code: number; success: true };

async function runNode(
  codepath: string,
  output: (data: string) => Promise<void>
): Promise<RunNodeReturn> {
  if (!codepath) return { error: "No path provided", success: false };
  const relPath = path.relative(process.cwd(), codepath);
  const res = spawn("node", ["--", relPath], {
    cwd: ".",
    stdio: "pipe",
    timeout: 100 * 1000, // 100 seconds
    windowsHide: true,
  });
  const handler = async (data: Buffer) => await output(data.toString("utf8"));
  res.stdout.on("data", handler);
  res.stderr.on("data", handler);

  return await new Promise((resolve, reject) => {
    res.on("error", err => {
      reject({ error: err.message, success: false });
    });
    res.on("close", code => {
      resolve({ code: code ?? 0, success: true });
    });
  });
}

type HandlerRet = (
  | { error: string; ok: false }
  | { stream: ReadableStream; ok: true }
) & {
  status: number;
};

async function handler(request: NextRequest): Promise<HandlerRet> {
  let codepath = request.nextUrl.searchParams.get("codepath");
  if (!codepath) {
    return {
      error: "No codepath provided",
      status: 400,
      ok: false,
    };
  }
  // Given /solutions/hello/hello.js or ./solutions/hello/hello.js
  codepath = pathJoinNoTraversial(path.resolve("public"), codepath);
  if (!codepath) {
    return {
      error: "Disallowed directory traversal detected in codepath!",
      status: 400,
      ok: false,
    };
  }
  let stat;
  try {
    stat = await fs.stat(codepath);
  } catch (e) {
    const error = ensureError(e);
    if (isNodeError(error) && error.code === "ENOENT") {
      return { error: "File not found", status: 400, ok: false };
    }
    return {
      error: error.message,
      status: 500,
      ok: false,
    };
  }
  if (!stat.isFile()) return { error: "Not a file!", status: 400, ok: false };

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  void runNode(codepath, writer.write.bind(writer)).then(async ret => {
    if (ret.success) {
      await writer.write(`-- Exited with code ${ret.code} --\n`);
    } else {
      await writer.write(`ERROR: ${ret.error}`);
    }
    await writer.close();
  });

  return { stream: stream.readable, status: 200, ok: true };
}

export async function GET(request: NextRequest) {
  const res = await handler(request);
  if (!res.ok) {
    const error = res.error;
    return new Response(JSON.stringify({ error }), {
      status: res.status,
    });
  }
  return new Response(res.stream, { status: res.status });
}
