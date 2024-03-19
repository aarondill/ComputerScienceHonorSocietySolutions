#!/usr/bin/env node
"use strict";
// Created on 10-12-2023
// Given two numbers x,y and a boolean a, return true if a is true and the sign of x and y are different,
// else if a is false return true if x and y are both negative, else return false.

/**
 * @param {number} x
 * @param {number} y
 * @param {boolean} [a]
 * @return {boolean}
 */
const posNeg = (x, y, a) => !!(a ? x < 0 && y < 0 : x < 0 !== y < 0);
// const posNeg = (_, $, _$) => (($_ = _ => _ != !{}), (_ = !(+!![] + +_ > +![])), ($ = !(++$ > +![])), $_(_$ ? (_ &= $) : (_ ^= $)));

export { posNeg };
