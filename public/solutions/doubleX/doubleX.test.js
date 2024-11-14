#!/usr/bin/env node
import { describe, it } from "node:test";
import { doubleX } from "./doubleX.js";
import assert from "node:assert";

await describe("doubleX", async () => {
  await it("passes given test cases", () => {
    assert.equal(doubleX("axxbb"), true);
    assert.equal(doubleX("axaxax"), false);
    assert.equal(doubleX("xxxxx"), true);
  });
  await it("fails on exception", () => {
    assert.equal(doubleX("axbbxx"), false);
  });
});
