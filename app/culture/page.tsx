import type { Metadata } from "next";
import { ChapterPage } from "@/lib/chapter-page";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "Influence as capital — art, language, ritual, and soft power that moves markets.",
};

export default function CulturePage() {
  return <ChapterPage section="culture" />;
}
