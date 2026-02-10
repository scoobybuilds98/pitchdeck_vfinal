import type { BusinessMetadata, BusinessProfile } from "../../lib/types";
import mainlandTruck from "./mainland-truck/metadata.json";

// Central registry used for navigation and business discovery.
const businessMetadata = [mainlandTruck] as BusinessMetadata[];

export const businessRegistry: BusinessProfile[] = businessMetadata.map(
  ({ slug, name, industry, summary, sections }) => ({
    slug,
    name,
    industry,
    summary,
    sections,
  })
);

export const businessMetadataBySlug = businessMetadata.reduce(
  (acc, business) => {
    acc[business.slug] = business;
    return acc;
  },
  {} as Record<string, BusinessMetadata>
);
