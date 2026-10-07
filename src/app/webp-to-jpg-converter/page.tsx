import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "WebP to JPG Converter — Free Online Image Converter",
  description: "Convert WebP images to JPG format instantly in your browser. No upload needed. Free online WebP to JPG converter.",
  keywords: "WebP to JPG converter, convert WebP JPEG online, WebP JPG image converter free",
  alternates: {
    canonical: `${BASE}/webp-to-jpg-converter`,
  },
  openGraph: {
    title: "WebP to JPG Converter — Free Online Image Converter",
    description: "Convert WebP images to JPG format instantly in your browser. No upload needed. Free online WebP to JPG converter.",
    url: `${BASE}/webp-to-jpg-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WebP to JPG Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to JPG Converter — Free Online Image Converter",
    description: "Convert WebP images to JPG format instantly in your browser. No upload needed. Free online WebP to JPG converter.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "WebP to JPG Converter", "url": "https://www.casetivo.com/webp-to-jpg-converter", "description": "Convert WebP images to JPG format instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "WebP to JPG Converter", "item": "https://www.casetivo.com/webp-to-jpg-converter"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
