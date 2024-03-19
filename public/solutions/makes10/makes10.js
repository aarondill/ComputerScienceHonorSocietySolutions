#!/usr/bin/env node
"use strict";
/**
 * @param {number} a
 * @param {number} b
 * Given 2 ints, a and b, return true if one of them is 10 or if their sum is 10.
 */
const makes10 = (a, b) => a === 10 || b === 10 || a + b === 10;

export { makes10 };
