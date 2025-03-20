#!/usr/bin/env node
import assert from "node:assert";
import { describe, it } from "node:test";
import { zipZap } from "./zipZap.js";

await describe("zipZap", async () => {
  await it("passes given test cases", () => {
    assert.strictEqual(zipZap("zipXzap"), "zpXzp");
    assert.strictEqual(zipZap("zopzop"), "zpzp");
    assert.strictEqual(zipZap("zzzopzop"), "zzzpzp");
  });
});
