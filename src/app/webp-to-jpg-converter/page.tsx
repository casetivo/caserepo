import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "WebP to JPG Converter — Free Online Image Converter",
  description: "Convert WebP images to JPG format instantly in your browser. No upload needed. Free online WebP to JPG converter.",
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

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="WebP to JPG Converter" url={`${BASE}/webp-to-jpg-converter`} description="Convert WebP images to JPG format instantly in your browser. No upload needed. Free online WebP to JPG converter." faqs={getSeoContent("webpToJpgConverter", "WebP to JPG Converter").faqs} />
      <ImagePage />
    </>
  );
}
