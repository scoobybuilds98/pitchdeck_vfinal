import Link from "next/link";
import { notFound } from "next/navigation";
import DataReadinessCards from "../../../components/overview/DataReadinessCards";
import { businessRegistry } from "../../../data/businesses/registry";
import {
  getAssumptionSummary,
  loadAssumptionData,
} from "../../../lib/assumptionsData";
import {
  buildProjectionYears,
  getProjectionCompleteness,
  loadProjectionData,
} from "../../../lib/projectionsData";

export default async function BusinessPage({
  params,
}: {
  params: { slug: string };
}) {
  const business = businessRegistry.find((item) => item.slug === params.slug);

  if (!business) {
    notFound();
  }

  const assumptionData = await loadAssumptionData(business.slug);
  const assumptionSummary = getAssumptionSummary(assumptionData);
  const projectionData = await loadProjectionData(business.slug);
  const projectionYears = buildProjectionYears(projectionData);
  const projectionCompleteness = getProjectionCompleteness(
    projectionData,
    projectionYears
  );

  const readinessCards = [
    {
      label: "Assumptions",
      value: `${assumptionSummary.totalAssumptions}`,
      detail: "Assumptions documented",
    },
    {
      label: "Projection Coverage",
      value: `${projectionCompleteness.percent}%`,
      detail: `${projectionCompleteness.filled} of ${projectionCompleteness.total} values filled`,
    },
    {
      label: "Scenarios",
      value: `${projectionData.scenarios.length}`,
      detail: "Projection scenarios defined",
    },
  ];

  return (
    <main className="page-shell">
      <section className="card hero">
        <span className="badge">{business.industry}</span>
        <h1>{business.name}</h1>
        <p>{business.summary}</p>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 className="section-title">Data Readiness</h2>
        <p className="section-subtitle">
          Track ingestion progress before running the investor-ready deck.
        </p>
        <DataReadinessCards items={readinessCards} />
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 className="section-title">Deck Sections</h2>
        <p className="section-subtitle">
          Use the navigation to explore the full narrative, financials, and
          projections for this business.
        </p>
        <div className="grid-3" style={{ marginTop: "20px" }}>
          {business.sections.map((section) => (
            <Link
              key={section.slug}
              href={`/business/${business.slug}/${section.slug}`}
            >
              {/* Route each section card to its dedicated page. */}
              <article className="card" style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 8px" }}>{section.label}</h3>
                <p className="section-subtitle">{section.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
