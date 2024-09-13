#!/usr/bin/env node
"use strict";
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

export const implementations = [
  missingChar,
  missingChar2,
  missingChar3,
  missingChar4,
];
