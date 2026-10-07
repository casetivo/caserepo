import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Title Case Converter — Free Online Tool",
  description: "Convert text to proper Title Case following standard English rules. Minor words stay lowercase automatically. Free online title case converter.",
  keywords: "title case converter, title case tool, proper title case, headline case converter online",
  alternates: {
    canonical: `${BASE}/title-case`,
  },
  openGraph: {
    title: "Title Case Converter — Free Online Tool",
    description: "Convert text to proper Title Case following standard English rules. Minor words stay lowercase automatically. Free online title case converter.",
    url: `${BASE}/title-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Title Case Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Title Case Converter — Free Online Tool",
    description: "Convert text to proper Title Case following standard English rules. Minor words stay lowercase automatically. Free online title case converter.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import SingleCaseConverter from "@/components/SingleCaseConverter";

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Title Case Converter", "url": "https://www.casetivo.com/title-case", "description": "Convert text to proper Title Case.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "Title Case Converter", "item": "https://www.casetivo.com/title-case"}]}) }} />
    <SingleCaseConverter
      converterKey="titleCase"
      downloadName="titlecase-text.txt"
    />
    </>
  );
}
