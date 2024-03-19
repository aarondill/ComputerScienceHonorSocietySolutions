#!/usr/bin/env node
"use strict";
import { it, describe } from "node:test";
import assert from "node:assert/strict";
import { makes10 } from "./makes10.js";
await describe("makes10", async () => {
  await it("passes given test cases", () => {
    assert.strictEqual(makes10(9, 10), true);
    assert.strictEqual(makes10(9, 9), false);
    assert.strictEqual(makes10(1, 9), true);
  });
});
