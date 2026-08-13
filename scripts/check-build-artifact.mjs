import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { collectFiles } from "./check-build-budget.mjs";

const HASHED_ASSET = /-[A-Za-z0-9_-]{8,}\.[^.]+$/u;
const STABLE_PUBLIC_FILES = new Set([
  ".vite/manifest.json",
  "img/hortelan-logo.svg",
  "index.html",
  "og-image.jpg",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
]);
const EXTERNAL_REFERENCE = /^(?:[a-z]+:|#|\/\/)/iu;

function toPosix(value) {
  return value.split(sep).join("/");
}

export function extractDocumentReferences(content) {
  return [...content.matchAll(/\b(?:href|src)=["']([^"']+)["']/giu)].map((match) => match[1]);
}

export function extractCssReferences(content) {
  return [...content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/giu)].map((match) => match[1]);
}

export function resolveReference(distDirectory, sourceFile, reference, basePath = "/") {
  if (!reference || EXTERNAL_REFERENCE.test(reference) || reference.startsWith("data:")) return null;
  const cleanReference = decodeURIComponent(reference.split(/[?#]/u)[0]);
  if (!cleanReference) return null;
  if (cleanReference.startsWith("/")) {
    const normalizedBase = `/${basePath.replace(/^\/+|\/+$/gu, "")}/`.replace(/^\/\//u, "/");
    if (normalizedBase !== "/" && !cleanReference.startsWith(normalizedBase)) return null;
    return resolve(distDirectory, cleanReference.slice(normalizedBase.length));
  }
  return resolve(dirname(sourceFile), cleanReference);
}

function findReferenceIssues(distDirectory, sourceFile, references, basePath) {
  return references.flatMap((reference) => {
    const target = resolveReference(distDirectory, sourceFile, reference, basePath);
    if (!target || existsSync(target)) return [];
    return [`Missing artifact reference ${reference} from ${toPosix(relative(distDirectory, sourceFile))}`];
  });
}

function readViteManifestReferences(manifestPath) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return Object.values(manifest).flatMap((entry) => [
    entry.file,
    ...(entry.css ?? []),
    ...(entry.assets ?? []),
  ]);
}

export function validateMetadata(distDirectory) {
  const issues = [];
  const indexPath = resolve(distDirectory, "index.html");
  const html = readFileSync(indexPath, "utf8");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/iu)?.[1];
  const ogUrl = html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)/iu)?.[1];
  const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/iu)?.[1];
  const twitterImage = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)/iu)?.[1];
  const jsonLdText = html.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/iu
  )?.[1];

  if (canonical !== "https://landingpage-hortelan.vercel.app/") {
    issues.push("Canonical URL is missing or unexpected");
  }
  if (ogUrl !== canonical) issues.push("Open Graph URL does not match the canonical URL");
  if (ogImage !== `${canonical}og-image.jpg` || twitterImage !== ogImage) {
    issues.push("Social image URLs do not match the canonical metadata asset");
  }
  try {
    const jsonLd = JSON.parse(jsonLdText ?? "");
    if (jsonLd.url !== canonical || jsonLd["@type"] !== "Organization") {
      issues.push("Organization JSON-LD does not match the canonical URL");
    }
  } catch {
    issues.push("Organization JSON-LD is missing or invalid");
  }
  const robotsPath = resolve(distDirectory, "robots.txt");
  const sitemapPath = resolve(distDirectory, "sitemap.xml");
  if (!existsSync(robotsPath)) issues.push("robots.txt is missing");
  else if (!readFileSync(robotsPath, "utf8").includes(`${canonical}sitemap.xml`)) {
    issues.push("robots.txt does not advertise the canonical sitemap");
  }
  if (!existsSync(sitemapPath)) issues.push("sitemap.xml is missing");
  else if (!readFileSync(sitemapPath, "utf8").includes(`<loc>${canonical}</loc>`)) {
    issues.push("sitemap.xml does not contain the canonical URL");
  }
  if (!existsSync(resolve(distDirectory, "og-image.jpg"))) issues.push("Canonical social image is missing");
  if (html.includes("youtube-nocookie.com/embed"))
    issues.push("YouTube must remain deferred from initial HTML");
  return issues;
}

export function validateResponsePolicy(configPath, indexPath) {
  const issues = [];
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  const headers = new Map(config.headers?.[0]?.headers?.map(({ key, value }) => [key.toLowerCase(), value]));
  const requiredHeaders = [
    "content-security-policy",
    "permissions-policy",
    "referrer-policy",
    "x-content-type-options",
    "x-frame-options",
  ];
  requiredHeaders.forEach((header) => {
    if (!headers.has(header)) issues.push(`Missing response header: ${header}`);
  });

  const csp = headers.get("content-security-policy") ?? "";
  const html = readFileSync(indexPath, "utf8");
  const jsonLd = html.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/iu
  )?.[1];
  const jsonLdHash = jsonLd
    ? `sha256-${createHash("sha256").update(jsonLd).digest("base64")}`
    : "missing-json-ld";
  for (const directive of ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'", jsonLdHash]) {
    if (!csp.includes(directive)) issues.push(`CSP is missing: ${directive}`);
  }
  if (/unsafe-inline|\bws:|\bwss:/iu.test(csp)) issues.push("CSP contains an overbroad source");
  return issues;
}

export function findArtifactIssues(distDirectory, { basePath = "/", metadata = true } = {}) {
  const files = collectFiles(distDirectory);
  const issues = [];
  const hashes = new Map();

  for (const file of files) {
    const artifactPath = toPosix(relative(distDirectory, file));
    if (artifactPath.startsWith("Assets/")) issues.push(`Obsolete deploy directory: ${artifactPath}`);
    if (artifactPath.startsWith("assets/") && !HASHED_ASSET.test(artifactPath)) {
      issues.push(`Unhashed bundled asset: ${artifactPath}`);
    }
    if (!artifactPath.startsWith("assets/") && !STABLE_PUBLIC_FILES.has(artifactPath)) {
      issues.push(`Unexpected stable artifact: ${artifactPath}`);
    }

    const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
    const duplicate = hashes.get(hash);
    if (duplicate) issues.push(`Duplicate artifact content: ${duplicate} and ${artifactPath}`);
    else hashes.set(hash, artifactPath);

    if (extname(file) === ".html") {
      issues.push(
        ...findReferenceIssues(
          distDirectory,
          file,
          extractDocumentReferences(readFileSync(file, "utf8")),
          basePath
        )
      );
    }
    if (extname(file) === ".css") {
      issues.push(
        ...findReferenceIssues(
          distDirectory,
          file,
          extractCssReferences(readFileSync(file, "utf8")),
          basePath
        )
      );
    }
    if (extname(file) === ".webmanifest") {
      try {
        const manifest = JSON.parse(readFileSync(file, "utf8"));
        issues.push(
          ...findReferenceIssues(
            distDirectory,
            file,
            (manifest.icons ?? []).map(({ src }) => src),
            basePath
          )
        );
        if (manifest.start_url !== ".") issues.push("Manifest start_url must remain base-relative");
      } catch {
        issues.push(`Invalid web manifest: ${artifactPath}`);
      }
    }
  }

  const manifestPath = resolve(distDirectory, ".vite/manifest.json");
  if (existsSync(manifestPath)) {
    const manifestReferences = readViteManifestReferences(manifestPath);
    issues.push(
      ...findReferenceIssues(distDirectory, resolve(distDirectory, "index.html"), manifestReferences, "/")
    );
    const referencedAssets = new Set(manifestReferences.map((reference) => reference.replaceAll("\\", "/")));
    files
      .map((file) => toPosix(relative(distDirectory, file)))
      .filter((file) => file.startsWith("assets/") && !referencedAssets.has(file))
      .forEach((file) => issues.push(`Unreferenced bundled asset: ${file}`));
  } else {
    issues.push("Vite build manifest is missing");
  }
  if (metadata) issues.push(...validateMetadata(distDirectory));
  return issues;
}

function run() {
  const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const targets = [
    { directory: resolve(projectRoot, "dist"), basePath: "/" },
    { directory: resolve(projectRoot, "dist-subpath"), basePath: "/landingpage-hortelan/" },
  ].filter(({ directory }) => existsSync(resolve(directory, "index.html")));
  if (targets.length === 0) throw new Error("Production build not found. Run npm run build first.");

  const issues = targets.flatMap(({ directory, basePath }) =>
    findArtifactIssues(directory, { basePath }).map(
      (issue) => `${relative(projectRoot, directory)}: ${issue}`
    )
  );
  issues.push(
    ...validateResponsePolicy(
      resolve(projectRoot, "vercel.json"),
      resolve(projectRoot, "dist/index.html")
    ).map((issue) => `vercel.json: ${issue}`)
  );
  if (issues.length > 0) throw new Error(issues.join("\n"));
  process.stdout.write(
    `Artifact verification passed for ${targets.map(({ directory }) => relative(projectRoot, directory)).join(", ")}.\n`
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) run();
