import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Letter Generator — Alphabet Picker & Character Shuffler",
  description: "Generate random letters from the English alphabet in uppercase, lowercase, or mixed case. Filter vowels or consonants, draw unique letters, and customize delimiters.",
  alternates: {
    canonical: `${BASE}/random-letter-generator`,
  },
  openGraph: {
    title: "Random Letter Generator — Alphabet Picker & Character Shuffler",
    description: "Generate random letters from the English alphabet in uppercase, lowercase, or mixed case. Filter vowels or consonants, draw unique letters, and customize delimiters.",
    url: `${BASE}/random-letter-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Letter Generator — Alphabet Picker & Character Shuffler" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Letter Generator — Alphabet Picker & Character Shuffler",
    description: "Generate random letters from the English alphabet in uppercase, lowercase, or mixed case. Filter vowels or consonants, draw unique letters, and customize delimiters.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seo = getSeoContent("random-letter-generator", "Random Letter Generator");
  return (
    <>
      <SchemaMarkup
        toolName="Random Letter Generator"
        url={`${BASE}/random-letter-generator`}
        description="Generate random letters from the English alphabet in uppercase, lowercase, or mixed case. Filter vowels or consonants, draw unique letters, and customize delimiters."
        faqs={seo.faqs}
      />
      <ClientPage />
    </>
  );
}
