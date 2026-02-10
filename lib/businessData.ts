import { readFile } from "node:fs/promises";
import path from "node:path";
import type { BusinessMetadata } from "./types";

const BUSINESS_ROOT = path.join(process.cwd(), "data", "businesses");

export async function loadBusinessMetadata(slug: string): Promise<BusinessMetadata> {
  const metadataPath = path.join(BUSINESS_ROOT, slug, "metadata.json");
  const raw = await readFile(metadataPath, "utf-8");
  return JSON.parse(raw) as BusinessMetadata;
}

export async function loadNarrativeSections(
  slug: string
): Promise<Record<string, string[]>> {
  const narrativePath = path.join(BUSINESS_ROOT, slug, "narrative.md");

  try {
    const raw = await readFile(narrativePath, "utf-8");
    return parseNarrative(raw);
  } catch {
    return {};
  }
}

export async function loadNarrativeBySection(
  slug: string,
  sectionLabel: string
): Promise<string[]> {
  const sections = await loadNarrativeSections(slug);
  return sections[sectionLabel] ?? [];
}

function parseNarrative(markdown: string): Record<string, string[]> {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const chunks = normalized.split("\n## ");
  const sections: Record<string, string[]> = {};

  for (let index = 1; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    const [headingLine, ...bodyLines] = chunk.split("\n");
    const heading = headingLine.trim();
    const body = bodyLines.join("\n").trim();

    if (!heading) {
      continue;
    }

    const paragraphs = body
      ? body
          .split(/\n\n+/)
          .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
          .filter(Boolean)
      : [];

    sections[heading] = paragraphs;
  }

  return sections;
}
