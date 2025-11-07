import { describe, it, expect } from "vitest";
import { toTitleCase, truncate } from "../lib/stringUtils";

describe("stringUtils", () => {
  it("toTitleCase capitalizes words", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
    expect(toTitleCase("TEST")).toBe("Test");
  });

  it("truncate short strings unchanged", () => {
    expect(truncate("short", 10)).toBe("short");
  });

  it("truncate long strings with ellipsis", () => {
    expect(truncate("this is a very long string", 10)).toBe("this is a…");
  });
});
