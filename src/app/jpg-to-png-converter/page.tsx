import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JPG to PNG Converter — Free Online Image Converter",
  description: "Convert JPG and JPEG images to PNG format instantly in your browser. No upload needed — 100% private. Free online JPG to PNG converter.",
  keywords: "JPG to PNG converter, JPEG to PNG, convert JPG PNG online, image format converter free",
  alternates: {
    canonical: `${BASE}/jpg-to-png-converter`,
  },
  openGraph: {
    title: "JPG to PNG Converter — Free Online Image Converter",
    description: "Convert JPG and JPEG images to PNG format instantly in your browser. No upload needed — 100% private. Free online JPG to PNG converter.",
    url: `${BASE}/jpg-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JPG to PNG Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PNG Converter — Free Online Image Converter",
    description: "Convert JPG and JPEG images to PNG format instantly in your browser. No upload needed — 100% private. Free online JPG to PNG converter.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "JPG to PNG Converter", "url": "https://www.casetivo.com/jpg-to-png-converter", "description": "Convert JPG images to PNG format instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "JPG to PNG Converter", "item": "https://www.casetivo.com/jpg-to-png-converter"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
