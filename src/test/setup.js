import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

const INITIAL_TITLE = document.title;
const initialDescriptionElement = document.head.querySelector('meta[name="description"]');
const INITIAL_DESCRIPTION = initialDescriptionElement?.content ?? "";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  Object.defineProperty(window, "requestAnimationFrame", {
    configurable: true,
    value: vi.fn((callback) => callback(0)),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
  window.localStorage.clear();
  window.sessionStorage.clear();
  delete window.__HORTELAN_METRICS__;
  document.documentElement.lang = "pt-BR";
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("style");
  document.body.removeAttribute("style");
  document.title = INITIAL_TITLE;
  const description = document.head.querySelector('meta[name="description"]');
  if (initialDescriptionElement && description) description.content = INITIAL_DESCRIPTION;
  else description?.remove();
});
