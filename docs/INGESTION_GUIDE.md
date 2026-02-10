# Data Ingestion Guide

This guide explains how to convert the source documents into structured data
files under `data/businesses/mainland-truck/`.

## Source Files
- `README.pdf`
- `Mainland Truck-12 page (1).docx`
- `MTTS Rentals & Sales Projections (1).docx`

## Target Files
- `assumptions.json` — assumptions, risks, audit trail
- `projections.json` — metrics, drivers, scenarios
- `charts.json` — chart registry
- `tables.json` — projection tables
- `notes.md` — citations and appendix notes

## Workflow
1. Extract financial tables and assumptions from the source documents.
2. Normalize metrics to the schema in `docs/DATA_SCHEMA.md`.
3. Populate projections in annual values aligned to the timeframe.
4. List chart definitions and map them to projection metrics.
5. Capture citation references in `notes.md`.

## Validation Checklist
- Every metric has a value for each year in the timeframe.
- Assumptions include units and source notes.
- Charts reference valid metric IDs.
- Tables only reference metrics that exist in projections.
