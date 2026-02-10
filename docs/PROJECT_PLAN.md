# Project Plan: Interactive Multi-Business Pitch Deck

## Purpose
Build a production-grade, extensible web application that presents multiple business pitch decks with editable projections, interactive charts, and professional narrative content. Each business is a first-class entity with its own data, pages, and visualizations.

## Guiding Principles
- **Data-driven**: Content and charts are driven by structured data files, not hardcoded UI.
- **Extensible**: Adding a new business should be as simple as copying a template data folder and registering metadata.
- **Professional**: The presentation must meet investor-grade design expectations.
- **Traceable**: Every page and component is tracked and mapped to data sources.

## Milestones
1. **Project Tracking Backbone**
   - Create documentation for plan, changelog, decisions, and business index.
2. **Canonical Data Schema**
   - Define JSON schemas and data templates for assumptions, projections, charts, and narrative blocks.
3. **Global Layout & Navigation**
   - Implement app shell, business tabs, and section navigation.
4. **Business 1: Mainland Truck & Trailer Sales & Leasing**
   - Complete all pages end-to-end using canonical schema.
5. **Editing & Persistence**
   - Enable editable projections with validation and storage.
6. **Polish & QA**
   - Refine visual design, performance, and responsiveness.

## Page Inventory (Per Business)
- Overview / Executive Summary
- Market & Opportunity
- Business Model
- Operations
- Financial Projections (editable)
- Charts & Graphs
- Assumptions & Notes
- Appendix / Sources

## Deliverable Map
| Deliverable | Output | Owner | Status |
| --- | --- | --- | --- |
| Project Plan | `docs/PROJECT_PLAN.md` | Lead Engineer | In Progress |
| Changelog | `docs/CHANGELOG.md` | Lead Engineer | In Progress |
| Architecture Decisions | `docs/DECISIONS.md` | Lead Engineer | In Progress |
| Business Index | `docs/BUSINESS_INDEX.md` | Lead Engineer | In Progress |

## Success Criteria
- Each business is fully isolated in data and UI.
- Projections can be edited and reflected in charts instantly.
- All pages render with consistent, professional styling.
- New business onboarding is documented and repeatable.
