import { readFile, writeFile } from "node:fs/promises";

const mode = process.argv.includes("--write") ? "write" : "check";
const targetFiles = [
  "README.md",
  "package.json",
  "vite.config.js",
  ".github/workflows/ci.yml",
  ".github/workflows/cd.yml",
  "scripts/lint.mjs",
  "scripts/format.mjs",
];

const violations = [];

for (const file of targetFiles) {
  const original = await readFile(file, "utf8");
  const normalized = original
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n*$/g, "\n");

  if (normalized !== original) {
    if (mode === "write") {
      await writeFile(file, normalized, "utf8");
    } else {
      violations.push(file);
    }
  }
}

if (mode === "check" && violations.length > 0) {
  console.error("Formatting check failed. Run: npm run format");
  for (const file of violations) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

if (mode === "write") {
  console.log(`Formatting applied to ${targetFiles.length} files.`);
} else {
  console.log(`Formatting check passed for ${targetFiles.length} files.`);
}

