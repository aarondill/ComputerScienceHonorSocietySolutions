#!/usr/bin/env node
// Created on 11-09-2023
// The parameter weekday is true if it is a weekday, and the parameter vacation is true if we are on vacation.
// We sleep in if it is not a weekday or we're on vacation. Return true if we sleep in.

/**
 * @param {boolean} weekday
 * @param {boolean} [vacation] default false
 * @return {boolean} shouldSleepIn
 */
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const sleepIn = (weekday, vacation) => vacation || !weekday;
export { sleepIn };
