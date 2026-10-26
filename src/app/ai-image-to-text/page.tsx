import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

const TITLE = "Image to Text Converter (OCR) — Extract Text Free";
const DESCRIPTION = "Extract text from screenshots, scans, and photos with free OCR that runs in your browser. Your image is never uploaded. Supports 12 languages.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE}/ai-image-to-text`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE}/ai-image-to-text`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup
        toolName="AI Image to Text Converter"
        url={`${BASE}/ai-image-to-text`}
        description="Free in-browser OCR that extracts text from screenshots, scanned documents, and photos without uploading the image."
        faqs={getSeoContent("aiImageToText", "AI Image to Text").faqs}
      />
      <ImagePage />
    </>
  );
}
