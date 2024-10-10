#!/usr/bin/env node
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { lastDigit } from "./lastDigit.js";

await describe("lastDigit", async () => {
  await it("passes given test cases", () => {
    assert.strictEqual(lastDigit(23, 19, 13), true);
    assert.strictEqual(lastDigit(23, 19, 12), false);
    assert.strictEqual(lastDigit(23, 19, 3), true);
  });
});
