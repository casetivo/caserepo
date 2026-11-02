import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Capitalized Case Converter – Capitalize Each Word",
  description: "Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser. 100% free and private.",
  alternates: {
    canonical: `${BASE}/capitalized-case`,
  },
  openGraph: {
    title: "Capitalized Case Converter – Capitalize Each Word",
    description: "Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser. 100% free and private.",
    url: `${BASE}/capitalized-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Capitalized Case Converter – Capitalize Each Word" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capitalized Case Converter – Capitalize Each Word",
    description: "Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser. 100% free and private.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import SingleCaseConverter from "@/components/SingleCaseConverter";
import RecentBlogPosts from "@/components/RecentBlogPosts";

export default function Page() {
  const seo = getSeoContent("capitalizedCase", "Capitalized Case Converter");
  const relatedSlugs = [
    "what-is-capitalized-case",
    "how-to-capitalize-a-title-correctly",
    "sentence-case-vs-title-case",
  ];
  const relatedTitle = "Capitalization Guides & Helpful Articles";

  return (
    <>
      <SchemaMarkup
        toolName="Capitalized Case Converter"
        url={`${BASE}/capitalized-case`}
        description="Capitalize the first letter of every word automatically. Clean up customer names, titles, lists, and form fields in your browser with our free online tool."
        faqs={seo.faqs}
      />
      <SingleCaseConverter
        converterKey="capitalizedCase"
        downloadName="capitalizedcase-text.txt"
        heading="Capitalized Case Converter"
        subtitle="Capitalize the first letter of every word automatically. Clean up names, titles, lists, and form fields with one click."
        seoTitle={seo.title}
        seoContent={seo.content}
        seoFaqs={seo.faqs}
        recentBlogPostsSlot={<RecentBlogPosts postSlugs={relatedSlugs} title={relatedTitle} />}
      />
    </>
  );
}
