import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "WebP to PNG Converter — Free Online Image Converter",
  description: "Convert WebP images to PNG format instantly in your browser. No file upload. 100% private. Free online WebP to PNG converter.",
  keywords: "WebP to PNG converter, convert WebP PNG online, WebP PNG image converter free",
  alternates: {
    canonical: `${BASE}/webp-to-png-converter`,
  },
  openGraph: {
    title: "WebP to PNG Converter — Free Online Image Converter",
    description: "Convert WebP images to PNG format instantly in your browser. No file upload. 100% private. Free online WebP to PNG converter.",
    url: `${BASE}/webp-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WebP to PNG Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to PNG Converter — Free Online Image Converter",
    description: "Convert WebP images to PNG format instantly in your browser. No file upload. 100% private. Free online WebP to PNG converter.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "WebP to PNG Converter", "url": "https://www.casetivo.com/webp-to-png-converter", "description": "Convert WebP images to PNG format instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "WebP to PNG Converter", "item": "https://www.casetivo.com/webp-to-png-converter"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
