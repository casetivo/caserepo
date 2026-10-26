import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Choice Generator — Pick a Random Item Free",
  description: "Randomly pick one item from your list. Add as many choices as you want, one per line. Free online random choice picker and decision maker.",
  alternates: {
    canonical: `${BASE}/random-choice-generator`,
  },
  openGraph: {
    title: "Random Choice Generator — Pick a Random Item Free",
    description: "Randomly pick one item from your list. Add as many choices as you want, one per line. Free online random choice picker and decision maker.",
    url: `${BASE}/random-choice-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Choice Generator — Pick a Random Item Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Choice Generator — Pick a Random Item Free",
    description: "Randomly pick one item from your list. Add as many choices as you want, one per line. Free online random choice picker and decision maker.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Random Choice Generator" url={`${BASE}/random-choice-generator`} description="Randomly pick one item from your list. Add as many choices as you want, one per line. Free online random choice picker and decision maker." faqs={getSeoContent("random-choice-generator", "Random Choice Generator").faqs} />

      <ClientPage />
    </>
  );
}
