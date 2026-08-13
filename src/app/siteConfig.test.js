import { describe, expect, it, vi } from "vitest";
import { SITE_LINKS, normalizeLegacyRoute } from "./siteConfig.js";

const LEGACY_PATHS = ["/home", "/splash", "/index.min.html"];

describe("site configuration", () => {
  it("keeps trusted external links on HTTPS", () => {
    Object.entries(SITE_LINKS)
      .filter(([key]) => key !== "email")
      .forEach(([, value]) => expect(value).toMatch(/^https:\/\//u));
  });

  it("keeps the product demonstration on its trusted host", () => {
    expect(SITE_LINKS.demo).toBe("https://hortelanagtech.vercel.app/");
  });

  it.each(LEGACY_PATHS)("normalizes legacy path %s", (pathname) => {
    const history = { replaceState: vi.fn() };
    normalizeLegacyRoute({ pathname, search: "?ref=old", hash: "#plans" }, history);
    expect(history.replaceState).toHaveBeenCalledWith({}, "", "/?ref=old#plans");
  });

  it("leaves unknown paths untouched", () => {
    const history = { replaceState: vi.fn() };
    normalizeLegacyRoute({ pathname: "/", search: "", hash: "" }, history);
    expect(history.replaceState).not.toHaveBeenCalled();
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
