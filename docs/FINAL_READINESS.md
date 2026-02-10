# Final Readiness Checklist

Use this checklist before an investor demo or handoff. It records the last-mile
steps required to validate functionality, data, and presentation quality.

## 1) Data Ingestion (Required)
- Populate `data/businesses/mainland-truck/assumptions.json` with real values.
- Populate `data/businesses/mainland-truck/projections.json` with real values.
- Populate `data/businesses/mainland-truck/charts.json` with chart definitions.
- Populate `data/businesses/mainland-truck/tables.json` with projection tables.
- Populate `data/businesses/mainland-truck/notes.md` with citations.

## 2) Build + Lint
- `npm install`
- `npm run build`
- `npm run lint`

## 3) Manual UI Review
- Verify navigation across all sections for Mainland Truck.
- Confirm narrative layout, cards, and tables render correctly.
- Validate empty states are hidden once data is populated.
- Review typography and spacing for investor polish.

## 4) Projection Interactivity (Next Milestone)
- Add editable assumptions and persistence.
- Recompute projection tables and chart outputs in real time.
- Validate inputs and provide reset-to-default functionality.

## 5) Demo Preparation
- Capture screenshots of each section once data is populated.
- Prepare a short walkthrough of the projections and assumptions flow.

## Owner Notes
- This checklist should be updated when the interactive projection engine is
  implemented and charts are wired to real data.
