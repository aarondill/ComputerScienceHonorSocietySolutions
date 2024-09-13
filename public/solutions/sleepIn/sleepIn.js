#!/usr/bin/env node
"use strict";
/**
 * @param {boolean} weekday
 * @param {boolean} [vacation] default false
 * @return {boolean} shouldSleepIn
 */
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const sleepIn = (weekday, vacation) => vacation || !weekday;
export { sleepIn };
