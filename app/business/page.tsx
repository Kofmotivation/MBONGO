import type { Metadata } from "next";
import { ChapterPage } from "@/lib/chapter-page";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Operators, builders, and institutions rewriting enterprise across Africa and the diaspora.",
};

export default function BusinessPage() {
  return <ChapterPage section="business" />;
}
