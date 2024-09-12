#!/usr/bin/env node
"use strict";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { diff21 } from "./diff21.js";

await describe("diff21", async () => {
  await it("passes given cases", () => {
    assert.strictEqual(diff21(19), 2);
    assert.strictEqual(diff21(10), 11);
    assert.strictEqual(diff21(21), 0);
  });
});
