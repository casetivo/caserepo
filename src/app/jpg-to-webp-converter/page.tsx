import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JPG to WebP Converter Online – Compress JPEG to Next-Gen WebP Free | Casetivo",
  description:
    "Convert JPG and JPEG images to Google's next-gen WebP format. Reduce image file sizes by 25–35% while preserving visual clarity. 100% private in-browser conversion.",
  keywords: [
    "jpg to webp converter",
    "convert jpg to webp",
    "jpeg to webp online",
    "compress image to webp",
    "next-gen image converter",
    "speed up website images",
    "lcp image optimization",
    "free webp converter",
  ],
  alternates: {
    canonical: `${BASE}/jpg-to-webp-converter`,
  },
  openGraph: {
    title: "JPG to WebP Converter Online – Compress JPEG to Next-Gen WebP Free | Casetivo",
    description:
      "Convert JPG and JPEG images to Google's next-gen WebP format. Reduce image file sizes by 25–35% while preserving visual clarity.",
    url: `${BASE}/jpg-to-webp-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JPG to WebP Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to WebP Converter Online – Compress JPEG to Next-Gen WebP Free | Casetivo",
    description:
      "Convert JPG and JPEG images to Google's next-gen WebP format. Reduce image file sizes by 25–35% while preserving visual clarity.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("jpgToWebpConverter", "JPG to WebP Converter");

  return (
    <>
      <SchemaMarkup
        toolName="JPG to WebP Converter"
        url={`${BASE}/jpg-to-webp-converter`}
        description="Convert JPG and JPEG images to highly compressed WebP format in your browser. Boost page speed and Core Web Vitals without server uploads."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
