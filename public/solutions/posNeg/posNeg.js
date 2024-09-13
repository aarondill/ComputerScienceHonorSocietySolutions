#!/usr/bin/env node
"use strict";
/**
 * @param {number} x
 * @param {number} y
 * @param {boolean} [a]
 * @return {boolean}
 */
const posNeg = (x, y, a) => !!(a ? x < 0 && y < 0 : x < 0 !== y < 0);
// const posNeg = (_, $, _$) => (($_ = _ => _ != !{}), (_ = !(+!![] + +_ > +![])), ($ = !(++$ > +![])), $_(_$ ? (_ &= $) : (_ ^= $)));

export { posNeg };
