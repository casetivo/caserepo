import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "SVG to PNG Converter — Free Online Image Converter",
  description: "Convert SVG vector files to PNG raster images instantly. Preserves quality. No upload needed. Free online SVG to PNG converter.",
  alternates: {
    canonical: `${BASE}/svg-to-png-converter`,
  },
  openGraph: {
    title: "SVG to PNG Converter — Free Online Image Converter",
    description: "Convert SVG vector files to PNG raster images instantly. Preserves quality. No upload needed. Free online SVG to PNG converter.",
    url: `${BASE}/svg-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SVG to PNG Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Converter — Free Online Image Converter",
    description: "Convert SVG vector files to PNG raster images instantly. Preserves quality. No upload needed. Free online SVG to PNG converter.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="SVG to PNG Converter" url={`${BASE}/svg-to-png-converter`} description="Convert SVG vector files to PNG raster images instantly. Preserves quality. No upload needed. Free online SVG to PNG converter." faqs={getSeoContent("svgToPngConverter", "SVG to PNG Converter").faqs} />
      <ImagePage />
    </>
  );
}
