import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "CSS Formatter & Beautifier Online – Clean, Format & Minify CSS | Casetivo",
  description:
    "Format, beautify, and clean messy CSS code online. Choose custom indentation (2 spaces, 4 spaces, tabs), minify stylesheets, sort properties alphabetically, and inspect size savings with 100% private in-browser execution.",
  keywords: [
    "css formatter",
    "css beautifier",
    "format css online",
    "beautify css",
    "clean css code",
    "css minifier",
    "minify css online",
    "css pretty print",
    "css indent tool",
  ],
  alternates: {
    canonical: `${BASE}/css-formatter`,
  },
  openGraph: {
    title: "CSS Formatter & Beautifier Online – Clean, Format & Minify CSS | Casetivo",
    description:
      "Format, beautify, and clean messy CSS code online. Choose custom indentation (2 spaces, 4 spaces, tabs), minify stylesheets, sort properties alphabetically, and inspect size savings with 100% private in-browser execution.",
    url: `${BASE}/css-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CSS Formatter & Beautifier Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Formatter & Beautifier Online – Clean, Format & Minify CSS | Casetivo",
    description:
      "Format, beautify, and clean messy CSS code online. Choose custom indentation (2 spaces, 4 spaces, tabs), minify stylesheets, sort properties alphabetically, and inspect size savings with 100% private in-browser execution.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("cssFormatter", "CSS Formatter & Beautifier");

  return (
    <>
      <SchemaMarkup
        toolName="CSS Formatter & Beautifier"
        url={`${BASE}/css-formatter`}
        description="Format and beautify CSS code online. Organize styles with clean indentation, minify production stylesheets, sort properties alphabetically, and eliminate redundant whitespace."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
