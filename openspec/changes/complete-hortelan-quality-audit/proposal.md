## Why

The current modernization is functionally advanced but is not release-ready: lint fails with 30 errors, 4 of 41 tests fail, CI uses an unsupported Node version, 758 dependency files are tracked, and the production artifact duplicates oversized assets that its budget does not measure. A second-pass assurance change is needed now to convert the existing implementation and OpenSpec contracts into a reproducible, browser-verified release with evidence instead of relying on nominal tooling or unchecked tasks.

## What Changes

- Reconcile the implemented application with the active `modernize-hortelan-landing` specifications and synchronize task evidence without overwriting unrelated local work.
- Align the supported Node, React/Vite/Vitest and linting toolchain with compatible current stable releases; migrate ESLint to the current flat-config behavior and remove repository-tracked dependency artifacts.
- Make unit and component tests deterministic across locale, storage, DOM realms and time, then measure application components as well as isolated utilities.
- Add browser-level verification for critical journeys, keyboard operation, accessible names, reduced motion, color themes, supported languages, form behavior, console errors and responsive widths from 320 to 1920 CSS pixels.
- Make the static build portable and self-contained across root and subpath hosting, eliminate duplicate/unreferenced assets, and validate every emitted URL and required file.
- Extend performance budgets from JavaScript and CSS gzip size to the complete initial payload and individual media assets, while preserving the existing visual identity and trusted destinations.
- Harden CI/CD so OpenSpec, code quality, tests, coverage, build, dependency audit and browser smoke checks gate promotion under the same Node contract; dependency-only Markdown changes SHALL no longer bypass validation.
- Verify browser security policies at their effective delivery layer and document host-specific headers when a meta policy cannot enforce a directive.
- No user-facing breaking change is intended: the canonical landing, four locales, theme preference, contact handoff and local mural remain available.

## Capabilities

### New Capabilities

- `release-assurance`: reproducible dependency state, deterministic automated checks, truthful coverage, synchronized SDD evidence and a single authoritative release gate.
- `browser-experience-assurance`: browser-tested responsive, localized, accessible and failure-safe behavior for the complete institutional journey.
- `deployment-integrity`: portable and self-contained static artifacts, effective security metadata/headers and promotion only from validated builds.
- `asset-efficiency`: whole-artifact performance accounting, removal of duplicate assets and enforceable media/payload budgets.

### Modified Capabilities

None. The active modernization capabilities remain the product contract; this change adds independent release and verification guarantees around them because they have not yet been archived into the baseline.

## Impact

- Source and tests: `src/**`, test setup/configuration and new browser-level tests for critical flows and viewports.
- Tooling: `package.json`, lockfile, ESLint, Vitest/Vite configuration, build-budget scripts and optional browser/a11y test dependencies.
- Repository hygiene: tracked `node_modules` entries are removed from version control while the local installation remains reproducible through `npm ci`.
- Build and assets: Vite base/output handling, public asset layout, manifest/SEO references and the `Assets` migration path.
- Delivery: GitHub Actions Node version, event filters, permissions, quality-gate ordering, artifact verification and deployment preconditions.
- Documentation and SDD: README, prior-change evidence reconciliation, strict validation and final release evidence. No backend, secret, analytics endpoint or external data migration is introduced.
