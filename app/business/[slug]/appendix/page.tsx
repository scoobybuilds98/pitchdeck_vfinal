import SectionLayout from "../../../../components/layout/SectionLayout";
import SourceList from "../../../../components/narrative/SourceList";
import {
  loadBusinessMetadata,
  loadNarrativeBySection,
} from "../../../../lib/businessData";

export default async function AppendixPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata = await loadBusinessMetadata(params.slug);
  const sectionLabel =
    metadata.sections.find((section) => section.slug === "appendix")?.label ??
    "Appendix";
  const narrative = await loadNarrativeBySection(params.slug, sectionLabel);
  const fallbackLead =
    "This section consolidates all source material, citations, and supplemental data. It serves as the evidence base behind market sizing, assumptions, and financial projections.";

  return (
    <SectionLayout
      title="Appendix"
      subtitle="Sources, citations, and supporting materials."
      lead={narrative[0] ?? fallbackLead}
      narrativeParagraphs={narrative.slice(1)}
      highlights={[
        "List all external sources and citations.",
        "Include supplementary tables and data extracts.",
        "Provide contact and versioning details for reference.",
      ]}
      focusAreas={[
        {
          label: "Source Library",
          detail:
            "Curated list of references supporting market and financial claims.",
        },
        {
          label: "Supporting Tables",
          detail:
            "Supplemental datasets, benchmarking tables, and sensitivity grids.",
        },
        {
          label: "Version Control",
          detail: "Document version history and responsible contributors.",
        },
      ]}
      notes={[
        "Ensure all external claims in the deck are cited here.",
        "Attach downloadable tables once data exports are available.",
        "Maintain a revision log for investor-facing updates.",
      ]}
    >
      <SourceList
        items={[
          {
            label: "Company Source Docs",
            detail:
              "Mainland Truck & Trailer Sales & Leasing pitch deck source files",
          },
          {
            label: "Market Research",
            detail: "Industry market sizing reports and public datasets",
          },
          {
            label: "Operating Assumptions",
            detail:
              "Internal assumptions register aligned to projections (v1.0)",
          },
        ]}
      />
    </SectionLayout>
  );
}
