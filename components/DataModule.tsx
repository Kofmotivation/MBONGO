"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/motion/register";
import { prefersReducedMotion } from "@/lib/motion/reduced";

type Figure = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export function DataModule({
  headline,
  figures,
}: {
  headline: string;
  figures: Figure[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const nodes = ref.current.querySelectorAll<HTMLElement>("[data-count]");
    if (prefersReducedMotion()) {
      nodes.forEach((n) => {
        n.textContent = n.dataset.count ?? "0";
      });
      return;
    }
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        const end = Number(node.dataset.count ?? "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            node.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [figures]);

  return (
    <aside className="data-module" ref={ref} aria-label={headline}>
      <h3>{headline}</h3>
      <div className="data-module__grid">
        {figures.map((f) => (
          <div key={f.label}>
            <div className="data-module__value">
              {f.prefix}
              <span data-count={f.value}>{reduced ? f.value : 0}</span>
              {f.suffix}
            </div>
            <div className="data-module__label">{f.label}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
