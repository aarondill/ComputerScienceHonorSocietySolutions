#!/usr/bin/env node
// Created on 10-12-2023
// Given two numbers x,y and a boolean a, return true if a is true and the sign of x and y are different,
// else if a is false return true if x and y are both negative, else return false.

/**
 * @param {number} x
 * @param {number} y
 * @param {boolean} [a]
 * @return {boolean}
 */
// prettier-ignore
const posNeg = (x, y, a) => !!(a ? x < 0 && y < 0 : (x < 0) !== (y < 0));
// const posNeg = (_, $, _$) => (($_ = _ => _ != !{}), (_ = !(+!![] + +_ > +![])), ($ = !(++$ > +![])), $_(_$ ? (_ &= $) : (_ ^= $)));

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
assert_eq(true, posNeg, -1, 1, false);
assert_eq(true, posNeg, -1, 1, false);
assert_eq(true, posNeg, -4, -5, true);
// Additional cases
assert_eq(true, posNeg, -3, 2, false); // non 1
assert_eq(true, posNeg, -2, 3, false); // non 1
assert_eq(false, posNeg, -1, -1, false); // both negative
assert_eq(false, posNeg, 1, 1, false); // both positive
assert_eq(false, posNeg, -2, -3, false); // both negative-non 1
assert_eq(false, posNeg, 2, 3, false); // both positive-non 1
assert_eq(false, posNeg, 4, 5, true); // boolean true-both positve
assert_eq(false, posNeg, 4, -5, true); // boolean true-pos/neg
assert_eq(false, posNeg, -4, 5, true); // boolean true-neg/pos

// Note: Only include this line if running in node.
export {};
