"use client";

import { FormEvent, useState } from "react";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("ok");
  }

  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <h2 className="newsletter__title" id="newsletter-title">
        MBONGO Weekly
      </h2>
      <form className="newsletter__form" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="email">
          Your email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          autoComplete="email"
        />
        <button type="submit" aria-label="Join our newsletter">
          →
        </button>
      </form>
      <p className="newsletter__hint">
        {status === "ok"
          ? "Thank you — you are on the list."
          : "Join our newsletter"}
      </p>
    </section>
  );
}
