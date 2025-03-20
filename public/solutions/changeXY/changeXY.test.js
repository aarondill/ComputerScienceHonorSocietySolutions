#!/usr/bin/env node
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { changeXY } from "./changeXY.js";

await describe("changeXY", async () => {
  await it("passes given test cases", () => {
    assert.equal(changeXY("codex"), "codey");
    assert.equal(changeXY("xxhixx"), "yyhiyy");
    assert.equal(changeXY("xhixhix"), "yhiyhiy");
  });
});
