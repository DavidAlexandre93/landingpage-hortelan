## Purpose

Guarantee that the complete institutional journey remains usable, localized, accessible and stable in real browser engines across supported viewports and failure conditions.

## ADDED Requirements

### Requirement: Cross-browser critical journey

The production application MUST complete its critical navigation, language, theme, contact and local-mural journeys without uncaught errors in current Chromium, Firefox and WebKit engines, with automated smoke coverage on desktop and mobile viewports.

#### Scenario: Visitor completes the primary journey

- **WHEN** an automated visitor opens the production build, navigates to each primary section, changes preferences and exercises both feedback flows
- **THEN** the expected content and status feedback appear without an uncaught page error, failed same-origin asset request or unexpected console error

#### Scenario: Browser engine differs

- **WHEN** the smoke journey runs in each supported engine
- **THEN** all functional assertions pass with equivalent outcomes

### Requirement: Responsive integrity

The page SHALL preserve readable content, complete controls and media integrity without document-level horizontal overflow at representative widths spanning 320 through 1920 CSS pixels, and primary pointer targets MUST be at least 44 by 44 CSS pixels unless an accepted WCAG spacing exception applies.

#### Scenario: Responsive matrix is evaluated

- **WHEN** the production page is rendered at 320, 375, 768, 1024, 1440 and 1920 CSS pixel widths
- **THEN** no page-level horizontal overflow, clipped decision-critical content, overlapping control or unusable primary target is detected

#### Scenario: Mobile navigation is operated

- **WHEN** a keyboard or touch visitor opens, uses and dismisses the compact navigation
- **THEN** expansion state is announced, Escape closes it, focus returns predictably, and the selected section remains logically focused

### Requirement: Automated accessibility baseline

Every release MUST have zero serious or critical automated accessibility violations on the initial page and key interactive states, while keyboard checks SHALL cover the skip link, navigation, FAQ, preference controls, forms, validation focus and dynamic announcements in a logical order.

#### Scenario: Accessibility scanner checks key states

- **WHEN** the initial view, open mobile menu, expanded FAQ, invalid form and populated mural are scanned
- **THEN** no serious or critical violation is reported and each dynamic state retains an accessible name and relationship

#### Scenario: Visitor uses only a keyboard

- **WHEN** the visitor traverses and activates the complete critical journey without a pointer
- **THEN** every interactive control is reachable, visibly focused, operable and free of keyboard traps

### Requirement: Locale and preference resilience

The application SHALL render complete decision-critical content in pt-BR, en, es and fr, SHALL persist explicit valid language and theme selections, and MUST remain operable with unavailable, malformed or quota-exceeded storage.

#### Scenario: Each supported locale is selected

- **WHEN** a visitor selects each supported language in turn
- **THEN** headings, navigation, forms, accessible labels, document title, description and `html[lang]` match that locale without reload

#### Scenario: Persistence is unavailable

- **WHEN** storage reads or writes throw an exception
- **THEN** language, theme and mural interactions continue in memory and the interface does not claim durable persistence when it did not occur

### Requirement: Motion and visual-preference safety

The application MUST honor reduced-motion and forced-color preferences without hiding content or removing focus indication, and both light and dark themes SHALL preserve readable contrast and stable layout.

#### Scenario: Reduced motion is requested

- **WHEN** the browser reports `prefers-reduced-motion: reduce`
- **THEN** non-essential animation and smooth scrolling are disabled while every journey remains available

#### Scenario: Theme changes

- **WHEN** the visitor switches between light and dark themes at any supported width
- **THEN** the control announces the next action, layout dimensions remain stable and decision-critical content remains readable

### Requirement: Network and content safety in browser

Initial rendering MUST avoid undeclared third-party requests, MUST defer optional embedded media until visitor intent, and SHALL render visitor-controlled mural values as inert text in every supported browser.

#### Scenario: Initial network is observed

- **WHEN** a new visitor loads the production page without activating external media
- **THEN** only declared first-party assets are requested and no IP-geolocation, analytics or video embed request occurs

#### Scenario: Markup-like mural content is entered

- **WHEN** a visitor saves HTML- or script-like characters in the local mural
- **THEN** the exact characters are displayed as text and no new executable or image element is created
