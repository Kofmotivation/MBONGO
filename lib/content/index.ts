import { articles } from "./articles";
import { interviews } from "./interviews";
import { chapters } from "./chapters";
import type { LedgerItem, Section, Format } from "./types";

export { articles, interviews, chapters };
export * from "./types";
export { getArticle } from "./articles";
export { getInterview } from "./interviews";
export { getChapter } from "./chapters";
export { about } from "./about";

export function getLedger(): LedgerItem[] {
  const items: LedgerItem[] = [
    ...articles.map((a) => ({ ...a, kind: "article" as const })),
    ...interviews.map((i) => ({ ...i, kind: "interview" as const })),
  ];
  return items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** Home cover sequence order matching brand mockups (articles 1–5). */
export function getCoverSequence(): LedgerItem[] {
  const order = [
    "before-the-colonial-economy",
    "beyond-tulsa",
    "black-women-beauty-industry",
    "the-nyerere-equation",
    "queen-njinga",
  ];
  const ledger = getLedger();
  return order
    .map((slug) => ledger.find((i) => i.slug === slug))
    .filter((i): i is LedgerItem => Boolean(i));
}

export function getBySection(section: Section): LedgerItem[] {
  return getLedger().filter((i) => i.section === section);
}

export function filterLedger(opts: {
  section?: Section | "all";
  format?: Format | "all";
  q?: string;
}): LedgerItem[] {
  const q = opts.q?.trim().toLowerCase() ?? "";
  return getLedger().filter((item) => {
    if (opts.section && opts.section !== "all" && item.section !== opts.section)
      return false;
    if (opts.format && opts.format !== "all" && item.format !== opts.format)
      return false;
    if (!q) return true;
    const hay = `${item.cover.title} ${item.cover.dek} ${item.byline}`.toLowerCase();
    return hay.includes(q);
  });
}

export function hrefFor(item: { kind?: string; slug: string; format?: string }): string {
  if (item.kind === "interview" || item.format === "interview") {
    return `/interviews/${item.slug}`;
  }
  return `/articles/${item.slug}`;
}
