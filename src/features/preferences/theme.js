export const THEME_STORAGE_KEY = "hortelan_theme";
const THEMES = Object.freeze(["light", "dark"]);

export function normalizeTheme(value) {
  return THEMES.includes(value) ? value : null;
}

export function resolveInitialTheme({ storage, prefersDark } = {}) {
  const storageRef = storage ?? globalThis.localStorage;

  try {
    const saved = normalizeTheme(storageRef?.getItem?.(THEME_STORAGE_KEY));
    if (saved) return saved;
  } catch {
    // Storage may be unavailable in privacy-restricted contexts.
  }

  const darkPreference =
    prefersDark ?? globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  return darkPreference ? "dark" : "light";
}

export function applyTheme(theme, documentRef = globalThis.document) {
  const normalized = normalizeTheme(theme) ?? "light";
  documentRef?.documentElement?.setAttribute?.("data-theme", normalized);
  documentRef?.documentElement?.style?.setProperty?.("color-scheme", normalized);
  return normalized;
}

export function persistTheme(theme, storage = globalThis.localStorage) {
  const normalized = normalizeTheme(theme);
  if (!normalized) return false;

  try {
    storage?.setItem?.(THEME_STORAGE_KEY, normalized);
    return true;
  } catch {
    return false;
  }
}

export function getNextTheme(theme) {
  return theme === "dark" ? "light" : "dark";
}
