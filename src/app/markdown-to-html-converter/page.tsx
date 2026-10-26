import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter Online – Convert MD to HTML | Casetivo",
  description:
    "Convert Markdown to clean, valid HTML5 online. Supports GitHub Flavored Markdown (GFM), tables, task lists, code blocks, blockquotes, and live rendered preview with 100% private in-browser execution.",
  keywords: [
    "markdown to html",
    "markdown to html converter",
    "convert markdown to html online",
    "md to html",
    "markdown parser online",
    "github flavored markdown to html",
    "markdown previewer",
    "convert md table to html",
    "gfm to html",
  ],
  alternates: {
    canonical: `${BASE}/markdown-to-html-converter`,
  },
  openGraph: {
    title: "Markdown to HTML Converter Online – Convert MD to HTML | Casetivo",
    description:
      "Convert Markdown to clean, valid HTML5 online. Supports GitHub Flavored Markdown (GFM), tables, task lists, code blocks, blockquotes, and live rendered preview with 100% private in-browser execution.",
    url: `${BASE}/markdown-to-html-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Markdown to HTML Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to HTML Converter Online – Convert MD to HTML | Casetivo",
    description:
      "Convert Markdown to clean, valid HTML5 online. Supports GitHub Flavored Markdown (GFM), tables, task lists, code blocks, blockquotes, and live rendered preview with 100% private in-browser execution.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("markdownToHtmlConverter", "Markdown to HTML Converter");

  return (
    <>
      <SchemaMarkup
        toolName="Markdown to HTML Converter"
        url={`${BASE}/markdown-to-html-converter`}
        description="Convert Markdown formatted text into clean HTML5 markup online. Supports GitHub Flavored Markdown (GFM), code syntax blocks, tables, task lists, and live visual preview."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
