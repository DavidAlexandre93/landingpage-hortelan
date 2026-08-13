import { describe, expect, it } from "vitest";
import { isSupportedNodeVersion, parseNodeVersion } from "./check-node-version.mjs";

describe("Node.js engine contract", () => {
  it.each([
    ["v22.13.0", true],
    ["22.22.2", true],
    ["v24.0.0", true],
    ["v24.14.0", true],
    ["v22.12.0", false],
    ["v23.9.0", false],
    ["v25.0.0", false],
    ["invalid", false],
  ])("validates %s", (version, expected) => {
    expect(isSupportedNodeVersion(version)).toBe(expected);
  });

  it("parses semantic Node versions", () => {
    expect(parseNodeVersion("v24.14.0")).toEqual({ major: 24, minor: 14, patch: 0 });
    expect(parseNodeVersion("latest")).toBeNull();
  });
});
