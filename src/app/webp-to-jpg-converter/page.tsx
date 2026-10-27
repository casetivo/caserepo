import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "WebP to JPG Converter Online – Convert WebP to JPEG Free | Casetivo",
  description:
    "Convert Google WebP images to standard JPG format online. Open WebP files in any legacy app, customize background fill, with 100% private in-browser conversion.",
  keywords: [
    "webp to jpg converter",
    "convert webp to jpg",
    "webp to jpeg online",
    "save webp as jpg",
    "free webp converter",
    "batch webp to jpg",
    "universal image converter",
  ],
  alternates: {
    canonical: `${BASE}/webp-to-jpg-converter`,
  },
  openGraph: {
    title: "WebP to JPG Converter Online – Convert WebP to JPEG Free | Casetivo",
    description:
      "Convert Google WebP images to standard JPG format online. Open WebP files in any legacy app with 100% private in-browser conversion.",
    url: `${BASE}/webp-to-jpg-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WebP to JPG Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to JPG Converter Online – Convert WebP to JPEG Free | Casetivo",
    description:
      "Convert Google WebP images to standard JPG format online. Open WebP files in any legacy app with 100% private in-browser conversion.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("webpToJpgConverter", "WebP to JPG Converter");

  return (
    <>
      <SchemaMarkup
        toolName="WebP to JPG Converter"
        url={`${BASE}/webp-to-jpg-converter`}
        description="Convert WebP images to standard JPEG format in your browser. Solves compatibility issues with legacy photo viewers and office suites."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
