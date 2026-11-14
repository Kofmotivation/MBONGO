import Link from "next/link";
import { getLedger, hrefFor } from "@/lib/content";

export function OwnershipFooter({
  related = [],
  people = [],
  businesses = [],
  nextCover,
}: {
  related?: string[];
  people?: string[];
  businesses?: string[];
  nextCover?: string;
}) {
  const ledger = getLedger();
  const relatedItems = related
    .map((slug) => ledger.find((i) => i.slug === slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const next = nextCover
    ? ledger.find((i) => i.slug === nextCover)
    : undefined;

  return (
    <footer className="ownership" aria-label="Ownership">
      <div>
        <h2>Related</h2>
        <ul>
          {relatedItems.length ? (
            relatedItems.map((item) => (
              <li key={item.slug}>
                <Link href={hrefFor(item)}>{item.cover.title}</Link>
              </li>
            ))
          ) : (
            <li>More in the ledger</li>
          )}
        </ul>
      </div>
      <div>
        <h2>People & businesses</h2>
        <ul>
          {[...people, ...businesses].length ? (
            [...people, ...businesses].map((name) => <li key={name}>{name}</li>)
          ) : (
            <li>MBONGO Editorial</li>
          )}
        </ul>
      </div>
      <div>
        <h2>Next cover</h2>
        <ul>
          {next ? (
            <li>
              <Link href={hrefFor(next)}>{next.cover.title}</Link>
            </li>
          ) : (
            <li>
              <Link href="/">Return to covers</Link>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
