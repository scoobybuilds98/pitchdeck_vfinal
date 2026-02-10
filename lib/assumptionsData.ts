import { readFile } from "node:fs/promises";
import path from "node:path";
import type { AssumptionData } from "./types";

const BUSINESS_ROOT = path.join(process.cwd(), "data", "businesses");

export async function loadAssumptionData(slug: string): Promise<AssumptionData> {
  const assumptionsPath = path.join(BUSINESS_ROOT, slug, "assumptions.json");
  const raw = await readFile(assumptionsPath, "utf-8");
  return JSON.parse(raw) as AssumptionData;
}

export function getAssumptionSummary(data: AssumptionData) {
  const totalAssumptions = data.assumptions.length;
  const assumptionsWithNotes = data.assumptions.filter(
    (assumption) => assumption.notes.trim().length > 0
  ).length;
  const noteCoverage =
    totalAssumptions === 0
      ? 0
      : Math.round((assumptionsWithNotes / totalAssumptions) * 100);

  return {
    totalAssumptions,
    assumptionsWithNotes,
    noteCoverage,
    riskCount: data.risks.length,
    auditEntries: data.auditTrail.length,
  };
}
