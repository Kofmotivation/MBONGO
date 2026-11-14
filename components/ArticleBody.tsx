import Image from "next/image";
import type { BodyBlock } from "@/lib/content";
import { PullQuote } from "./PullQuote";
import { DataModule } from "./DataModule";

export function ArticleBody({ body }: { body: BodyBlock[] }) {
  return (
    <div className="spread-body">
      {body.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "pullquote":
            return (
              <PullQuote
                key={i}
                text={block.text}
                attribution={block.attribution}
              />
            );
          case "fullbleed":
            return (
              <figure className="fullbleed" key={i}>
                <div className="fullbleed__inner">
                  <div className="fullbleed__frame">
                    {block.image ? (
                      <Image
                        src={block.image}
                        alt={block.label}
                        width={1600}
                        height={900}
                        sizes="100vw"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: `linear-gradient(135deg, var(--${block.tone}), var(--bone))`,
                        }}
                        aria-hidden
                      />
                    )}
                  </div>
                  <figcaption className="fullbleed__label">
                    {block.label}
                  </figcaption>
                </div>
              </figure>
            );
          case "data":
            return (
              <DataModule
                key={i}
                headline={block.headline}
                figures={block.figures}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
