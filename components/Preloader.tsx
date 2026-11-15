"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/motion/register";
import { prefersReducedMotion } from "@/lib/motion/reduced";

/** Absolute ceiling — never leave the logo overlay up longer than this. */
const FAILSAFE_MS = 2600;

function unlockScroll() {
  const html = document.documentElement;
  const body = document.body;
  html.style.removeProperty("overflow");
  body.style.removeProperty("overflow");
  // Clear any leftover lock from a prior visit / failed hydration.
  if (html.style.overflow === "hidden") html.style.overflow = "";
  if (body.style.overflow === "hidden") body.style.overflow = "";
}

function markDomDone(root: HTMLElement | null) {
  const el =
    root ?? document.querySelector<HTMLElement>("[data-mbongo-preloader]");
  if (!el) return;
  el.classList.add("is-done");
  el.style.opacity = "0";
  el.style.visibility = "hidden";
  el.style.pointerEvents = "none";
}

/**
 * Preloader — MBONGO wordmark only: letters settle, brass rule draws, fade/lift away.
 * Must never block the site: failsafe dismiss + scroll unlock even if GSAP/iOS fails.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      markDomDone(rootRef.current);
      unlockScroll();
      setDone(true);
    };

    // Arm failsafe before any GSAP / DOM work so a throw cannot leave us stuck.
    const hard = window.setTimeout(finish, FAILSAFE_MS);

    // Inline layout script may have already cleared a stuck splash.
    if (document.documentElement.dataset.mbongoPreloaderDone === "1") {
      finish();
      return () => window.clearTimeout(hard);
    }

    if (prefersReducedMotion()) {
      finish();
      return () => window.clearTimeout(hard);
    }

    const root = rootRef.current;
    if (!root) {
      finish();
      return () => window.clearTimeout(hard);
    }

    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    let ctx: { revert: () => void } | null = null;

    try {
      const { gsap } = getGsap();
      const stage = root.querySelector(".preloader__stage");
      const letters = root.querySelectorAll(".preloader__letter");
      const rule = root.querySelector(".preloader__rule");

      if (!stage || letters.length === 0 || !rule) {
        finish();
        return () => {
          window.clearTimeout(hard);
          unlockScroll();
        };
      }

      ctx = gsap.context(() => {
        gsap.set(letters, { y: 22, opacity: 0 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "center center" });

        // Single timeline — exit is part of the same chain so onComplete is reliable.
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: finish,
        });

        tl.to(letters, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.045,
        })
          .to(rule, { scaleX: 1, duration: 0.4 }, "-=0.22")
          .to({}, { duration: 0.22 })
          .to(stage, {
            y: -22,
            opacity: 0,
            duration: 0.4,
            ease: "power3.inOut",
          })
          .to(
            root,
            {
              opacity: 0,
              duration: 0.4,
              ease: "power3.inOut",
            },
            "<0.05"
          );
      }, root);
    } catch {
      finish();
    }

    return () => {
      window.clearTimeout(hard);
      try {
        ctx?.revert();
      } catch {
        /* ignore */
      }
      unlockScroll();
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="preloader"
      ref={rootRef}
      data-mbongo-preloader=""
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
