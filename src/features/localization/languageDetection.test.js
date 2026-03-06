import test from "node:test";
import assert from "node:assert/strict";
import {
  __resetLanguageDetectionStateForTests,
  detectAndPersistLanguage,
  normalizeBrowserLanguage,
} from "./languageDetection.js";

function createStorage() {
  const store = new Map();

  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
}

test("normalizeBrowserLanguage retorna fallback en quando prefixo não é suportado", () => {
  assert.equal(normalizeBrowserLanguage("de-DE"), "en");
});

test("detectAndPersistLanguage persiste idioma por geolocalização", async () => {
  __resetLanguageDetectionStateForTests();
  const localStorageRef = createStorage();
  const sessionStorageRef = createStorage();

  const result = await detectAndPersistLanguage({
    navigatorLanguage: "en-US",
    localStorageRef,
    sessionStorageRef,
    fetchImpl: async () => ({ ok: true, json: async () => ({ country_code: "BR" }) }),
    now: () => 10,
  });

  assert.equal(result.language, "pt");
  assert.equal(localStorageRef.getItem("hortelan_lang"), "pt");
  assert.equal(localStorageRef.getItem("hortelan_geo_country"), "BR");
});

test("detectAndPersistLanguage usa fallback do navegador quando API externa falha", async () => {
  __resetLanguageDetectionStateForTests();
  const localStorageRef = createStorage();

  const result = await detectAndPersistLanguage({
    navigatorLanguage: "es-ES",
    localStorageRef,
    sessionStorageRef: createStorage(),
    fetchImpl: async () => {
      throw new Error("timeout");
    },
  });

  assert.equal(result.language, "es");
  assert.equal(localStorageRef.getItem("hortelan_lang"), "es");
});

test("detectAndPersistLanguage reutiliza cache da sessão sem chamar fetch novamente", async () => {
  __resetLanguageDetectionStateForTests();
  const localStorageRef = createStorage();
  const sessionStorageRef = createStorage();

  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ country_code: "US" }) };
  };

  await detectAndPersistLanguage({
    navigatorLanguage: "pt-BR",
    localStorageRef,
    sessionStorageRef,
    fetchImpl,
    now: () => 100,
  });

  await detectAndPersistLanguage({
    navigatorLanguage: "pt-BR",
    localStorageRef,
    sessionStorageRef,
    fetchImpl,
    now: () => 300,
  });

  assert.equal(calls, 1);
});
