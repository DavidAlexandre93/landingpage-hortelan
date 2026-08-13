import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse } from "yaml";

const REQUIRED_RULES = ["proposal", "specs", "design", "tasks"];
const REQUIRED_OPERATIONS = ["apply", "archive"];
const REQUIRED_CHANGE_FILES = [".openspec.yaml", "proposal.md", "design.md", "tasks.md"];
const TASK_LINE = /^- \[(?: |x)\] \d+\.\d+ \S.+$/u;

function readText(path) {
  return readFileSync(path, "utf8");
}

function readYaml(path, issues, label) {
  try {
    return parse(readText(path));
  } catch (error) {
    issues.push(`${label}: YAML inválido (${error.message})`);
    return null;
  }
}

function listDirectories(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "archive")
    .map(({ name }) => name)
    .sort((left, right) => left.localeCompare(right, "en"));
}

function listSpecCapabilities(changeDirectory) {
  const specsDirectory = resolve(changeDirectory, "specs");
  if (!existsSync(specsDirectory)) return [];

  const capabilities = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) =>
      a.name.localeCompare(b.name, "en")
    )) {
      const entryPath = resolve(directory, entry.name);
      if (entry.isDirectory()) visit(entryPath);
      else if (entry.isFile() && entry.name === "spec.md") {
        capabilities.push(dirname(relative(specsDirectory, entryPath)).split(sep).join("/"));
      }
    }
  };
  visit(specsDirectory);
  return capabilities;
}

function validateConfig(projectRoot, issues) {
  const configPath = resolve(projectRoot, "openspec/config.yaml");
  if (!existsSync(configPath)) {
    issues.push("openspec/config.yaml: configuração ausente");
    return;
  }

  const config = readYaml(configPath, issues, "openspec/config.yaml");
  if (!config) return;
  if (config.schema !== "spec-driven") issues.push("openspec/config.yaml: schema deve ser spec-driven");
  if (typeof config.context !== "string" || config.context.trim().length < 120) {
    issues.push("openspec/config.yaml: contexto versionado está ausente ou insuficiente");
  }
  for (const rule of REQUIRED_RULES) {
    if (!Array.isArray(config.rules?.[rule]) || config.rules[rule].length === 0) {
      issues.push(`openspec/config.yaml: rules.${rule} deve possuir orientações`);
    }
  }
  for (const operation of REQUIRED_OPERATIONS) {
    if (!Array.isArray(config.operations?.[operation]?.guidance)) {
      issues.push(`openspec/config.yaml: operations.${operation}.guidance deve existir`);
    }
  }
  const configuredOperations = Object.keys(config.operations ?? {});
  const unsupportedOperations = configuredOperations.filter(
    (operation) => !REQUIRED_OPERATIONS.includes(operation)
  );
  if (unsupportedOperations.length > 0) {
    issues.push(`openspec/config.yaml: operações sem suporte (${unsupportedOperations.sort().join(", ")})`);
  }
  const operationGuidance = REQUIRED_OPERATIONS.flatMap(
    (operation) => config.operations?.[operation]?.guidance ?? []
  ).join(" ");
  for (const documentedOperation of ["sync", "validate"]) {
    if (!operationGuidance.includes(documentedOperation)) {
      issues.push(`openspec/config.yaml: guidance explícito de ${documentedOperation} ausente`);
    }
  }
}

function validateDocuments(projectRoot, issues) {
  const contracts = {
    "README.md": ["docs/SDD.md", "npm run sdd:check", "npm run release:gate"],
    "docs/QUALITY.md": ["npm run sdd:check", "npm run release:gate", "manual SDD"],
    "docs/SDD.md": [
      "## Fontes de verdade",
      "## Ciclo canônico",
      "skip_specs: true",
      "npm run sdd:check",
      "openspec validate --all --strict",
      "## Mudanças sobrepostas",
      "## Arquivamento e recuperação",
    ],
    "docs/OPENSPEC-TRACEABILITY.md": ["## Mudanças ativas e ordem de reconciliação"],
  };

  for (const [path, expectedValues] of Object.entries(contracts)) {
    const absolutePath = resolve(projectRoot, path);
    if (!existsSync(absolutePath)) {
      issues.push(`${path}: documento obrigatório ausente`);
      continue;
    }
    const content = readText(absolutePath);
    for (const value of expectedValues) {
      if (!content.includes(value)) issues.push(`${path}: referência obrigatória ausente (${value})`);
    }
  }
}

function validatePackageAndWorkflows(projectRoot, issues) {
  const packagePath = resolve(projectRoot, "package.json");
  let packageJson;
  try {
    packageJson = JSON.parse(readText(packagePath));
  } catch (error) {
    issues.push(`package.json: JSON inválido ou ausente (${error.message})`);
    return;
  }

  if (packageJson.scripts?.["sdd:check"] !== "node scripts/check-sdd-governance.mjs") {
    issues.push("package.json: sdd:check deve executar o verificador de governança");
  }
  if (!packageJson.scripts?.["quality:gate"]?.startsWith("npm run sdd:check &&")) {
    issues.push("package.json: quality:gate deve começar por sdd:check");
  }
  if (packageJson.scripts?.["spec:validate"] !== "openspec validate --all --strict") {
    issues.push("package.json: spec:validate deve preservar a validação OpenSpec estrita");
  }

  const workflowDirectory = resolve(projectRoot, ".github/workflows");
  for (const filename of ["ci.yml", "cd.yml"]) {
    const workflowPath = resolve(workflowDirectory, filename);
    if (!existsSync(workflowPath)) {
      issues.push(`.github/workflows/${filename}: workflow ausente`);
      continue;
    }
    const source = readText(workflowPath);
    if (!source.includes("npm run release:gate")) {
      issues.push(`.github/workflows/${filename}: release:gate não é executado`);
    }
    if (/paths-ignore\s*:/u.test(source)) {
      issues.push(`.github/workflows/${filename}: paths-ignore pode ocultar mudanças SDD`);
    }
  }
}

function validateChanges(projectRoot, issues) {
  const changesDirectory = resolve(projectRoot, "openspec/changes");
  const traceabilityPath = resolve(projectRoot, "docs/OPENSPEC-TRACEABILITY.md");
  const traceability = existsSync(traceabilityPath) ? readText(traceabilityPath) : "";
  const changes = [];

  for (const name of listDirectories(changesDirectory)) {
    const directory = resolve(changesDirectory, name);
    const missingFiles = REQUIRED_CHANGE_FILES.filter((file) => !existsSync(resolve(directory, file)));
    for (const file of missingFiles) issues.push(`openspec/changes/${name}/${file}: artefato ausente`);

    const metadataPath = resolve(directory, ".openspec.yaml");
    const metadata = existsSync(metadataPath)
      ? readYaml(metadataPath, issues, `openspec/changes/${name}/.openspec.yaml`)
      : null;
    if (metadata && metadata.schema !== "spec-driven") {
      issues.push(`openspec/changes/${name}: schema deve ser spec-driven`);
    }

    const capabilities = listSpecCapabilities(directory);
    const skipSpecs = metadata?.skip_specs === true;
    if (!skipSpecs && capabilities.length === 0) {
      issues.push(`openspec/changes/${name}: specs delta ausentes e skip_specs não declarado`);
    }
    if (skipSpecs && capabilities.length > 0) {
      issues.push(`openspec/changes/${name}: skip_specs não pode coexistir com specs delta`);
    }

    const tasksPath = resolve(directory, "tasks.md");
    if (existsSync(tasksPath)) {
      const checkboxLines = readText(tasksPath)
        .split(/\r?\n/u)
        .filter((line) => line.trimStart().startsWith("- ["));
      if (checkboxLines.length === 0)
        issues.push(`openspec/changes/${name}/tasks.md: nenhuma tarefa rastreável`);
      for (const line of checkboxLines) {
        if (!TASK_LINE.test(line)) {
          issues.push(`openspec/changes/${name}/tasks.md: checkbox inválida (${line.trim()})`);
        }
      }
    }

    if (!traceability.includes(`\`${name}\``)) {
      issues.push(`docs/OPENSPEC-TRACEABILITY.md: mudança ativa não rastreada (${name})`);
    }
    changes.push({ name, capabilities, skipSpecs });
  }

  const capabilityOwners = new Map();
  for (const change of changes) {
    for (const capability of change.capabilities) {
      const owners = capabilityOwners.get(capability) ?? [];
      owners.push(change.name);
      capabilityOwners.set(capability, owners);
    }
  }
  const overlaps = [...capabilityOwners]
    .filter(([, owners]) => owners.length > 1)
    .map(([capability, owners]) => ({ capability, changes: owners.sort() }))
    .sort((a, b) => a.capability.localeCompare(b.capability, "en"));

  for (const overlap of overlaps) {
    const documented =
      traceability.includes(`\`${overlap.capability}\``) &&
      overlap.changes.every((change) => traceability.includes(`\`${change}\``));
    if (!documented) {
      issues.push(
        `docs/OPENSPEC-TRACEABILITY.md: sobreposição não documentada (${overlap.capability}: ${overlap.changes.join(", ")})`
      );
    }
  }
  return { changes, overlaps };
}

export function inspectSddProject(projectRoot) {
  const resolvedRoot = resolve(projectRoot);
  const issues = [];
  validateConfig(resolvedRoot, issues);
  validateDocuments(resolvedRoot, issues);
  validatePackageAndWorkflows(resolvedRoot, issues);
  const inventory = validateChanges(resolvedRoot, issues);
  return { issues, inventory };
}

export function runOpenSpecStrict(projectRoot) {
  const cliPath = resolve(projectRoot, "node_modules/@fission-ai/openspec/bin/openspec.js");
  if (!existsSync(cliPath)) {
    return { status: 1, stdout: "", stderr: "OpenSpec local não encontrado; execute npm ci.\n" };
  }
  const result = spawnSync(process.execPath, [cliPath, "validate", "--all", "--strict"], {
    cwd: projectRoot,
    encoding: "utf8",
    env: process.env,
  });
  return {
    status: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr || result.error?.message || "",
  };
}

export function checkSddGovernance(projectRoot, runStrict = runOpenSpecStrict) {
  const inspection = inspectSddProject(projectRoot);
  if (inspection.issues.length > 0) return { ...inspection, strict: null };

  const strict = runStrict(resolve(projectRoot));
  if (strict.status !== 0) {
    inspection.issues.push(`OpenSpec estrito falhou com status ${strict.status}`);
  }
  return { ...inspection, strict };
}

function run() {
  const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const result = checkSddGovernance(projectRoot);
  if (result.strict?.stdout) process.stdout.write(result.strict.stdout);
  if (result.strict?.stderr) process.stderr.write(result.strict.stderr);
  if (result.issues.length > 0) throw new Error(result.issues.join("\n"));
  process.stdout.write(
    `SDD governance passed for ${result.inventory.changes.length} active changes and ${result.inventory.overlaps.length} capability overlaps.\n`
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) run();
