import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Sort Words Alphabetically Online — Instant A to Z List Sorter",
  description: "Alphabetize words, names, lists, or lines instantly with Casetivo's free online sorting tool. Supports A-Z, Z-A, natural numeric sorting, and deduplication.",
  keywords: "sort words alphabetically, alphabetize list, word sorter online, sort lines alphabetically, alphabetical order tool, a to z sorter, natural sort online",
  alternates: {
    canonical: `${BASE}/sort-words-alphabetically`,
  },
  openGraph: {
    title: "Sort Words Alphabetically Online — Instant A to Z List Sorter",
    description: "Alphabetize words, names, lists, or lines instantly with Casetivo's free online sorting tool. Supports A-Z, Z-A, natural numeric sorting, and deduplication.",
    url: `${BASE}/sort-words-alphabetically`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sort Words Alphabetically — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sort Words Alphabetically Online — Instant A to Z List Sorter",
    description: "Alphabetize words, names, lists, or lines instantly with Casetivo's free online sorting tool. Supports A-Z, Z-A, natural numeric sorting, and deduplication.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("sort-words-alphabetically", "Sort Words Alphabetically");

  return (
    <>
      <SchemaMarkup
        toolName="Sort Words Alphabetically"
        url={`${BASE}/sort-words-alphabetically`}
        description="Alphabetize words, names, lists, or lines instantly with Casetivo's free online sorting tool. Supports A-Z, Z-A, natural numeric sorting, and deduplication."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
