import { expect, it, describe } from "vitest";
import { makes10 } from "./makes10";
describe("makes10", () => {
  it("passes given test cases", () => {
    expect(makes10(9, 10)).toBe(true);
    expect(makes10(9, 9)).toBe(false);
    expect(makes10(1, 9)).toBe(true);
  });
});
