import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "PNG to WebP Converter — Free Online Image Converter",
  description: "Convert PNG images to WebP format for better compression. No upload required — runs in your browser. Free PNG to WebP converter.",
  keywords: "PNG to WebP converter, convert PNG WebP online, image to WebP, PNG WebP converter free",
  alternates: {
    canonical: `${BASE}/png-to-webp-converter`,
  },
  openGraph: {
    title: "PNG to WebP Converter — Free Online Image Converter",
    description: "Convert PNG images to WebP format for better compression. No upload required — runs in your browser. Free PNG to WebP converter.",
    url: `${BASE}/png-to-webp-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PNG to WebP Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to WebP Converter — Free Online Image Converter",
    description: "Convert PNG images to WebP format for better compression. No upload required — runs in your browser. Free PNG to WebP converter.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "PNG to WebP Converter", "url": "https://www.casetivo.com/png-to-webp-converter", "description": "Convert PNG images to WebP format instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "PNG to WebP Converter", "item": "https://www.casetivo.com/png-to-webp-converter"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
