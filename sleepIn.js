#!/usr/bin/env node
// Created on 11-09-2023
// The parameter weekday is true if it is a weekday, and the parameter vacation is true if we are on vacation.
// We sleep in if it is not a weekday or we're on vacation. Return true if we sleep in.

/**
 * @param {boolean} weekday
 * @param {boolean} [vacation] default false
 * @return {boolean} shouldSleepIn
 */
const sleepIn = (weekday, vacation) => vacation || !weekday;

// Tests:
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
// Given examples:
assert_eq(true, sleepIn, false, false);
assert_eq(false, sleepIn, true, false);
assert_eq(true, sleepIn, false, true);
assert_eq(true, sleepIn, true, true); // the missing case
// Undefined should be false -- default to not on vacation
assert_eq(true, sleepIn, false);
assert_eq(false, sleepIn, true);

// Note: Only include this line if running in node.
export {};
