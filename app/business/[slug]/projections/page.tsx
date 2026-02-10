import MetricHighlights from "../../../../components/narrative/MetricHighlights";
import SectionLayout from "../../../../components/layout/SectionLayout";
import ProjectionInsights from "../../../../components/projections/ProjectionInsights";
import ProjectionSummaryCards from "../../../../components/projections/ProjectionSummaryCards";
import InteractiveProjectionDashboard from "../../../../components/projections/InteractiveProjectionDashboard";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";
import {
  buildProjectionYears,
  getProjectionCompleteness,
  loadProjectionData,
} from "../../../../lib/projectionsData";
import { loadTablesData } from "../../../../lib/tablesData";
import { loadAssumptionData } from "../../../../lib/assumptionsData";

export default async function ProjectionsPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "projections")?.label ??
    "Financial Projections";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section will host the interactive projections engine. Users will adjust assumptions, view scenario changes, and analyze the resulting impact on revenue, margins, and cash flow.";
  const projectionData = await loadProjectionData(params.slug);
  const assumptionData = await loadAssumptionData(params.slug);
  const years = buildProjectionYears(projectionData);
  const tablesData = await loadTablesData(params.slug);
  const completeness = getProjectionCompleteness(projectionData, years);

  const metricHighlights = projectionData.metrics.slice(0, 3).map((metric) => ({
    label: metric.label,
    value: metric.values.at(-1)?.toLocaleString() ?? "TBD",
    caption: "Latest forecast year",
  }));

  const summaryCards = [
    {
      label: "Projection Horizon",
      value: `${projectionData.timeframe.startYear}–${projectionData.timeframe.endYear}`,
      detail: `${years.length} forecast years`,
    },
    {
      label: "Scenario Coverage",
      value: `${projectionData.scenarios.length}`,
      detail: "Defined projection scenarios",
    },
    {
      label: "Data Completeness",
      value: `${completeness.percent}%`,
      detail: `${completeness.filled} of ${completeness.total} values supplied`,
    },
  ];

  return (
    <SectionLayout
      title="Financial Projections"
      subtitle="Editable assumptions and forward-looking financial performance."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "Expose editable assumptions with validation and audit trails.",
        "Display scenario-based outputs with live chart updates.",
        "Summarize key financial KPIs and runway metrics.",
      ]}
      focusAreas={[
        {
          label: "Assumption Inputs",
          detail:
            "Editable inputs for volume, pricing, utilization, and cost drivers.",
        },
        {
          label: "Scenario Outputs",
          detail: "Revenue, EBITDA, cash flow, and margin trends by year.",
        },
        {
          label: "Sensitivity Analysis",
          detail: "Impact of key variable changes across multiple scenarios.",
        },
      ]}
      notes={[
        "Integrate projection tables once data schema is finalized.",
        "Include exportable tables for investor review.",
        "Document assumptions in the notes section for transparency.",
      ]}
    >
      <ProjectionSummaryCards items={summaryCards} />
      <ProjectionInsights
        items={[
          {
            title: "Scenario-driven growth",
            detail:
              "Low and high cases highlight the impact of the fleet ramp plan across rental, chassis, and resale revenue.",
          },
          {
            title: "Utilization sensitivity",
            detail:
              "Adjust utilization to see how rental revenue and total revenue respond without changing asset sales assumptions.",
          },
          {
            title: "Revenue mix clarity",
            detail:
              "Rental, chassis sales, and used equipment sales are itemized to show how the mix shifts over time.",
          },
        ]}
      />
      {metricHighlights.length ? (
        <MetricHighlights items={metricHighlights} />
      ) : null}
      <InteractiveProjectionDashboard
        slug={params.slug}
        projectionData={projectionData}
        assumptions={assumptionData.assumptions}
        tables={tablesData.tables}
        years={years}
      />
    </SectionLayout>
  );
}
