import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JPG to PNG Converter — Free Online Image Converter",
  description: "Convert JPG and JPEG images to PNG format instantly in your browser. No upload needed — 100% private. Free online JPG to PNG converter.",
  alternates: {
    canonical: `${BASE}/jpg-to-png-converter`,
  },
  openGraph: {
    title: "JPG to PNG Converter — Free Online Image Converter",
    description: "Convert JPG and JPEG images to PNG format instantly in your browser. No upload needed — 100% private. Free online JPG to PNG converter.",
    url: `${BASE}/jpg-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JPG to PNG Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PNG Converter — Free Online Image Converter",
    description: "Convert JPG and JPEG images to PNG format instantly in your browser. No upload needed — 100% private. Free online JPG to PNG converter.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="JPG to PNG Converter" url={`${BASE}/jpg-to-png-converter`} description="Convert JPG and JPEG images to PNG format instantly in your browser. No upload needed — 100% private. Free online JPG to PNG converter." faqs={getSeoContent("jpgToPngConverter", "JPG to PNG Converter").faqs} />
      <ImagePage />
    </>
  );
}
