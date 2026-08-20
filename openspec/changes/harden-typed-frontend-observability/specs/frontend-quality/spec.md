## MODIFIED Requirements

### Requirement: Automated quality gate

Every change SHALL pass formatting, type-aware static analysis, strict type checking, architectural boundary checks, unit/component/contract tests, defined coverage thresholds, production build, performance budget, high-severity dependency audit, browser journeys and strict OpenSpec validation.

#### Scenario: A required validation fails

- **WHEN** any quality command exits unsuccessfully
- **THEN** the aggregate quality gate exits unsuccessfully and CI blocks promotion

#### Scenario: Local and CI gates differ

- **WHEN** the authoritative local release command and continuous integration configuration are inspected
- **THEN** they invoke the same mandatory validation categories with deterministic locked dependencies

## ADDED Requirements

### Requirement: Complete executable-source coverage

The maintained unit/component/contract suite MUST report 100% statements, branches, functions and lines for in-scope behavior-bearing source; exclusions SHALL be limited to generated output, type-only declarations, static content catalogs and an integration-only bootstrap, with every exclusion documented and reviewed.

#### Scenario: Executable branch is untested

- **WHEN** a behavior-bearing branch reduces any enforced coverage dimension below 100%
- **THEN** the quality gate fails and reports the uncovered location

#### Scenario: Coverage exclusion is introduced

- **WHEN** configuration omits a source path from instrumentation
- **THEN** repository validation requires a documented category and rejects ad hoc file-level coverage suppression

### Requirement: Enforced dependency direction

Static analysis MUST prevent feature/domain contracts from importing React UI or browser adapters, prevent cross-feature deep imports and reject dependency cycles while allowing composition code to bind ports to adapters.

#### Scenario: Inner code imports browser infrastructure

- **WHEN** a domain or application module directly imports DOM, storage, navigation or telemetry implementation code
- **THEN** static analysis fails with the violated boundary

#### Scenario: Circular dependency is introduced

- **WHEN** imports create a cycle between application modules
- **THEN** the architecture check fails before tests or deployment can mark the revision promotable

### Requirement: Conventional change history

Contributions MUST use Conventional Commit subjects with an allowlisted type, optional valid scope and concise imperative description; CI SHALL validate every non-generated commit in the proposed revision range.

#### Scenario: Commit subject is invalid

- **WHEN** a contribution contains a commit subject outside the documented convention
- **THEN** the commit-history check fails with an actionable correction example

### Requirement: Evidence-based dependency adoption

Every new runtime dependency MUST have a documented requirement, maintenance and security review, measurable bundle impact and an accepted native or internal alternative comparison; unused and duplicate packages SHALL fail repository validation.

#### Scenario: Decorative dependency exceeds its value

- **WHEN** a package supports only a progressively enhanced visual effect or breaches an applicable bundle budget
- **THEN** the quality gate rejects the addition in favor of a native or CSS implementation
