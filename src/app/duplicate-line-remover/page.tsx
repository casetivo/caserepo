import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Duplicate Line Remover — Free Online Tool",
  description: "Remove duplicate lines from text instantly. Paste your list or document and get unique lines only. Free online duplicate line remover.",
  keywords: "remove duplicate lines, duplicate line remover, unique lines tool, deduplicate text online",
  alternates: {
    canonical: `${BASE}/duplicate-line-remover`,
  },
  openGraph: {
    title: "Duplicate Line Remover — Free Online Tool",
    description: "Remove duplicate lines from text instantly. Paste your list or document and get unique lines only. Free online duplicate line remover.",
    url: `${BASE}/duplicate-line-remover`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Duplicate Line Remover — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duplicate Line Remover — Free Online Tool",
    description: "Remove duplicate lines from text instantly. Paste your list or document and get unique lines only. Free online duplicate line remover.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Duplicate Line Remover" url={`${BASE}/duplicate-line-remover`} description="Remove duplicate lines from text instantly. Paste your list or document and get unique lines only. Free online duplicate line remover." faqs={getSeoContent("duplicate-line-remover", "Duplicate Line Remover").faqs} />

      <ClientPage />
    </>
  );
}
