import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

export const BUDGETS = Object.freeze({
  javascript: 150 * 1024,
  stylesheet: 50 * 1024,
  initial: 320 * 1024,
  total: 650 * 1024,
  media: 250 * 1024,
  logo: 50 * 1024,
  social: 100 * 1024,
});

const TEXT_EXTENSIONS = new Set([".css", ".html", ".js", ".json", ".svg", ".txt", ".webmanifest", ".xml"]);
const MEDIA_EXTENSIONS = new Set([".avif", ".gif", ".ico", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

export function getTransferSize(filePath) {
  return TEXT_EXTENSIONS.has(extname(filePath).toLowerCase())
    ? gzipSync(readFileSync(filePath)).byteLength
    : statSync(filePath).size;
}

export function collectFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  });
}

export function collectHtmlReferences(html) {
  return [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/giu)]
    .map((match) => match[1])
    .filter((reference) => !/^(?:[a-z]+:|#|\/\/)/iu.test(reference));
}

function resolveArtifactReference(distDirectory, reference) {
  const normalized = reference.split(/[?#]/u)[0].replace(/^\/+/, "");
  return resolve(distDirectory, normalized);
}

export function calculateBuildSizes(distDirectory) {
  const allFiles = collectFiles(distDirectory);
  const javascriptFiles = allFiles.filter((file) => extname(file).toLowerCase() === ".js");
  const stylesheetFiles = allFiles.filter((file) => extname(file).toLowerCase() === ".css");
  const mediaFiles = allFiles.filter((file) => MEDIA_EXTENSIONS.has(extname(file).toLowerCase()));
  const indexPath = resolve(distDirectory, "index.html");
  const initialFiles = existsSync(indexPath)
    ? [
        indexPath,
        ...collectHtmlReferences(readFileSync(indexPath, "utf8")).map((reference) =>
          resolveArtifactReference(distDirectory, reference)
        ),
      ]
    : [];
  const uniqueInitialFiles = [...new Set(initialFiles)].filter(existsSync);

  return {
    javascript: javascriptFiles.reduce((total, file) => total + getTransferSize(file), 0),
    stylesheet: stylesheetFiles.reduce((total, file) => total + getTransferSize(file), 0),
    initial: uniqueInitialFiles.reduce((total, file) => total + getTransferSize(file), 0),
    total: allFiles.reduce((sum, file) => sum + statSync(file).size, 0),
    largestMedia: mediaFiles.reduce(
      (largest, file) =>
        statSync(file).size > largest.bytes ? { file, bytes: statSync(file).size } : largest,
      { file: "", bytes: 0 }
    ),
    mediaFiles: mediaFiles.map((file) => ({
      file: relative(distDirectory, file),
      bytes: statSync(file).size,
    })),
    files: allFiles.map((file) => ({ file: relative(distDirectory, file), bytes: statSync(file).size })),
  };
}

export function formatKib(bytes) {
  return `${(bytes / 1024).toFixed(2)} KiB`;
}

export function validateBuildBudget(sizes, budgets = BUDGETS) {
  const aggregateIssues = [
    ["JavaScript gzip", sizes.javascript, budgets.javascript],
    ["CSS gzip", sizes.stylesheet, budgets.stylesheet],
    ["Initial transfer", sizes.initial, budgets.initial],
    ["Total artifact", sizes.total, budgets.total],
    ["Largest media", sizes.largestMedia?.bytes ?? 0, budgets.media],
  ]
    .filter(([, actual, limit]) => actual > limit)
    .map(([label, actual, limit]) => `${label} ${formatKib(actual)} exceeds ${formatKib(limit)}`);
  const individualIssues = (sizes.mediaFiles ?? []).flatMap(({ file, bytes }) => {
    const normalized = file.replaceAll("\\", "/");
    const limit = /(?:logo|favicon)/iu.test(normalized)
      ? budgets.logo
      : /og-image/iu.test(normalized)
        ? budgets.social
        : budgets.media;
    return bytes > limit ? [`Media ${normalized} ${formatKib(bytes)} exceeds ${formatKib(limit)}`] : [];
  });
  return [...aggregateIssues, ...individualIssues];
}

function run() {
  const scriptDirectory = dirname(fileURLToPath(import.meta.url));
  const distDirectory = resolve(scriptDirectory, "../dist");
  if (!existsSync(resolve(distDirectory, "index.html"))) {
    throw new Error("Production build not found. Run npm run build first.");
  }

  const sizes = calculateBuildSizes(distDirectory);
  const issues = validateBuildBudget(sizes);
  process.stdout.write(
    `Build budget: JS ${formatKib(sizes.javascript)} gzip; CSS ${formatKib(sizes.stylesheet)} gzip; ` +
      `initial ${formatKib(sizes.initial)}; artifact ${formatKib(sizes.total)}; ` +
      `largest media ${formatKib(sizes.largestMedia.bytes)}.\n`
  );
  if (issues.length > 0) throw new Error(issues.join("\n"));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) run();
