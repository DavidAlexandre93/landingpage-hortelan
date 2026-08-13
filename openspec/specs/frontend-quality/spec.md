# Frontend Quality Specification

## Purpose

Establish measurable accessibility, security, performance, discoverability and SDD governance guarantees for every production version of the landing page.

## Requirements

### Requirement: WCAG-oriented interaction baseline

The application MUST use semantic landmarks and headings, provide a skip link and visible focus, expose meaningful accessible names, maintain at least 44 by 44 CSS pixel primary touch targets, and avoid relying on color alone.

#### Scenario: Visitor uses only a keyboard

- **WHEN** the visitor traverses and operates the page without a pointer
- **THEN** all interactive controls are reachable in logical order, visibly focused and operable without a keyboard trap

#### Scenario: Visitor requests reduced motion

- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** non-essential movement and smooth scrolling are disabled while all content remains available

### Requirement: Discoverable document metadata

The production document SHALL provide a valid title, description, canonical URL, social preview metadata, theme color, favicon and Organization structured data before client-side JavaScript executes.

#### Scenario: Crawler reads the built HTML

- **WHEN** a crawler reads the production `index.html` without executing JavaScript
- **THEN** all required metadata and valid JSON-LD are present with Hortelan's production URLs

### Requirement: Browser security and privacy baseline

The application MUST avoid dynamic HTML injection, automatic geolocation-by-IP requests and secret-bearing client code; it SHALL apply restrictive browser policies compatible with required media and SHALL use safe external links.

#### Scenario: Application loads for a new visitor

- **WHEN** the initial page is requested
- **THEN** no request for IP geolocation is made and no visitor-provided content is interpreted as markup

### Requirement: Performance budget

The production build SHALL keep initial application JavaScript at or below 150 KiB gzip and stylesheet output at or below 50 KiB gzip, lazy-load non-critical media, reserve media dimensions and avoid runtime dependencies that only support decorative effects.

#### Scenario: Production assets are validated

- **WHEN** the performance budget check evaluates the Vite manifest and built assets
- **THEN** it fails the quality gate if either initial budget is exceeded

### Requirement: Automated quality gate

Every change SHALL pass formatting, static analysis, unit/component tests, defined coverage thresholds, production build, performance budget, high-severity dependency audit and strict OpenSpec validation.

#### Scenario: A required validation fails

- **WHEN** any quality command exits unsuccessfully
- **THEN** the aggregate quality gate exits unsuccessfully and CI blocks promotion

### Requirement: Versioned SDD lifecycle

Behavioral changes MUST be represented by an OpenSpec proposal, capability specifications, design decisions and executable tasks before implementation is archived into the baseline specifications.

#### Scenario: Maintainer inspects an active change

- **WHEN** the OpenSpec status command is run for the change
- **THEN** proposal, specifications, design and task progress are discoverable from versioned project files
