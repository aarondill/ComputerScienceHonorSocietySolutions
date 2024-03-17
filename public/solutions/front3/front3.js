#!/usr/bin/env node

/**
 * @param {string} s
 * @return {string}
 */
const front3 = s => s.substring(0, 3).repeat(3);

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

// Example cases
assert_eq("JavJavJav", front3, "Java");
assert_eq("ChoChoCho", front3, "Chocolate");
assert_eq("abcabcabc", front3, "abc");
assert_eq("aaa", front3, "a");
export {};
