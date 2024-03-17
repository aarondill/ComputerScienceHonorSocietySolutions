import { expect, describe, it } from "vitest";
import { sleepIn } from "./sleepIn";

describe("sleepIn", () => {
  it("passes given cases", () => {
    expect(sleepIn(false, false)).toBe(true);
    expect(sleepIn(true, false)).toBe(false);
    expect(sleepIn(false, true)).toBe(true);
    expect(sleepIn(true, true)).toBe(true); // the missing case
  });
  it("vacation is an optional parameter", () => {
    // Undefined should be false -- default to not on vacation
    expect(sleepIn(false)).toBe(true);
    expect(sleepIn(true)).toBe(false);
  });
});
