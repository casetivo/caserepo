import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Em Dash Remover — Free Online Tool",
  description: "Remove em dashes (—) and en dashes (–) from text instantly. Replace with regular hyphens or nothing. Free online em dash remover.",
  keywords: "remove em dash, em dash remover, strip em dashes, em dash to hyphen converter online",
  alternates: {
    canonical: `${BASE}/em-dash-remover`,
  },
  openGraph: {
    title: "Em Dash Remover — Free Online Tool",
    description: "Remove em dashes (—) and en dashes (–) from text instantly. Replace with regular hyphens or nothing. Free online em dash remover.",
    url: `${BASE}/em-dash-remover`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Em Dash Remover — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Em Dash Remover — Free Online Tool",
    description: "Remove em dashes (—) and en dashes (–) from text instantly. Replace with regular hyphens or nothing. Free online em dash remover.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Em Dash Remover</h1>
      <SchemaMarkup toolName="Em Dash Remover" url={`${BASE}/em-dash-remover`} description="Remove em dashes (—) and en dashes (–) from text instantly. Replace with regular hyphens or nothing. Free online em dash remover." faqs={getSeoContent("em-dash-remover", "Em Dash Remover").faqs} />
      <ClientPage />
    </>
  );
}
