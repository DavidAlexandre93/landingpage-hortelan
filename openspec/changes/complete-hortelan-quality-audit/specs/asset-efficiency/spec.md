## Purpose

Keep the landing experience visually rich while enforcing transparent budgets for the complete initial transfer and every media file shipped in the production artifact.

## ADDED Requirements

### Requirement: Complete payload budget

The production budget MUST account for initial JavaScript and stylesheet gzip sizes, initial HTML and media transfer, and total raw artifact size. The initial first-party transfer SHALL remain at or below 350 KiB and the complete deployable artifact SHALL remain at or below 750 KiB, excluding only explicitly documented host metadata that is not served to visitors.

#### Scenario: Fresh production build is measured

- **WHEN** the budget tool evaluates a clean production artifact
- **THEN** it reports JavaScript, CSS, HTML, initial media and total artifact sizes and exits successfully only when every threshold is met

#### Scenario: Uncounted public asset is added

- **WHEN** a file is emitted outside the hashed asset graph
- **THEN** its bytes still contribute to the total artifact budget and to the initial budget if referenced by the first page

### Requirement: Individual asset limits

Every production image or icon MUST have a declared purpose and appropriate format and dimensions; the principal dashboard image MUST remain at or below 250 KiB, each shipped logo or favicon variant SHALL remain at or below 50 KiB, and the social preview SHALL remain at or below 100 KiB.

#### Scenario: Oversized media is introduced

- **WHEN** an emitted image exceeds its applicable individual limit
- **THEN** the budget fails with the asset path, measured size and limit

### Requirement: No redundant asset delivery

The production artifact MUST NOT ship unused legacy brand files or byte-identical media copies, and a source image processed into a hashed build asset SHALL NOT also be copied under a second runtime path unless both public URLs are an explicit compatibility requirement.

#### Scenario: Dashboard asset is built

- **WHEN** the principal dashboard image is referenced by the application build graph
- **THEN** exactly one visitor-facing copy is emitted and every application reference resolves to it

### Requirement: Loading-priority integrity

The above-the-fold product proof SHALL reserve intrinsic dimensions and receive deliberate loading priority, while optional third-party media and below-the-fold assets MUST remain deferred until needed. Optimization MUST preserve meaningful alternative text and avoid a visible layout shift.

#### Scenario: Initial page loads

- **WHEN** the browser requests the first view
- **THEN** the principal proof reserves its layout box, optional video content is not fetched, and no duplicate high-priority request is generated for the same image
