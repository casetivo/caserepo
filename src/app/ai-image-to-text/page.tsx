import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "AI Image to Text Converter (OCR) Online – Free Text Extractor | Casetivo",
  description:
    "Extract text from screenshots, scanned PDF pages, receipts, and photos online. In-browser Tesseract OCR with 12 language packs, zero server uploads, and 100% data privacy.",
  keywords: [
    "ai image to text",
    "image to text converter",
    "ocr online free",
    "extract text from image",
    "photo to text",
    "screenshot text extractor",
    "tesseract js ocr",
    "client side ocr",
    "free ocr scanner",
  ],
  alternates: {
    canonical: `${BASE}/ai-image-to-text`,
  },
  openGraph: {
    title: "AI Image to Text Converter (OCR) Online – Free Text Extractor | Casetivo",
    description:
      "Extract text from screenshots, scanned documents, and photos online. In-browser OCR with 12 languages and 100% data privacy.",
    url: `${BASE}/ai-image-to-text`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Image to Text Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image to Text Converter (OCR) Online – Free Text Extractor | Casetivo",
    description:
      "Extract text from screenshots, scanned documents, and photos online. In-browser OCR with 12 languages and 100% data privacy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("aiImageToText", "AI Image to Text");

  return (
    <>
      <SchemaMarkup
        toolName="AI Image to Text Converter"
        url={`${BASE}/ai-image-to-text`}
        description="Extract printed or handwritten text from screenshots, scanned documents, and photos using in-browser WebAssembly Optical Character Recognition (OCR)."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
