#!/usr/bin/env node
"use strict";
/**
 * @param {number} n
 * @return {number}
 */
const diff21 = n => (n > 21 ? 2 * Math.abs(n - 21) : Math.abs(n - 21));
export { diff21 };
