import { describe, expect, it, vi } from "vitest";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  getNextTheme,
  normalizeTheme,
  persistTheme,
  resolveInitialTheme,
} from "./theme.js";

describe("theme preferences", () => {
  it("normalizes and toggles supported themes", () => {
    expect(normalizeTheme("light")).toBe("light");
    expect(normalizeTheme("dark")).toBe("dark");
    expect(normalizeTheme("system")).toBeNull();
    expect(getNextTheme("light")).toBe("dark");
    expect(getNextTheme("dark")).toBe("light");
  });

  it("prefers stored theme and falls back to system preference", () => {
    expect(resolveInitialTheme({ storage: { getItem: () => "dark" }, prefersDark: false })).toBe("dark");
    expect(resolveInitialTheme({ storage: { getItem: () => null }, prefersDark: true })).toBe("dark");
    expect(resolveInitialTheme({ storage: { getItem: () => null }, prefersDark: false })).toBe("light");
  });

  it("handles unavailable storage", () => {
    expect(
      resolveInitialTheme({
        storage: {
          getItem: () => {
            throw new Error("blocked");
          },
        },
        prefersDark: true,
      })
    ).toBe("dark");
  });

  it("applies and persists a valid theme safely", () => {
    const documentRef = document.implementation.createHTMLDocument();
    expect(applyTheme("dark", documentRef)).toBe("dark");
    expect(documentRef.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(documentRef.documentElement.style.getPropertyValue("color-scheme")).toBe("dark");

    const storage = { setItem: vi.fn() };
    expect(persistTheme("light", storage)).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, "light");
    expect(persistTheme("system", storage)).toBe(false);
    expect(
      persistTheme("dark", {
        setItem: () => {
          throw new Error("blocked");
        },
      })
    ).toBe(false);
  });
});
