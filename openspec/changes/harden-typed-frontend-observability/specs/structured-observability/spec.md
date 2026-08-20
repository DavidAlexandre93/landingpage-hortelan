## Purpose

Provide actionable, correlated and privacy-safe browser diagnostics in structured JSON with optional OpenTelemetry delivery and no impact on the visitor journey.

## ADDED Requirements

### Requirement: Stable structured diagnostic events

Application diagnostics MUST use a versioned JSON event contract containing an ISO timestamp, enumerated severity, stable event name, deployment context, application version and a correlation identifier; arbitrary free-form context SHALL NOT be accepted.

#### Scenario: Diagnostic event is emitted

- **WHEN** an application lifecycle or recoverable failure event is recorded
- **THEN** the serialized output is valid JSON, satisfies the event schema and can be filtered by severity, event name, release and correlation identifier

#### Scenario: Unsupported field is supplied

- **WHEN** a caller attempts to attach a field outside the event-specific allowlist
- **THEN** validation rejects or discards that field before any sink receives the event

### Requirement: Actionable exception diagnostics

Captured exceptions MUST include a stable error code, exception type, sanitized message, redacted complete stack trace, responsible component/module/class label, and file, line and column when the browser provides them; active trace and span identifiers MUST be attached when available.

#### Scenario: Render failure is captured

- **WHEN** a component throws during rendering
- **THEN** one correlated error event identifies the responsible UI boundary and includes the available exception and source-location details before recovery UI is shown

#### Scenario: Source location is unavailable

- **WHEN** the runtime does not expose a file, line or column
- **THEN** the event remains schema-valid, marks unavailable location fields explicitly and retains the error code, owner and correlation identifier

### Requirement: PII-safe collection

Observability MUST deny by default and SHALL never collect names, email addresses, contact messages, mural content, storage values, IP addresses, full URLs containing query or fragment data, browser fingerprints, credentials or arbitrary DOM text.

#### Scenario: Error input contains visitor data

- **WHEN** an exception message or metadata contains an email, form value, token-like value or URL query
- **THEN** the redaction pipeline removes or irreversibly masks it before console, memory or remote sinks receive the event

#### Scenario: Contact and mural journeys are observed

- **WHEN** diagnostic events are produced while a visitor uses either feedback flow
- **THEN** only allowlisted operational outcome codes and timings are present, with no visitor-authored value

### Requirement: Opt-in OpenTelemetry delivery

Remote export MUST be disabled by default and MAY activate only for an approved public collector configured at build time; exporter code SHALL load outside the initial critical path, use bounded in-memory batching and never persist telemetry in browser storage.

#### Scenario: Export is enabled

- **WHEN** validated deployment configuration enables the collector and the privacy disclosure is present
- **THEN** schema-valid records are correlated and exported through OpenTelemetry without adding secret credentials to the client bundle

#### Scenario: Collector is unavailable

- **WHEN** export times out, is blocked by browser policy or returns a failure
- **THEN** the exporter drops or retries within its bounded policy, records no recursive failure loop and does not interrupt application behavior

### Requirement: Observability lifecycle control

The application MUST flush pending error diagnostics during supported page lifecycle transitions, cap queue size and event size, and expose deterministic test sinks so telemetry behavior can be verified without network access.

#### Scenario: Queue reaches its bound

- **WHEN** more diagnostic records are produced than the configured in-memory capacity
- **THEN** the documented discard policy is applied and the visitor journey remains responsive

#### Scenario: Automated test captures diagnostics

- **WHEN** a test injects a deterministic in-memory sink and triggers an error
- **THEN** it can assert the exact sanitized event contract without contacting an external service
