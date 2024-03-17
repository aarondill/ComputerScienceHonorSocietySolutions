import { posNeg } from "./posNeg";
import { expect, it, describe } from "vitest";

describe("posNeg", () => {
  it("passes given cases", () => {
    expect(posNeg(-1, 1, false)).toBe(true);
    expect(posNeg(-1, 1, false)).toBe(true);
    expect(posNeg(-4, -5, true)).toBe(true);
  });
  it("passes additional cases", () => {
    expect(posNeg(-3, 2, false)).toBe(true); // non 1
    expect(posNeg(-2, 3, false)).toBe(true); // non 1
    expect(posNeg(-1, -1, false)).toBe(false); // both negative
    expect(posNeg(1, 1, false)).toBe(false); // both positve
    expect(posNeg(-2, -3, false)).toBe(false); // both negative-non 1
    expect(posNeg(2, 3, false)).toBe(false); // both positive-non 1
    expect(posNeg(4, 5, true)).toBe(false); // boolean true-both positve
    expect(posNeg(4, -5, true)).toBe(false); // boolean true-pos/neg
    expect(posNeg(-4, 5, true)).toBe(false); // boolean true-neg/pos
  });
});
