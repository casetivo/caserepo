import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JavaScript Formatter & Beautifier Online – Format, Clean & Minify JS | Casetivo",
  description:
    "Format, beautify, and clean messy JavaScript code online. Choose custom indentation (2 spaces, 4 spaces, tabs), unminify production bundles, minify scripts, and inspect syntax metrics with 100% browser privacy.",
  keywords: [
    "javascript formatter",
    "js beautifier",
    "format javascript online",
    "beautify js",
    "unminify javascript",
    "js formatter online",
    "minify javascript",
    "pretty print js",
    "javascript indentation tool",
  ],
  alternates: {
    canonical: `${BASE}/javascript-formatter`,
  },
  openGraph: {
    title: "JavaScript Formatter & Beautifier Online – Format, Clean & Minify JS | Casetivo",
    description:
      "Format, beautify, and clean messy JavaScript code online. Choose custom indentation (2 spaces, 4 spaces, tabs), unminify production bundles, minify scripts, and inspect syntax metrics with 100% browser privacy.",
    url: `${BASE}/javascript-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JavaScript Formatter & Beautifier Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Formatter & Beautifier Online – Format, Clean & Minify JS | Casetivo",
    description:
      "Format, beautify, and clean messy JavaScript code online. Choose custom indentation (2 spaces, 4 spaces, tabs), unminify production bundles, minify scripts, and inspect syntax metrics with 100% browser privacy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("javascriptFormatter", "JavaScript Formatter & Beautifier");

  return (
    <>
      <SchemaMarkup
        toolName="JavaScript Formatter & Beautifier"
        url={`${BASE}/javascript-formatter`}
        description="Format, beautify, and clean messy or minified JavaScript code online. Features custom indentation, semicolon normalization, string literal protection, and complete client-side privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
