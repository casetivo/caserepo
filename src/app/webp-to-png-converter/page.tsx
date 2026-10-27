import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "WebP to PNG Converter Online – Convert WebP to Lossless PNG Free | Casetivo",
  description:
    "Convert Google WebP images to universally compatible PNG format online. Keep transparent backgrounds, full image resolution, with 100% private in-browser conversion.",
  keywords: [
    "webp to png converter",
    "convert webp to png",
    "webp to png transparent",
    "save webp as png online",
    "webp image converter",
    "free webp to png tool",
    "high quality webp conversion",
  ],
  alternates: {
    canonical: `${BASE}/webp-to-png-converter`,
  },
  openGraph: {
    title: "WebP to PNG Converter Online – Convert WebP to Lossless PNG Free | Casetivo",
    description:
      "Convert Google WebP images to universally compatible PNG format online. Keep transparent backgrounds with 100% private in-browser conversion.",
    url: `${BASE}/webp-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WebP to PNG Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to PNG Converter Online – Convert WebP to Lossless PNG Free | Casetivo",
    description:
      "Convert Google WebP images to universally compatible PNG format online. Keep transparent backgrounds with 100% private in-browser conversion.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("webpToPngConverter", "WebP to PNG Converter");

  return (
    <>
      <SchemaMarkup
        toolName="WebP to PNG Converter"
        url={`${BASE}/webp-to-png-converter`}
        description="Convert Google WebP images to lossless PNG format in your browser. Preserves transparency layers without transmitting data to remote servers."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
