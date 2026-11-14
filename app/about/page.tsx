import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about } from "@/lib/content/about";
import "./about.css";

export const metadata: Metadata = {
  title: "About us",
  description: about.whoWeAre.paragraphs[0],
  openGraph: {
    title: "About MBONGO",
    description: about.whoWeAre.paragraphs[0],
    images: [{ url: "/assets/covers/01.png" }],
  },
};

export default function AboutPage() {
  return (
    <article className="about-page">
      <header className="about-page__hero">
        <div className="about-page__hero-copy">
          <p className="kicker">MBONGO</p>
          <h1 className="display">{about.whoWeAre.title}</h1>
          {about.whoWeAre.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <figure className="about-page__hero-media">
          <Image
            src="/assets/covers/01.png"
            alt=""
            width={971}
            height={1619}
            priority
            sizes="(max-width: 960px) 60vw, 320px"
          />
        </figure>
      </header>

      <section className="about-page__do" aria-labelledby="what-we-do">
        <h2 id="what-we-do" className="display">
          {about.whatWeDo.title}
        </h2>
        <div className="about-page__do-grid">
          <div className="about-page__do-copy">
            {about.whatWeDo.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="about-page__links">
              <Link href="/index">Browse the ledger</Link>
              <Link href="/#newsletter">Join MBONGO Weekly</Link>
            </p>
          </div>
          <figure className="about-page__do-media">
            <Image
              src="/assets/covers/02.png"
              alt=""
              width={971}
              height={1619}
              sizes="(max-width: 960px) 50vw, 260px"
            />
          </figure>
        </div>
      </section>

      <section className="about-page__values" aria-labelledby="values-title">
        <div className="about-page__values-head">
          <p className="kicker">The measure of the work</p>
          <h2 id="values-title" className="display">
            Our Core Values
          </h2>
        </div>
        <ol className="about-page__values-list">
          {about.values.map((v, i) => (
            <li className="about-page__value" key={v.name}>
              <span className="about-page__value-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="about-page__value-body">
                <h3 className="display">{v.name}</h3>
                <p>{v.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
