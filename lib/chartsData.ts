import { readFile } from "node:fs/promises";
import path from "node:path";

const BUSINESS_ROOT = path.join(process.cwd(), "data", "businesses");

export interface ChartConfig {
  id: string;
  title: string;
  type: string;
  metrics: string[];
  notes?: string;
}

export interface ChartsData {
  charts: ChartConfig[];
}

export async function loadChartsData(slug: string): Promise<ChartsData> {
  const chartsPath = path.join(BUSINESS_ROOT, slug, "charts.json");
  const raw = await readFile(chartsPath, "utf-8");
  return JSON.parse(raw) as ChartsData;
}
