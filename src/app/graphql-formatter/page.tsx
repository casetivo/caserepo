import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "GraphQL Formatter & Beautifier Online – Prettify & Minify GraphQL | Casetivo",
  description:
    "Format, beautify, and minify GraphQL queries, mutations, and subscriptions online. Choose 2-space, 4-space, or tab indentation, strip redundant commas, minify network payloads, and inspect query depth.",
  keywords: [
    "graphql formatter",
    "graphql beautifier",
    "format graphql query",
    "beautify graphql online",
    "graphql pretty print",
    "minify graphql query",
    "graphql query formatter",
    "clean graphql query",
    "graphql indentation tool",
  ],
  alternates: {
    canonical: `${BASE}/graphql-formatter`,
  },
  openGraph: {
    title: "GraphQL Formatter & Beautifier Online – Prettify & Minify GraphQL | Casetivo",
    description:
      "Format, beautify, and minify GraphQL queries, mutations, and subscriptions online. Choose 2-space, 4-space, or tab indentation, strip redundant commas, minify network payloads, and inspect query depth.",
    url: `${BASE}/graphql-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GraphQL Formatter & Beautifier Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GraphQL Formatter & Beautifier Online – Prettify & Minify GraphQL | Casetivo",
    description:
      "Format, beautify, and minify GraphQL queries, mutations, and subscriptions online. Choose 2-space, 4-space, or tab indentation, strip redundant commas, minify network payloads, and inspect query depth.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("graphqlFormatter", "GraphQL Formatter & Beautifier");

  return (
    <>
      <SchemaMarkup
        toolName="GraphQL Formatter & Beautifier"
        url={`${BASE}/graphql-formatter`}
        description="Format, beautify, and minify GraphQL operations online. Features customizable indentation, redundant comma removal, fragment and argument formatting, query depth metrics, and 100% private in-browser execution."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
