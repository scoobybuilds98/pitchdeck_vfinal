import ChartDefinitionsTable from "../../../../components/charts/ChartDefinitionsTable";
import ChartsGrid from "../../../../components/charts/ChartsGrid";
import EmptyState from "../../../../components/layout/EmptyState";
import SectionLayout from "../../../../components/layout/SectionLayout";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";
import { loadChartsData } from "../../../../lib/chartsData";
import { loadProjectionData } from "../../../../lib/projectionsData";

export default async function ChartsPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "charts")?.label ??
    "Charts & Graphs";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section consolidates all visualizations for quick investor review. It will feature trend charts, stacked breakdowns, and KPI dashboards derived from the projections dataset.";
  const chartsData = await loadChartsData(params.slug);
  const projectionData = await loadProjectionData(params.slug);
  const hasCharts = chartsData.charts.length > 0;

  return (
    <SectionLayout
      title="Charts & Graphs"
      subtitle="Visual insights across revenue, margin, and operational KPIs."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "Show year-over-year revenue, margin, and cash flow trends.",
        "Break down revenue by product, service line, or customer segment.",
        "Surface operational KPIs and utilization metrics visually.",
      ]}
      focusAreas={[
        {
          label: "Performance Trends",
          detail:
            "Line charts and stacked bars for multi-year performance tracking.",
        },
        {
          label: "Mix Analysis",
          detail: "Breakdowns by business line, geography, or customer segment.",
        },
        {
          label: "KPI Dashboard",
          detail:
            "High-level dashboard for the most important KPIs and targets.",
        },
      ]}
      notes={[
        "Define a chart registry in the data schema to drive the visual layer.",
        "Add chart annotations that connect to narrative points.",
        "Include export or print options for investors.",
      ]}
    >
      {hasCharts ? (
        <>
          <ChartsGrid charts={chartsData.charts} metrics={projectionData.metrics} />
          <ChartDefinitionsTable charts={chartsData.charts} />
        </>
      ) : (
        <EmptyState
          title="Charts are ready for data ingestion"
          description="Add chart definitions to data/businesses/mainland-truck/charts.json to populate this view with investor-ready visuals."
        />
      )}
    </SectionLayout>
  );
}
