import AssumptionEditor from "../../../../components/assumptions/AssumptionEditor";
import AssumptionSummaryCards from "../../../../components/assumptions/AssumptionSummaryCards";
import AssumptionTable from "../../../../components/assumptions/AssumptionTable";
import AuditTrail from "../../../../components/assumptions/AuditTrail";
import RiskRegister from "../../../../components/assumptions/RiskRegister";
import EmptyState from "../../../../components/layout/EmptyState";
import SectionLayout from "../../../../components/layout/SectionLayout";
import {
  getAssumptionSummary,
  loadAssumptionData,
} from "../../../../lib/assumptionsData";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";

export default async function AssumptionsPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "assumptions")?.label ??
    "Assumptions & Notes";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section documents the foundational assumptions behind the projections, including pricing, volume, utilization, and cost drivers. It also captures risk factors and mitigation plans.";
  const assumptionData = await loadAssumptionData(params.slug);
  const summary = getAssumptionSummary(assumptionData);

  const summaryCards = [
    {
      label: "Assumption Count",
      value: `${summary.totalAssumptions}`,
      detail: "Total projection assumptions tracked",
    },
    {
      label: "Risk Register",
      value: `${summary.riskCount}`,
      detail: "Active risks with mitigations",
    },
    {
      label: "Notes Coverage",
      value: `${summary.noteCoverage}%`,
      detail: `${summary.assumptionsWithNotes} assumptions have notes`,
    },
  ];

  const hasAssumptions = assumptionData.assumptions.length > 0;
  const hasRisks = assumptionData.risks.length > 0;
  const hasAuditTrail = assumptionData.auditTrail.length > 0;

  return (
    <SectionLayout
      title="Assumptions & Notes"
      subtitle="Key assumptions, risks, and supporting rationale."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "List core assumptions with source references.",
        "Surface major risks and mitigation strategies.",
        "Maintain a changelog of assumption updates.",
      ]}
      focusAreas={[
        {
          label: "Assumption Register",
          detail:
            "Structured list of assumptions tied to projections and charts.",
        },
        {
          label: "Risk & Mitigation",
          detail:
            "Explicit documentation of risks, mitigations, and contingency plans.",
        },
        {
          label: "Audit Trail",
          detail: "Track assumption changes, timestamps, and reasoning.",
        },
      ]}
      notes={[
        "Link each assumption back to a projection line item.",
        "Provide citations for external sources.",
        "Record owner and review cadence for each assumption.",
      ]}
    >
      <AssumptionSummaryCards items={summaryCards} />
      {hasAssumptions ? (
        <>
          <AssumptionEditor
            items={assumptionData.assumptions}
            storageKey={`assumptions:${params.slug}`}
          />
          <AssumptionTable items={assumptionData.assumptions} />
        </>
      ) : (
        <EmptyState
          title="Assumptions data pending"
          description="Add assumptions to data/businesses/mainland-truck/assumptions.json to populate the register and unlock scenario editing."
        />
      )}
      {hasRisks ? (
        <RiskRegister risks={assumptionData.risks} />
      ) : (
        <EmptyState
          title="Risk register pending"
          description="Document key risks and mitigations to complete the assumptions section for investors."
        />
      )}
      {hasAuditTrail ? (
        <AuditTrail entries={assumptionData.auditTrail} />
      ) : (
        <EmptyState
          title="Audit trail pending"
          description="Capture assumption changes and rationale to keep the deck investor-ready."
        />
      )}
    </SectionLayout>
  );
}
