import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const GENERATED_PATHS = Object.freeze([
  "node_modules",
  "dist",
  "dist-subpath",
  "coverage",
  ".vite",
  "playwright-report",
  "test-results",
]);

export function parseGitPaths(value) {
  return String(value)
    .split("\0")
    .map((path) => path.trim())
    .filter(Boolean);
}

export function findTrackedGeneratedFiles(runGit = execFileSync) {
  const output = runGit("git", ["ls-files", "-z", "--", ...GENERATED_PATHS], {
    encoding: "utf8",
  });
  return parseGitPaths(output);
}

function run() {
  const tracked = findTrackedGeneratedFiles();
  if (tracked.length > 0) {
    throw new Error(`Generated files are tracked by Git:\n${tracked.join("\n")}`);
  }
  process.stdout.write("Repository hygiene verified: no generated dependency or build files are tracked.\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
