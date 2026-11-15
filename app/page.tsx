import { CoverRail } from "@/components/CoverRail";
import { Newsletter } from "@/components/Newsletter";
import { getCoverSequence } from "@/lib/content";

/**
 * Home — Cover Sequence + newsletter only.
 * Client feedback: remove lead feature + latest ledger; place weekly directly under covers.
 */
export default function HomePage() {
  const covers = getCoverSequence();

  return (
    <>
      <h1 className="sr-only">MBONGO — Cover Sequence</h1>
      <CoverRail items={covers} />
      <Newsletter />
    </>
  );
}
