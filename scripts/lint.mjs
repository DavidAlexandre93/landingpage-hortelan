import { readFile } from "node:fs/promises";
import { execSync } from "node:child_process";

const files = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((file) => /\.(js|jsx)$/.test(file))
  .filter(
    (file) =>
      !file.startsWith("node_modules/") && !file.startsWith("dist/") && !file.startsWith("coverage/")
  );

const jsFiles = files.filter((file) => file.endsWith(".js"));
const issues = [];

for (const file of jsFiles) {
  try {
    execSync(`node --check ${JSON.stringify(file)}`, { stdio: "pipe" });
  } catch (error) {
    issues.push(`Syntax error in ${file}: ${error.stderr?.toString()?.trim() ?? error.message}`);
  }
}

for (const file of files) {
  const source = await readFile(file, "utf8");

  if (/\bdebugger\b/.test(source)) {
    issues.push(`Disallowed debugger statement in ${file}`);
  }

  if (/console\.log\(/.test(source)) {
    issues.push(`Disallowed console.log usage in ${file}`);
  }
}

if (issues.length > 0) {
  console.error("Lint failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Lint passed for ${files.length} JavaScript/JSX files.`);

