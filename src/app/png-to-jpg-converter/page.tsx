import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "PNG to JPG Converter Online – Convert PNG to JPEG Free | Casetivo",
  description:
    "Convert PNG images to compressed JPG format online. Customize background color for transparency, adjust JPEG quality compression, and enjoy 100% private in-browser conversion.",
  keywords: [
    "png to jpg converter",
    "convert png to jpg",
    "png to jpeg converter online",
    "png transparency to jpg",
    "compress png to jpg",
    "high quality png to jpg",
    "free image converter",
  ],
  alternates: {
    canonical: `${BASE}/png-to-jpg-converter`,
  },
  openGraph: {
    title: "PNG to JPG Converter Online – Convert PNG to JPEG Free | Casetivo",
    description:
      "Convert PNG images to compressed JPG format online. Customize background fill for transparency with 100% private in-browser conversion.",
    url: `${BASE}/png-to-jpg-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PNG to JPG Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Converter Online – Convert PNG to JPEG Free | Casetivo",
    description:
      "Convert PNG images to compressed JPG format online. Customize background fill for transparency with 100% private in-browser conversion.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("pngToJpgConverter", "PNG to JPG Converter");

  return (
    <>
      <SchemaMarkup
        toolName="PNG to JPG Converter"
        url={`${BASE}/png-to-jpg-converter`}
        description="Convert transparent or opaque PNG images to lightweight JPG format with customizable background color and quality compression."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
