#!/usr/bin/env node
"use strict";
/**
 * Return the number of triples in the given string. The triples may overlap.
 * @param {string} s
 * @returns {number}
 */
export const countTriple = s =>
  s
    .match(/(.)\1{2,}/g)
    ?.map(m => m.length - 2)
    ?.reduce((a, b) => a + b, 0) ?? 0;
