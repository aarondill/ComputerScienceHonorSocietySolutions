#!/usr/bin/env node
"use strict";
/** @param {string} s */
export const mostLetter = s => {
  const count = s
    .split("")
    .filter(c => c.match(/[a-z]/i))
    .reduce(
      /** @param {Record<string, number>} count */
      (count, c) => ((count[c] = (count[c] ?? 0) + 1), count),
      {}
    );
  return Object.entries(count).reduce((a, b) =>
    a[1] > b[1] ? a : b[1] > a[1] ? b : a[0] < b[0] ? a : b
  )[0];
};
