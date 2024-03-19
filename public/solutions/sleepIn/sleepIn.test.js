#!/usr/bin/env node
"use strict";
import { sleepIn } from "./sleepIn.js";
import { it, describe } from "node:test";
import assert from "node:assert/strict";

await describe("sleepIn", async () => {
  await it("passes given cases", () => {
    assert.strictEqual(sleepIn(false, false), true);
    assert.strictEqual(sleepIn(true, false), false);
    assert.strictEqual(sleepIn(false, true), true);
    assert.strictEqual(sleepIn(true, true), true); // the missing case
  });
  await it("vacation is an optional parameter", () => {
    // Undefined should be false -- default to not on vacation
    assert.strictEqual(sleepIn(false), true);
    assert.strictEqual(sleepIn(true), false);
  });
});
