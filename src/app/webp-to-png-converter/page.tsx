import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "WebP to PNG Converter — Free Online Image Converter",
  description: "Convert WebP images to PNG format instantly in your browser. No file upload. 100% private. Free online WebP to PNG converter.",
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

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="WebP to PNG Converter" url={`${BASE}/webp-to-png-converter`} description="Convert WebP images to PNG format instantly in your browser. No file upload. 100% private. Free online WebP to PNG converter." faqs={getSeoContent("webpToPngConverter", "WebP to PNG Converter").faqs} />
      <ImagePage />
    </>
  );
}
