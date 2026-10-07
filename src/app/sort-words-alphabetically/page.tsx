import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Sort Words Alphabetically — Free Online Tool",
  description: "Sort words, lines, or lists alphabetically in ascending or descending order. Free online word sorter and alphabetizer tool.",
  keywords: "sort words alphabetically, alphabetize words, word sorter online, alphabetical order tool free",
  alternates: {
    canonical: `${BASE}/sort-words-alphabetically`,
  },
  openGraph: {
    title: "Sort Words Alphabetically — Free Online Tool",
    description: "Sort words, lines, or lists alphabetically in ascending or descending order. Free online word sorter and alphabetizer tool.",
    url: `${BASE}/sort-words-alphabetically`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sort Words Alphabetically — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sort Words Alphabetically — Free Online Tool",
    description: "Sort words, lines, or lists alphabetically in ascending or descending order. Free online word sorter and alphabetizer tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Sort Words Alphabetically</h1>
      <SchemaMarkup toolName="Sort Words Alphabetically" url={`${BASE}/sort-words-alphabetically`} description="Sort words, lines, or lists alphabetically in ascending or descending order. Free online word sorter and alphabetizer tool." faqs={getSeoContent("sort-words-alphabetically", "Sort Words Alphabetically").faqs} />
      <ClientPage />
    </>
  );
}
