#!/usr/bin/env node
"use strict";
/** @param {string} s */
const last2 = s => {
  let count = -1,
    i = -1; // don't include the last substring
  while ((i = s.indexOf(s.substring(s.length - 2), ++i)) !== -1) count++;
  return count;
};

/** @param {string} s */
const last22 = s =>
  s
    .split("")
    .reduce(
      (count, _, i) =>
        s.substring(i, i + 2) === s.substring(s.length - 2) ? count + 1 : count,
      -1
    );

export const implementations = [last2, last22];
