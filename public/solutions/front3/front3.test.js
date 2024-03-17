#!/usr/bin/env node
"use strict";
import { it, describe } from "node:test";
import assert from "node:assert/strict";
import { front3 } from "./front3.js";
await describe("front3", async () => {
  await it("passes given test cases", () => {
    assert.strictEqual(front3("Java"), "JavJavJav");
    assert.strictEqual(front3("Chocolate"), "ChoChoCho");
    assert.strictEqual(front3("abc"), "abcabcabc");
    assert.strictEqual(front3("a"), "aaa");
  });
});
