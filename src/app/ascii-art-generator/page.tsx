import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "ASCII Art Generator — Image to ASCII Free Online",
  description: "Convert any image into ASCII art characters. Adjustable width, instant preview. Free online ASCII art generator from image.",
  keywords: "ASCII art generator, image to ASCII art, convert image ASCII, ASCII art from photo online free",
  alternates: {
    canonical: `${BASE}/ascii-art-generator`,
  },
  openGraph: {
    title: "ASCII Art Generator — Image to ASCII Free Online",
    description: "Convert any image into ASCII art characters. Adjustable width, instant preview. Free online ASCII art generator from image.",
    url: `${BASE}/ascii-art-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ASCII Art Generator — Image to ASCII Free Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCII Art Generator — Image to ASCII Free Online",
    description: "Convert any image into ASCII art characters. Adjustable width, instant preview. Free online ASCII art generator from image.",
    images: ["/og-image.png"],
  },
};

import ImagePage from "./ImagePage";

export default function Page() {
  const _jsonLd = {"@context": "https://schema.org", "@type": "WebApplication", "name": "ASCII Art Generator", "url": "https://www.casetivo.com/ascii-art-generator", "description": "Convert any image into ASCII art characters.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com"}};
  const _breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "ASCII Art Generator", "item": "https://www.casetivo.com/ascii-art-generator"}]};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_breadcrumb) }} />
      <ImagePage />
    </>
  );
}
