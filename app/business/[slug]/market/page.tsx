import CompetitivePositioning from "../../../../components/market/CompetitivePositioning";
import MarketSignalCards from "../../../../components/market/MarketSignalCards";
import SegmentHighlights from "../../../../components/market/SegmentHighlights";
import SectionLayout from "../../../../components/layout/SectionLayout";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";

export default async function MarketPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "market")?.label ??
    "Market & Opportunity";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section defines the market size, growth drivers, and competitive dynamics for Mainland Truck & Trailer Sales & Leasing, clarifying where the business has structural advantage.";

  return (
    <SectionLayout
      title="Market & Opportunity"
      subtitle="Market sizing, demand drivers, and growth headroom."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "Quantify the addressable market across sales, leasing, and service.",
        "Identify demand drivers tied to freight cycles and fleet replacement.",
        "Benchmark competitive positioning by region and service breadth.",
      ]}
      focusAreas={[
        {
          label: "Total Addressable Market",
          detail:
            "Aggregate spending on commercial trucks, trailers, leasing, and service.",
        },
        {
          label: "Demand Drivers",
          detail:
            "Replacement cycles, fleet aging, and regulatory compliance needs.",
        },
        {
          label: "Competitive Map",
          detail:
            "Regional competitors, pricing benchmarks, and service differentiation.",
        },
      ]}
      notes={[
        "Replace placeholder signals with data from market research sources.",
        "Add citations to the appendix once ingestion is complete.",
        "Tie market assumptions to the projections model inputs.",
      ]}
    >
      <MarketSignalCards
        items={[
          {
            label: "TAM",
            value: "$XXB",
            detail: "Total addressable spend across sales + leasing + service",
          },
          {
            label: "Growth",
            value: "X% CAGR",
            detail: "Projected multi-year industry growth rate",
          },
          {
            label: "Service Gap",
            value: "High",
            detail: "Service capacity shortfall in target regions",
          },
        ]}
      />
      <SegmentHighlights
        segments={[
          {
            name: "Owner-Operators",
            detail:
              "Independent operators seeking flexible financing and service bundles.",
            opportunity: "High volume, high churn, leasing upsell potential.",
          },
          {
            name: "Regional Fleets",
            detail:
              "Mid-size fleets with replacement cycles tied to utilization.",
            opportunity: "Predictable renewal pipeline with service attach.",
          },
          {
            name: "Logistics Partners",
            detail:
              "Enterprise partners with bulk purchasing and service requirements.",
            opportunity: "Strategic contracts and high-ticket deal flow.",
          },
        ]}
      />
      <CompetitivePositioning
        competitors={[
          {
            name: "Regional Dealer Networks",
            advantage:
              "Established footprint with localized inventory sourcing partnerships.",
            gap: "Limited leasing flexibility and slower service turnaround.",
          },
          {
            name: "National Leasing Providers",
            advantage: "Scale financing capacity and national fleet coverage.",
            gap: "Less localized service and slower customization cycles.",
          },
          {
            name: "Independent Service Shops",
            advantage: "Specialized maintenance expertise in key corridors.",
            gap: "No bundled sales or leasing offerings.",
          },
        ]}
      />
    </SectionLayout>
  );
}
