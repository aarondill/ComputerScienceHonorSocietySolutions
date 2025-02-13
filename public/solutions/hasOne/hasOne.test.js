#!/usr/bin/env node
import assert from "node:assert";
import { describe, it } from "node:test";
import { hasOne } from "./hasOne.js";

await describe("hasOne", async () => {
  await it("passes given test cases", () => {
    // TODO: write your test cases here
    assert.strictEqual(hasOne(123), true);
    assert.strictEqual(hasOne(222), false);
  });
});
