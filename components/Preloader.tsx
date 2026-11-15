"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/motion/register";
import { prefersReducedMotion } from "@/lib/motion/reduced";

/**
 * Preloader — MBONGO wordmark only: letters settle, brass rule draws, fade/lift away.
 * Avoids iOS clip-path + overflow shift that clipped the leading “M”.
 */
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

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const { gsap } = getGsap();
    const stage = root.querySelector(".preloader__stage");
    const letters = root.querySelectorAll(".preloader__letter");
    const rule = root.querySelector(".preloader__rule");

    const finish = () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      setDone(true);
    };

    const ctx = gsap.context(() => {
      gsap.set(letters, { y: 22, opacity: 0 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "center center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.to(stage, {
            y: -28,
            opacity: 0,
            duration: 0.55,
            ease: "power3.inOut",
          });
          gsap.to(root, {
            opacity: 0,
            duration: 0.55,
            ease: "power3.inOut",
            delay: 0.08,
            onComplete: finish,
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
        .to({}, { duration: 0.35 });
    }, root);

    const hard = window.setTimeout(finish, 3200);
    return () => {
      ctx.revert();
      window.clearTimeout(hard);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
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
