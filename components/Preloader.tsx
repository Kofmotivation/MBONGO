"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/motion/register";
import { prefersReducedMotion } from "@/lib/motion/reduced";

/** Preloader — MBONGO wordmark only: letters settle, brass rule draws, lift away. */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const letters = root.querySelectorAll(".preloader__letter");
    const rule = root.querySelector(".preloader__rule");

    const ctx = gsap.context(() => {
      gsap.set(letters, { y: 22, opacity: 0 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.to(root, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.7,
            ease: "power4.inOut",
            onComplete: () => setDone(true),
          });
        },
      });

      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.05,
      })
        .to(rule, { scaleX: 1, duration: 0.5 }, "-=0.28")
        .to({}, { duration: 0.4 });
    }, root);

    const hard = window.setTimeout(() => setDone(true), 2800);
    return () => {
      ctx.revert();
      window.clearTimeout(hard);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="preloader"
      ref={rootRef}
      aria-hidden="true"
      role="presentation"
    >
      <div className="preloader__stage">
        <div className="preloader__mark" aria-label="MBONGO">
          {"MBONGO".split("").map((ch, i) => (
            <span className="preloader__letter" key={`${ch}-${i}`}>
              {ch}
            </span>
          ))}
        </div>
        <div className="preloader__rule" />
      </div>
    </div>
  );
}
