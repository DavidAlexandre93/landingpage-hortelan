## Purpose

Define a single, clear and responsive institutional journey that explains Hortelan's value and connects visitors to the product's trusted channels.

## ADDED Requirements

### Requirement: Single canonical landing experience

The application SHALL render the complete institutional landing experience from one source of truth at `/` and SHALL normalize legacy entry paths without presenting a second implementation or a blocking splash.

#### Scenario: Visitor opens the canonical route

- **WHEN** a visitor opens `/`
- **THEN** the primary value proposition and main call to action are available in the first render

#### Scenario: Visitor opens a legacy route

- **WHEN** a visitor opens `/home`, `/splash`, or `/index.min.html`
- **THEN** the application normalizes the browser URL to `/` and displays the same landing experience

### Requirement: Complete product narrative

The landing SHALL present an understandable sequence covering the value proposition, operational proof, product capabilities, workflow, audience journeys, plans, frequently asked questions, contact channels and a closing call to action.

#### Scenario: Visitor evaluates the product

- **WHEN** a visitor follows the page from the hero to the final call to action
- **THEN** each section answers a distinct decision question without requiring access to the demo

### Requirement: Reliable navigation and calls to action

Primary navigation SHALL reach page sections without a full reload, and external demo, documentation, video and social links MUST identify their destination and use safe new-tab behavior where applicable.

#### Scenario: Keyboard user follows navigation

- **WHEN** a keyboard user activates a navigation item
- **THEN** focus moves to or remains logically associated with the requested section and the mobile menu closes

#### Scenario: Visitor opens an external destination

- **WHEN** a visitor activates an external call to action
- **THEN** the trusted destination opens with protection against opener access

### Requirement: Responsive presentation

The experience SHALL preserve content hierarchy, readable line length, usable controls and media integrity without horizontal page overflow from 320 CSS pixels through 1920 CSS pixels.

#### Scenario: Small-screen visitor browses the landing

- **WHEN** the viewport width is between 320 and 767 CSS pixels
- **THEN** navigation becomes an operable compact menu, cards stack, and all primary actions remain visible without horizontal scrolling

#### Scenario: Large-screen visitor browses the landing

- **WHEN** the viewport width is at least 1024 CSS pixels
- **THEN** the layout uses the available space while keeping paragraphs and interactive targets within readable bounds

### Requirement: User-controlled visual theme

The application SHALL offer light and dark themes, initialize from a saved preference or the operating-system preference, and persist an explicit user selection.

#### Scenario: Visitor changes theme

- **WHEN** the visitor activates the theme control
- **THEN** the theme changes immediately, the control communicates the new state, and the preference is restored on the next visit
