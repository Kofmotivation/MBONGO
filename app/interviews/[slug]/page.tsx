import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { JsonLd } from "@/components/JsonLd";
import { OwnershipFooter } from "@/components/OwnershipFooter";
import { Transcript } from "@/components/Transcript";
import { getInterview, interviews } from "@/lib/content";

export function generateStaticParams() {
  return interviews.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const interview = getInterview(slug);
  if (!interview) return {};
  return {
    title: interview.cover.title,
    description: interview.cover.dek,
  };
}

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const interview = getInterview(slug);
  if (!interview) notFound();

  return (
    <article>
      <header className="record-hero">
        <div className="spread-cover" style={{ margin: 0, width: "100%" }}>
          {interview.cover.image ? (
            <Image
              src={interview.cover.image}
              alt=""
              width={971}
              height={1619}
              priority
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          ) : null}
        </div>
        <div>
          <p className="kicker">{interview.cover.eyebrow}</p>
          <h1 className="display">{interview.cover.title}</h1>
          <p className="spread-header__dek">{interview.cover.dek}</p>
          <div className="spread-header__meta">
            <span>
              {interview.subject} · {interview.role}
            </span>
            <span>{interview.byline}</span>
            <span>{interview.readMinutes} min</span>
          </div>
        </div>
      </header>

      {interview.framing ? <ArticleBody body={interview.framing} /> : null}

      <Transcript rows={interview.transcript} />

      <OwnershipFooter
        related={interview.related}
        people={interview.people}
        businesses={interview.businesses}
        nextCover={interview.nextCover}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: interview.cover.title,
          description: interview.cover.dek,
          datePublished: interview.publishedAt,
          author: { "@type": "Organization", name: "MBONGO" },
        }}
      />
    </article>
  );
}
