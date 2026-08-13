import { describe, expect, it, vi } from "vitest";
import {
  LANGUAGE_STORAGE_KEY,
  getHtmlLanguage,
  normalizeLanguage,
  persistLanguage,
  resolveInitialLanguage,
} from "./language.js";

function createStorage(value = null) {
  return {
    getItem: vi.fn(() => value),
    setItem: vi.fn(),
  };
}

describe("language preferences", () => {
  it.each([
    ["pt-BR", "pt"],
    ["EN_us", "en"],
    ["es", "es"],
    ["fr-FR", "fr"],
    ["de-DE", null],
    [null, null],
  ])("normalizes %s to %s", (value, expected) => {
    expect(normalizeLanguage(value)).toBe(expected);
  });

  it("prefers a valid saved language", () => {
    expect(resolveInitialLanguage({ storage: createStorage("fr"), navigatorLanguage: "en-US" })).toBe("fr");
  });

  it("uses browser language and then Portuguese as fallback", () => {
    expect(resolveInitialLanguage({ storage: createStorage("xx"), navigatorLanguage: "es-MX" })).toBe("es");
    expect(resolveInitialLanguage({ storage: createStorage(), navigatorLanguage: "de-DE" })).toBe("pt");
  });

  it("continues when storage access fails", () => {
    const storage = {
      getItem: vi.fn(() => {
        throw new Error("blocked");
      }),
    };
    expect(resolveInitialLanguage({ storage, navigatorLanguage: "en-GB" })).toBe("en");
  });

  it("persists only supported languages without throwing", () => {
    const storage = createStorage();
    expect(persistLanguage("es", storage)).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(LANGUAGE_STORAGE_KEY, "es");
    expect(persistLanguage("xx", storage)).toBe(false);
    expect(
      persistLanguage("pt", {
        setItem: () => {
          throw new Error("blocked");
        },
      })
    ).toBe(false);
  });

  it("maps application language to document language", () => {
    expect(getHtmlLanguage("pt")).toBe("pt-BR");
    expect(getHtmlLanguage("en")).toBe("en");
    expect(getHtmlLanguage("unknown")).toBe("pt-BR");
  });
});
