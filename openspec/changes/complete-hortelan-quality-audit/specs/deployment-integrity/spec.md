## Purpose

Ensure every promoted static build is portable, self-contained, security-aware and identical to the artifact that passed the complete release gate.

## ADDED Requirements

### Requirement: Portable base-path build

The application SHALL support deployment at the origin root and at a configured subpath without broken scripts, styles, images, icons, manifest links, navigation or legacy-path normalization; canonical production URLs MUST remain explicit and independent of the asset base.

#### Scenario: Root deployment is tested

- **WHEN** the production artifact is served at `/`
- **THEN** every same-origin resource and internal anchor resolves successfully and the canonical metadata points to the production URL

#### Scenario: Subpath deployment is tested

- **WHEN** the same source is built and served beneath a configured repository subpath
- **THEN** every same-origin resource, manifest reference and application route resolves within that subpath without a 404

### Requirement: Self-contained artifact

The production directory MUST contain every referenced first-party file, MUST contain no duplicate or unreferenced legacy copy of a product asset, and SHALL pass an automated crawl of HTML, CSS, manifest and build-manifest references.

#### Scenario: Artifact references are verified

- **WHEN** the artifact verifier follows every emitted first-party URL
- **THEN** each target exists inside the artifact and no required runtime resource depends on a source-tree file

#### Scenario: Duplicate output is detected

- **WHEN** byte-identical or obsolete product assets are emitted under multiple paths
- **THEN** the artifact check fails and reports each duplicate or unreferenced path

### Requirement: Effective production security policy

The primary production host MUST deliver enforceable Content-Security-Policy, Permissions-Policy, referrer and anti-framing controls compatible with the required application destinations. Directives that browsers do not enforce through HTML metadata MUST be configured as response headers, and any secondary host limitation SHALL be documented explicitly.

#### Scenario: Primary response headers are inspected

- **WHEN** the deployed canonical page response is inspected
- **THEN** required security headers are present with no invalid or ignored delivery mechanism and the application still loads its declared resources

#### Scenario: Optional video is activated

- **WHEN** a visitor requests the privacy-enhanced video embed
- **THEN** the policy permits only the declared embed origin and does not broaden unrelated script, object or framing sources

### Requirement: Valid static metadata

The built document and public metadata files MUST expose valid title, description, canonical, social image, favicon, manifest, robots, sitemap and Organization JSON-LD values before JavaScript executes, and every referenced production URL SHALL be reachable or represented by a validated artifact path as appropriate.

#### Scenario: JavaScript-free metadata is parsed

- **WHEN** a validator reads the generated document without executing client code
- **THEN** all required metadata is syntactically valid, internally consistent and free of source-only paths

### Requirement: Gated immutable promotion

Continuous delivery MUST publish the exact build artifact produced after the authoritative release gate, SHALL use least-privilege workflow permissions, and MUST not deploy from a tag or branch when required quality or security checks have failed.

#### Scenario: Validated artifact is promoted

- **WHEN** all release checks succeed for a promotable revision
- **THEN** deployment consumes that revision's previously generated artifact without rebuilding different source or dependencies

#### Scenario: Gate fails before promotion

- **WHEN** any required check fails for a revision
- **THEN** no production deployment job for that revision receives or publishes an artifact
