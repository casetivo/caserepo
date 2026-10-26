import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "GraphQL Formatter & Beautifier — Free Online Tool",
  description: "Format and beautify GraphQL queries and mutations with proper indentation. Free online GraphQL formatter tool.",
  alternates: {
    canonical: `${BASE}/graphql-formatter`,
  },
  openGraph: {
    title: "GraphQL Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify GraphQL queries and mutations with proper indentation. Free online GraphQL formatter tool.",
    url: `${BASE}/graphql-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GraphQL Formatter & Beautifier — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GraphQL Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify GraphQL queries and mutations with proper indentation. Free online GraphQL formatter tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="GraphQL Formatter & Beautifier" url={`${BASE}/graphql-formatter`} description="Format and beautify GraphQL queries and mutations with proper indentation. Free online GraphQL formatter tool." faqs={getSeoContent("graphql-formatter", "GraphQL Formatter & Beautifier").faqs} />
      <ClientPage />
    </>
  );
}
