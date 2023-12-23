import "highlight.js/styles/default.min.css";
import hljs from "highlight.js/lib/core";
import fs from "fs/promises";
import { ScrollableOutput } from "./ScrollableOutput";

import hljs_javascript from "highlight.js/lib/languages/javascript";
import hljs_typescript from "highlight.js/lib/languages/typescript";
hljs.registerLanguage("javascript", hljs_javascript);
hljs.registerLanguage("typescript", hljs_typescript);

export async function SolutionCode(props: {
  filepath: string;
  height?: string;
}) {
  const { filepath, height } = props;
  const code = await fs.readFile(filepath, "utf8");
  const highlighted = hljs.highlightAuto(code).value;
  return (
    <ScrollableOutput
      height={height}
      dangerouslySetInnerHTML={{ __html: highlighted }}></ScrollableOutput>
  );
}
