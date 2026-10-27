import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Number Generator Online – True CSPRNG Pick & Draw | Casetivo",
  description:
    "Generate cryptographically secure random numbers online. Choose custom min/max ranges, unique non-repeating lottery picks, sorting options, and statistical telemetry. 100% private.",
  keywords: [
    "random number generator",
    "generate random numbers",
    "true random number picker",
    "csprng random generator",
    "lottery number picker",
    "random integer generator",
    "unique random numbers no repeats",
    "raffle draw tool",
  ],
  alternates: {
    canonical: `${BASE}/random-number-generator`,
  },
  openGraph: {
    title: "Random Number Generator Online – True CSPRNG Pick & Draw | Casetivo",
    description:
      "Generate cryptographically secure random numbers online. Choose custom min/max ranges, non-repeating lottery draws, and sorting options.",
    url: `${BASE}/random-number-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Number Generator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Number Generator Online – True CSPRNG Pick & Draw | Casetivo",
    description:
      "Generate cryptographically secure random numbers online. Choose custom min/max ranges, non-repeating lottery draws, and sorting options.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("random-number-generator", "Random Number Generator");

  return (
    <>
      <SchemaMarkup
        toolName="Random Number Generator"
        url={`${BASE}/random-number-generator`}
        description="Generate unbiased random numbers within custom ranges using Web Cryptography CSPRNG. Features duplicate prevention, sorting, and statistical telemetry."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
