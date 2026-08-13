## Context

The repository currently serves a React splash that redirects to a hand-maintained static landing. Marketing copy, localization, behavior, styling and SEO are therefore split across unrelated files. The legacy mural writes interpolated visitor data through `innerHTML`, language detection performs an avoidable IP lookup, and the project has known tablet overflow and incomplete functional coverage. See `proposal.md` for motivation and the four capability specs for the behavioral contract.

The deliverable must remain a backend-free static build that works on GitHub Pages/Vercel-style hosting and preserves Hortelan's existing trusted external destinations.

## Goals / Non-Goals

**Goals:**

- Establish one React render tree and one content catalog as the product source of truth.
- Make layout, preferences and form behavior deterministic and testable through pure domain utilities plus focused components.
- Produce static metadata and a small first load while retaining a polished branded experience.
- Make OpenSpec validation part of the normal local and CI workflow.

**Non-Goals:**

- Build a backend, deliver email, synchronize mural entries across devices or add authentication.
- Redesign the linked Hortelan dashboard or assert unverified production metrics.
- Introduce a general-purpose component library or CSS-in-JS runtime.

## Decisions

### 1. One React application with route normalization

`src/main.jsx` will render a single `App` for every SPA entry. A small route normalizer will replace legacy landing paths with `/`; no router dependency is required because this is a one-page document whose internal navigation uses anchors.

Alternative considered: keep `/splash` and `/index.min.html` as separate experiences. Rejected because it preserves duplicated behavior, delays content and increases the test/deploy surface.

### 2. Feature-oriented modules around a shared content catalog

The source tree will separate application composition, marketing sections, preferences, localization, feedback domain logic and shared UI/icons. Translation catalogs will contain strings and structured section data; external URLs will live in a single configuration module. Components receive data and callbacks rather than reading unrelated globals.

Alternative considered: one large landing component. Rejected because it recreates the monolith that made the static implementation difficult to review and test.

### 3. React state plus defensive storage adapters

Theme, language and mural state will initialize synchronously from small safe readers with explicit schemas and fallbacks. User content is rendered by React text nodes. Storage failures are caught and treated as non-persistent mode. Contact submission uses a generated `mailto:` URL and native constraint validation, with a visible status announcement.

Alternative considered: retain DOM querying and template strings. Rejected because React already owns the document subtree and mixed ownership makes security and state synchronization worse.

### 4. CSS design system without a UI runtime

Global tokens define color, type scale, space, radii, shadows and motion. Component class names remain semantic, layouts are mobile-first, and dark theme overrides tokens through `data-theme`. Decorative visuals use CSS and compact inline SVG icons; the real dashboard capture remains the principal product proof image.

Alternative considered: add a component framework or animation library. Rejected to protect the bundle budget, avoid generic styling and keep motion optional through CSS media queries.

### 5. Static-first SEO and restrictive browser policy

Core SEO/Open Graph/Twitter/JSON-LD metadata will live in root `index.html`; the client only updates language-sensitive title/description. A CSP meta policy will permit same-origin assets, the required YouTube embed and HTTPS mail/navigation while blocking object and frame ancestors. Referrer and permissions policies will be declared in the document.

Alternative considered: inject all metadata after mount. Rejected because crawlers and social scrapers do not reliably execute the application.

### 6. Real quality tooling and explicit budgets

ESLint, Prettier and Vitest replace repository-specific syntax scripts. Tests cover language resolution, preferences, storage normalization, safe mural behavior and main component flows. A Node build-budget script reads emitted assets. `quality:gate` runs OpenSpec strict validation before lint, format, coverage, build and budget; dependency audit remains separate in `ci` so network-related failures are visible.

Alternative considered: extend the custom scripts. Rejected because they cannot provide semantic JSX rules, component tests or ecosystem-standard editor/CI integration.

### 7. Asset and legacy migration

The optimized public SVG is used for inline brand presentation and the existing dashboard/OG media remain source assets copied by Vite. The static `public/index.min.html`, root `app.js`, root `styles.css` and obsolete splash modules are removed after the React equivalent is complete. Local keys `hortelan_lang` and `hortelan_faq` remain readable; invalid records are discarded item-by-item.

## Risks / Trade-offs

- [Legacy hosting may request physical `index.min.html`] -> normalize known SPA paths and document the new canonical root; keep rollback available from the previous Git revision.
- [CSP meta tags cannot express every HTTP-header protection] -> ship compatible meta policies and document recommended deployment headers for hosts that support them.
- [A `mailto:` handoff depends on a configured email client] -> provide the visible address as a direct alternative and state that submission is not automatic.
- [Four complete locales increase catalog maintenance] -> keep one typed-by-convention catalog shape and test that every locale matches the Portuguese key structure.
- [Toolchain upgrades can raise the minimum Node version] -> pin an engine range and use the same supported Node major in CI.

## Migration Plan

1. Add OpenSpec artifacts and new quality configuration without changing production rendering.
2. Build the React content catalog, domain utilities, components and styles behind the root entry.
3. Replace the legacy redirects, then remove duplicate static/runtime files and unused dependencies.
4. Validate stored-language and stored-mural compatibility, internal anchors and trusted external URLs.
5. Run strict OpenSpec validation, tests, coverage, production build, budgets, audit and responsive visual checks.
6. Archive the completed change so delta specifications become the project baseline.

Rollback is a repository-level revert to the last pre-consolidation revision; no server data migration is involved.
