import type { Metadata } from "next";
import { LedgerList } from "@/components/LedgerList";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Index — The Ledger",
  description: "Searchable archive of MBONGO articles, interviews, and explainers.",
};

export default function IndexPage() {
  return (
    <>
      <header className="chapter-hero">
        <p className="kicker">The Ledger</p>
        <h1 className="display">Index</h1>
        <p>
          A precise archive of covers, conversations, and explainers — filter by
          chapter and format, or search the titles that argue.
        </p>
      </header>
      <LedgerList title="Full ledger" showSearch id="latest" />
      <Newsletter />
    </>
  );
}
