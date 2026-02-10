import GoToMarketSteps from "../../../../components/model/GoToMarketSteps";
import RevenueStreams from "../../../../components/model/RevenueStreams";
import SectionLayout from "../../../../components/layout/SectionLayout";
import UnitEconomicsHighlights from "../../../../components/model/UnitEconomicsHighlights";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";

export default async function ModelPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "model")?.label ??
    "Business Model";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section outlines the revenue model, unit economics, and growth levers for Mainland Truck & Trailer Sales & Leasing.";

  return (
    <SectionLayout
      title="Business Model"
      subtitle="Revenue streams, unit economics, and go-to-market plan."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "Describe primary revenue engines and margin profiles.",
        "Clarify pricing strategy, asset utilization, and financing structure.",
        "Map growth levers to the projections and operational plan.",
      ]}
      focusAreas={[
        {
          label: "Revenue Architecture",
          detail:
            "Sales, leasing, service, and ancillary revenue tied to fleet lifecycle.",
        },
        {
          label: "Unit Economics",
          detail:
            "Contribution margin, utilization, and payback period targets.",
        },
        {
          label: "Growth Engine",
          detail:
            "Channels, partnerships, and recurring revenue expansion.",
        },
      ]}
      notes={[
        "Update pricing and margin targets once projections are finalized.",
        "Add KPIs for conversion, utilization, and renewal rates.",
        "Tie go-to-market milestones to the operations timeline.",
      ]}
    >
      <UnitEconomicsHighlights
        items={[
          {
            label: "Contribution Margin",
            value: "XX%",
            detail: "Target blended margin across sales + leasing + service",
          },
          {
            label: "Payback",
            value: "X Months",
            detail: "Payback period on leased asset investments",
          },
          {
            label: "Utilization",
            value: "XX%",
            detail: "Target utilization across rental and lease fleet",
          },
        ]}
      />
      <RevenueStreams
        streams={[
          {
            name: "Truck & Trailer Sales",
            description:
              "New and used inventory sales across core commercial segments.",
            driver: "Volume growth and inventory turn rates.",
          },
          {
            name: "Leasing & Rentals",
            description:
              "Recurring lease contracts and short-term rental utilization.",
            driver: "Utilization rates and contract mix.",
          },
          {
            name: "Service & Parts",
            description:
              "Maintenance, repair, and aftermarket parts revenue.",
            driver: "Service attach rate and response time SLAs.",
          },
        ]}
      />
      <GoToMarketSteps
        steps={[
          {
            title: "Channel Expansion",
            detail:
              "Strengthen dealer partnerships and fleet procurement channels.",
          },
          {
            title: "Service Differentiation",
            detail:
              "Bundle maintenance SLAs with leasing and rental offers.",
          },
          {
            title: "Enterprise Contracts",
            detail:
              "Secure multi-year fleet agreements with logistics partners.",
          },
        ]}
      />
    </SectionLayout>
  );
}
