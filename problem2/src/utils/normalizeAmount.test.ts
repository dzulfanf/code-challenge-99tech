import { describe, expect, it } from "vitest";

import { normalizeAmount } from "./normalizeAmount";

describe("normalizeAmount", () => {
  it("removes unnecessary leading zeros", () => {
    expect(normalizeAmount("01001")).toBe("1001");
    expect(normalizeAmount("000100")).toBe("100");
    expect(normalizeAmount("000")).toBe("0");
  });

  it("preserves decimal values", () => {
    expect(normalizeAmount("01.5")).toBe("1.5");
    expect(normalizeAmount("000.25")).toBe("0.25");
    expect(normalizeAmount("0.5")).toBe("0.5");
  });

  it("preserves intermediate decimal input states", () => {
    expect(normalizeAmount("0.")).toBe("0.");
    expect(normalizeAmount("1.")).toBe("1.");
  });

  it("preserves an empty input", () => {
    expect(normalizeAmount("")).toBe("");
  });
});
