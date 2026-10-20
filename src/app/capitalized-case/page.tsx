import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Capitalized Case Converter – Capitalize Every Word Online",
  description: "Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser. 100% free and private.",
  keywords: "capitalized case converter, capitalize words, capitalize each word, word capitalizer online, start case converter, capitalize first letter of every word, capitalize text online, capitalize names list",
  alternates: {
    canonical: `${BASE}/capitalized-case`,
  },
  openGraph: {
    title: "Capitalized Case Converter – Capitalize Every Word Online",
    description: "Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser. 100% free and private.",
    url: `${BASE}/capitalized-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Capitalized Case Converter – Capitalize Every Word Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capitalized Case Converter – Capitalize Every Word Online",
    description: "Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser. 100% free and private.",
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
        toolName="Capitalized Case Converter"
        url={`${BASE}/capitalized-case`}
        description="Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser with our free online tool."
        faqs={getSeoContent("capitalizedCase", "Capitalized Case Converter").faqs}
      />
      <SingleCaseConverter
        converterKey="capitalizedCase"
        downloadName="capitalizedcase-text.txt"
        heading="Capitalized Case Converter"
        subtitle="Capitalize the first letter of every word automatically. Clean up names, titles, lists, and form fields with one click."
        relatedPostSlugs={[
          "what-is-capitalized-case",
          "how-to-capitalize-a-title-correctly",
          "sentence-case-vs-title-case",
        ]}
        relatedPostsTitle="Capitalization Guides & Helpful Articles"
      />
    </>
  );
}
