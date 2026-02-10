# Pitch Deck Platform — Single Source of Truth

This document is the **authoritative, continuously updated reference** for the
interactive pitch deck platform. It is intended to be used by any future agent,
engineer, or stakeholder as the definitive map of **what exists, how it is wired,
where to change things, and what remains**.

---

## 1) Mission & Product Scope

### Goal
Create a **production-grade, extensible, multi-business** interactive pitch deck
platform that can present investor-ready narratives and **editable projections**
for multiple businesses (tabs). The first business in scope is:

- **Mainland Truck & Trailer Sales & Leasing** (`mainland-truck`)

### Core Requirements
- Multi-business navigation (tabs), each business has its own pages.
- Section-level navigation per business (Overview, Market, Model, Operations,
  Projections, Charts, Assumptions, Appendix).
- Professional, modern UI with rich narratives, cards, and tables.
- Data-driven rendering from `data/businesses/<slug>/`.
- Editable projections and charting (next milestone).

---

## 2) Application Architecture (High-Level)

### Framework
- **Next.js (App Router)** with React 18.
- Pages live under `app/`.

### Core Layers
1. **Routing / Layout** — `app/layout.tsx`, per-business layouts in
   `app/business/[slug]/layout.tsx`.
2. **Data Loaders** — `lib/*` loads JSON/MD from `data/businesses/`.
3. **UI Components** — `components/*` grouped by domain.
4. **Business Data** — `data/businesses/*` contains canonical schemas.

---

## 3) Current Business Coverage (Mainland Truck)

### Business Registry
- `data/businesses/registry.ts` is the source for business navigation.
- Each business points to `metadata.json`.

### Mainland Truck Dataset
Path: `data/businesses/mainland-truck/`
- `metadata.json` — name, slug, industry, summary, location, stage, sections.
- `narrative.md` — section narratives (placeholders).
- `assumptions.json` — assumptions, risks, audit trail (placeholders).
- `projections.json` — metrics, drivers, scenarios (placeholders).
- `charts.json` — chart registry (includes chart explanations).
- `tables.json` — projection table registry (placeholders).
- `notes.md` — appendix and citation placeholders.

---

## 4) Page Map (All Implemented)

### Business Routes
- `app/business/[slug]/page.tsx` — business landing page + data readiness
- `app/business/[slug]/overview/page.tsx` — Executive Summary
- `app/business/[slug]/market/page.tsx` — Market & Opportunity
- `app/business/[slug]/model/page.tsx` — Business Model
- `app/business/[slug]/operations/page.tsx` — Operations
- `app/business/[slug]/projections/page.tsx` — Financial Projections
- `app/business/[slug]/charts/page.tsx` — Charts & Graphs
- `app/business/[slug]/assumptions/page.tsx` — Assumptions & Notes
- `app/business/[slug]/appendix/page.tsx` — Appendix

### Global Routes
- `app/page.tsx` — business landing page
- `app/layout.tsx` — global shell

---

## 5) Components Inventory (By Domain)

### Layout / Navigation
- `components/layout/AppShell.tsx`
- `components/layout/BusinessTabs.tsx`
- `components/layout/SubNav.tsx`
- `components/layout/SectionLayout.tsx`
- `components/layout/EmptyState.tsx`

### Overview
- `components/narrative/BusinessSnapshot.tsx`
- `components/overview/LeadershipHighlights.tsx`
- `components/overview/TractionMilestones.tsx`
- `components/overview/DataReadinessCards.tsx`

### Market
- `components/market/MarketSignalCards.tsx`
- `components/market/SegmentHighlights.tsx`
- `components/market/CompetitivePositioning.tsx`

### Business Model
- `components/model/RevenueStreams.tsx`
- `components/model/GoToMarketSteps.tsx`
- `components/model/UnitEconomicsHighlights.tsx`

### Operations
- `components/operations/OperationalFocusCards.tsx`
- `components/operations/ExecutionTimeline.tsx`

### Projections
- `components/projections/ProjectionSummaryCards.tsx`
- `components/projections/ProjectionTable.tsx`
- `components/projections/ProjectionTables.tsx`
- `components/projections/ScenarioSelector.tsx`
- `components/projections/ProjectionInsights.tsx`
- `components/narrative/MetricHighlights.tsx`

### Charts
- `components/charts/ChartsGrid.tsx`
- `components/charts/ChartDefinitionsTable.tsx`
- `components/charts/ChartPreview.tsx`

### Assumptions
- `components/assumptions/AssumptionSummaryCards.tsx`
- `components/assumptions/AssumptionTable.tsx`
- `components/assumptions/AssumptionEditor.tsx`
- `components/assumptions/RiskRegister.tsx`
- `components/assumptions/AuditTrail.tsx`

### Appendix
- `components/narrative/SourceList.tsx`

---

## 6) Data Loaders & Utilities

### Loaders
- `lib/businessData.ts` — business metadata + narrative loader
- `lib/chartsData.ts` — chart registry loader
- `lib/tablesData.ts` — table registry loader
- `lib/projectionsData.ts` — projections + completeness calculator
- `lib/assumptionsData.ts` — assumptions + summary calculator

### Utilities
- `lib/formatters.ts` — currency, percent, numeric formatting
- `lib/types.ts` — all shared TypeScript types

---

## 7) Styling System

- **Global stylesheet**: `app/globals.css`
- Includes:
  - Page shell + typography
  - Card patterns
  - Summary grids
  - Lists, tables
  - Timeline, segment, stream, GTM, leadership, milestone, risk, audit styles
  - Competitive positioning styles for market view
  - Scenario selector + projection insights styles
  - Chart preview styling for charts view
  - Assumption editor styles

---

## 8) Documentation & Tracking

- `docs/PROJECT_PLAN.md` — milestones and scope planning
- `docs/DATA_SCHEMA.md` — canonical schema for data files
- `docs/BUSINESS_INDEX.md` — per-business status tracker
- `docs/DECISIONS.md` — architecture decisions
- `docs/CHANGELOG.md` — change history
- `docs/STATUS.md` — current status summary
- `docs/FINAL_READINESS.md` — final checklist before investor demo
- `docs/INGESTION_GUIDE.md` — step-by-step data ingestion workflow
- **This file:** `docs/SOURCE_OF_TRUTH.md` (authoritative reference)

---

## 9) What’s Missing / Next Steps (Critical)

### Data Ingestion (Highest Priority)
- Parse `README.pdf`, `Mainland Truck-12 page (1).docx`,
  `MTTS Rentals & Sales Projections (1).docx`.
- Populate:
  - `data/businesses/mainland-truck/assumptions.json`
  - `data/businesses/mainland-truck/projections.json`
  - `data/businesses/mainland-truck/charts.json`
  - `data/businesses/mainland-truck/tables.json`
  - `data/businesses/mainland-truck/notes.md`

### Interactivity
- Editable assumptions with validation.
- Projection recomputation and live chart updates.
- Persistence layer (local storage or API route).

### Charts
- Real chart components (line, bar, stacked, etc.) wired to projections.

### QA & Release
- Run `npm run build` and `npm run lint` locally.
- Manual UI review and screenshot capture for investor demo.

---

## 10) Development Rules (Operating Protocol)

- **Every new change** must update this file if it alters architecture,
  components, data schema, or project status.
- Keep additions **production-grade**, forward-looking, and consistent with the
  existing design system.
- Prefer data-driven changes (JSON/MD) over hardcoded values once ingestion is
  underway.

---

## 11) Quick Orientation for New Agents

If you are new to this repo:
1. Start here: `docs/SOURCE_OF_TRUTH.md` (this file).
2. Review `docs/PROJECT_PLAN.md` and `docs/DATA_SCHEMA.md`.
3. Inspect `data/businesses/mainland-truck/*` to see schemas.
4. Look at `app/business/[slug]/` pages to see how layout + data is wired.
5. Build data ingestion next; UI scaffolding already exists.
