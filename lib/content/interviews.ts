import type { Interview } from "./types";

export const interviews: Interview[] = [
  {
    slug: "the-architect-of-patient-capital",
    section: "wealth",
    format: "interview",
    cover: {
      eyebrow: "The Record · Interview",
      title: "The Architect of Patient Capital",
      dek: "A conversation on ownership, self-reliance, and capital that does not flinch at African timelines.",
      image: "/assets/covers/04.png",
      tone: "olive",
    },
    byline: "Interview by MBONGO",
    publishedAt: "2026-11-07",
    readMinutes: 16,
    subject: "Imani Diallo",
    role: "Managing Partner, Horizon Sankofa",
    people: ["Imani Diallo"],
    businesses: ["Horizon Sankofa"],
    related: ["the-nyerere-equation", "the-colonized-subconscious"],
    nextCover: "before-the-colonial-economy",
    framing: [
      {
        type: "p",
        text: "Nyerere asked what happens when a country begins development by searching for money it does not possess. Imani Diallo asks the same of founders — and of the funds that claim to back them. We sat down to talk ownership, prestige, and patient capital.",
      },
    ],
    transcript: [
      {
        speaker: "q",
        text: "MBONGO frames wealth as knowledge, ownership, cultural influence, and legacy. Where do you start when a founder walks in?",
      },
      {
        speaker: "a",
        text: "I start with who owns what on day one — and who will own it on day three thousand. If the cap table already tells a story of extraction, the product story can wait. Ownership is the plot.",
      },
      {
        speaker: "q",
        text: "Nyerere warned that financing can make independence conditional. How does that map onto venture capital?",
      },
      {
        speaker: "a",
        text: "If your runway depends on someone else’s patience, your strategy will start sounding like their thesis. Patient capital means term sheets that survive currency shock, boards that know corridor risk, and preferences that do not punish survival.",
      },
      {
        speaker: "q",
        text: "Our editorial on the colonized subconscious argues prestige still arrives from elsewhere. Do you see that in founder behavior?",
      },
      {
        speaker: "a",
        text: "Constantly. A European endorsement still unlocks local belief too often. We underwrite craft you can audit in the market — logistics cleared with integrity, schools that retain teachers, beauty networks that train owners — not applause that must be imported.",
      },
      {
        speaker: "q",
        text: "What should diaspora readers demand when they invest?",
      },
      {
        speaker: "a",
        text: "Information rights. Clear use of proceeds. Partnership with people who live the market daily. Pride without paperwork is romance. Pride with a ledger is power.",
      },
      {
        speaker: "q",
        text: "What should someone remember when they close this Record?",
      },
      {
        speaker: "a",
        text: "Money is a tool for legacy, not a costume for arrival. If your children cannot name what you own — equity, land, IP, institutions — the cover story was incomplete.",
      },
    ],
  },
];

export function getInterview(slug: string): Interview | undefined {
  return interviews.find((i) => i.slug === slug);
}
