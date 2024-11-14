#!/usr/bin/env node
"use strict";
/**
 * Returns true if the first x is followed by another x.
 * @param {string} str
 * @returns {boolean}
 */
export const doubleX = str => /^[^x]*xx/.test(str);
