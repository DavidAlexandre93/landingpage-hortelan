import { describe, expect, it } from "vitest";
import { BUDGETS, formatKib, validateBuildBudget } from "./check-build-budget.mjs";

describe("build budget", () => {
  it("accepts assets within budget", () => {
    expect(
      validateBuildBudget({
        javascript: BUDGETS.javascript,
        stylesheet: BUDGETS.stylesheet,
        initial: BUDGETS.initial,
        total: BUDGETS.total,
        largestMedia: { bytes: BUDGETS.media },
        mediaFiles: [
          { file: "img/logo.svg", bytes: BUDGETS.logo },
          { file: "og-image.jpg", bytes: BUDGETS.social },
        ],
      })
    ).toEqual([]);
  });

  it("reports each exceeded budget", () => {
    const issues = validateBuildBudget({
      javascript: BUDGETS.javascript + 1,
      stylesheet: BUDGETS.stylesheet + 1,
      initial: BUDGETS.initial + 1,
      total: BUDGETS.total + 1,
      largestMedia: { bytes: BUDGETS.media + 1 },
      mediaFiles: [],
    });
    expect(issues).toHaveLength(5);
    expect(issues[0]).toContain("JavaScript gzip");
    expect(issues[1]).toContain("CSS gzip");
    expect(issues[2]).toContain("Initial transfer");
    expect(issues[3]).toContain("Total artifact");
    expect(issues[4]).toContain("Largest media");
  });

  it("formats bytes as KiB", () => {
    expect(formatKib(1536)).toBe("1.50 KiB");
  });

  it("enforces purpose-specific logo, social and general media limits", () => {
    const base = {
      javascript: 0,
      stylesheet: 0,
      initial: 0,
      total: 0,
      largestMedia: { bytes: 0 },
      mediaFiles: [
        { file: "img/hortelan-logo.svg", bytes: BUDGETS.logo + 1 },
        { file: "og-image.jpg", bytes: BUDGETS.social + 1 },
        { file: "assets/dashboard-12345678.png", bytes: BUDGETS.media + 1 },
      ],
    };
    expect(validateBuildBudget(base)).toEqual([
      expect.stringContaining("hortelan-logo.svg"),
      expect.stringContaining("og-image.jpg"),
      expect.stringContaining("dashboard-12345678.png"),
    ]);
  });
});
