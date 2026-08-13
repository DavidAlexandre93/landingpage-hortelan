import { describe, expect, it, vi } from "vitest";
import { GENERATED_PATHS, findTrackedGeneratedFiles, parseGitPaths } from "./check-repository.mjs";

describe("repository hygiene", () => {
  it("parses Git null-separated paths", () => {
    expect(parseGitPaths("node_modules/a.js\0dist/index.html\0")).toEqual([
      "node_modules/a.js",
      "dist/index.html",
    ]);
  });

  it("queries every generated directory", () => {
    const runGit = vi.fn(() => "coverage/index.html\0");
    expect(findTrackedGeneratedFiles(runGit)).toEqual(["coverage/index.html"]);
    expect(runGit).toHaveBeenCalledWith("git", ["ls-files", "-z", "--", ...GENERATED_PATHS], {
      encoding: "utf8",
    });
  });
});
