#!/usr/bin/env node
// Created on 10-12-2023
// Given two numbers x,y and a boolean a, return true if a is true and the sign of x and y are different,
// else if a is false return true if x and y are both negative, else return false.

const posNeg = (x, y, a) => !!(!a ? (x < 0) ^ (y < 0) : x < 0 && y < 0);
// const posNeg = (_, $, _$) => (($_ = _ => _ != !{}), (_ = !(+!![] + +_ > +![])), ($ = !(++$ > +![])), $_(_$ ? (_ &= $) : (_ ^= $)));

// Test cases -- Run the program in node or the browser to test it.
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
// Example cases
assert(true, posNeg, -1, 1, false);
assert(true, posNeg, -1, 1, false);
assert(true, posNeg, -4, -5, true);
// Additional cases
assert(true, posNeg, -3, 2, false); // non 1
assert(true, posNeg, -2, 3, false); // non 1
assert(false, posNeg, -1, -1, false); // both negative
assert(false, posNeg, 1, 1, false); // both positive
assert(false, posNeg, -2, -3, false); // both negative-non 1
assert(false, posNeg, 2, 3, false); // both positive-non 1
assert(false, posNeg, 4, 5, true); // boolean true-both positve
assert(false, posNeg, 4, -5, true); // boolean true-pos/neg
assert(false, posNeg, -4, 5, true); // boolean true-neg/pos
