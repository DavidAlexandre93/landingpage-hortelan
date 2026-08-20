## MODIFIED Requirements

### Requirement: Resilient local data lifecycle

The mural SHALL persist validated entries in a versioned transactional local store, tolerate unavailable, malformed or quota-exhausted storage, preserve supported legacy data, allow individual removal, and allow the visitor to export valid entries as a JSON file.

#### Scenario: Stored data is corrupt

- **WHEN** persisted mural data cannot be parsed or does not match a recognized schema
- **THEN** the mural preserves the original value where possible, starts from an empty safe state and remains operable without exposing raw storage content

#### Scenario: Supported legacy data is found

- **WHEN** valid entries exist in the previous local-storage format
- **THEN** one migration transaction writes the current schema without duplicating entries or removing the recoverable legacy source before verification

#### Scenario: Visitor exports entries

- **WHEN** the visitor activates export with at least one valid entry
- **THEN** the browser downloads a UTF-8 JSON file containing only the normalized local entries and the current schema version

#### Scenario: Visitor removes an entry

- **WHEN** the visitor confirms removal of a mural entry
- **THEN** the item and its durable index are removed in one local transaction and the view reflects the committed result

#### Scenario: Durable storage is unavailable

- **WHEN** the browser denies, aborts or exhausts the transactional store
- **THEN** the mural continues in memory, reports degraded durability and never claims that an uncommitted operation was saved

## ADDED Requirements

### Requirement: Idempotent mural commands

Every mural mutation MUST carry a unique command identifier and execute atomically with its idempotency record within the browser's transactional guarantees; replaying a completed command SHALL return its prior outcome without duplicating or reapplying the mutation.

#### Scenario: Create command is retried

- **WHEN** the same valid create command is submitted more than once
- **THEN** exactly one mural entry exists and each invocation resolves to the same logical result

#### Scenario: Transaction aborts

- **WHEN** persistence aborts before both the mutation and idempotency record commit
- **THEN** neither record is reported as committed and a retry can safely execute the complete command

#### Scenario: Multiple tabs update the mural

- **WHEN** two tabs issue different valid commands against the same local database
- **THEN** each committed transaction remains internally consistent and the visible list converges after browser change notification

### Requirement: Bounded local transactional semantics

The application MUST document that atomicity, consistency, isolation and durability apply only to a completed transaction in the visitor's browser profile and SHALL NOT imply server replication, backup, distributed consistency or durability beyond browser guarantees.

#### Scenario: Visitor inspects data handling guidance

- **WHEN** the mural explains where entries are kept
- **THEN** it accurately states the device-local scope, fallback behavior and absence of server synchronization
