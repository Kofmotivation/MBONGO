import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Masthead } from "@/components/Masthead";
import { Preloader } from "@/components/Preloader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mbongo.example"),
  title: {
    default: "MBONGO — Wealth, Business, Culture, Money",
    template: "%s · MBONGO",
  },
  description:
    "MBONGO is a media platform exploring wealth, business, culture and money across Africa and the global Black diaspora.",
  openGraph: {
    type: "website",
    siteName: "MBONGO",
    title: "MBONGO",
    description:
      "Wealth as knowledge, ownership, cultural influence, and legacy.",
    images: [{ url: "/assets/covers/01.png" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>
        {/*
          Pre-React failsafe: if hydration/GSAP never runs (slow iOS, blocked JS),
          still dismiss the logo overlay and unlock scroll within ~2.6s.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var MS=2600;function unlock(){try{document.documentElement.style.removeProperty("overflow");document.body.style.removeProperty("overflow")}catch(e){}}function kill(){try{document.documentElement.dataset.mbongoPreloaderDone="1";var el=document.querySelector("[data-mbongo-preloader],.preloader");if(el){el.classList.add("is-done");el.style.opacity="0";el.style.visibility="hidden";el.style.pointerEvents="none"}unlock()}catch(e){unlock()}}setTimeout(kill,MS)})();`,
          }}
        />
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Preloader />
          <div className="site-shell">
            <Masthead />
            <main id="main" className="site-main">
              {children}
            </main>
          </div>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MBONGO",
              url: "https://mbongo.example",
              description:
                "Media platform exploring wealth, business, culture and money across Africa and the global Black diaspora.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://mbongo.example/ledger?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
