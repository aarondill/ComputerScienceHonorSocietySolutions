#!/usr/bin/env node
// Created on 12-20-2023
// Given a non-empty string and an int n, return a new string where the char at
// index n has been removed. The value of n will be a valid index of a char in
// the original string (i.e. n will be in the range 0..str.length()-1 inclusive).

/**
 * @param {string} str a non-empty string
 * @param {number} n a valid index (0<=n<=str.length-1)
 * @return {string}
 */
// The boring implementation
const missingChar = (str, n) => str.slice(0, n) + str.slice(n + 1);

/** @type {(str: string, n: number)=>string} */
// A much more fun implementation
const missingChar2 = (str, n) =>
  new RegExp(`(.{${n}}).?(.*)`).exec(str).slice(1).join("");

/** @type {(str: string, n: number)=>string} */
// The split-and-filter implementation
const missingChar3 = (str, n) => [...str].filter((_, i) => i !== n).join("");

/** @type {(str: string, n: number)=>string} */
// finally, an implementation using Array.from() -- Note, this only works if n is within the given range.
// prettier-ignore
const missingChar4 = (str, n) => Array.from({ length: str.length - 1 }, (_, i) => i < n ? str[i] : str[i + 1]).join("");

// Test cases -- Run the program in node or the browser to test it.

/**
 * @template {unknown[]} A
 * @template R
 * @param {R} v
 * @param {(...arg: A)=>R} f
 * @param {A} args
 * @return {boolean}
 */
const assert_eq = (v, f, ...args) => {
  const real = f.apply(undefined, args);
  const name = f.name || "f";
  const msg = `Test case: ${name}(${args.join()})\t=> ${v}:`;
  if (real === v) {
    console.log(`${msg}\tPassed!`);
    return true;
  }

  console.error(`${msg}\tFailed! Returned: ${real}`);
  if (globalThis.process) {
    globalThis.process.exitCode = 1; // If running in node, set exit code to 1
  }
  return false;
};

const impls = [missingChar, missingChar2, missingChar3, missingChar4];

for (const func of impls) {
  console.log(`Testing ${func.name}()`);
  // The given cases
  assert_eq("ktten", func, "kitten", 1);
  assert_eq("itten", func, "kitten", 0);
  assert_eq("kittn", func, "kitten", 4);
  // Test the extremes
  assert_eq("kitte", func, "kitten", "kitten".length - 1);
  assert_eq("1", func, "12", 1);
  assert_eq("", func, "1", 0);
  console.log("");
}

// Note: Only include this line if running in node.
export {};
