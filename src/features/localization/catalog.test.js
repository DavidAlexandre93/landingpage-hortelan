import { describe, expect, it } from "vitest";
import { catalog, getCatalog } from "./catalog.js";

function shapeOf(value) {
  if (Array.isArray(value)) return value.map(shapeOf);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shapeOf(child)]));
  }
  return typeof value;
}

describe("translation catalog", () => {
  it("keeps the same decision-critical structure in all locales", () => {
    const portugueseShape = shapeOf(catalog.pt);
    expect(shapeOf(catalog.en)).toEqual(portugueseShape);
    expect(shapeOf(catalog.es)).toEqual(portugueseShape);
    expect(shapeOf(catalog.fr)).toEqual(portugueseShape);
  });

  it("falls back to Portuguese", () => {
    expect(getCatalog("unknown")).toBe(catalog.pt);
  });
});
