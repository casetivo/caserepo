import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Sentence Case Converter – Fix ALL CAPS Text Online",
  description: "Convert ALL CAPS or inconsistent text to readable sentence case online. Preserve URLs and common technical terms. Free, private, no sign-up required.",
  keywords: "sentence case converter, convert to sentence case, sentence case tool, sentence case generator, sentence capitalization, capitalize first letter, fix all caps, sentence case formatter, convert uppercase to sentence case, proper sentence capitalization, online capitalization tool, text case converter, text formatting, grammar tool, capitalization rules, writing tool, paragraph formatting, English capitalization",
  alternates: {
    canonical: `${BASE}/sentence-case`,
  },
  openGraph: {
    title: "Sentence Case Converter – Fix ALL CAPS Text Online",
    description: "Convert ALL CAPS or inconsistent text to readable sentence case online. Preserve URLs and common technical terms. Free, private, no sign-up required.",
    url: `${BASE}/sentence-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sentence Case Converter – Fix ALL CAPS Text Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentence Case Converter – Fix ALL CAPS Text Online",
    description: "Convert ALL CAPS or inconsistent text to readable sentence case online. Preserve URLs and common technical terms. Free, private, no sign-up required.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import SingleCaseConverter from "@/components/SingleCaseConverter";

export default function Page() {
  return (
    <>
      <SchemaMarkup
        toolName="Sentence Case Converter"
        url={`${BASE}/sentence-case`}
        description="Convert ALL CAPS or inconsistent prose to sentence case. Preserves URLs, email addresses, and common technical terms while capitalizing each sentence start."
        faqs={getSeoContent("sentenceCase", "Sentence Case Converter").faqs}
      />
      <SingleCaseConverter
        converterKey="sentenceCase"
        downloadName="sentencecase-text.txt"
        heading="Sentence Case Converter"
        subtitle="Convert ALL CAPS or inconsistent text into readable sentence case in one click. URLs, email addresses, and common technical terms are preserved."
      />
    </>
  );
}
