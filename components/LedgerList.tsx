"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  filterLedger,
  hrefFor,
  type Format,
  type LedgerItem,
  type Section,
} from "@/lib/content";

const sections: Array<Section | "all"> = [
  "all",
  "wealth",
  "business",
  "culture",
  "money",
];

const formats: Array<Format | "all"> = [
  "all",
  "article",
  "interview",
  "explainer",
  "conversation",
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function useHoverPreview() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return enabled;
}

export function LedgerList({
  items,
  title = "Latest",
  showSearch = false,
  id,
  preview = true,
}: {
  items?: LedgerItem[];
  title?: string;
  showSearch?: boolean;
  id?: string;
  /** Show cover image on row hover / focus (desktop). Default true. */
  preview?: boolean;
}) {
  const [section, setSection] = useState<Section | "all">("all");
  const [format, setFormat] = useState<Format | "all">("all");
  const [q, setQ] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const hoverPreview = useHoverPreview();
  const showPreview = preview && hoverPreview;

  const rows = useMemo(() => {
    if (items && !showSearch && section === "all" && format === "all" && !q) {
      return items;
    }
    const base = filterLedger({ section, format, q });
    if (!items) return base;
    const slugs = new Set(items.map((i) => i.slug));
    return base.filter((i) => slugs.has(i.slug));
  }, [items, section, format, q, showSearch]);

  const active = rows.find((r) => r.slug === activeSlug) ?? null;
  const previewImage = active?.cover.image ?? null;

  return (
    <section className="ledger" id={id} aria-labelledby={`${id ?? "ledger"}-title`}>
      <div className="ledger__head">
        <h2 className="ledger__title display" id={`${id ?? "ledger"}-title`}>
          {title}
        </h2>
        <div className="ledger__filters" role="group" aria-label="Filter by section">
          {sections.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={section === s}
              onClick={() => setSection(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {showSearch ? (
        <>
          <label className="sr-only" htmlFor="ledger-search">
            Search the ledger
          </label>
          <input
            id="ledger-search"
            className="ledger-search"
            type="search"
            placeholder="Search titles, deks, bylines"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="ledger__filters" role="group" aria-label="Filter by format">
            {formats.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={format === f}
                onClick={() => setFormat(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {rows.length} result{rows.length === 1 ? "" : "s"}
      </p>

      <div
        className={
          showPreview ? "ledger__body ledger__body--preview" : "ledger__body"
        }
      >
        <div
          className="ledger__rows"
          onMouseLeave={() => setActiveSlug(null)}
        >
          {rows.map((item) => (
            <Link
              key={item.slug}
              href={hrefFor(item)}
              className={`ledger-row${showPreview && activeSlug === item.slug ? " is-active" : ""}`}
              onMouseEnter={() => {
                if (showPreview) setActiveSlug(item.slug);
              }}
              onFocus={() => {
                if (showPreview) setActiveSlug(item.slug);
              }}
              onBlur={() =>
                setActiveSlug((s) => (s === item.slug ? null : s))
              }
            >
              <span>{formatDate(item.publishedAt)}</span>
              <span>{item.section}</span>
              <span className="ledger-row__title">{item.cover.title}</span>
              <span>{item.format}</span>
            </Link>
          ))}
        </div>

        {showPreview ? (
          <aside
            className={`ledger-preview${previewImage ? " has-cover" : ""}`}
            aria-hidden="true"
          >
            <div className="ledger-preview__frame">
              {/* Resting placeholder — always present */}
              <div className="ledger-preview__placeholder">
                <span className="ledger-preview__mark">MBONGO</span>
                <span className="ledger-preview__rule" />
                <span className="ledger-preview__hint">
                  Hover a title to preview the cover
                </span>
              </div>

              {/* Single cover layer — swaps in place, no moving frames */}
              {previewImage ? (
                <Image
                  key={previewImage}
                  src={previewImage}
                  alt=""
                  fill
                  sizes="280px"
                  className="ledger-preview__img"
                />
              ) : null}
            </div>
            <p className="ledger-preview__caption">
              {active ? active.cover.title : "The Ledger"}
            </p>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
