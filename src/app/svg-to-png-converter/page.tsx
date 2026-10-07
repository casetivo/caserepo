import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "SVG to PNG Converter — Free Online Image Converter",
  description: "Convert SVG vector files to PNG raster images instantly. Preserves quality. No upload needed. Free online SVG to PNG converter.",
  keywords: "SVG to PNG converter, convert SVG PNG online, vector to raster, SVG PNG tool free",
  alternates: {
    canonical: `${BASE}/svg-to-png-converter`,
  },
  openGraph: {
    title: "SVG to PNG Converter — Free Online Image Converter",
    description: "Convert SVG vector files to PNG raster images instantly. Preserves quality. No upload needed. Free online SVG to PNG converter.",
    url: `${BASE}/svg-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SVG to PNG Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Converter — Free Online Image Converter",
    description: "Convert SVG vector files to PNG raster images instantly. Preserves quality. No upload needed. Free online SVG to PNG converter.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "SVG to PNG Converter", "url": "https://www.casetivo.com/svg-to-png-converter", "description": "Convert SVG files to PNG format instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "SVG to PNG Converter", "item": "https://www.casetivo.com/svg-to-png-converter"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
