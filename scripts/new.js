#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

{
  const thisDir = fileURLToPath(new URL(".", import.meta.url));
  process.chdir(path.join(thisDir, ".."));
}

const solutionsDir = path.join(process.cwd(), "public", "solutions");
let name = process.argv[2];
if (name == "--") name = process.argv[3];
if (name.startsWith("-")) {
  console.error("This script accepts no flags!");
  process.exit(1);
}
if (!name) {
  console.error("Usage: new.js <name>");
  process.exit(1);
}

if (name.includes("/") || name.includes("\\")) {
  console.error("Name must not contain slashes");
  process.exit(1);
}

const dest = path.join(solutionsDir, name);
await fs.mkdir(dest, { recursive: true });

const impl = path.join(dest, name + ".js"),
  tests = path.join(dest, name + ".test.js"),
  video = path.join(dest, name + ".mp4"),
  metadata = path.join(dest, "metadata.json");

await fs.writeFile(impl, `#!/usr/bin/env node\n"use strict";\n`);
await fs.writeFile(
  tests,
  `#!/usr/bin/env node
import { describe, it } from "node:test";
import { ${name} } from "./${name}.js";

await describe("${name}", async () => {
  await it("passes given test cases", () => {
    // TODO: write your test cases here
  });
});
`
);
await fs.writeFile(video, "");
await fs.writeFile(
  metadata,
  JSON.stringify(
    {
      name,
      description: "",
      createdOn: new Date().toISOString().split("T")[0],
    },
    null,
    2
  )
);

/** @param {string} s */
const shellEscape = s => `'${s.replace(/'/g, `'"'"'`)}'`;

/** @param {string} p */
const relativeEscaped = (p, base = dest) => shellEscape(path.relative(base, p));

console.log(`Created ${dest}`);
process.env.EDITOR ??= "vim";
const escapedEditor = shellEscape(process.env.EDITOR);
console.log(`
# To edit the solution, run:
cd ${shellEscape(dest)} && \
${escapedEditor} ${relativeEscaped(metadata)} && \
${escapedEditor} ${relativeEscaped(impl)} && \
${escapedEditor} ${relativeEscaped(tests)} && \
# TODO: record a video of your solution and store it in ${relativeEscaped(video)}
`);
