import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse } from "yaml";

const APPROVED_ACTION_MAJORS = Object.freeze({
  "actions/checkout": 7,
  "actions/download-artifact": 8,
  "actions/setup-node": 7,
  "actions/upload-artifact": 7,
  "peaceiris/actions-gh-pages": 4,
});

function listActionUses(value, uses = []) {
  if (Array.isArray(value)) value.forEach((entry) => listActionUses(entry, uses));
  else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => {
      if (key === "uses" && typeof entry === "string") uses.push(entry);
      else listActionUses(entry, uses);
    });
  }
  return uses;
}

export function validateWorkflowSource(source, filename = "workflow.yml") {
  const issues = [];
  let workflow;
  try {
    workflow = parse(source);
  } catch (error) {
    return [`${filename}: invalid YAML (${error.message})`];
  }

  if (!workflow?.name || !workflow?.on || !workflow?.jobs) {
    issues.push(`${filename}: missing name, triggers or jobs`);
  }
  for (const action of listActionUses(workflow)) {
    const match = action.match(/^([^@]+)@v(\d+)$/u);
    if (!match) {
      issues.push(`${filename}: action must use an approved explicit major (${action})`);
      continue;
    }
    const approved = APPROVED_ACTION_MAJORS[match[1]];
    if (!approved || Number(match[2]) !== approved) {
      issues.push(`${filename}: unapproved action major (${action})`);
    }
  }
  return issues;
}

export function validatePromotionWorkflow(workflow) {
  const issues = [];
  const jobs = workflow?.jobs ?? {};
  const production = jobs["deploy-production"];
  const staging = jobs["deploy-staging"];
  if (production?.needs !== "deploy-staging" || !String(production?.if).includes("refs/tags/v")) {
    issues.push("Production must require staging and a v* tag");
  }
  if (staging?.needs !== "deploy-development") {
    issues.push("Staging must require development promotion");
  }
  const deployJobs = [jobs["deploy-development"], staging, production].filter(Boolean);
  const downloads = deployJobs.map(
    (job) => job.steps?.find(({ uses }) => uses?.startsWith("actions/download-artifact@"))?.with?.name
  );
  if (downloads.some((name) => name !== "frontend-dist-${{ github.sha }}")) {
    issues.push("Every environment must consume the immutable SHA artifact");
  }
  return issues;
}

function run() {
  const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const workflowDirectory = resolve(projectRoot, ".github/workflows");
  if (!existsSync(workflowDirectory)) throw new Error("Workflow directory not found");
  const files = readdirSync(workflowDirectory).filter((file) => /\.ya?ml$/u.test(file));
  const parsed = files.map((file) => {
    const source = readFileSync(resolve(workflowDirectory, file), "utf8");
    return { file, source, workflow: parse(source) };
  });
  const issues = parsed.flatMap(({ file, source }) => validateWorkflowSource(source, file));
  const cd = parsed.find(({ file }) => file === "cd.yml")?.workflow;
  if (!cd) issues.push("cd.yml is missing");
  else issues.push(...validatePromotionWorkflow(cd));
  if (issues.length > 0) throw new Error(issues.join("\n"));
  process.stdout.write(`Workflow verification passed for ${files.join(", ")}.\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) run();
