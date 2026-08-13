import { mkdtempSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { checkSddGovernance, inspectSddProject } from "./check-sdd-governance.mjs";

const temporaryDirectories = [];

function write(root, path, content) {
  const destination = resolve(root, path);
  mkdirSync(resolve(destination, ".."), { recursive: true });
  writeFileSync(destination, content);
}

function createProject() {
  const root = mkdtempSync(resolve(tmpdir(), "hortelan-sdd-"));
  temporaryDirectories.push(root);
  write(
    root,
    "openspec/config.yaml",
    `schema: spec-driven
context: |
  Produto frontend institucional com contexto versionado suficiente para orientar arquitetura, acessibilidade, segurança, qualidade e entrega reproduzível sem configuração pessoal.
rules:
  proposal: [Declare capabilities]
  specs: [Use testable requirements]
  design: [Record decisions]
  tasks: [Require evidence]
operations:
  apply: { guidance: [Keep tasks synchronized, "For sync reconcile overlaps", "For validate run strictly"] }
  archive: { guidance: [Archive explicitly] }
`
  );
  write(
    root,
    "package.json",
    JSON.stringify({
      scripts: {
        "sdd:check": "node scripts/check-sdd-governance.mjs",
        "spec:validate": "openspec validate --all --strict",
        "quality:gate": "npm run sdd:check && npm run lint",
      },
    })
  );
  const workflow = "name: Test\non: push\njobs:\n  test:\n    steps:\n      - run: npm run release:gate\n";
  write(root, ".github/workflows/ci.yml", workflow);
  write(root, ".github/workflows/cd.yml", workflow);
  write(root, "README.md", "docs/SDD.md npm run sdd:check npm run release:gate");
  write(root, "docs/QUALITY.md", "npm run sdd:check npm run release:gate manual SDD");
  write(
    root,
    "docs/SDD.md",
    `## Fontes de verdade
## Ciclo canônico
skip_specs: true
npm run sdd:check
openspec validate --all --strict
## Mudanças sobrepostas
## Arquivamento e recuperação
`
  );
  write(root, "docs/OPENSPEC-TRACEABILITY.md", "## Mudanças ativas e ordem de reconciliação\n");
  return root;
}

function createChange(root, name, { capability = name, skipSpecs = false, completed = false } = {}) {
  const directory = `openspec/changes/${name}`;
  write(
    root,
    `${directory}/.openspec.yaml`,
    `schema: spec-driven\ncreated: 2026-08-13\n${skipSpecs ? "skip_specs: true\n" : ""}`
  );
  write(root, `${directory}/proposal.md`, "## Why\nMudança verificável.\n");
  write(root, `${directory}/design.md`, "## Decisions\nDecisão proporcional.\n");
  write(
    root,
    `${directory}/tasks.md`,
    `## 1. Trabalho\n\n- [${completed ? "x" : " "}] 1.1 Fazer trabalho verificável\n`
  );
  if (!skipSpecs) {
    write(
      root,
      `${directory}/specs/${capability}/spec.md`,
      "## ADDED Requirements\n\n### Requirement: Exemplo\nO sistema MUST funcionar.\n\n#### Scenario: Exemplo\n- **WHEN** usado\n- **THEN** funciona\n"
    );
  }
  const tracePath = resolve(root, "docs/OPENSPEC-TRACEABILITY.md");
  const current = readFileSync(tracePath, "utf8");
  writeFileSync(tracePath, `${current}\n\`${name}\` \`${capability}\``);
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("SDD governance verification", () => {
  it("accepts a valid project deterministically", () => {
    const root = createProject();
    createChange(root, "valid-change");

    const first = inspectSddProject(root);
    const second = inspectSddProject(root);

    expect(first).toEqual(second);
    expect(first.issues).toEqual([]);
    expect(first.inventory.changes).toEqual([
      { name: "valid-change", capabilities: ["valid-change"], skipSpecs: false },
    ]);
  });

  it("reports a missing required artifact", () => {
    const root = createProject();
    createChange(root, "missing-design");
    unlinkSync(resolve(root, "openspec/changes/missing-design/design.md"));

    expect(inspectSddProject(root).issues).toContain(
      "openspec/changes/missing-design/design.md: artefato ausente"
    );
  });

  it("rejects operation keys unsupported by the installed OpenSpec schema", () => {
    const root = createProject();
    createChange(root, "unsupported-operation");
    const configPath = resolve(root, "openspec/config.yaml");
    writeFileSync(configPath, `${readFileSync(configPath, "utf8")}  publish: { guidance: [Unsupported] }\n`);

    expect(inspectSddProject(root).issues).toContain("openspec/config.yaml: operações sem suporte (publish)");
  });

  it("rejects malformed task checkboxes", () => {
    const root = createProject();
    createChange(root, "invalid-task");
    write(root, "openspec/changes/invalid-task/tasks.md", "## Tarefas\n- [ ] tarefa sem identificador\n");

    expect(inspectSddProject(root).issues).toEqual(
      expect.arrayContaining([expect.stringContaining("checkbox inválida")])
    );
  });

  it("accepts legitimate incomplete tasks", () => {
    const root = createProject();
    createChange(root, "incomplete-change");

    expect(inspectSddProject(root).issues).toEqual([]);
  });

  it("accepts an explicit skip_specs change without delta specs", () => {
    const root = createProject();
    createChange(root, "docs-only", { skipSpecs: true });

    expect(inspectSddProject(root).issues).toEqual([]);
    expect(inspectSddProject(root).inventory.changes[0].skipSpecs).toBe(true);
  });

  it("discovers overlapping capabilities in stable order", () => {
    const root = createProject();
    createChange(root, "change-b", { capability: "shared-capability" });
    createChange(root, "change-a", { capability: "shared-capability" });

    const result = inspectSddProject(root);

    expect(result.issues).toEqual([]);
    expect(result.inventory.overlaps).toEqual([
      { capability: "shared-capability", changes: ["change-a", "change-b"] },
    ]);
  });

  it("delegates strict validation without depending on the current directory", () => {
    const root = createProject();
    createChange(root, "strict-change");
    const runStrict = vi.fn(() => ({ status: 0, stdout: "valid\n", stderr: "" }));

    const result = checkSddGovernance(root, runStrict);

    expect(result.issues).toEqual([]);
    expect(result.strict.stdout).toBe("valid\n");
    expect(runStrict).toHaveBeenCalledWith(resolve(root));
  });

  it("turns strict OpenSpec failure into an actionable gate error", () => {
    const root = createProject();
    createChange(root, "strict-failure");

    const result = checkSddGovernance(root, () => ({ status: 2, stdout: "", stderr: "invalid spec\n" }));

    expect(result.issues).toContain("OpenSpec estrito falhou com status 2");
    expect(result.strict.stderr).toBe("invalid spec\n");
  });
});
