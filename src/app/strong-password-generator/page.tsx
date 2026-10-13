import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";
const URL = `${BASE}/strong-password-generator`;

export const metadata: Metadata = {
  title: "Strong Password Generator - Create Random Passwords Online",
  description: "Create unique passwords with custom length, letters, numbers, and symbols. Generated locally in your browser. Free, no sign-up required.",
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Strong Password Generator - Create Random Passwords Online",
    description: "Create unique passwords with custom length, letters, numbers, and symbols. Generated locally in your browser.",
    url: URL,
    siteName: "Casetivo",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Strong Password Generator by Casetivo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong Password Generator - Create Random Passwords Online",
    description: "Create unique passwords with custom length, letters, numbers, and symbols. Generated locally in your browser.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seo = getSeoContent("strong-password-generator", "Strong Password Generator");

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Generate a Strong Password",
    "description": "Generate a secure random password in seconds using Casetivo's free online strong password generator.",
    "totalTime": "PT1M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Password Length",
        "text": "Select a length accepted by the website. Longer, unique passwords are generally harder to guess; many accounts accept 12 or more characters.",
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select Character Types",
        "text": "Toggle the character sets required by the website: uppercase letters, lowercase letters, numbers, and special symbols. The generator includes at least one character from every enabled set.",
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Click Generate Password",
        "text": "Click Generate Password. The tool uses your browser's Web Crypto API to generate a password based on the selected options.",
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Copy and Save",
        "text": "Copy the generated password and store it in a trusted password manager. Never reuse passwords across multiple accounts.",
      },
    ],
  };

  return (
    <>
      <SchemaMarkup
        toolName="Strong Password Generator"
        url={URL}
        description="Generate random passwords with custom length and character types using your browser's Web Crypto API. Free, no sign-up required."
        faqs={seo.faqs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ClientPage />
    </>
  );
}
