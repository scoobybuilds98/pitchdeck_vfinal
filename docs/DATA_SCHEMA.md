# Data Schema

This document defines the canonical data schema for each business deck. Each business lives under `data/businesses/<slug>/`.

## Folder Structure
```
/data/businesses/<slug>/
  metadata.json
  narrative.md
  assumptions.json
  projections.json
  charts.json
  tables.json
  notes.md
```

## metadata.json
Business identity and section configuration.

**Fields**
- `name` (string): Business display name.
- `slug` (string): URL-friendly identifier.
- `industry` (string): Industry category.
- `summary` (string): Short executive summary.
- `location` (string): Primary operating region.
- `stage` (string): Growth stage (e.g., Seed, Growth).
- `lastUpdated` (string): ISO date string.
- `sections` (array): Ordered list of deck sections with `slug`, `label`, `description`.

## narrative.md
Markdown file containing narrative blocks for each section. Use H2 headings for section titles and paragraphs beneath each section.

## assumptions.json
Tracks assumptions, risks, and an audit trail.

**Fields**
- `assumptions` (array): `{ id, category, label, value, unit, notes }`.
- `risks` (array): `{ id, label, mitigation }`.
- `auditTrail` (array): `{ date, author, change, rationale }`.

## projections.json
Holds projection series, drivers, and scenario definitions.

**Fields**
- `currency` (string): ISO currency code.
- `timeframe` (object): `{ startYear, endYear, frequency }`.
- `metrics` (array): `{ id, label, format, values }`.
- `drivers` (array): `{ id, label, format, values }`.
- `scenarios` (array): `{ id, label, description }`.

## charts.json
Defines chart registry entries.

**Fields**
- `charts` (array): `{ id, title, type, metrics, notes }`.

## tables.json
Defines table registry entries.

**Fields**
- `tables` (array): `{ id, title, metrics, notes }`.

## notes.md
Freeform notes, citations, and references not captured elsewhere.
