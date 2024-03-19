#!/usr/bin/env node
"use strict";
import { it, describe } from "node:test";
import assert from "node:assert/strict";
import { implementations } from "./last2.js";
for (const last2 of implementations) {
  await describe(last2.name, async () => {
    await it("passes given test cases", () => {
      assert.strictEqual(last2("hixxhi"), 1);
      assert.strictEqual(last2("xaxxaxaxx"), 1);
      assert.strictEqual(last2("axxxaaxx"), 2);
    });
  });
}
