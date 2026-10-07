import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "AI Image to Text — Image Analyzer Online Free",
  description: "Analyze images and extract metadata including dimensions, colors, and brightness values. Free online image analysis tool.",
  keywords: "image to text, image analyzer, extract text from image, image metadata tool online free",
  alternates: {
    canonical: `${BASE}/ai-image-to-text`,
  },
  openGraph: {
    title: "AI Image to Text — Image Analyzer Online Free",
    description: "Analyze images and extract metadata including dimensions, colors, and brightness values. Free online image analysis tool.",
    url: `${BASE}/ai-image-to-text`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Image to Text — Image Analyzer Online Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image to Text — Image Analyzer Online Free",
    description: "Analyze images and extract metadata including dimensions, colors, and brightness values. Free online image analysis tool.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "AI Image to Text", "url": "https://www.casetivo.com/ai-image-to-text", "description": "Analyze images and extract metadata instantly.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "AI Image to Text", "item": "https://www.casetivo.com/ai-image-to-text"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
