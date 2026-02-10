import { readFile } from "node:fs/promises";
import path from "node:path";

const BUSINESS_ROOT = path.join(process.cwd(), "data", "businesses");

export interface TableConfig {
  id: string;
  title: string;
  metrics: string[];
  notes?: string;
}

export interface TablesData {
  tables: TableConfig[];
}

export async function loadTablesData(slug: string): Promise<TablesData> {
  const tablesPath = path.join(BUSINESS_ROOT, slug, "tables.json");
  const raw = await readFile(tablesPath, "utf-8");
  return JSON.parse(raw) as TablesData;
}
