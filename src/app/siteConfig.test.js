import { describe, expect, it, vi } from "vitest";
import {
  LEGACY_PATHS,
  SITE_LINKS,
  normalizeBasePath,
  normalizeLegacyRoute,
  withBasePath,
} from "./siteConfig.js";

describe("site configuration", () => {
  it("keeps trusted external links on HTTPS", () => {
    Object.entries(SITE_LINKS)
      .filter(([key]) => key !== "email")
      .forEach(([, value]) => expect(value).toMatch(/^https:\/\//u));
  });

  it.each([...LEGACY_PATHS])("normalizes legacy path %s", (pathname) => {
    const history = { replaceState: vi.fn() };
    normalizeLegacyRoute({ pathname, search: "?ref=old", hash: "#plans" }, history);
    expect(history.replaceState).toHaveBeenCalledWith({}, "", "/?ref=old#plans");
  });

  it("leaves unknown paths untouched", () => {
    const history = { replaceState: vi.fn() };
    normalizeLegacyRoute({ pathname: "/", search: "", hash: "" }, history);
    expect(history.replaceState).not.toHaveBeenCalled();
  });

  it("normalizes root and repository base paths", () => {
    expect(normalizeBasePath("/")).toBe("/");
    expect(normalizeBasePath("landingpage-hortelan")).toBe("/landingpage-hortelan/");
    expect(normalizeBasePath("/landingpage-hortelan/")).toBe("/landingpage-hortelan/");
    expect(withBasePath("img/logo.svg", "/landingpage-hortelan/")).toBe("/landingpage-hortelan/img/logo.svg");
    expect(withBasePath("/img/logo.svg", "/")).toBe("/img/logo.svg");
  });

  it("normalizes legacy routes inside a repository subpath", () => {
    const history = { replaceState: vi.fn() };
    normalizeLegacyRoute(
      { pathname: "/landingpage-hortelan/home", search: "?ref=old", hash: "#plans" },
      history,
      "/landingpage-hortelan/"
    );
    expect(history.replaceState).toHaveBeenCalledWith({}, "", "/landingpage-hortelan/?ref=old#plans");
  });
});
