"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapters } from "@/lib/content";
import { useTheme } from "./ThemeProvider";

export function Masthead() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="masthead">
      <div className="masthead__inner">
        <nav className="masthead__left" aria-label="Site">
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link href="/" className="masthead__brand" aria-label="MBONGO home">
          MBONGO
        </Link>

        <div className="masthead__right">
          <Link href="/ledger">Index</Link>
          <Link href="/ledger#latest">Latest</Link>
          <Link href="/#newsletter">Newsletter</Link>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={theme === "night"}
            aria-label={
              theme === "night" ? "Switch to day light" : "Switch to night light"
            }
          >
            {theme === "night" ? "Day" : "Night"}
          </button>
        </div>
      </div>

      <nav className="masthead__chapters" aria-label="Chapters">
        {chapters.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            aria-current={pathname === `/${c.slug}` ? "page" : undefined}
          >
            {c.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
