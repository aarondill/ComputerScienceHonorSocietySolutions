#!/usr/bin/env node
"use strict";
/**
 *@param {number} a
 *@param {number} b
 *@param {number} c
 *@return {boolean}
 */
export const lastDigit = (a, b, c) =>
  a % 10 == b % 10 || a % 10 == c % 10 || b % 10 == c % 10;
