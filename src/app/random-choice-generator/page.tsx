import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Choice Generator Online – Fair Picker & Decision Maker | Casetivo",
  description:
    "Make unbiased decisions instantly. Randomly select one or multiple items from any list with cryptographic fairness, duplicate controls, and zero server uploads. Free.",
  keywords: [
    "random choice generator",
    "random decision maker",
    "pick random item from list",
    "random name picker",
    "raffle winner picker",
    "unbiased choice selector",
    "random list picker",
    "online decision spinner",
  ],
  alternates: {
    canonical: `${BASE}/random-choice-generator`,
  },
  openGraph: {
    title: "Random Choice Generator Online – Fair Picker & Decision Maker | Casetivo",
    description:
      "Make unbiased decisions instantly. Randomly select one or multiple items from any list with cryptographic fairness.",
    url: `${BASE}/random-choice-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Choice Generator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Choice Generator Online – Fair Picker & Decision Maker | Casetivo",
    description:
      "Make unbiased decisions instantly. Randomly select one or multiple items from any list with cryptographic fairness.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("random-choice-generator", "Random Choice Generator");

  return (
    <>
      <SchemaMarkup
        toolName="Random Choice Generator"
        url={`${BASE}/random-choice-generator`}
        description="Pick unbiased choices from custom lists using Web Cryptography CSPRNG. Features multi-item draws, duplicate controls, and preset libraries."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
