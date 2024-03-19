#!/usr/bin/env node
"use strict";
import { posNeg } from "./posNeg.js";
import { it, describe } from "node:test";
import assert from "node:assert/strict";

await describe("posNeg", async () => {
  await it("passes given cases", () => {
    assert.strictEqual(posNeg(-1, 1, false), true);
    assert.strictEqual(posNeg(-1, 1, false), true);
    assert.strictEqual(posNeg(-4, -5, true), true);
  });
  await it("passes additional cases", () => {
    assert.strictEqual(posNeg(-3, 2, false), true); // non 1
    assert.strictEqual(posNeg(-2, 3, false), true); // non 1
    assert.strictEqual(posNeg(-1, -1, false), false); // both negative
    assert.strictEqual(posNeg(1, 1, false), false); // both positve
    assert.strictEqual(posNeg(-2, -3, false), false); // both negative-non 1
    assert.strictEqual(posNeg(2, 3, false), false); // both positive-non 1
    assert.strictEqual(posNeg(4, 5, true), false); // boolean true-both positve
    assert.strictEqual(posNeg(4, -5, true), false); // boolean true-pos/neg
    assert.strictEqual(posNeg(-4, 5, true), false); // boolean true-neg/pos
  });
});
