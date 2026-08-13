const SUPPORTED_NODE_RANGES = Object.freeze([
  { major: 22, minimumMinor: 13 },
  { major: 24, minimumMinor: 0 },
]);

export function parseNodeVersion(value) {
  const match = String(value)
    .trim()
    .replace(/^v/u, "")
    .match(/^(\d+)\.(\d+)\.(\d+)/u);
  if (!match) return null;
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
}

export function isSupportedNodeVersion(value) {
  const version = parseNodeVersion(value);
  if (!version) return false;
  return SUPPORTED_NODE_RANGES.some(
    ({ major, minimumMinor }) => version.major === major && version.minor >= minimumMinor
  );
}

function run() {
  if (!isSupportedNodeVersion(process.version)) {
    throw new Error(`Unsupported Node.js ${process.version}. Use Node.js 22.13+ (22.x) or Node.js 24.x.`);
  }
  process.stdout.write(`Node.js engine verified: ${process.version}.\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) run();
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
