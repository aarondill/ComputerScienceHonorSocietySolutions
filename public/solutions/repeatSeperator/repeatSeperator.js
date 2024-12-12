#!/usr/bin/env node
"use strict";
/**
 * Repeats a string seperator a number of times
 * @param {string} str - The string to repeat
 * @param {string} seperator - The seperator to repeat
 * @param {number} count - The number of times to repeat the seperator
 * @returns {string} - The repeated string
 */
export const repeatSeperator = (str, seperator, count) =>
  Array.from({ length: count }, () => str).join(seperator);
