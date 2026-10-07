import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Capitalized Case Converter — Free Online Tool",
  description: "Capitalize the first letter of every word in your text instantly. Free online word capitalizer — ideal for titles, names, and headings.",
  keywords: "capitalize words, capitalized case converter, capitalize each word, word capitalizer online",
  alternates: {
    canonical: `${BASE}/capitalized-case`,
  },
  openGraph: {
    title: "Capitalized Case Converter — Free Online Tool",
    description: "Capitalize the first letter of every word in your text instantly. Free online word capitalizer — ideal for titles, names, and headings.",
    url: `${BASE}/capitalized-case`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Capitalized Case Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capitalized Case Converter — Free Online Tool",
    description: "Capitalize the first letter of every word in your text instantly. Free online word capitalizer — ideal for titles, names, and headings.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import SingleCaseConverter from "@/components/SingleCaseConverter";

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Capitalized Case Converter", "url": "https://www.casetivo.com/capitalized-case", "description": "Capitalize the first letter of every word.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "Capitalized Case Converter", "item": "https://www.casetivo.com/capitalized-case"}]}) }} />
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Capitalized Case Converter
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Capitalize the first letter of every word in your text instantly. Paste any content — titles, names, headings, or sentences — and the converter applies title-style capitalization across the entire input. Useful for formatting book titles, blog post headings, product names, and any text where every word needs an uppercase first letter.
        </p>
      </div>
    <SingleCaseConverter
      converterKey="capitalizedCase"
      downloadName="capitalizedcase-text.txt"
    />
    </>
  );
}
