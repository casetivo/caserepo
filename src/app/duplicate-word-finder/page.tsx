import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Duplicate Word Finder – Find Repeated Words",
  description: "Find and count repeated words in your essays, articles, and copy. Spot overused crutch words and vocabulary repetition instantly. 100% free and private.",
  alternates: {
    canonical: `${BASE}/duplicate-word-finder`,
  },
  openGraph: {
    title: "Duplicate Word Finder – Find Repeated Words",
    description: "Find and count repeated words in your essays, articles, and copy. Spot overused crutch words and vocabulary repetition instantly. 100% free and private.",
    url: `${BASE}/duplicate-word-finder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Duplicate Word Finder – Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duplicate Word Finder – Find Repeated Words",
    description: "Find and count repeated words in your essays, articles, and copy. Spot overused crutch words and vocabulary repetition instantly. 100% free and private.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup
        toolName="Duplicate Word Finder"
        url={`${BASE}/duplicate-word-finder`}
        description="Find and count repeated words in your essays, articles, and copy. Spot overused crutch words and vocabulary repetition instantly. Free online tool."
        faqs={getSeoContent("duplicateWordFinder", "Duplicate Word Finder").faqs}
      />
      <ClientPage />
    </>
  );
}
