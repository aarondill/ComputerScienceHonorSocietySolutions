import "highlight.js/styles/default.min.css";
import path from "path";
import hljs from "highlight.js/lib/core";
import fs from "fs/promises";
import { ScrollableOutput } from "./ScrollableOutput";

import hljs_javascript from "highlight.js/lib/languages/javascript";
import hljs_typescript from "highlight.js/lib/languages/typescript";
import { PUBLIC_DIR, getSolutionFiles } from "@/lib/getSolutions";
import { DownloadLink } from "./DownloadLink";
hljs.registerLanguage("javascript", hljs_javascript);
hljs.registerLanguage("typescript", hljs_typescript);

type SolutionCodeProps = { filepath?: string; height?: string; name: string };

export async function SolutionCode({
  filepath,
  height,
  name,
}: SolutionCodeProps) {
  if (!filepath && name) filepath = (await getSolutionFiles(name)).code;
  if (!filepath) return <div>Could not find code</div>;

  const code = await fs.readFile(filepath, "utf8");
  const highlighted = hljs.highlightAuto(code).value;

  const fileURL = `/${path.relative(PUBLIC_DIR, filepath)}`;
  return (
    <>
      <DownloadLink href={fileURL}>{path.basename(filepath)}:</DownloadLink>
      <ScrollableOutput
        height={height}
        dangerouslySetInnerHTML={{ __html: highlighted }}></ScrollableOutput>
    </>
  );
}
