import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JPG to PNG Converter Online – Convert JPEG to High-Quality PNG Free | Casetivo",
  description:
    "Convert JPG and JPEG images to lossless PNG format online in your browser. Maintain original image resolution, prepare images for transparent backgrounds, with 100% private in-memory conversion.",
  keywords: [
    "jpg to png converter",
    "convert jpg to png",
    "jpeg to png online",
    "lossless image converter",
    "convert jpeg to png free",
    "high quality image converter",
    "browser image converter",
    "convert photo to png",
  ],
  alternates: {
    canonical: `${BASE}/jpg-to-png-converter`,
  },
  openGraph: {
    title: "JPG to PNG Converter Online – Convert JPEG to High-Quality PNG Free | Casetivo",
    description:
      "Convert JPG and JPEG images to lossless PNG format online in your browser. Maintain original resolution with 100% private in-memory conversion.",
    url: `${BASE}/jpg-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JPG to PNG Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PNG Converter Online – Convert JPEG to High-Quality PNG Free | Casetivo",
    description:
      "Convert JPG and JPEG images to lossless PNG format online in your browser. Maintain original resolution with 100% private in-memory conversion.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("jpgToPngConverter", "JPG to PNG Converter");

  return (
    <>
      <SchemaMarkup
        toolName="JPG to PNG Converter"
        url={`${BASE}/jpg-to-png-converter`}
        description="Convert JPG and JPEG images into lossless PNG format directly in your browser. Preserves exact pixel dimensions without uploading data to external servers."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
