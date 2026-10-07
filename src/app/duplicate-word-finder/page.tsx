import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Duplicate Word Finder — Free Online Tool",
  description: "Find and count all duplicate words in your text instantly. Shows frequency of each repeated word. Free online duplicate word finder and counter.",
  keywords: "duplicate word finder, find duplicate words, word frequency counter, repeated words finder online",
  alternates: {
    canonical: `${BASE}/duplicate-word-finder`,
  },
  openGraph: {
    title: "Duplicate Word Finder — Free Online Tool",
    description: "Find and count all duplicate words in your text instantly. Shows frequency of each repeated word. Free online duplicate word finder and counter.",
    url: `${BASE}/duplicate-word-finder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Duplicate Word Finder — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duplicate Word Finder — Free Online Tool",
    description: "Find and count all duplicate words in your text instantly. Shows frequency of each repeated word. Free online duplicate word finder and counter.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Duplicate Word Finder</h1>
      <SchemaMarkup toolName="Duplicate Word Finder" url={`${BASE}/duplicate-word-finder`} description="Find and count all duplicate words in your text instantly. Shows frequency of each repeated word. Free online duplicate word finder and counter." faqs={getSeoContent("duplicate-word-finder", "Duplicate Word Finder").faqs} />
      <ClientPage />
    </>
  );
}
