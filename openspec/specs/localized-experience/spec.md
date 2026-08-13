# Localized Experience Specification

## Purpose

Ensure the institutional experience is understandable and operable in Portuguese, English, Spanish and French without delaying or destabilizing the first render.

## Requirements

### Requirement: Deterministic language resolution

The application SHALL resolve the initial language from a valid saved preference, then from the browser language, and finally fall back to Brazilian Portuguese, without making an external network request.

#### Scenario: Returning visitor has a supported saved language

- **WHEN** a valid language code exists in local storage
- **THEN** the application renders that language on the first usable view

#### Scenario: Language cannot be resolved

- **WHEN** neither saved nor browser language matches a supported language
- **THEN** the application renders Brazilian Portuguese

### Requirement: Complete and accessible language switching

The language control SHALL expose pt-BR, en, es and fr, indicate the current choice, update the document language, and translate all decision-critical content and interactive labels.

#### Scenario: Visitor selects another language

- **WHEN** the visitor chooses a supported language
- **THEN** visible marketing content, form labels, navigation labels, accessible control names and `html[lang]` update without a page reload

### Requirement: Persisted language preference

An explicit language selection MUST be stored locally and MUST remain valid across application versions; malformed or unsupported stored values SHALL be ignored safely.

#### Scenario: Stored language value is malformed

- **WHEN** the application reads a value outside the supported language set
- **THEN** it ignores the value and continues with browser-language resolution without throwing an error
