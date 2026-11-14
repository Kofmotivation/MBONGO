import { CoverRail } from "@/components/CoverRail";
import { LeadCover } from "@/components/LeadCover";
import { LedgerList } from "@/components/LedgerList";
import { Newsletter } from "@/components/Newsletter";
import { getCoverSequence, getLedger } from "@/lib/content";

export default function HomePage() {
  const covers = getCoverSequence();
  const lead = covers[0] ?? getLedger()[0];

  return (
    <>
      <h1 className="sr-only">MBONGO — Cover Sequence</h1>
      <CoverRail items={covers} />
      {lead ? <LeadCover item={lead} /> : null}
      <LedgerList items={getLedger()} title="The Latest Ledger" id="latest" />
      <Newsletter />
    </>
  );
}
