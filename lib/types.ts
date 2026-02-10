export interface BusinessSection {
  slug: string;
  label: string;
  description: string;
}

export interface BusinessProfile {
  slug: string;
  name: string;
  industry: string;
  summary: string;
  sections: BusinessSection[];
}

export interface BusinessMetadata extends BusinessProfile {
  location: string;
  stage: string;
  lastUpdated: string;
}

export interface ProjectionMetric {
  id: string;
  label: string;
  format: "currency" | "percentage" | "number";
  values: number[];
}

export interface ProjectionScenario {
  id: string;
  label: string;
  description: string;
}

export interface ProjectionDriver {
  id: string;
  label: string;
  format: "currency" | "percentage" | "number";
  values: number[];
}

export interface ProjectionData {
  currency: string;
  timeframe: {
    startYear: number;
    endYear: number;
    frequency: "annual" | "quarterly" | "monthly";
  };
  metrics: ProjectionMetric[];
  drivers: ProjectionDriver[];
  scenarios: ProjectionScenario[];
}

export interface AssumptionItem {
  id: string;
  category: string;
  label: string;
  value: number;
  unit: string;
  notes: string;
}

export interface RiskItem {
  id: string;
  label: string;
  mitigation: string;
}

export interface AssumptionAuditEntry {
  date: string;
  author: string;
  change: string;
  rationale: string;
}

export interface AssumptionData {
  assumptions: AssumptionItem[];
  risks: RiskItem[];
  auditTrail: AssumptionAuditEntry[];
}
