## 1. Whole-repository audit and evidence baseline

- [ ] 1.1 Inventory every tracked source, configuration, workflow, static asset, document and OpenSpec artifact; classify ownership, runtime role, test strategy and intentional exclusions in the traceability map.
- [ ] 1.2 Record current quality, accessibility, browser, coverage, dependency, bundle and artifact evidence so each later change has a measurable before/after comparison.
- [ ] 1.3 Audit duplication, dead code, dependency cycles, unsafe boundaries, PII paths, error handling, environment literals and configuration drift; convert every accepted finding into a linked task or documented non-issue.
- [ ] 1.4 Review proposed packages against official compatibility, license, maintenance, vulnerability and gzip/lazy-chunk impact; lock only the minimum accepted dependency set.

## 2. Strict TypeScript and static architecture foundation

- [ ] 2.1 Add strict TypeScript and type-aware ESLint configuration, shared browser/Node test types and `typecheck` commands without weakening any existing lint or format rule.
- [ ] 2.2 Add automated import-boundary, cross-feature deep-import and circular-dependency checks with focused fixtures proving both accepted and rejected dependency directions.
- [ ] 2.3 Migrate build/repository quality scripts and their tests to strict TypeScript, preserving deterministic CLI output and exit behavior on Windows and CI Linux.
- [ ] 2.4 Migrate application configuration, localization and preference modules/tests to `.ts`/`.tsx` with exhaustive locale/theme handling and no implicit or unchecked values.
- [ ] 2.5 Migrate marketing, feedback, shared UI, observability, application composition and all associated tests to strict TypeScript; remove the temporary JavaScript bridge from in-scope paths.
- [ ] 2.6 Add unused/duplicate dependency and forbidden coverage-suppression checks to repository validation with regression tests.

## 3. Runtime contracts and error model

- [ ] 3.1 Add shared `Result`, application failure, diagnostic identifier, error-code, severity and health-state contracts with exhaustive unit tests.
- [ ] 3.2 Create single-source runtime schemas and inferred DTOs for public environment, contact input, mural data/import/export, persistence envelopes and telemetry records.
- [ ] 3.3 Implement validated environment loading with enumerated modes, public-variable allowlisting, URL/CSP rules and build-failure fixtures for invalid or secret-like configuration.
- [ ] 3.4 Introduce narrow injectable ports for storage, navigation/mail, download, clock/identity, capability health and telemetry; bind browser adapters only in application composition.
- [ ] 3.5 Convert expected feature failures to typed outcomes and verify that visitor-facing rendering never receives raw exceptions, unknown values or undeclared DTO properties.

## 4. Transactional and idempotent mural persistence

- [ ] 4.1 Implement the versioned IndexedDB mural repository with entry and bounded idempotency stores updated in one read-write transaction.
- [ ] 4.2 Implement deterministic command/result replay, collision handling, transaction-abort behavior and safe in-memory fallback when IndexedDB is denied or exhausted.
- [ ] 4.3 Implement validated migration from legacy localStorage data with deterministic entry IDs, future-version preservation, post-write verification and non-destructive rollback behavior.
- [ ] 4.4 Implement cross-tab invalidation/convergence using progressive browser capabilities and verify that tabs never render a partially committed transaction.
- [ ] 4.5 Update mural UI, export and removal flows to communicate committed, degraded and failed durability honestly in every locale.
- [ ] 4.6 Add contract and integration tests for atomic commit/abort, consistency invariants, transaction isolation, bounded browser durability, command replay and concurrent-tab sequences.

## 5. Privacy-safe JSON and OpenTelemetry observability

- [ ] 5.1 Implement the versioned allowlisted JSON event envelope, event-specific metadata schemas, console sink and deterministic in-memory test sink.
- [ ] 5.2 Implement exception normalization with error code, owner/component/class label, sanitized message, redacted stack, browser source location and trace/span correlation when available.
- [ ] 5.3 Implement the final PII redaction/size-bound pipeline and leakage tests covering emails, contact/mural text, tokens, storage values, URL queries/fragments, DOM text and recursive exception causes.
- [ ] 5.4 Implement the logger factory, bounded batching/discard policy, lifecycle flush and recursion guard; prove telemetry failures cannot affect feature results.
- [ ] 5.5 Add the approved OpenTelemetry Logs packages behind a dynamic optional exporter, validated public endpoint, explicit CSP destination and zero-network disabled state.
- [ ] 5.6 Verify OTel resource attributes, trace correlation, timeout/retry/drop behavior, unavailable collector behavior and absence of secret credentials in source maps, bundles, logs and requests.
- [ ] 5.7 Configure protected hidden-source-map generation and artifact exclusion, then document an authorized future upload/de-minification path without exposing maps publicly.

## 6. Runtime resilience and health experience

- [ ] 6.1 Implement the application Error Boundary and localized recovery state with deterministic diagnostic ID, safe retry, reload/home and contact alternatives.
- [ ] 6.2 Implement the safe-action boundary for storage, export, mail/navigation, media and preference actions with inline status, focus management and retained valid in-memory state.
- [ ] 6.3 Implement honest `healthy`/`degraded`/`unavailable` client health aggregation from initialization, configuration and capability checks without external health claims.
- [ ] 6.4 Add a development/test-only failure harness that can deterministically exercise fatal render, action, storage, configuration and exporter failures without shipping an exposed production control.
- [ ] 6.5 Verify that recovery content is non-technical, contains no PII or stack details, announces state exactly once and remains usable if localization/preferences storage also fails.

## 7. Modern visual system and progressive enhancement

- [ ] 7.1 Design and implement the responsive branded error/health presentation using existing tokens, semantic illustration, layered surfaces, clear hierarchy and touch-safe recovery actions in light and dark themes.
- [ ] 7.2 Add feature-detected View Transitions for appropriate theme, locale and recovery changes with an immediate reduced-motion/no-support path.
- [ ] 7.3 Add restrained CSS scroll-driven enhancement to selected marketing sections without altering content order, layout stability, focus or no-JavaScript readability.
- [ ] 7.4 Review every component and viewport for spacing, typography, contrast, affordance, state consistency, content density, CLS and high-zoom/long-translation resilience; resolve all accepted visual findings.
- [ ] 7.5 Verify forced colors, 200%/400% zoom, reduced motion, keyboard focus, coarse pointer targets, portrait/landscape mobile and no-horizontal-overflow behavior for new and existing states.

## 8. Quality governance and project documentation

- [ ] 8.1 Add Conventional Commit configuration, documented allowed types/scopes and CI revision-range validation with passing/failing fixtures; do not add a mandatory hook manager.
- [ ] 8.2 Update architecture, SDD, quality, environment, privacy, observability, troubleshooting and contribution documentation with runnable commands and ownership boundaries.
- [ ] 8.3 Add `docs/API-AND-HEALTH-CONTRACT.md` documenting the static architecture, current Swagger/OpenAPI and server-health non-applicability, and mandatory OpenAPI 3.1/DTO/idempotency/problem-details/health requirements if an owned API appears.
- [ ] 8.4 Update OpenSpec traceability so every new/modified requirement maps to implementation, automated tests, exploratory checks and release evidence.
- [ ] 8.5 Review README and deployment examples for stale JavaScript paths, environment ambiguity, secrets guidance, collector/CSP configuration and local-storage claims.

## 9. Complete automated test plan and coverage closure

- [ ] 9.1 Materialize `test-plan.md` as executable test suites and keep its requirement-to-test matrix current as implementation paths become final.
- [ ] 9.2 Add table-driven unit tests for every schema, enum/union exhaustiveness path, Result branch, error normalization/redaction branch, health transition and progressive-capability branch.
- [ ] 9.3 Add component tests for all successful, invalid, degraded, unavailable, retry and recovered UI states across supported locales, themes and assistive-preference inputs.
- [ ] 9.4 Add adapter contract tests using real-like IndexedDB, blocked/quota/abort fixtures, deterministic clock/identity, navigation/download failures and in-memory/OTel sinks.
- [ ] 9.5 Raise Vitest coverage to 100% statements, branches, functions and lines for all in-scope executable source; document static/type/bootstrap exclusions and eliminate ad hoc ignore comments.
- [ ] 9.6 Add mutation-oriented review of critical validators, redaction, idempotency and error boundaries so 100% line coverage is backed by assertions that fail when behavior changes.

## 10. Browser, accessibility and visual regression assurance

- [ ] 10.1 Extend Playwright critical journeys for fatal recovery, inline action failure, health degradation, idempotent retries, legacy migration, storage denial and zero-request telemetry-disabled behavior.
- [ ] 10.2 Run functional and accessibility journeys in current Chromium, Firefox and WebKit at the existing 320–1920 matrix plus mobile portrait/landscape projects.
- [ ] 10.3 Add stable Chromium visual baselines for primary light/dark desktop/mobile states and the fatal/degraded/recovered experiences with fonts ready and animations disabled.
- [ ] 10.4 Add axe scans and manual keyboard/screen-reader checklist coverage for every new dynamic/error state, including focus restoration, live-region behavior and forced colors.
- [ ] 10.5 Verify root and configured subpath deployments with telemetry both disabled and enabled, enforcing asset/CSP/source-map/collector-request expectations.

## 11. Security, performance and release verification

- [ ] 11.1 Re-run threat/privacy review for client configuration, log injection, PII leakage, source maps, CSP, IndexedDB import/migration and external navigation; close or explicitly accept every finding.
- [ ] 11.2 Measure initial and lazy JS/CSS/media budgets before and after each runtime dependency; remove or replace any dependency that lacks proportional value.
- [ ] 11.3 Run format, strict types, lint, architecture, repository, workflow, SDD, unit/contract/component coverage, root/subpath builds, artifact validation, budgets, dependency audit and all browser projects from the authoritative release gate.
- [ ] 11.4 Update release evidence with exact command results, test/coverage counts, bundle sizes, browsers/viewports, skipped-test reasons, visual review and residual limitations.
- [ ] 11.5 Run strict validation for all OpenSpec changes, confirm no overlapping active deltas, complete every checkbox only with reproducible evidence, then request explicit authorization before sync/archive.
