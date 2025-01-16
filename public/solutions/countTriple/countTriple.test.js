#!/usr/bin/env node
import assert from "node:assert";
import { describe, it } from "node:test";
import { countTriple } from "./countTriple.js";

await describe("countTriple", async () => {
  await it("passes given test cases", () => {
    assert.strictEqual(countTriple("abcXXXabc"), 1);
    assert.strictEqual(countTriple("xxxabyyyycd"), 3);
    assert.strictEqual(countTriple("a"), 0);
    // TODO: write your test cases here
  });
});
