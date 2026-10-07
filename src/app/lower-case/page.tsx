import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Lowercase Converter — Free Online Tool",
  description: "Convert text to lowercase instantly with our free Lowercase Converter. Fix ALL CAPS, normalize emails, generate URL slugs, and clean up messy text formatting online in seconds.",
  keywords: "lowercase converter, convert to lowercase, lowercase text, lowercase generator, text to lowercase online, convert uppercase to lowercase, small letters converter, fix all caps, lowercase formatter, text case converter, data normalization tool, email lowercase, URL slug generator, text formatting, capitalization tool",
  alternates: {
    canonical: `${BASE}/lower-case`,
  },
  openGraph: {
    title: "Lowercase Converter — Free Online Tool",
    description: "Convert text to lowercase instantly with our free Lowercase Converter. Fix ALL CAPS, normalize emails, generate URL slugs, and clean up messy text formatting online in seconds.",
    url: `${BASE}/lower-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lowercase Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lowercase Converter — Free Online Tool",
    description: "Convert text to lowercase instantly with our free Lowercase Converter. Fix ALL CAPS, normalize emails, generate URL slugs, and clean up messy text formatting online in seconds.",
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
        toolName="Lowercase Converter"
        url={`${BASE}/lower-case`}
        description="Convert any text to lowercase instantly. Fix ALL CAPS, normalize data, and clean up messy formatting with this free online tool."
        faqs={getSeoContent("lowerCase", "Lowercase Converter").faqs}
      />
      <SingleCaseConverter
        converterKey="lowerCase"
        downloadName="lowercase-text.txt"
        subtitle="Convert every letter to lowercase instantly. Fix ALL CAPS, normalize data, and clean up messy text with one click."
      />
    </>
  );
}

