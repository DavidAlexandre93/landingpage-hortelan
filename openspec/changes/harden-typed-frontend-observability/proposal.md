## Why

The landing page already has a strong visual, accessibility, security and release baseline, but its executable contracts remain implicit in JavaScript and runtime failures are not represented by a privacy-safe observability model or a polished recovery experience. This change closes those gaps without inventing backend guarantees for a static frontend or adding technology that does not serve an observable requirement.

## What Changes

- Migrate behavior-bearing frontend and quality code to strict TypeScript with explicit request, response, persistence, environment and telemetry DTOs plus runtime validation at untrusted boundaries.
- Organize browser infrastructure behind small ports and adapters for storage, navigation, clock/identity and telemetry while retaining the current feature-first structure and avoiding ceremonial layers.
- Add structured JSON diagnostics and opt-in OpenTelemetry export with stable event names, trace correlation, actionable error location and complete exception details, subject to mandatory redaction and collection minimization.
- Add a global error boundary, recoverable action-error handling, health diagnostics and a localized, accessible service-unavailable experience that preserves safe navigation and retry paths.
- Strengthen local feedback persistence with versioned schemas, deterministic identifiers and idempotent commands so retries cannot duplicate or corrupt mural entries.
- Raise the quality contract with type checking, architectural/static validation, Conventional Commit enforcement, coverage at 100% for in-scope executable source and a documented manual/exploratory test plan.
- Progressively enhance the refined interface with native platform capabilities where supported, while preserving reduced-motion, forced-color, cross-browser and performance guarantees.
- Document that Swagger/OpenAPI, database transactions and server health endpoints are not applicable while the product has no owned HTTP API or database; define the mandatory trigger and acceptance criteria for introducing them if that architecture changes.

## Capabilities

### New Capabilities

- `typed-runtime-contracts`: Strict compile-time DTOs, runtime schemas, validated environment configuration and explicit success/failure contracts at every external or persisted boundary.
- `structured-observability`: Privacy-safe JSON telemetry, correlated errors and optional OpenTelemetry delivery with deterministic behavior when export is disabled or unavailable.
- `runtime-resilience`: Accessible error containment, recovery UI, health diagnostics and safe degradation for fatal and recoverable browser failures.

### Modified Capabilities

- `frontend-quality`: Extend the authoritative gate with strict type checking, architectural rules, Conventional Commit validation and complete coverage of in-scope executable source.
- `community-feedback`: Make local mural writes schema-versioned and idempotent, with explicit best-effort atomicity and honest browser-storage limitations.

## Impact

- Affects `src/`, tests, E2E journeys, build and release scripts, CI workflows, project documentation and OpenSpec traceability.
- Introduces narrowly scoped dependencies for TypeScript, runtime schema validation and OpenTelemetry; dependency weight and browser loading remain budget-gated.
- Changes local persisted data to a versioned envelope and requires a safe migration path from the current format; no visitor-facing data is sent by default.
- Does not introduce a backend, database, tracking analytics, public API or automatic collection of contact/mural content.
