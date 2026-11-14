"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/motion/register";
import { prefersReducedMotion } from "@/lib/motion/reduced";

export function PullQuote({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        }
      );
    }, ref);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, []);

  return (
    <blockquote className="pullquote" ref={ref}>
      <p>{text}</p>
      {attribution ? <cite>{attribution}</cite> : null}
    </blockquote>
  );
}
