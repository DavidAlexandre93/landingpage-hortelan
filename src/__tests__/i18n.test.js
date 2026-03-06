import test from "node:test";
import assert from "node:assert/strict";
import { resolveLanguage, getMessages } from "../i18n.js";

function createStorage() {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    clear: () => store.clear(),
  };
}

const localStorageMock = createStorage();
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});

const navigatorMock = { language: "pt-BR" };
Object.defineProperty(globalThis, "navigator", {
  value: navigatorMock,
  configurable: true,
});

test("resolveLanguage usa idioma salvo quando suportado", () => {
  localStorage.clear();
  localStorage.setItem("hortelan_lang", "fr");
  assert.equal(resolveLanguage(), "fr");
});

test("resolveLanguage usa idioma do navegador quando não há idioma salvo", () => {
  localStorage.clear();
  navigator.language = "es-ES";
  assert.equal(resolveLanguage(), "es");
});

test("resolveLanguage cai para pt para idiomas não suportados", () => {
  localStorage.clear();
  navigator.language = "de-DE";
  assert.equal(resolveLanguage(), "pt");
});

test("getMessages retorna mensagens do idioma resolvido", () => {
  localStorage.clear();
  localStorage.setItem("hortelan_lang", "en");
  assert.equal(getMessages().welcome, "Welcome!");
});
