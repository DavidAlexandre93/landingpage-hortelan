# Community Feedback Specification

## Purpose

Provide safe, transparent and accessible ways for visitors to contact Hortelan and keep optional feedback locally without implying server-side delivery.

## Requirements

### Requirement: Contact request handoff

The contact form SHALL validate a name, reply email, subject and message, then open an explicitly addressed email draft with encoded content; it SHALL clearly state that no message is sent automatically.

#### Scenario: Visitor submits valid contact data

- **WHEN** all required fields are valid and the visitor submits the form
- **THEN** the default email client opens a draft addressed to Hortelan and the interface announces the handoff

#### Scenario: Visitor submits invalid contact data

- **WHEN** a required field is empty or the email format is invalid
- **THEN** submission is prevented and the first invalid field receives an understandable error

### Requirement: Safe local community mural

The mural SHALL render visitor-provided values as text, enforce field length limits, store only validated entries locally, and never inject visitor-provided HTML into the document.

#### Scenario: Visitor publishes a valid entry

- **WHEN** the visitor provides a valid name, category and message
- **THEN** a timestamped entry appears in the mural and remains available after reload in that browser

#### Scenario: Visitor attempts markup injection

- **WHEN** an entry contains HTML or script-like characters
- **THEN** those characters are displayed as inert text and no markup executes

### Requirement: Resilient local data lifecycle

The mural SHALL tolerate unavailable or malformed local storage, allow individual removal, and allow the visitor to export valid entries as a JSON file.

#### Scenario: Stored data is corrupt

- **WHEN** persisted mural data cannot be parsed or does not match the accepted shape
- **THEN** the mural starts from an empty safe state and remains operable

#### Scenario: Visitor exports entries

- **WHEN** the visitor activates export with at least one valid entry
- **THEN** the browser downloads a UTF-8 JSON file containing only the normalized local entries

#### Scenario: Visitor removes an entry

- **WHEN** the visitor confirms removal of a mural entry
- **THEN** the item disappears from the view and local persistence

### Requirement: Frequently asked questions

The experience SHALL provide a keyboard-operable FAQ disclosure list covering product purpose, required hardware, automation safety, data handling and plan availability.

#### Scenario: Visitor expands a question

- **WHEN** the visitor activates an FAQ summary with pointer or keyboard input
- **THEN** the corresponding answer becomes available without changing pages
