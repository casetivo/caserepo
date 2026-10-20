import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Roman Numeral Date Converter — Free Online Tool",
  description: "Convert any date or number to Roman numerals instantly. Supports dates like MM/DD/YYYY and standalone numbers 1–3999. Free online tool.",
  keywords: "roman numeral converter, date to roman numerals, number to roman numeral, roman numeral date tool",
  alternates: {
    canonical: `${BASE}/roman-numeral-date-converter`,
  },
  openGraph: {
    title: "Roman Numeral Date Converter — Free Online Tool",
    description: "Convert any date or number to Roman numerals instantly. Supports dates like MM/DD/YYYY and standalone numbers 1–3999. Free online tool.",
    url: `${BASE}/roman-numeral-date-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Roman Numeral Date Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Numeral Date Converter — Free Online Tool",
    description: "Convert any date or number to Roman numerals instantly. Supports dates like MM/DD/YYYY and standalone numbers 1–3999. Free online tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Roman Numeral Date Converter" url={`${BASE}/roman-numeral-date-converter`} description="Convert any date or number to Roman numerals instantly. Supports dates like MM/DD/YYYY and standalone numbers 1–3999. Free online tool." faqs={getSeoContent("roman-numeral-date-converter", "Roman Numeral Date Converter").faqs} />
      <ClientPage />
    </>
  );
}
