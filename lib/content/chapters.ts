import type { ChapterMeta } from "./types";

export const chapters: ChapterMeta[] = [
  {
    slug: "wealth",
    title: "Wealth",
    manifesto:
      "Knowledge, ownership, and the quiet architecture of lasting value — from Kinshasa to the Caribbean, Lagos to London.",
    tone: "olive",
  },
  {
    slug: "business",
    title: "Business",
    manifesto:
      "Operators, builders, and institutions rewriting the terms of enterprise across the continent and diaspora.",
    tone: "indigo",
  },
  {
    slug: "culture",
    title: "Culture",
    manifesto:
      "Influence as capital: art, language, ritual, and the soft power that moves markets before balance sheets do.",
    tone: "laterite",
  },
  {
    slug: "money",
    title: "Money",
    manifesto:
      "How capital actually moves — remittances, instruments, policy, and the ledgers behind living well.",
    tone: "brass",
  },
];

export function getChapter(slug: string): ChapterMeta | undefined {
  return chapters.find((c) => c.slug === slug);
}
