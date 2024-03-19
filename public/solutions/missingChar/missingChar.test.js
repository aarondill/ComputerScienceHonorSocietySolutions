#!/usr/bin/env node
"use strict";
import { it, describe } from "node:test";
import assert from "node:assert/strict";
import { implementations } from "./missingChar.js";

for (const missingChar of implementations) {
  await describe(missingChar.name, async () => {
    await it("passes given cases", () => {
      assert.strictEqual(missingChar("kitten", 1), "ktten");
      assert.strictEqual(missingChar("kitten", 0), "itten");
      assert.strictEqual(missingChar("kitten", 4), "kittn");
      assert.strictEqual(missingChar("kitten", "kitten".length - 1), "kitte");
    });
    await it("passes extreme cases", () => {
      assert.strictEqual(missingChar("12", 1), "1");
      assert.strictEqual(missingChar("1", 0), "");
    });
  });
}
