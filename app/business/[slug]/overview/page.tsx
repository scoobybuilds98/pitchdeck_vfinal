import BusinessSnapshot from "../../../../components/narrative/BusinessSnapshot";
import LeadershipHighlights from "../../../../components/overview/LeadershipHighlights";
import SectionLayout from "../../../../components/layout/SectionLayout";
import TractionMilestones from "../../../../components/overview/TractionMilestones";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";

export default async function OverviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "overview")?.label ??
    "Executive Summary";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section frames the business narrative, the problem it solves, and how the team will deliver durable returns. It aligns the value proposition, competitive advantage, and capital needs in a cohesive narrative.";

  return (
    <SectionLayout
      title="Executive Summary"
      subtitle="Positioning the business, investment thesis, and growth story."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "Define the mission, vision, and customer pain points with clarity.",
        "Summarize near-term objectives and the strategic roadmap.",
        "Highlight differentiators that make the business defensible.",
      ]}
      focusAreas={[
        {
          label: "Thesis Summary",
          detail:
            "Concise articulation of why the business wins in its market, supported by core metrics and proof points.",
        },
        {
          label: "Capital Strategy",
          detail:
            "Planned use of proceeds, investment timeline, and expected impact on growth milestones.",
        },
        {
          label: "Leadership & Execution",
          detail:
            "Key operators, execution cadence, and governance practices that de-risk the plan.",
        },
      ]}
      notes={[
        "Finalize the core narrative after projections are locked.",
        "Include supporting metrics sourced from the projections dataset.",
        "Add a concise bullet list of key achievements or traction points.",
      ]}
    >
      <BusinessSnapshot
        items={[
          { label: "Industry", value: metadata.industry },
          { label: "Operating Base", value: metadata.location },
          { label: "Stage", value: metadata.stage },
          { label: "Last Updated", value: metadata.lastUpdated },
        ]}
      />
      <LeadershipHighlights
        leaders={[
          {
            name: "Executive Sponsor",
            role: "Founder & CEO",
            detail:
              "Leads commercial strategy, supplier partnerships, and capital planning.",
          },
          {
            name: "Operations Lead",
            role: "VP Operations",
            detail:
              "Owns fleet readiness, service SLAs, and inventory throughput.",
          },
          {
            name: "Finance Lead",
            role: "VP Finance",
            detail:
              "Manages leasing capital structure and investor reporting cadence.",
          },
        ]}
      />
      <TractionMilestones
        items={[
          {
            title: "Inventory Pipeline Secured",
            detail:
              "Initial fleet sourcing partnerships established for launch inventory.",
            timing: "Near Term",
          },
          {
            title: "Leasing Demand Validation",
            detail:
              "Early demand signals from regional fleet operators and owner-operators.",
            timing: "Next 6 Months",
          },
          {
            title: "Service Expansion Plan",
            detail:
              "Service network blueprint aligned with hub rollout strategy.",
            timing: "Next 12 Months",
          },
        ]}
      />
    </SectionLayout>
  );
}
