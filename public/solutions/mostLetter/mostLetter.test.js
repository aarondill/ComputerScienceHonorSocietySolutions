#!/usr/bin/env node
import assert from "node:assert";
import { describe, it } from "node:test";
import { mostLetter } from "./mostLetter.js";

await describe("mostLetter", async () => {
  await it("passes given test cases", () => {
    assert.strictEqual(mostLetter("Qwertyuiopasdfghjklzxcvbnm"), "Q");
    assert.strictEqual(
      mostLetter(`WITCHES MADE MY SOUP, NOW I CAN FLY\nWHEEEEE`),
      "E"
    );
    assert.strictEqual(
      mostLetter("THE HOG GOES TO THE DOG TO CATCH THE FROG IN THE DOG"),
      "O"
    );
    // TODO: write your test cases here
  });
});
