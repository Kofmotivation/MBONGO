import type { Metadata } from "next";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach MBONGO — editorial, partnerships, and the weekly letter.",
};

export default function ContactPage() {
  return (
    <>
      <div className="page-prose">
        <p className="kicker">Utility</p>
        <h1 className="display">Contact</h1>
        <p>
          For editorial notes, partnerships, and corrections, write to{" "}
          <a href="mailto:hello@mbongo.example">hello@mbongo.example</a>. For
          the weekly letter, join below — the quiet way into each issue.
        </p>
      </div>
      <Newsletter />
    </>
  );
}
