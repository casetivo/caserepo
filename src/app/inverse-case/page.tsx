import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import SingleCaseConverter from "@/components/SingleCaseConverter";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Inverse Case Converter — Flip Letter Casing",
  description: "Flip the case of every character — uppercase becomes lowercase and lowercase becomes uppercase. Fix accidental Caps Lock mistakes instantly. Free and private.",
  alternates: {
    canonical: `${BASE}/inverse-case`,
  },
  openGraph: {
    title: "Inverse Case Converter — Flip Letter Casing",
    description: "Flip the case of every character — uppercase becomes lowercase and lowercase becomes uppercase. Fix accidental Caps Lock mistakes instantly. Free and private.",
    url: `${BASE}/inverse-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Inverse Case Converter Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inverse Case Converter — Flip Letter Casing",
    description: "Flip the case of every character — uppercase becomes lowercase and lowercase becomes uppercase. Fix accidental Caps Lock mistakes instantly. Free and private.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("inverseCase", "Inverse Case Converter");

  return (
    <>
      <SchemaMarkup
        toolName="Inverse Case Converter"
        url={`${BASE}/inverse-case`}
        description="Flip the case of every character — uppercase becomes lowercase and lowercase becomes uppercase. Fix accidental Caps Lock mistakes instantly. Free and private."
        faqs={seoData.faqs}
      />
      <SingleCaseConverter
        converterKey="inverseCase"
        downloadName="inversecase-text.txt"
        relatedPostSlugs={[
          "sentence-case-vs-title-case",
          "what-is-capitalized-case",
          "uppercase-vs-lowercase-when-to-use-each",
        ]}
        relatedPostsTitle="Case Converter & Typography Guides"
      />
    </>
  );
}
