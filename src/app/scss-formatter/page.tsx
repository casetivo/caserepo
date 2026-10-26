import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "SCSS Formatter & Beautifier Online – Format Sassy CSS Code | Casetivo",
  description:
    "Format, beautify, and indent SCSS and Sass code online. Realign nested selectors, variables ($), mixins (@mixin/@include), minify or clean stylesheets with 100% browser privacy.",
  keywords: [
    "scss formatter",
    "format scss online",
    "beautify scss",
    "sass formatter",
    "minify scss",
    "format sassy css",
    "scss nesting formatter",
    "online scss prettifier",
    "clean scss stylesheets",
  ],
  alternates: {
    canonical: `${BASE}/scss-formatter`,
  },
  openGraph: {
    title: "SCSS Formatter & Beautifier Online – Format Sassy CSS Code | Casetivo",
    description:
      "Format, beautify, and indent SCSS and Sass code online. Realign nested selectors, variables ($), mixins (@mixin/@include), and clean stylesheets with 100% browser privacy.",
    url: `${BASE}/scss-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SCSS Formatter & Beautifier Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCSS Formatter & Beautifier Online – Format Sassy CSS Code | Casetivo",
    description:
      "Format, beautify, and indent SCSS and Sass code online. Realign nested selectors, variables ($), mixins (@mixin/@include), and clean stylesheets with 100% browser privacy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("scssFormatter", "SCSS Formatter");

  return (
    <>
      <SchemaMarkup
        toolName="SCSS Formatter & Beautifier"
        url={`${BASE}/scss-formatter`}
        description="Beautify, format, and indent SCSS (Sassy CSS) stylesheets. Supports customizable indentation (2 spaces, 4 spaces, tabs), minification, nested rule alignment, and telemetry metrics."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
