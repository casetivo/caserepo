import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Sentence Rewriter — Clean Up & Clarify Writing",
  description: "Rewrite sentences by stripping filler words, trimming wordy corporate jargon, and eliminating redundancies. 100% free, private online sentence clarifier.",
  alternates: {
    canonical: `${BASE}/sentence-rewriter`,
  },
  openGraph: {
    title: "Sentence Rewriter — Clean Up & Clarify Writing",
    description: "Rewrite sentences by stripping filler words, trimming wordy corporate jargon, and eliminating redundancies. 100% free, private online sentence clarifier.",
    url: `${BASE}/sentence-rewriter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sentence Rewriter Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentence Rewriter — Clean Up & Clarify Writing",
    description: "Rewrite sentences by stripping filler words, trimming wordy corporate jargon, and eliminating redundancies. 100% free, private online sentence clarifier.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("sentence-rewriter", "Sentence Rewriter");

  return (
    <>
      <SchemaMarkup
        toolName="Sentence Rewriter"
        url={`${BASE}/sentence-rewriter`}
        description="Rewrite sentences by stripping filler words, trimming wordy corporate jargon, and eliminating redundancies. 100% free, private online sentence clarifier."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
