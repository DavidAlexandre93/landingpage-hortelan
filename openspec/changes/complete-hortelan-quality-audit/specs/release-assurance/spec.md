## Purpose

Define reproducible release evidence so every accepted version is built from a clean dependency state and passes the same deterministic checks locally and in continuous integration.

## ADDED Requirements

### Requirement: Reproducible dependency state

The repository MUST define its direct dependencies and supported runtime declaratively, MUST keep generated dependency trees, coverage and build outputs outside version control, and SHALL be installable from a clean checkout with the locked dependency graph.

#### Scenario: Maintainer installs a clean checkout

- **WHEN** a maintainer uses a supported Node runtime and performs the documented clean installation
- **THEN** the lockfile reconstructs the dependency graph without requiring repository-tracked package contents or manual file repair

#### Scenario: Generated dependencies enter the index

- **WHEN** the release gate detects tracked files under an ignored dependency or generated-output directory
- **THEN** the gate fails with the offending paths identified

### Requirement: Compatible current toolchain

The project MUST use mutually compatible stable releases of its direct toolchain dependencies, SHALL execute CI on a runtime allowed by the package engine contract, and MUST document any intentionally deferred direct dependency update.

#### Scenario: Toolchain currency is reviewed

- **WHEN** the direct dependencies are compared with the authoritative package registry
- **THEN** every outdated direct package is either upgraded with passing migration checks or recorded with a compatibility reason and follow-up condition

#### Scenario: CI runtime violates the engine contract

- **WHEN** a workflow selects a Node version outside the declared supported range
- **THEN** automated validation fails before build or deployment

### Requirement: Single authoritative quality gate

The release command SHALL run strict OpenSpec validation, zero-warning static analysis, formatting verification, deterministic unit and component tests, coverage thresholds, a production build, complete performance budgets, dependency vulnerability audit and browser acceptance tests; any failed check MUST block promotion.

#### Scenario: Every required check passes

- **WHEN** the aggregate release command completes on a clean checkout
- **THEN** every required check reports success and the command exits successfully

#### Scenario: One required check fails

- **WHEN** any required check returns an error or a threshold is missed
- **THEN** the aggregate command exits unsuccessfully and CI does not publish a deployable artifact

### Requirement: Deterministic and representative tests

Automated tests MUST isolate locale, storage, time, browser APIs and document state, MUST include behavior-bearing application components in coverage, and SHALL produce the same result across repeated runs on supported environments. Critical normalization, safe-storage and user-content handling paths MUST have complete branch coverage; the measured application suite MUST maintain at least 90 percent statements and lines and at least 85 percent branches and functions.

#### Scenario: Suite runs with a non-Portuguese host locale

- **WHEN** tests execute on a machine whose browser locale differs from pt-BR
- **THEN** each test explicitly controls its expected locale and produces the same assertions as the CI environment

#### Scenario: Coverage is evaluated

- **WHEN** the coverage command measures the application source
- **THEN** behavior-bearing components and domain modules are included and every defined global and critical-module threshold is satisfied

### Requirement: Traceable SDD completion

Implementation tasks MUST be marked complete only with corresponding code or verification evidence, overlapping active changes SHALL be reconciled without discarding their history, and archiving MUST wait until all applicable acceptance criteria and release checks pass.

#### Scenario: Maintainer inspects release evidence

- **WHEN** a maintainer compares the active OpenSpec tasks with the repository and quality-gate output
- **THEN** every completed checkbox maps to implemented behavior or recorded verification and every remaining gap stays unchecked
