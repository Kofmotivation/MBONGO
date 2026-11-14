export type Section = "wealth" | "business" | "culture" | "money";
export type Format = "article" | "interview" | "explainer" | "conversation";
export type CoverTone = "paper" | "olive" | "indigo" | "ink" | "laterite" | "brass";

export interface Cover {
  eyebrow?: string;
  title: string;
  dek: string;
  image?: string;
  tone: CoverTone;
}

export type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "pullquote"; text: string; attribution?: string }
  | { type: "fullbleed"; label: string; tone: CoverTone; image?: string }
  | {
      type: "data";
      headline: string;
      figures: { value: number; suffix?: string; prefix?: string; label: string }[];
    };

export interface Article {
  slug: string;
  section: Section;
  format: Format;
  cover: Cover;
  byline: string;
  publishedAt: string;
  readMinutes: number;
  body: BodyBlock[];
  people?: string[];
  businesses?: string[];
  related?: string[];
  nextCover?: string;
}

export interface Interview {
  slug: string;
  section: Section;
  format: "interview";
  cover: Cover;
  byline: string;
  publishedAt: string;
  readMinutes: number;
  subject: string;
  role: string;
  transcript: { speaker: "q" | "a"; text: string }[];
  framing?: BodyBlock[];
  people?: string[];
  businesses?: string[];
  related?: string[];
  nextCover?: string;
}

export interface ChapterMeta {
  slug: Section;
  title: string;
  manifesto: string;
  tone: CoverTone;
}

export type LedgerItem =
  | (Article & { kind: "article" })
  | (Interview & { kind: "interview" });
