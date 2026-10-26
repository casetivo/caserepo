import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "HTML Formatter & Beautifier Online – Clean, Format & Minify HTML | Casetivo",
  description:
    "Format, beautify, and clean messy HTML markup online. Choose custom indentation (2 spaces, 4 spaces, tabs), minify HTML for production, handle void tags, and inspect DOM depth with 100% private in-browser execution.",
  keywords: [
    "html formatter",
    "html beautifier",
    "format html online",
    "beautify html",
    "clean html code",
    "html minifier",
    "minify html online",
    "html pretty print",
    "html indent tool",
  ],
  alternates: {
    canonical: `${BASE}/html-formatter`,
  },
  openGraph: {
    title: "HTML Formatter & Beautifier Online – Clean, Format & Minify HTML | Casetivo",
    description:
      "Format, beautify, and clean messy HTML markup online. Choose custom indentation (2 spaces, 4 spaces, tabs), minify HTML for production, handle void tags, and inspect DOM depth with 100% private in-browser execution.",
    url: `${BASE}/html-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HTML Formatter & Beautifier Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Formatter & Beautifier Online – Clean, Format & Minify HTML | Casetivo",
    description:
      "Format, beautify, and clean messy HTML markup online. Choose custom indentation (2 spaces, 4 spaces, tabs), minify HTML for production, handle void tags, and inspect DOM depth with 100% private in-browser execution.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("htmlFormatter", "HTML Formatter & Beautifier");

  return (
    <>
      <SchemaMarkup
        toolName="HTML Formatter & Beautifier"
        url={`${BASE}/html-formatter`}
        description="Format, beautify, and minify HTML documents online. Features customizable indentation, void tag handling, comment toggles, DOM element counts, and complete client-side privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
