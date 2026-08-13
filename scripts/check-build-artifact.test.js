import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { findArtifactIssues, validateResponsePolicy } from "./check-build-artifact.mjs";

const temporaryDirectories = [];

function createArtifact() {
  const directory = mkdtempSync(resolve(tmpdir(), "hortelan-artifact-"));
  temporaryDirectories.push(directory);
  mkdirSync(resolve(directory, "assets"), { recursive: true });
  mkdirSync(resolve(directory, "img"), { recursive: true });
  mkdirSync(resolve(directory, ".vite"), { recursive: true });
  writeFileSync(
    resolve(directory, "index.html"),
    '<link rel="stylesheet" href="/assets/app-12345678.css"><script src="/assets/app-12345678.js"></script>'
  );
  writeFileSync(
    resolve(directory, "assets/app-12345678.css"),
    'body{background:url("../img/hortelan-logo.svg")}'
  );
  writeFileSync(resolve(directory, "assets/app-12345678.js"), "export default true;");
  writeFileSync(resolve(directory, "img/hortelan-logo.svg"), "<svg><path d='M0 0h1'/></svg>");
  writeFileSync(
    resolve(directory, ".vite/manifest.json"),
    JSON.stringify({ entry: { file: "assets/app-12345678.js", css: ["assets/app-12345678.css"] } })
  );
  return directory;
}

afterEach(() => {
  temporaryDirectories.splice(0).forEach((directory) => rmSync(directory, { recursive: true, force: true }));
});

describe("build artifact verification", () => {
  it("accepts nested hashed assets and stable public files", () => {
    expect(findArtifactIssues(createArtifact(), { metadata: false })).toEqual([]);
  });

  it("reports missing nested references and unhashed bundled files", () => {
    const directory = createArtifact();
    writeFileSync(resolve(directory, "assets/unhashed.js"), "console.log('unique')");
    writeFileSync(resolve(directory, "assets/app-12345678.css"), 'body{background:url("missing.png")}');
    const issues = findArtifactIssues(directory, { metadata: false });
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Missing artifact reference missing.png"),
        expect.stringContaining("Unhashed bundled asset: assets/unhashed.js"),
        expect.stringContaining("Unreferenced bundled asset: assets/unhashed.js"),
      ])
    );
  });

  it("reports duplicate content and obsolete asset directories", () => {
    const directory = mkdtempSync(resolve(tmpdir(), "hortelan-artifact-"));
    temporaryDirectories.push(directory);
    mkdirSync(resolve(directory, "Assets"));
    mkdirSync(resolve(directory, ".vite"));
    writeFileSync(resolve(directory, "index.html"), "<!doctype html>");
    writeFileSync(resolve(directory, ".vite/manifest.json"), "{}");
    writeFileSync(resolve(directory, "Assets/legacy.png"), "duplicate");
    writeFileSync(resolve(directory, "Assets/copy-12345678.png"), "duplicate");
    const issues = findArtifactIssues(directory, { metadata: false });
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Obsolete deploy directory"),
        expect.stringContaining("Duplicate artifact content"),
      ])
    );
  });

  it("validates required response headers and the JSON-LD CSP hash", () => {
    const directory = mkdtempSync(resolve(tmpdir(), "hortelan-policy-"));
    temporaryDirectories.push(directory);
    const indexPath = resolve(directory, "index.html");
    const configPath = resolve(directory, "vercel.json");
    const jsonLd = '\n{"@context":"https://schema.org"}\n';
    const hash = `sha256-${createHash("sha256").update(jsonLd).digest("base64")}`;
    writeFileSync(indexPath, `<script type="application/ld+json">${jsonLd}</script>`);
    writeFileSync(
      configPath,
      JSON.stringify({
        headers: [
          {
            headers: [
              {
                key: "Content-Security-Policy",
                value: `base-uri 'self'; object-src 'none'; frame-ancestors 'none'; '${hash}'`,
              },
              { key: "Permissions-Policy", value: "camera=()" },
              { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "X-Frame-Options", value: "DENY" },
            ],
          },
        ],
      })
    );
    expect(validateResponsePolicy(configPath, indexPath)).toEqual([]);
  });
});
