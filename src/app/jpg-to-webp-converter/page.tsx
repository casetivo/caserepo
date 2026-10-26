import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JPG to WebP Converter — Free Online Image Converter",
  description: "Convert JPG and JPEG images to WebP format for smaller file sizes. Works in your browser, no upload. Free JPG to WebP converter.",
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

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="JPG to WebP Converter" url={`${BASE}/jpg-to-webp-converter`} description="Convert JPG and JPEG images to WebP format for smaller file sizes. Works in your browser, no upload. Free JPG to WebP converter." faqs={getSeoContent("jpgToWebpConverter", "JPG to WebP Converter").faqs} />
      <ImagePage />
    </>
  );
}
