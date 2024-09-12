#!/usr/bin/env node
"use strict";
// Created on 2024-09-12
// Given an int n, return the absolute difference between n and 21, except
// return double the absolute difference if n is over 21.

/**
 * @param {number} n
 * @return {number}
 */
const diff21 = n => (n > 21 ? 2 * Math.abs(n - 21) : Math.abs(n - 21));
export { diff21 };
