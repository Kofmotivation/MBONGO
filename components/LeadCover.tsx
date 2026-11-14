import Image from "next/image";
import Link from "next/link";
import { hrefFor, type LedgerItem } from "@/lib/content";

export function LeadCover({ item }: { item: LedgerItem }) {
  return (
    <section className="lead-cover" aria-labelledby="lead-cover-title">
      <div className="lead-cover__grid">
        <div>
          <p className="kicker">{item.cover.eyebrow ?? item.section}</p>
          <h2 id="lead-cover-title" className="display lead-cover__title">
            {item.cover.title}
          </h2>
          <p className="lead-cover__dek">{item.cover.dek}</p>
          <Link className="lead-cover__cta" href={hrefFor(item)}>
            Read the cover story
          </Link>
        </div>
        <div className="lead-cover__media">
          {item.cover.image ? (
            <Image
              src={item.cover.image}
              alt=""
              width={971}
              height={1619}
              sizes="(max-width: 960px) 100vw, 40vw"
              priority
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
