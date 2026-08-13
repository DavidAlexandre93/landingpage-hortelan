export const LANGUAGE_STORAGE_KEY = "hortelan_lang";

export const SUPPORTED_LANGUAGES = Object.freeze([
  { code: "pt", htmlLang: "pt-BR", shortLabel: "BR", label: "Português" },
  { code: "en", htmlLang: "en", shortLabel: "EN", label: "English" },
  { code: "es", htmlLang: "es", shortLabel: "ES", label: "Español" },
  { code: "fr", htmlLang: "fr", shortLabel: "FR", label: "Français" },
]);

const SUPPORTED_CODES = new Set(SUPPORTED_LANGUAGES.map(({ code }) => code));

export function normalizeLanguage(value) {
  const prefix = String(value ?? "")
    .trim()
    .toLowerCase()
    .split(/[-_]/)[0];

  return SUPPORTED_CODES.has(prefix) ? prefix : null;
}

export function resolveInitialLanguage({ storage, navigatorLanguage } = {}) {
  const storageRef = storage ?? globalThis.localStorage;
  const browserLanguage = navigatorLanguage ?? globalThis.navigator?.language;

  try {
    const saved = normalizeLanguage(storageRef?.getItem?.(LANGUAGE_STORAGE_KEY));
    if (saved) return saved;
  } catch {
    // Storage may be disabled. Browser language remains a safe fallback.
  }

  return normalizeLanguage(browserLanguage) ?? "pt";
}

export function persistLanguage(language, storage = globalThis.localStorage) {
  const normalized = normalizeLanguage(language);
  if (!normalized) return false;

  try {
    storage?.setItem?.(LANGUAGE_STORAGE_KEY, normalized);
    return true;
  } catch {
    return false;
  }
}

export function getHtmlLanguage(language) {
  return SUPPORTED_LANGUAGES.find(({ code }) => code === language)?.htmlLang ?? "pt-BR";
}
