import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "PNG to JPG Converter — Free Online Image Converter",
  description: "Convert PNG images to JPG format with white background fill. Works entirely in your browser. Free online PNG to JPG converter.",
  alternates: {
    canonical: `${BASE}/png-to-jpg-converter`,
  },
  openGraph: {
    title: "PNG to JPG Converter — Free Online Image Converter",
    description: "Convert PNG images to JPG format with white background fill. Works entirely in your browser. Free online PNG to JPG converter.",
    url: `${BASE}/png-to-jpg-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PNG to JPG Converter — Free Online Image Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Converter — Free Online Image Converter",
    description: "Convert PNG images to JPG format with white background fill. Works entirely in your browser. Free online PNG to JPG converter.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="PNG to JPG Converter" url={`${BASE}/png-to-jpg-converter`} description="Convert PNG images to JPG format with white background fill. Works entirely in your browser. Free online PNG to JPG converter." faqs={getSeoContent("pngToJpgConverter", "PNG to JPG Converter").faqs} />
      <ImagePage />
    </>
  );
}
