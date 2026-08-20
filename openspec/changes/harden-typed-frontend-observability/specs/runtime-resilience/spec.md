## Purpose

Keep the institutional experience understandable, accessible and recoverable when rendering, browser capabilities or individual visitor actions fail.

## ADDED Requirements

### Requirement: Global render failure containment

The application MUST contain uncaught render failures at the application boundary and replace the failed tree with a localized, branded and accessible recovery experience instead of a blank or technically detailed screen.

#### Scenario: Application render fails

- **WHEN** an uncaught exception escapes the rendered application tree
- **THEN** the visitor sees a service-unavailable heading, concise non-technical guidance, a diagnostic identifier, retry and safe-home actions, while exception details remain hidden

#### Scenario: Recovery succeeds

- **WHEN** the visitor activates retry after a transient render failure
- **THEN** the application attempts a clean rerender, restores a usable document focus target and announces the recovered state

### Requirement: Recoverable action error handling

Expected failures in storage, export, contact handoff, optional media and preference actions MUST be converted to typed outcomes and shown near the initiating control without discarding valid in-memory state.

#### Scenario: Local persistence fails

- **WHEN** the browser denies or exhausts durable storage during an otherwise valid mural action
- **THEN** the entry remains available for the current session, the interface states that it was not saved permanently and a safe retry path is offered

#### Scenario: Optional external action fails

- **WHEN** a media or mail handoff cannot be opened
- **THEN** the triggering section displays an accessible alternative action and the rest of the page remains interactive

### Requirement: Honest client health diagnostics

The frontend SHALL derive a local health snapshot from application initialization, required public configuration and browser capabilities, and MUST distinguish healthy, degraded and unavailable states without claiming server or database health.

#### Scenario: Optional capability is unavailable

- **WHEN** durable storage or telemetry export is unavailable but core content can render
- **THEN** health is `degraded`, affected features explain the limitation and primary marketing content remains available

#### Scenario: Critical initialization fails

- **WHEN** required application configuration or the root render path cannot initialize safely
- **THEN** health is `unavailable`, the recovery experience is rendered and its diagnostic identifier correlates with one sanitized error event

### Requirement: Inclusive recovery presentation

All global and local failure states MUST meet the existing accessibility, localization, responsive, theme, forced-color and reduced-motion contracts and SHALL provide a visually cohesive presentation at supported viewport widths.

#### Scenario: Failure screen is viewed with assistive preferences

- **WHEN** the recovery experience renders with reduced motion, forced colors or keyboard-only input
- **THEN** content remains readable, focus is visible, status is announced and every recovery action is operable without animation dependency

#### Scenario: Failure screen is viewed in each locale

- **WHEN** a previously selected supported locale can be recovered safely
- **THEN** all visitor-facing recovery labels and instructions use that locale with no raw error code substituted for guidance
