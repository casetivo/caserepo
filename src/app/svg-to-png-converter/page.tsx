import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "SVG to PNG Converter Online – Rasterize Vector SVG to High-Res PNG | Casetivo",
  description:
    "Convert SVG vector files to crisp PNG raster images online. Scale resolution up to 4x Retina HD, preserve transparent backgrounds, with 100% private in-browser rasterization.",
  keywords: [
    "svg to png converter",
    "convert svg to png",
    "vector to png online",
    "high resolution svg to png",
    "svg to transparent png",
    "scale svg to png",
    "free svg converter",
    "rasterize svg",
  ],
  alternates: {
    canonical: `${BASE}/svg-to-png-converter`,
  },
  openGraph: {
    title: "SVG to PNG Converter Online – Rasterize Vector SVG to High-Res PNG | Casetivo",
    description:
      "Convert SVG vector files to crisp PNG raster images online. Scale resolution up to 4x Retina HD with 100% private in-browser rasterization.",
    url: `${BASE}/svg-to-png-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SVG to PNG Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Converter Online – Rasterize Vector SVG to High-Res PNG | Casetivo",
    description:
      "Convert SVG vector files to crisp PNG raster images online. Scale resolution up to 4x Retina HD with 100% private in-browser rasterization.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("svgToPngConverter", "SVG to PNG Converter");

  return (
    <>
      <SchemaMarkup
        toolName="SVG to PNG Converter"
        url={`${BASE}/svg-to-png-converter`}
        description="Rasterize SVG vector illustrations and icons into crystal-clear PNG images in your browser. Supports customizable resolution multipliers and transparency preservation."
        faqs={seoData.faqs}
      />
      <ImagePage />
    </>
  );
}
