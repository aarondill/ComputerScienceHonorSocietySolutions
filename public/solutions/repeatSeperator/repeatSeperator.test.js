#!/usr/bin/env node
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { repeatSeperator } from "./repeatSeperator.js";

await describe("repeatSeperator", async () => {
  await it("passes given test cases", () => {
    // TODO: write your test cases here
    assert.equal(repeatSeperator("Word", "X", 3), "WordXWordXWord");
    assert.equal(repeatSeperator("This", "And", 2), "ThisAndThis");
    assert.equal(repeatSeperator("This", "And", 1), "This");
  });
});
