"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { hrefFor, type LedgerItem } from "@/lib/content";
import { getGsap } from "@/lib/motion/register";
import { prefersReducedMotion } from "@/lib/motion/reduced";

export function CoverRail({ items }: { items: LedgerItem[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const cards = ref.current.querySelectorAll(".cover-card");
    gsap.fromTo(
      cards,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "opacity",
      }
    );
  }, []);

  return (
    <section className="cover-rail" aria-label="Cover sequence" ref={ref}>
      <div className="cover-rail__track">
        {items.slice(0, 5).map((item) => (
          <Link
            key={item.slug}
            href={hrefFor(item)}
            className="cover-card"
          >
            <span className="cover-card__title">{item.cover.title}</span>
            <span className="cover-card__figure">
              {item.cover.image ? (
                <Image
                  src={item.cover.image}
                  alt=""
                  fill
                  sizes="(max-width: 960px) 200px, 18vw"
                  priority={item === items[0]}
                />
              ) : null}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
