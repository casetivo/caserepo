import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "PNG to WebP Converter — Free Online Image Converter",
  description: "Convert PNG images to WebP format for better compression. No upload required — runs in your browser. Free PNG to WebP converter.",
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

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="PNG to WebP Converter" url={`${BASE}/png-to-webp-converter`} description="Convert PNG images to WebP format for better compression. No upload required — runs in your browser. Free PNG to WebP converter." faqs={getSeoContent("pngToWebpConverter", "PNG to WebP Converter").faqs} />
      <ImagePage />
    </>
  );
}
