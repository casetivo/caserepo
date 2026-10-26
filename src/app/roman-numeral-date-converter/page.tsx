import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Roman Numeral Date Converter — Dates to Numerals",
  description: "Convert any date or number to Roman numerals for tattoos, weddings, and anniversaries. Supports middle dots (·), slashes, and two-way conversion.",
  alternates: {
    canonical: `${BASE}/roman-numeral-date-converter`,
  },
  openGraph: {
    title: "Roman Numeral Date Converter — Dates to Numerals",
    description: "Convert any date or number to Roman numerals for tattoos, weddings, and anniversaries. Supports middle dots (·), slashes, and two-way conversion.",
    url: `${BASE}/roman-numeral-date-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Roman Numeral Date Converter Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Numeral Date Converter — Dates to Numerals",
    description: "Convert any date or number to Roman numerals for tattoos, weddings, and anniversaries. Supports middle dots (·), slashes, and two-way conversion.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("roman-numeral-date-converter", "Roman Numeral Date Converter");

  return (
    <>
      <SchemaMarkup
        toolName="Roman Numeral Date Converter"
        url={`${BASE}/roman-numeral-date-converter`}
        description="Convert any date or number to Roman numerals for tattoos, weddings, and anniversaries. Supports middle dots (·), slashes, and two-way conversion."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
