import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Sentence Case Converter — Free Online Tool",
  description: "Convert text to sentence case instantly with our free Sentence Case Converter. Fix ALL CAPS text, capitalize sentences correctly, and format paragraphs online in seconds.",
  keywords: "sentence case converter, convert to sentence case, sentence case tool, sentence case generator, sentence capitalization, capitalize first letter, fix all caps, sentence case formatter, convert uppercase to sentence case, proper sentence capitalization, online capitalization tool, text case converter, text formatting, grammar tool, capitalization rules, writing tool, paragraph formatting, English capitalization",
  alternates: {
    canonical: `${BASE}/sentence-case`,
  },
  openGraph: {
    title: "Sentence Case Converter — Free Online Tool",
    description: "Convert text to sentence case instantly with our free Sentence Case Converter. Fix ALL CAPS text, capitalize sentences correctly, and format paragraphs online in seconds.",
    url: `${BASE}/sentence-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sentence Case Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentence Case Converter — Free Online Tool",
    description: "Convert text to sentence case instantly with our free Sentence Case Converter. Fix ALL CAPS text, capitalize sentences correctly, and format paragraphs online in seconds.",
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
        description="Convert text to sentence case instantly. Capitalizes the first letter of every sentence automatically. Free, fast, and works in 14 languages."
        faqs={getSeoContent("sentenceCase", "Sentence Case Converter").faqs}
      />
      <SingleCaseConverter
        converterKey="sentenceCase"
        downloadName="sentencecase-text.txt"
        subtitle="Instantly format your text to standard sentence case rules. Fix ALL CAPS and grammar errors with a single click."
      />
    </>
  );
}
