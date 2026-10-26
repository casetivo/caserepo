import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Uppercase Converter — Free Online ALL CAPS Tool",
  description: "Convert text to uppercase instantly. Turn any text into ALL CAPS for legal documents, headlines, code constants, and more. Free and private.",
  alternates: {
    canonical: `${BASE}/upper-case`,
  },
  openGraph: {
    title: "Uppercase Converter — Free Online ALL CAPS Tool",
    description: "Convert text to uppercase instantly. Turn any text into ALL CAPS for legal documents, headlines, code constants, and more. Free and private.",
    url: `${BASE}/upper-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Uppercase Converter — Free Online ALL CAPS Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uppercase Converter — Free Online ALL CAPS Tool",
    description: "Convert text to uppercase instantly. Turn any text into ALL CAPS for legal documents, headlines, code constants, and more. Free and private.",
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
        toolName="Uppercase Converter"
        url={`${BASE}/upper-case`}
        description="Convert any text to uppercase instantly. Transform text to ALL CAPS for legal documents, headlines, programming constants, and more."
        faqs={getSeoContent("upperCase", "Uppercase Converter").faqs}
      />
      <SingleCaseConverter
        converterKey="upperCase"
        downloadName="uppercase-text.txt"
        subtitle="Transform every letter to ALL CAPS instantly. Format text for legal documents, headlines, programming constants, and signage with one click."
      />
    </>
  );
}

