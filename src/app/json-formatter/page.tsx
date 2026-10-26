import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator Online — Beautify & Minify JSON",
  description: "Format, beautify, validate, and minify JSON online. Features 2-space and 4-space indentation, line/column syntax error locator, and auto-fix. 100% private.",
  keywords: "json formatter, json beautifier, json validator online, minify json, format json online, json pretty print, online json parser",
  alternates: {
    canonical: `${BASE}/json-formatter`,
  },
  openGraph: {
    title: "JSON Formatter & Validator Online — Beautify & Minify JSON",
    description: "Format, beautify, validate, and minify JSON online. Features 2-space and 4-space indentation, line/column syntax error locator, and auto-fix. 100% private.",
    url: `${BASE}/json-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON Formatter & Validator Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator Online — Beautify & Minify JSON",
    description: "Format, beautify, validate, and minify JSON online. Features 2-space and 4-space indentation, line/column syntax error locator, and auto-fix. 100% private.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("jsonFormatter", "JSON Formatter");

  return (
    <>
      <SchemaMarkup
        toolName="JSON Formatter & Validator"
        url={`${BASE}/json-formatter`}
        description="Format, beautify, validate, and minify JSON online. Features 2-space and 4-space indentation, line/column syntax error locator, and auto-fix. 100% private."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
