## Context

The repository is midway through the `modernize-hortelan-landing` change: the React implementation and tooling are present, but its 24 tasks remain unchecked and the worktree contains extensive user changes. The measured baseline is 30 ESLint errors, 37 passing and 4 failing tests, strict OpenSpec validation passing, zero audited dependency vulnerabilities, and a successful Vite build with 78.69 KiB JavaScript gzip and 7.13 KiB CSS gzip. The artifact nevertheless ships roughly 2.9 MB because the custom asset-copy plugin includes legacy files and duplicates the dashboard image. CI selects Node 20 while `package.json` requires Node 22.13 or newer, and 758 `node_modules` files are still tracked.

The application remains a backend-free static site whose canonical production origin is Vercel; GitHub Pages is a secondary publishing target. See `proposal.md` for motivation and the four change specifications for acceptance behavior.

## Goals / Non-Goals

**Goals:**

- Turn the current dirty, partially evidenced modernization into a reproducible release without discarding user-authored work.
- Make the local and CI release commands equivalent and truthful about lint, tests, coverage, dependency health, build integrity, assets and browser behavior.
- Validate behavior in actual browser engines and across the complete responsive range, including failure paths that jsdom cannot represent reliably.
- Preserve the current brand, copy, trusted destinations and backend-free deployment model while reducing output size and deployment ambiguity.

**Non-Goals:**

- Introduce a backend, server-side rendering, authentication, remote analytics, email delivery or synchronized community data.
- Rewrite the application in another framework or migrate the entire JavaScript codebase to TypeScript solely for novelty.
- Adopt experimental React APIs or the React Compiler without a measured need in this small static application.
- Replace user-authored source artwork; unused originals may remain in the repository as source material but will not be copied to production.
- Claim mathematical absence of defects. Completion means 100 percent of the specified release checks pass with the defined coverage and browser matrix.

## Decisions

### 1. Preserve the working tree and reconcile evidence before cleanup

Implementation will start from the current files, inspect overlapping diffs before each edit, and avoid repository-wide rewrites. The prior change's tasks will be marked complete only after the corresponding implementation and verification exist; unrelated modifications remain untouched. Tracked `node_modules` entries will be removed from the Git index without using that operation to delete the local installation.

Alternative considered: reset to `origin/main` and reapply the modernization cleanly. Rejected because the worktree contains substantial user-authored progress and destructive rollback is neither necessary nor authorized.

### 2. Upgrade only direct packages with an explicit compatibility reason

React 19.2, Vite 8 and Vitest 4 remain the architecture baseline. ESLint stays on the latest compatible 9.x release because the current `eslint-plugin-jsx-a11y` peer contract excludes ESLint 10; the compatible React lint plugin supplies JSX reference tracking and security checks without suppressing core analysis. Compatible direct patch/minor updates identified by the registry will be applied, with the lockfile regenerated on a supported Node runtime. Node 24 is the primary CI runtime while the declared engine range continues to include compatible Node 22.13+ releases. jsdom 30 is deferred because its minimum Node patch exceeds both the current runner and the declared Node 22 floor.

Alternative considered: force ESLint 10 despite the accessibility plugin's peer range. Rejected because a nominally newer linter is not worth an unsupported accessibility stack; the compatibility hold is explicit and can be removed when the plugin publishes ESLint 10 support.

### 3. Make Vitest state explicit and expand measured source coverage

Shared test setup will install complete browser API stubs and reset document metadata, locale, storage, timers, globals and mocks after every case. Locale-dependent component tests will explicitly select their starting language rather than inherit the host navigator. Cross-realm DOM assertions will use same-realm fixtures or realm-neutral property assertions. Coverage will include application components and hooks, with targeted complete coverage on localization, storage normalization and safe content utilities plus the global thresholds defined by `release-assurance`.

Alternative considered: weaken or delete the failing assertions. Rejected because the failures reveal nondeterministic setup and coverage blind spots rather than obsolete behavior.

### 4. Add production-level browser acceptance with Playwright and axe-core

A dedicated browser suite will start the built site, fail on unexpected console/page/request errors, and run critical flows in Chromium, Firefox and WebKit. Projects will cover mobile and desktop viewports; focused responsive assertions will evaluate 320, 375, 768, 1024, 1440 and 1920 widths. Axe checks will cover the initial document and key interactive states, while explicit keyboard tests cover focus movement, Escape behavior, validation and announcements. Root and configured-subpath builds will both receive smoke coverage.

Alternative considered: rely only on jsdom component tests. Rejected because jsdom does not calculate layout, load real resources, enforce CSP, model multiple engines or expose genuine overflow and focus behavior.

### 5. Put runtime assets in one Vite-aware graph

The custom plugin that blindly copies the entire root `Assets` directory will be removed. The dashboard proof will live in the source asset graph and be imported by the component; the HTML preload will reference the same source so Vite emits one hashed file. Only stable-URL assets needed by metadata, manifest and crawlers will live under `public`. The existing compact brand SVG becomes the favicon/manifest source, while the original large artwork can remain outside the build.

Alternative considered: keep the copy plugin and add exclusions. Rejected because two ownership models caused the current duplicate dashboard, made the output directory implicit and allowed unrelated source artwork into every release.

### 6. Separate canonical URLs from configurable asset base paths

Vite will accept a documented base path for secondary hosting. HTML public references will use Vite's base placeholder, and application-owned asset URLs and legacy-path normalization will use a single base-aware helper. Canonical, Open Graph and JSON-LD URLs stay absolute to the production origin. An artifact verifier and two build smoke modes protect root and repository-subpath deployment.

Alternative considered: use relative URLs everywhere. Rejected because relative assets help subpaths but complicate nested legacy URLs and can accidentally change canonical SEO destinations.

### 7. Enforce host-capable security directives at the response layer

The HTML retains only policies that are valid and useful as metadata fallbacks. Vercel configuration will deliver CSP, Permissions-Policy, Referrer-Policy and anti-framing headers for the canonical host; `frame-ancestors` will not be represented as if a meta tag could enforce it. The policy will allow the privacy-enhanced YouTube frame only after user activation and avoid broad production websocket origins. GitHub Pages header limitations will be documented as a secondary-host constraint.

Alternative considered: leave all directives in `<meta http-equiv>`. Rejected because some required directives, notably anti-framing and Permissions-Policy, require response headers to be effective.

### 8. Measure the complete artifact, not only compiled code

The budget script will enumerate all emitted files, distinguish compressed text from raw media, follow initial HTML references, detect duplicates/unreferenced legacy assets and enforce individual image limits. Tests will cover recursion, missing output, public assets, duplicate hashes, initial-reference classification and threshold errors. Existing JavaScript and CSS limits remain as sub-budgets.

Alternative considered: trust Vite's console size report. Rejected because it omitted the copied public tree and therefore reported a healthy build while approximately 2.4 MB of avoidable assets shipped.

### 9. Make promotion consume the artifact that passed the gate

Workflow runtime versions, package engines and cache inputs will be aligned. Markdown-only filters will be removed because OpenSpec requirements are Markdown and must trigger validation. CI will invoke the same authoritative scripts used locally, upload the validated build once, and gate deployment on quality and security success. Workflow permissions will be scoped per job, and third-party actions will be pinned or otherwise covered by an explicit update policy.

Alternative considered: keep separate unchecked CI and CD builds. Rejected because rebuilding in a different job can change the dependency or artifact that was actually validated.

## Risks / Trade-offs

- [Browser projects increase install size and CI duration] -> Cache supported browser binaries, keep one comprehensive smoke journey per engine, and reserve the larger viewport matrix for Chromium unless an engine-specific defect requires expansion.
- [Asset-path consolidation can break production-only URLs] -> Verify root and subpath artifacts, crawl every first-party reference and keep canonical URLs in a separate tested configuration.
- [Higher coverage can encourage implementation-coupled tests] -> Assert observable outcomes and failure behavior; exclude only pure data or declarative icon maps with a documented reason.
- [Security headers differ by static host] -> Treat Vercel as the enforceable canonical deployment and clearly label GitHub Pages as a secondary host with documented limitations.
- [Removing tracked dependency files creates a large index diff] -> Limit the operation to `node_modules`, verify the resolved path and tracked-file count first, retain `.gitignore`, and prove a clean `npm ci` restores the environment.
- [Direct major upgrades can surface new lint or test behavior] -> Upgrade the lint/test toolchain in isolated steps, read migration notes and require the full gate after each compatibility boundary.
- [The working tree is already heavily modified] -> Use targeted patches, never reset or overwrite unrelated files, and report any overlap that cannot be resolved safely.

## Migration Plan

1. Capture the current diagnostic baseline and map every prior OpenSpec task to present code, missing behavior or pending evidence.
2. Clean repository dependency tracking, align Node and direct stable packages, regenerate the lockfile and restore a clean install.
3. Repair deterministic lint/unit/component gates and expand meaningful coverage before changing runtime behavior.
4. Consolidate assets and base-path handling, then validate root and subpath production artifacts against complete budgets.
5. Add browser, accessibility, keyboard, locale, storage-failure and responsive acceptance tests; fix discovered product defects within the existing contracts.
6. Move effective policies to production response configuration and refactor CI/CD to promote only the validated artifact.
7. Run the full release gate repeatedly from a clean dependency state, synchronize both active changes' task evidence, and strictly validate all OpenSpec artifacts.
8. Keep archiving as a separate reviewed action after implementation completion. Rollback is a targeted revert of this change's commits; no server or user-data migration is involved.
