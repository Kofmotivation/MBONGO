import type { Metadata } from "next";
import { ChapterPage } from "@/lib/chapter-page";

export const metadata: Metadata = {
  title: "Money",
  description:
    "How capital moves — remittances, instruments, policy, and living well.",
};

export default function MoneyPage() {
  return <ChapterPage section="money" />;
}
