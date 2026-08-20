# Test Plan: Typed Frontend, Observability and Resilience

## 1. Objective and quality model

This plan verifies every observable requirement in this change and every regression-sensitive baseline journey. “100% covered” means:

1. 100% statements, branches, functions and lines for explicitly enumerated behavior-bearing source under Vitest/V8.
2. 100% of new and modified OpenSpec scenarios mapped to at least one automated or explicitly manual verification.
3. All configuration, static assets, workflows and documentation checked by purpose-built validators or review checklists even when line instrumentation is meaningless.
4. No serious/critical automated accessibility violation and no uncaught page, console or same-origin network error in the critical browser journeys.

Coverage alone is not the release decision. Correct assertions, failure injection, real-browser behavior, privacy checks, visual review, dependency/security audit and artifact inspection are co-equal gates.

## 2. Scope

**In scope:** `src` executable modules and components; browser adapters; schema validation; migrations; telemetry; error/health states; test and build utilities; Vite, ESLint, TypeScript, Vitest, Playwright, Prettier, commitlint and CI/CD configuration; public metadata; root/subpath output; relevant documentation and OpenSpec artifacts.

**Line-coverage exclusions:** type-only declarations, generated artifacts, declarative translation/content catalogs and the minimal `main` bootstrap whose integration is verified in Playwright. Every excluded path must be listed centrally with a reason; blanket directory exclusion and inline coverage-ignore comments fail repository validation.

**Out of scope by architecture:** server/database ACID, API uptime, authenticated server logs and Swagger endpoint execution, because no owned backend exists. The test suite instead verifies that documentation does not claim those capabilities and that introduction of an API triggers the required governance contract.

## 3. Test levels and tools

| Level            | Purpose                                                                              | Tool/evidence                                                  | Blocking |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------- | -------- |
| Static contract  | Strict DTOs, exhaustiveness, import direction, cycles, config and commit history     | TypeScript, ESLint, repository/architecture checks, commitlint | Yes      |
| Unit             | Pure schema, Result, error, redaction, health, ID, migration and formatting branches | Vitest with deterministic fakes                                | Yes      |
| Adapter contract | Same behavior across in-memory/test/browser implementations and failure modes        | Vitest + fake IndexedDB/browser shims                          | Yes      |
| Component        | Visitor behavior, status, focus, locale/theme and recovery rendering                 | Testing Library + user-event + axe where useful                | Yes      |
| Integration      | Composition of use cases, ports, adapters, telemetry and persistence                 | Vitest/jsdom with injected implementations                     | Yes      |
| Browser E2E      | Real engines, CSP/network, responsive layout, storage and deployment paths           | Playwright Chromium/Firefox/WebKit                             | Yes      |
| Visual           | Intentional appearance at stable representative states                               | Playwright Chromium snapshots + human review                   | Yes      |
| Security/privacy | PII/log injection, secrets, dependency and artifact exposure                         | Fixtures, bundle scan, CSP check, `npm audit`                  | Yes      |
| Exploratory      | Assistive technology, zoom, recovery clarity and content polish                      | Versioned checklist with reviewer/date/result                  | Yes      |

## 4. Requirement-to-test matrix

| Capability               | Contract focus                 | Primary automated evidence                                                                          | Additional evidence                       |
| ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| typed-runtime-contracts  | Strict compile-time boundaries | Negative type fixtures fail; repository typecheck passes                                            | DTO/schema review                         |
| typed-runtime-contracts  | Runtime validation             | Table/property-style invalid/valid schema fixtures                                                  | Imported legacy/future JSON exploration   |
| typed-runtime-contracts  | Environment safety             | Build/config unit fixtures, bundle secret scan                                                      | Deployment configuration review           |
| typed-runtime-contracts  | Version evolution              | v0/v1/current/future/corrupt migration fixtures                                                     | Rollback rehearsal                        |
| structured-observability | JSON event contract            | Exact serialized snapshot and schema round trip                                                     | Local log filter demonstration            |
| structured-observability | Exception details/correlation  | Throw primitive/Error/cause/DOMException; assert owner, file/line/column availability rules and IDs | Protected source-map diagnostic rehearsal |
| structured-observability | No PII                         | Seed canary name/email/message/token/query/hash in every input/cause and scan every sink/request    | Bundle and browser network inspection     |
| structured-observability | Optional OTel                  | Disabled zero-request test; enabled batch/correlation test; timeout/CORS/5xx/oversize tests         | CSP and collector policy review           |
| runtime-resilience       | Fatal containment              | Inject render error; assert recovery UI, focus, retry and one log                                   | Visual/a11y review in four locales        |
| runtime-resilience       | Action degradation             | Inject storage/export/mail/media/preference failures                                                | Keyboard and screen-reader checklist      |
| runtime-resilience       | Health truthfulness            | State-transition table for healthy/degraded/unavailable                                             | Verify no server-health wording/request   |
| community-feedback       | Transaction semantics          | Commit/abort/rollback/constraint/concurrency adapter tests                                          | Multi-tab real-browser journey            |
| community-feedback       | Idempotency                    | Replay same command before/after result and restart; assert one mutation                            | Rapid double-submit E2E                   |
| community-feedback       | Legacy migration               | Valid/corrupt/future/duplicate/quota/denied fixtures                                                | Upgrade and rollback rehearsal            |
| frontend-quality         | Gate completeness              | Unit tests for each checker plus failing fixture project                                            | CI/local command equivalence audit        |
| frontend-quality         | 100% coverage                  | Four thresholds at 100 and exclusion validator                                                      | Mutation-oriented critical-path review    |
| frontend-quality         | Architecture                   | Allowed/forbidden import and cycle fixtures                                                         | Dependency diagram review                 |
| frontend-quality         | Conventional commits           | valid/invalid type, scope, subject, merge/revert fixtures                                           | Contribution docs review                  |

## 5. Functional and failure cases

### 5.1 Contracts and configuration

- Accept each supported locale/theme/severity/health/error code and reject unknown/case-mutated/null/empty variants.
- Validate exact minimum/maximum form lengths, Unicode, normalization, line endings, malicious markup-like text and unknown object keys.
- Exercise missing optional environment, missing required environment, invalid URL scheme/origin, whitespace, malformed URL, forbidden credential-like name and production HTTP endpoint.
- Prove no schema permits arbitrary metadata and no DTO includes a visitor-authored field in telemetry.
- Test `unknown` thrown values: `Error`, `DOMException`, string, number, null, object with hostile getters, nested `cause` and cyclic cause metadata.

### 5.2 Transactionality and idempotency

- Create, list, remove and export on empty, single and bounded-maximum datasets.
- Retry the same command concurrently, after success, after lost UI acknowledgement, after transaction abort and after application restart.
- Use two distinct commands with equal visitor content; both may commit because idempotency keys, not content equality, define replay.
- Abort between entry and idempotency writes and prove neither becomes visible; fail uniqueness and prove prior state remains consistent.
- Simulate database open blocked, upgrade failure, permission denial, quota exhaustion, transaction inactive/abort, unknown schema and browser eviction.
- Migrate legacy valid, partially invalid, duplicate, empty, oversized, malformed and future-version fixtures without destructive overwrite.
- Open two Playwright pages in one context, mutate independently and verify eventual converged order with no partially committed record.

### 5.3 Observability and privacy

- Assert stable JSON ordering only where the serializer promises it; otherwise compare parsed values.
- Verify every level/event schema, UTC timestamp, release/environment, diagnostic ID, owner and optional trace/span fields.
- Exercise queue at zero/one/maximum/maximum+1, oversize stack, lifecycle flush, exporter timeout, retryable/non-retryable response, offline transition and recursive sink failure.
- Assert export disabled by default in dev preview, production root and production subpath; network log must contain no collector request.
- Scan console records, in-memory records, OTLP bodies, queued values, generated bundles and public source-map references for seeded PII/secret canaries.
- Verify query strings/fragments are stripped while safe route templates remain useful; never record raw DOM or storage values.

### 5.4 Recovery UI and progressive visuals

- Render healthy, degraded, fatal, retrying, recovered and retry-failed states in pt-BR, en, es and fr.
- Verify initial focus, tab order, visible focus, heading hierarchy, status announcement count, accessible names and action alternatives.
- Exercise Error Boundary failure before preferences load, after locale choice, during nested component render and repeatedly during retry.
- Test View Transition available/unavailable/throws/reduced-motion paths and scroll-timeline supported/unsupported paths.
- Verify theme and locale changes preserve layout, URL/anchor semantics and user state; visual enhancement cannot gate a state update.

## 6. Browser, viewport and assistive matrix

Functional journeys run in current Playwright Chromium, Firefox and WebKit. Responsive overflow/layout assertions run at 320, 375, 768, 1024, 1440 and 1920 CSS pixels. Add representative mobile portrait and landscape projects with touch/coarse-pointer emulation.

| Dimension    | Values                                                          |
| ------------ | --------------------------------------------------------------- |
| Locale       | pt-BR, en, es, fr                                               |
| Theme        | light, dark                                                     |
| Motion       | default, reduced                                                |
| Contrast     | normal, forced colors                                           |
| Storage      | available, denied, corrupt, quota exhausted, migration required |
| Telemetry    | disabled, enabled/healthy, timeout, blocked, server failure     |
| Deployment   | root, `/landingpage-hortelan/` subpath                          |
| Zoom/manual  | 100%, 200%, 400%                                                |
| Input/manual | keyboard only, touch/coarse pointer, screen reader smoke        |

Pairwise automation covers combinations outside the critical matrix to avoid combinatorial waste; every locale, engine, theme and failure state still receives direct coverage. Critical fatal/degraded states receive full locale plus light/dark coverage.

## 7. Visual regression protocol

- Capture stable Chromium baselines for desktop 1440 and mobile 375: initial hero, populated feedback, fatal error, degraded storage and recovered state in light/dark themes.
- Wait for `document.fonts.ready`, disable transitions/animations, fix clock/IDs/content and mask only genuinely nondeterministic browser chrome.
- Threshold changes require a human-readable reason and side-by-side review; regenerating all baselines without inspection is prohibited.
- Human review checks hierarchy, balance, spacing rhythm, typography, contrast, imagery, control states, long translations, 320px wrapping, 400% zoom and both orientations.
- Firefox/WebKit validate geometry invariants and accessibility rather than pixel identity.

## 8. Static configuration, artifact and deployment checks

- Parse and validate `package.json`, lockfile, TypeScript/ESLint/Prettier/Vite/Vitest/Playwright/commitlint/OpenSpec files and every workflow; unknown script references or version drift fail.
- Verify CI invokes the same release categories as the local authoritative command and CD consumes the already validated immutable artifact.
- Build root and subpath, crawl HTML/CSS/manifest/build-manifest references, detect duplicates/orphans, confirm metadata and ensure hidden maps are absent from public output.
- Inspect CSP/Permissions/Referrer/anti-framing headers and meta fallback; enabled collector origin must be exact and all disabled builds retain restrictive `connect-src`.
- Enforce initial JS ≤150 KiB gzip and CSS ≤50 KiB gzip plus existing artifact/media budgets; report optional exporter lazy-chunk size separately.
- Run high-severity dependency audit and unused/duplicate dependency validation with a locked install.

## 9. Exploratory and manual checklist

- Keyboard-only complete journey including skip link, menus, preferences, FAQ, forms, mural, error retry and recovery actions.
- Screen-reader smoke in at least one Chromium-based and one platform-native pairing: landmarks, headings, labels, errors, live regions, focus changes and diagnostic ID pronunciation.
- Forced-colors and reduced-motion inspection; no hidden content, color-only status or mandatory animation.
- DevTools offline, storage disabled/full, CSP collector block and CPU/network throttling; core content remains readable and failures stay bounded.
- Four-locale editorial review for natural wording, no untranslated fallback key and no raw technical exception.
- Visual review at all target widths, orientations, zoom levels and themes with particular attention to error/degraded states.
- Confirm privacy/data guidance accurately describes device-local content, telemetry default, retention/bounds and lack of server delivery.

## 10. Exit criteria and release evidence

Release is blocked until all of the following are true:

- Every task in `tasks.md` has implementation plus reproducible evidence.
- All new/modified OpenSpec scenarios are mapped and pass; `openspec validate --all --strict` succeeds with no active-delta conflict.
- Typecheck, type-aware lint, format, architecture, repository, workflow, SDD and commit checks pass with zero warnings.
- Vitest reports exactly 100% statements, branches, functions and lines over the approved executable scope; exclusion validation passes.
- All required Playwright projects pass, with each skip documented as an intentional conditional capability rather than missing coverage.
- Axe reports zero serious/critical violations; keyboard, zoom, forced-colors, reduced-motion and screen-reader checklists are signed with date/result.
- Visual diffs are empty or explicitly approved; root/subpath artifacts, budgets, CSP, hidden-map exclusion and zero-request telemetry-disabled checks pass.
- Dependency audit has no high/critical finding, PII/secret canaries are absent from every sink/artifact/request, and remaining limitations are documented.
- `docs/RELEASE-EVIDENCE.md` records commands, versions, counts, browser matrix, sizes, decisions and the immutable revision identifier.
