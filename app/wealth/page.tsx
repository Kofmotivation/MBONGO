import type { Metadata } from "next";
import { ChapterPage } from "@/lib/chapter-page";

export const metadata: Metadata = {
  title: "Wealth",
  description:
    "Knowledge, ownership, and the quiet architecture of lasting value.",
};

export default function WealthPage() {
  return <ChapterPage section="wealth" />;
}
