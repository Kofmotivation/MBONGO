import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { JsonLd } from "@/components/JsonLd";
import { OwnershipFooter } from "@/components/OwnershipFooter";
import { articles, getArticle } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.cover.title,
    description: article.cover.dek,
    openGraph: {
      title: article.cover.title,
      description: article.cover.dek,
      type: "article",
      images: article.cover.image ? [{ url: article.cover.image }] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article>
      <header className="spread-header">
        <p className="kicker">{article.cover.eyebrow}</p>
        <h1 className="display">{article.cover.title}</h1>
        <p className="spread-header__dek">{article.cover.dek}</p>
        <div className="spread-header__meta">
          <span>{article.byline}</span>
          <span>
            {new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(article.publishedAt))}
          </span>
          <span>{article.readMinutes} min read</span>
          <span>{article.section}</span>
        </div>
      </header>

      {article.cover.image ? (
        <div className="spread-cover">
          <Image
            src={article.cover.image}
            alt=""
            width={971}
            height={1619}
            priority
            sizes="420px"
          />
        </div>
      ) : null}

      <ArticleBody body={article.body} />

      <OwnershipFooter
        related={article.related}
        people={article.people}
        businesses={article.businesses}
        nextCover={article.nextCover}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.cover.title,
          description: article.cover.dek,
          datePublished: article.publishedAt,
          author: { "@type": "Person", name: article.byline },
          image: article.cover.image,
          articleSection: article.section,
        }}
      />
    </article>
  );
}
