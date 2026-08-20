## Context

See `proposal.md` for motivation. The current React/Vite application is a static, client-only product with a feature-first layout, two React runtime dependencies, local browser persistence, immutable deployment and an established release gate. The verified baseline passes lint/format, 84 unit/component tests, builds at root and repository subpath, dependency audit with zero vulnerabilities and 38 Playwright checks across Chromium, Firefox and WebKit; executable coverage is 98.49% statements, 92.65% branches, 100% functions and 99.18% lines.

There is no owned HTTP API, database, server process or authenticated collector. Browser security policy, a 150 KiB gzip initial-JavaScript budget, WCAG 2.2 AA intent, four locales, CSP and graceful behavior when storage is unavailable constrain all new architecture.

## Goals / Non-Goals

**Goals:**

- Make executable contracts strict at compile time and validated at every untrusted runtime boundary.
- Preserve the feature-first architecture while making browser infrastructure replaceable and failure-aware.
- Produce useful JSON/OTel error diagnostics without collecting visitor content or blocking the page.
- Contain failures in a polished, localized and testable recovery experience.
- Provide idempotent, transactional local mural persistence within honest browser limits.
- Make 100% coverage meaningful through a narrowly defined executable-source scope and explicit test matrix.

**Non-Goals:**

- Adding a backend, public REST/GraphQL API, database server, authentication, user accounts or centralized business data.
- Claiming distributed ACID, guaranteed delivery of client logs or health of infrastructure the browser cannot inspect.
- Adding Swagger/OpenAPI for nonexistent endpoints, publishing source maps to visitors, or placing collector secrets in `VITE_*` values.
- Rewriting the landing page into ceremonial enterprise layers, class-based React or a microfrontend.
- Using an animation framework, state container or generic design-pattern abstraction without a current requirement.

## Decisions

### 1. Migrate behavior-bearing code to strict TypeScript in vertical slices

Use `typescript` and `typescript-eslint`, with `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch` and `useUnknownInCatchVariables`. JSX modules become `.tsx`, behavior modules and quality scripts become `.ts`; type-only declarations and static translation data remain separated so coverage reports measure executable behavior. The application entrypoint is integration-tested by Playwright and is the only bootstrap exclusion.

Migration proceeds one feature at a time while `allowJs` temporarily supports untouched modules. The final configuration disables unchecked JavaScript for `src/` and relevant scripts. A single whole-repository rewrite was rejected because it would obscure behavioral regressions and make rollback difficult. JSDoc-only typing was rejected because it cannot provide the required strict DTO and exhaustiveness guarantees consistently.

Use string-valued TypeScript enums only for small closed sets that exist at runtime, such as severity, health state and error code. Prefer literal unions and `as const` maps for compile-time-only sets to avoid emitted enum code.

### 2. Validate boundaries with schemas and return discriminated results

Use `zod` only at untrusted boundaries: public environment input, IndexedDB/localStorage values, imported JSON, form DTOs and telemetry records. Infer TypeScript DTOs from their schemas to keep one source of truth. Internal values do not undergo repeated validation.

Fallible application ports return `Result<T, AppFailure>` discriminated unions. Expected operational failures are values; unexpected programming errors are captured by boundaries. Throwing remains appropriate for invariant violations that cannot be recovered locally. This avoids both pervasive try/catch and a framework-specific exception hierarchy.

Validation libraries with duplicated interface/schema declarations were rejected because they violate DRY. Hand-written validators remain appropriate only for tiny primitives already covered by platform validation.

### 3. Use proportionate ports and adapters inside the existing feature structure

Retain `src/app`, `src/features` and `src/shared`. Add contracts next to the feature that owns them and adapters under `shared/platform` or the owning feature's `infrastructure` folder. Composition in `src/app` injects concrete implementations; inner application/domain modules cannot import React, DOM globals or concrete adapters.

The selected patterns follow the problem catalog referenced in the request:

- Adapter/Repository: browser persistence, mail/navigation, downloads and health capability probes.
- Strategy: console, in-memory test and optional OTLP telemetry sinks behind one narrow interface.
- Factory: construct the logger once from validated public configuration and release metadata.
- Result: model expected success/failure outcomes without exception-driven control flow.
- Error Boundary: contain React render failures and switch to recovery UI.

No generic repository base class, service locator, singleton domain state, command bus or abstract factory is introduced. These alternatives add indirection without a second real implementation and conflict with KISS/YAGNI.

Static rules use ESLint restricted imports plus a small repository graph check for cycles and cross-feature deep imports. A large architecture framework is unnecessary for this codebase.

### 4. Model failures once and render them at the narrowest safe boundary

Create a stable `AppErrorCode` set and `AppFailure` DTO containing code, severity, owner, retryability, safe localized message key, cause and diagnostic identifier. UI never renders the raw message, stack or storage/configuration value.

An application-level React Error Boundary catches render/lifecycle exceptions and renders the branded recovery page. Event handlers and async actions use a shared safe-action helper and return inline status to the initiating section. The recovery page provides retry, reload/home and contact paths, moves focus to its heading, uses `role="alert"` only for the initial fatal transition and respects all locale/theme/motion preferences that can be read safely.

The local health snapshot has `healthy`, `degraded` and `unavailable` states derived from initialization, required public config and capability probes. It never pings arbitrary external systems and does not masquerade as an HTTP health endpoint.

### 5. Emit allowlisted JSON records and lazy-load optional OpenTelemetry

Create a versioned event envelope with ISO time, severity, event name, service name/version/environment, diagnostic ID and optional trace/span IDs. Each event name maps to a narrow metadata schema; there is no `Record<string, unknown>` escape hatch.

Error capture stores the owner label supplied at the boundary plus exception name, sanitized message and redacted stack. Browser-provided file/line/column fields are retained. Production builds create hidden source maps for authorized diagnosis but do not reference or deploy them in the public artifact; a documented release step may deliver them to an approved observability system later. Without such integration, logs honestly report bundled file locations rather than pretending to identify original source lines.

The base logger has console and injectable in-memory sinks. Production console output is limited to actionable warnings/errors and serialized as one JSON object. The optional OTel Logs SDK/exporter is dynamically imported only after validated opt-in configuration; batching is bounded, telemetry is never persisted, and exporter failures are swallowed after a non-recursive local diagnostic.

Candidate runtime packages are `@opentelemetry/api`, `@opentelemetry/api-logs`, `@opentelemetry/sdk-logs`, `@opentelemetry/exporter-logs-otlp-http`, `@opentelemetry/resources` and `@opentelemetry/semantic-conventions`. Exact compatible versions are locked during implementation after an official compatibility and bundle review. If the lazy chunk or maintenance surface breaches the budgets, keep the stable sink port and ship the local JSON sink until an approved collector justifies the exporter.

The collector URL is a public endpoint, never a secret. It must be HTTPS in production, match an explicit allowlist and be represented in CSP `connect-src`; unsupported deployment hosts keep export disabled.

### 6. Redact before every sink and collect no visitor-authored content

The logger accepts only allowlisted structured fields. A final sanitizer before each sink removes common email/token patterns, query strings, fragments, control characters and overlong values. Contact DTOs, mural DTOs, DOM text, local-storage contents and full user agents cannot be supplied to telemetry types. Tests use seeded sensitive strings and assert absence in both serialized records and exporter batches.

Error stacks are retained completely within the configured maximum event size after redaction. If a stack exceeds the transport bound, the record is marked `truncated` with a content hash for correlation; the UI never exposes it. This is the only honest resolution of the tension between complete diagnostic traces, privacy and bounded browser resources.

### 7. Move mural persistence to a versioned IndexedDB transaction

Use the browser's native IndexedDB API behind `MuralRepository`; add the small `idb` helper only if bundle measurement proves it reduces adapter complexity without affecting the initial chunk. A single read-write transaction updates the entry store and a bounded idempotency-command store. Command IDs come from `crypto.randomUUID()` with a tested standards-based fallback only for environments where it is unavailable.

On first access, the repository validates current IndexedDB data and the legacy localStorage array. Valid legacy entries receive deterministic migration identifiers and are committed in one migration transaction. The source is retained until a subsequent verified read, preventing destructive loss. Newer unknown schema versions are not overwritten.

IndexedDB provides atomic transactions and isolation within its browser implementation, but durability remains subject to browser eviction, private mode and device failure. The UI and docs state this scope. Cross-tab convergence uses `BroadcastChannel` where supported plus IndexedDB reread/storage lifecycle fallback; it does not claim distributed consistency.

### 8. Keep OpenAPI conditional on an owned API

Add `docs/API-AND-HEALTH-CONTRACT.md` explaining that the current deployment exposes static assets only. Therefore an OpenAPI document or Swagger UI would be an empty, misleading artifact, and `/health` cannot report an application server that does not exist.

If an owned HTTP API is introduced, its change MUST include an OpenAPI 3.1 design-first contract, typed request/response/error DTO generation, validation at the transport boundary, idempotency-key semantics for mutations, RFC 9457-compatible problem responses, authenticated/redacted observability and liveness/readiness endpoints. This architecture trigger is enforced through the SDD/repository checklist rather than speculative code.

### 9. Prefer native progressive visual enhancements

Use the View Transition API, when available, for theme/language and recovery-state transitions and CSS scroll-driven animations for selected section reveals. Both are feature-detected, bypassed for reduced motion, absent from semantic state and covered by no-support tests. Existing CSS tokens remain the design source of truth; the error experience gains dedicated status illustration, layered surfaces, strong typography and responsive actions without bitmap payload or an animation runtime dependency.

Stable Chromium screenshot tests cover key light/dark, mobile/desktop and error states with animations disabled. Firefox and WebKit remain functional/accessibility gates instead of pixel-identical targets.

### 10. Make quality policy executable

Add type checking, type-aware lint, import-boundary/cycle checks, unused-dependency detection and commit-message validation to the release gate. Use `@commitlint/cli` with `@commitlint/config-conventional`; CI validates the contribution range while local documentation provides a `commitlint` command. A mandatory Git hook manager is not added because hooks can be bypassed and would add installation side effects.

Vitest thresholds become 100% for statements, branches, functions and lines over behavior-bearing application, adapter and quality-script code. Static catalogs, pure type declarations, generated artifacts and the bootstrap are enumerated centrally. Inline ignore comments are forbidden unless linked to an OpenSpec decision. Playwright owns wiring, real-browser and deployment behavior that unit instrumentation cannot meaningfully measure.

## Risks / Trade-offs

- [Strict migration creates a large diff] → Land vertical slices with green gates and temporary `allowJs`, then remove the bridge in a dedicated task.
- [OpenTelemetry packages inflate the application] → Dynamic import the exporter, measure both initial and lazy chunks, and retain the no-network JSON sink as the acceptable fallback.
- [Error messages or stacks contain PII] → Use typed allowlists, redaction before every sink, seeded leakage tests and never accept form/storage payloads as diagnostic context.
- [100% coverage encourages superficial tests] → Require behavior assertions, mutation/failure-path review and explicit coverage-scope validation rather than line-only tests.
- [IndexedDB migration loses local visitor content] → Validate first, write transactionally, use deterministic identifiers, verify the new read and preserve the legacy source until confirmation.
- [Browser storage cannot promise server-grade durability] → State the boundary in UI/docs and fall back to in-memory behavior without claiming persistence.
- [Native visual APIs differ by engine] → Treat them as progressive enhancement and test the no-support/reduced-motion paths as first-class behavior.
- [Hidden source maps become sensitive artifacts] → Exclude them from public deploy verification and retain them only in protected CI artifacts with explicit retention.

## Migration Plan

1. Establish TypeScript, schema, architecture and coverage tooling while preserving current JavaScript behavior.
2. Migrate shared contracts/platform adapters and their tests, then preferences/localization, marketing, feedback and application composition in vertical slices.
3. Introduce the failure/result model, JSON logger and deterministic sinks; ship remote export disabled.
4. Add the Error Boundary, action fallbacks, local health model and visual recovery states; verify all locales and assistive preferences.
5. Migrate mural data to the transactional repository, retain the validated legacy fallback and exercise upgrade/rollback with fixtures.
6. Add optional OTel export behind validated environment/CSP configuration and verify that disabled builds issue zero collector requests.
7. Raise coverage thresholds only after all scoped lines/branches are covered, then enable architecture, dependency and commit checks in CI.
8. Run the complete release gate, update evidence/traceability and perform the documented visual/exploratory test plan before archival.

Rollback is feature-flag/configuration based for telemetry and progressive visuals. For application regressions, redeploy the preceding immutable artifact. The prior localStorage data remains recoverable during the migration window, so rolling back does not require reversing an IndexedDB transaction.
