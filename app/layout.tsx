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
