import type { Metadata } from "next";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "ASCII Art Generator — Image to ASCII Free Online",
  description: "Convert any image into ASCII art characters. Adjustable width, instant preview. Free online ASCII art generator from image.",
  alternates: {
    canonical: `${BASE}/ascii-art-generator`,
  },
  openGraph: {
    title: "ASCII Art Generator — Image to ASCII Free Online",
    description: "Convert any image into ASCII art characters. Adjustable width, instant preview. Free online ASCII art generator from image.",
    url: `${BASE}/ascii-art-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ASCII Art Generator — Image to ASCII Free Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCII Art Generator — Image to ASCII Free Online",
    description: "Convert any image into ASCII art characters. Adjustable width, instant preview. Free online ASCII art generator from image.",
    images: ["/og-image.png"],
  },
};

import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ImagePage from "./ImagePage";

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="ASCII Art Generator" url={`${BASE}/ascii-art-generator`} description="Convert any image into ASCII art characters. Adjustable width, instant preview. Free online ASCII art generator from image." faqs={getSeoContent("asciiArtGenerator", "ASCII Art Generator").faqs} />
      <ImagePage />
    </>
  );
}
