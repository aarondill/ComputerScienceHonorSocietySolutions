#!/usr/bin/env node
// Created on 11-09-2023
// The parameter weekday is true if it is a weekday, and the parameter vacation is true if we are on vacation.
// We sleep in if it is not a weekday or we're on vacation. Return true if we sleep in.

/**
 * @param {boolean} weekday
 * @param {boolean} vacation
 * @return {boolean} shouldSleepIn
 */
const sleepIn = (weekday, vacation) => vacation || !weekday;

// Tests:
/**
 * @template A,R
 * @param {R} v
 * @param {(...arg: A)=>R} f
 * @param {A} args
 * @return {boolean}
 */
const assert = (v, f, ...args) => {
  const real = f(...args);
  const name = f.name || "f";
  const msg = `Test case: ${name}(${args.join()})\t=> ${v}:\t`;
  if (real != v) {
    if (globalThis.process) globalThis.process.exitCode = 1;
    console.error(msg + "Failed! Returned: " + real);
  } else console.log(msg + "Passed!");
  return real == v;
};
// Given examples:
assert(true, sleepIn, false, false);
assert(false, sleepIn, true, false);
assert(true, sleepIn, false, true);
assert(true, sleepIn, true, true); // the missing case
assert(true, sleepIn, false); // Undefined should be false -- default to not on vacation
assert(false, sleepIn, true);
