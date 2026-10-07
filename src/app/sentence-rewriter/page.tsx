import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Sentence Rewriter — Free Online Tool",
  description: "Rewrite sentences by removing filler words like 'very', 'basically', and 'literally' for cleaner, more professional writing. Free online tool.",
  keywords: "sentence rewriter, remove filler words, clean up writing, rewrite sentences online free",
  alternates: {
    canonical: `${BASE}/sentence-rewriter`,
  },
  openGraph: {
    title: "Sentence Rewriter — Free Online Tool",
    description: "Rewrite sentences by removing filler words like 'very', 'basically', and 'literally' for cleaner, more professional writing. Free online tool.",
    url: `${BASE}/sentence-rewriter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sentence Rewriter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentence Rewriter — Free Online Tool",
    description: "Rewrite sentences by removing filler words like 'very', 'basically', and 'literally' for cleaner, more professional writing. Free online tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Sentence Rewriter" url={`${BASE}/sentence-rewriter`} description="Rewrite sentences by removing filler words like 'very', 'basically', and 'literally' for cleaner, more professional writing. Free online tool." faqs={getSeoContent("sentence-rewriter", "Sentence Rewriter").faqs} />

      <ClientPage />
    </>
  );
}
