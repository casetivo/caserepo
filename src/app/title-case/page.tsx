import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Title Case Converter – Headline Capitalization",
  description: "Convert headlines, book titles, and essays to proper Title Case automatically. Minor prepositions and articles stay lowercase. 100% free and private.",
  alternates: {
    canonical: `${BASE}/title-case`,
  },
  openGraph: {
    title: "Title Case Converter – Headline Capitalization",
    description: "Convert headlines, book titles, and essays to proper Title Case automatically. Minor prepositions and articles stay lowercase. 100% free and private.",
    url: `${BASE}/title-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Title Case Converter – Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Title Case Converter – Headline Capitalization",
    description: "Convert headlines, book titles, and essays to proper Title Case automatically. Minor prepositions and articles stay lowercase. 100% free and private.",
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
        toolName="Title Case Converter"
        url={`${BASE}/title-case`}
        description="Convert headlines, titles, and text to proper Title Case automatically. Follows standard editorial rules with minor words kept lowercase. Free online tool."
        faqs={getSeoContent("titleCase", "Title Case Converter").faqs}
      />
      <SingleCaseConverter
        converterKey="titleCase"
        downloadName="titlecase-text.txt"
        heading="Title Case Converter"
        subtitle="Format article headlines, book titles, and essays into proper title case automatically. Minor prepositions and articles stay lowercase according to editorial rules."
        relatedPostSlugs={[
          "how-to-capitalize-a-title-correctly",
          "sentence-case-vs-title-case",
          "what-is-capitalized-case",
        ]}
        relatedPostsTitle="Headline & Title Capitalization Guides"
      />
    </>
  );
}
