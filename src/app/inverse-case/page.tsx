import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Inverse Case Converter — Free Online Tool",
  description: "Flip the case of every character — uppercase becomes lowercase and vice versa. Free online inverse case / toggle case converter tool.",
  keywords: "inverse case converter, toggle case, flip case, alternating case text converter online",
  alternates: {
    canonical: `${BASE}/inverse-case`,
  },
  openGraph: {
    title: "Inverse Case Converter — Free Online Tool",
    description: "Flip the case of every character — uppercase becomes lowercase and vice versa. Free online inverse case / toggle case converter tool.",
    url: `${BASE}/inverse-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Inverse Case Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inverse Case Converter — Free Online Tool",
    description: "Flip the case of every character — uppercase becomes lowercase and vice versa. Free online inverse case / toggle case converter tool.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import SingleCaseConverter from "@/components/SingleCaseConverter";

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Inverse Case Converter", "url": "https://www.casetivo.com/inverse-case", "description": "Flip the case of every character instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "Inverse Case Converter", "item": "https://www.casetivo.com/inverse-case"}]}) }} />
    <SingleCaseConverter
      converterKey="inverseCase"
      downloadName="inversecase-text.txt"
    />
    </>
  );
}
