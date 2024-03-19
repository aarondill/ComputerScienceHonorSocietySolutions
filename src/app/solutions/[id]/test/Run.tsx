"use client";
import assert from "assert";
import { useEffect, useRef, useState } from "react";

const decoder = new TextDecoder();
/**
Takes a relative or 'absolute' path to a file, with /public as the root.
Calls /api/run with the file path
*/
export default function StreamedOutput({ codepath }: { codepath: string }) {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isRunningRef = useRef(false); // Don't run this multiple times!
  useEffect(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    const u = new globalThis.URL("/api/run", location.origin);
    u.searchParams.set("codepath", codepath);
    async function fetchData() {
      const resp = await fetch(u);
      if (!resp.ok) {
        const json = (await resp.json()) as unknown;
        assert(json && typeof json === "object", "Response is not an object");
        assert("error" in json, "Response does not contain an error");
        assert(typeof json.error === "string", "Error is not a string");
        return setError(json.error);
      }

      if (!resp?.body) return;
      // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
      const reader = resp.body.getReader();
      async function pump(): Promise<void> {
        const { done, value } = await reader.read();
        if (done) return;
        const str = decoder.decode(value);
        setData(prevVal => [...prevVal, str]);
        return await pump();
      }
      return await pump();
    }
    void fetchData()
      .catch(() => null)
      .then(() => (isRunningRef.current = false));
  }, [codepath]);

  if (error) return <div>Something went wrong! Error: {error}</div>;
  return <>{data.join("")}</>;
}
