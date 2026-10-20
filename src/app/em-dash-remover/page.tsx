import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Em Dash Remover Online — Replace or Remove Em Dashes & En Dashes",
  description: "Remove or replace em dashes (—), en dashes (–), and double hyphens with standard hyphens, commas, or spaces. Clean AI writing patterns and fix encoding errors instantly.",
  keywords: "em dash remover, remove em dashes, replace em dash with hyphen, ai em dash remover, strip em dashes online, en dash converter, clean dashes",
  alternates: {
    canonical: `${BASE}/em-dash-remover`,
  },
  openGraph: {
    title: "Em Dash Remover Online — Replace or Remove Em Dashes & En Dashes",
    description: "Remove or replace em dashes (—), en dashes (–), and double hyphens with standard hyphens, commas, or spaces. Clean AI writing patterns and fix encoding errors instantly.",
    url: `${BASE}/em-dash-remover`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Em Dash Remover Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Em Dash Remover Online — Replace or Remove Em Dashes & En Dashes",
    description: "Remove or replace em dashes (—), en dashes (–), and double hyphens with standard hyphens, commas, or spaces. Clean AI writing patterns and fix encoding errors instantly.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("em-dash-remover", "Em Dash Remover");

  return (
    <>
      <SchemaMarkup
        toolName="Em Dash Remover"
        url={`${BASE}/em-dash-remover`}
        description="Remove or replace em dashes (—), en dashes (–), and double hyphens with standard hyphens, commas, or spaces. Clean AI writing patterns and fix encoding errors instantly."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
