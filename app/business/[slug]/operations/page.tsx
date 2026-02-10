import ExecutionTimeline from "../../../../components/operations/ExecutionTimeline";
import OperationalFocusCards from "../../../../components/operations/OperationalFocusCards";
import SectionLayout from "../../../../components/layout/SectionLayout";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";

export default async function OperationsPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "operations")?.label ??
    "Operations";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section outlines how Mainland Truck & Trailer Sales & Leasing will execute day-to-day operations, scale inventory, and deliver service quality at every location.";

  return (
    <SectionLayout
      title="Operations"
      subtitle="Execution plan, footprint strategy, and operational readiness."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "Define the operational footprint and service coverage zones.",
        "Clarify inventory sourcing, refurbishment, and delivery workflows.",
        "Align staffing, service, and compliance processes to growth targets.",
      ]}
      focusAreas={[
        {
          label: "Footprint Strategy",
          detail:
            "Regional hub strategy for sales, leasing, and service coverage.",
        },
        {
          label: "Supply & Inventory",
          detail:
            "Partnership pipeline for fleet acquisition and refurbishment.",
        },
        {
          label: "Service Readiness",
          detail:
            "Maintenance cadence, warranty coverage, and uptime guarantees.",
        },
      ]}
      notes={[
        "Map operational KPIs to the projections dashboard once data ingestion is complete.",
        "Document compliance and safety certifications in the appendix.",
        "Add SOP links and staffing plans as they are finalized.",
      ]}
    >
      <OperationalFocusCards
        items={[
          {
            label: "Regional Coverage",
            detail: "Launch with primary hubs, expand to satellite service points.",
          },
          {
            label: "Fleet Utilization",
            detail: "Target utilization benchmarks by asset class and contract type.",
          },
          {
            label: "Service SLAs",
            detail: "Define response times and preventive maintenance cadence.",
          },
        ]}
      />
      <ExecutionTimeline
        items={[
          {
            quarter: "Q1",
            title: "Inventory Intake",
            detail:
              "Finalize supplier agreements and onboard initial inventory pipeline.",
          },
          {
            quarter: "Q2",
            title: "Leasing Ramp",
            detail:
              "Scale leasing operations, onboard fleet financing partners.",
          },
          {
            quarter: "Q3",
            title: "Service Expansion",
            detail:
              "Deploy regional service teams and establish maintenance SLAs.",
          },
          {
            quarter: "Q4",
            title: "Optimization",
            detail:
              "Refine utilization, pricing, and renewal workflows based on KPI data.",
          },
        ]}
      />
    </SectionLayout>
  );
}
