import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JPG to WebP Converter — Free Online Image Converter",
  description: "Convert JPG and JPEG images to WebP format for smaller file sizes. Works in your browser, no upload. Free JPG to WebP converter.",
  keywords: "JPG to WebP converter, JPEG to WebP, convert JPG WebP online, image to WebP free",
  alternates: {
    canonical: `${BASE}/jpg-to-webp-converter`,
  },
  openGraph: {
    title: "JPG to WebP Converter — Free Online Image Converter",
    description: "Convert JPG and JPEG images to WebP format for smaller file sizes. Works in your browser, no upload. Free JPG to WebP converter.",
    url: `${BASE}/jpg-to-webp-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JPG to WebP Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to WebP Converter — Free Online Image Converter",
    description: "Convert JPG and JPEG images to WebP format for smaller file sizes. Works in your browser, no upload. Free JPG to WebP converter.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "JPG to WebP Converter", "url": "https://www.casetivo.com/jpg-to-webp-converter", "description": "Convert JPG images to WebP format instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "JPG to WebP Converter", "item": "https://www.casetivo.com/jpg-to-webp-converter"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
