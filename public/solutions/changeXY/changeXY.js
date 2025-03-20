#!/usr/bin/env node
"use strict";
/**
 * Note that loops are expressly forbidden (presumably string.replace is too)
 * @param {string} str
 * @return {string}
 */
export const changeXY = str =>
  (str[0] != "x" ? str[0] : "y") +
  (str.length > 1 ? changeXY(str.slice(1)) : "");

/**
 * This is how it *should* be done, but it's not allowed
 * @param {string} str
 * @return {string}
 */
export const changeXY2 = str => str.replaceAll("x", "y");
