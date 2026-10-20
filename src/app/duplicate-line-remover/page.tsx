import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Duplicate Line Remover – Remove Repeated Lines Online",
  description: "Remove duplicate lines from text, lists, and CSV files instantly. Preserves original order with options for case-sensitivity. 100% free, secure & private.",
  keywords: "duplicate line remover, remove duplicate lines, text deduplication, deduplicate list online, remove duplicate rows, email list cleaner, clean duplicate text, unique lines finder, remove repeated lines, line deduplicator",
  alternates: {
    canonical: `${BASE}/duplicate-line-remover`,
  },
  openGraph: {
    title: "Duplicate Line Remover – Remove Repeated Lines Online",
    description: "Remove duplicate lines from text, lists, and CSV files instantly. Preserves original order with options for case-sensitivity. 100% free, secure & private.",
    url: `${BASE}/duplicate-line-remover`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Duplicate Line Remover – Remove Repeated Lines Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duplicate Line Remover – Remove Repeated Lines Online",
    description: "Remove duplicate lines from text, lists, and CSV files instantly. Preserves original order with options for case-sensitivity. 100% free, secure & private.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup
        toolName="Duplicate Line Remover"
        url={`${BASE}/duplicate-line-remover`}
        description="Remove duplicate lines from text, lists, and CSV files instantly. Preserves original line sequence with optional case sensitivity and whitespace trimming. Free, secure, client-side processing."
        faqs={getSeoContent("duplicateLineRemover", "Duplicate Line Remover").faqs}
      />

      <ClientPage />
    </>
  );
}
