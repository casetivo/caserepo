import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "ASCII Art Generator Online – Convert Image to ASCII Text Art Free | Casetivo",
  description:
    "Convert photos and logos into retro ASCII text art. Customize character density, invert luminance, adjust output width (60 to 120 chars), with instant copy to clipboard.",
  keywords: [
    "ascii art generator",
    "image to ascii",
    "convert photo to ascii art",
    "text art generator",
    "terminal ascii generator",
    "ascii banner maker",
    "retro text art",
    "monospaced text art",
  ],
  alternates: {
    canonical: `${BASE}/ascii-art-generator`,
  },
  openGraph: {
    title: "ASCII Art Generator Online – Convert Image to ASCII Text Art Free | Casetivo",
    description:
      "Convert photos and logos into retro ASCII text art. Customize character density and width with instant copy to clipboard.",
    url: `${BASE}/ascii-art-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ASCII Art Generator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCII Art Generator Online – Convert Image to ASCII Text Art Free | Casetivo",
    description:
      "Convert photos and logos into retro ASCII text art. Customize character density and width with instant copy to clipboard.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("asciiArtGenerator", "ASCII Art Generator");

  return (
    <>
      <SchemaMarkup
        toolName="ASCII Art Generator"
        url={`${BASE}/ascii-art-generator`}
        description="Convert raster images into stylized ASCII characters in your browser. Features font aspect ratio correction, character density palettes, and brightness inversion."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
