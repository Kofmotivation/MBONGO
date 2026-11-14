import Image from "next/image";
import Link from "next/link";
import { LedgerList } from "@/components/LedgerList";
import {
  getBySection,
  getChapter,
  hrefFor,
  type Section,
} from "@/lib/content";

export function ChapterPage({ section }: { section: Section }) {
  const meta = getChapter(section);
  const items = getBySection(section);
  if (!meta) return null;

  return (
    <>
      <header className="chapter-hero">
        <p className="kicker">Chapter</p>
        <h1 className="display">{meta.title}</h1>
        <p>{meta.manifesto}</p>
      </header>

      <section aria-label="Featured covers">
        <div className="featured-rail">
          {items.slice(0, 4).map((item) => (
            <Link key={item.slug} href={hrefFor(item)} className="cover-card">
              <span className="cover-card__title">{item.cover.title}</span>
              <span className="cover-card__figure">
                {item.cover.image ? (
                  <Image
                    src={item.cover.image}
                    alt=""
                    fill
                    sizes="220px"
                  />
                ) : null}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <LedgerList items={items} title={`${meta.title} ledger`} id={section} />
    </>
  );
}
