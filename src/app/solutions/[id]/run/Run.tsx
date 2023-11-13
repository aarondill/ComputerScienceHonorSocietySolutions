"use client";
import assert from "assert";
import { useEffect, useRef, useState } from "react";

const decoder = new TextDecoder();
export default function StreamedOutput({ codepath }: { codepath: string }) {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isRunningRef = useRef(false); // Don't run this multiple times!
  useEffect(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    const u = new globalThis.URL("/api/run", location.origin);
    u.searchParams.set("codepath", codepath);
    void (async function fetchData() {
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
      return await (async function pump(): Promise<void> {
        const { done, value } = await reader.read();
        if (done) {
          isRunningRef.current = false;
          return;
        }
        const str = decoder.decode(value);
        setData(prevVal => [...prevVal, str]);

        return await pump();
      })();
    })();
  }, [codepath]);

  if (error) return <div>Something went wrong! Error: {error}</div>;
  return <>{data.join("")}</>;
}
