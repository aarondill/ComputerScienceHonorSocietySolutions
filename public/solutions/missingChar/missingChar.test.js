import { expect, it, describe } from "vitest";
import { implementations } from "./missingChar.js";

// Allow using $name in the description
const implementationsObj = implementations.map(impl => ({
  name: impl.name,
  missingChar: impl,
}));
describe.each(implementationsObj)("$name", ({ missingChar }) => {
  it("passes given cases", () => {
    expect(missingChar("kitten", 1)).toBe("ktten");
    expect(missingChar("kitten", 0)).toBe("itten");
    expect(missingChar("kitten", 4)).toBe("kittn");
    expect(missingChar("kitten", "kitten".length - 1)).toBe("kitte");
  });
  it("passes extreme cases", () => {
    expect(missingChar("12", 1)).toBe("1");
    expect(missingChar("1", 0)).toBe("");
  });
});
