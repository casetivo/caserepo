import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "PNG to WebP Converter Online – Compress Transparent PNGs to WebP Free | Casetivo",
  description:
    "Convert PNG images to Google's lightweight WebP format with full alpha transparency preservation. Reduce file sizes by 60–80% for faster page loads. 100% private in-browser conversion.",
  keywords: [
    "png to webp converter",
    "convert png to webp",
    "transparent png to webp",
    "compress png to webp online",
    "lossy webp transparency",
    "speed up transparent images",
    "lcp optimization png webp",
    "free webp converter",
  ],
  alternates: {
    canonical: `${BASE}/png-to-webp-converter`,
  },
  openGraph: {
    title: "PNG to WebP Converter Online – Compress Transparent PNGs to WebP Free | Casetivo",
    description:
      "Convert PNG images to Google's lightweight WebP format with full alpha transparency preservation. Reduce file sizes by 60–80%.",
    url: `${BASE}/png-to-webp-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PNG to WebP Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to WebP Converter Online – Compress Transparent PNGs to WebP Free | Casetivo",
    description:
      "Convert PNG images to Google's lightweight WebP format with full alpha transparency preservation. Reduce file sizes by 60–80%.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("pngToWebpConverter", "PNG to WebP Converter");

  return (
    <>
      <SchemaMarkup
        toolName="PNG to WebP Converter"
        url={`${BASE}/png-to-webp-converter`}
        description="Convert PNG graphics to highly compressed WebP format in your browser while preserving full alpha channel transparency."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
