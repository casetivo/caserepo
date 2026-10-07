import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";
const URL = `${BASE}/strong-password-generator`;

export const metadata: Metadata = {
  title: "Strong Password Generator — Free & Secure | No Login Required",
  description: "Generate secure random passwords instantly — no login, no tracking. Customize length and character types (uppercase, lowercase, numbers, symbols). Free online random password generator.",
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Strong Password Generator — Free & Secure | No Login Required",
    description: "Generate secure random passwords instantly — no login, no tracking. Customize length and character types. Free online random password generator.",
    url: URL,
    siteName: "Casetivo",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Strong Password Generator — Free Secure Password Maker by Casetivo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong Password Generator — Free & Secure | No Login Required",
    description: "Generate secure random passwords instantly — no login, no tracking. Free online random password generator by Casetivo.",
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
        "text": "Select your desired password length. Security experts recommend at least 12–16 characters for personal accounts and 16–24 characters for sensitive accounts such as banking or business systems.",
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select Character Types",
        "text": "Toggle which character sets to include: uppercase letters (A–Z), lowercase letters (a–z), numbers (0–9), and special symbols (!@#$%^&*). More types = higher complexity.",
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Click Generate Password",
        "text": "Click the Generate Password button. The tool instantly creates a cryptographically random password based on your selected options.",
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
      <h1 className="sr-only">Strong Password Generator</h1>
      <SchemaMarkup
        toolName="Strong Password Generator"
        url={URL}
        description="Generate secure random passwords with custom length and character types. Free online random password generator — no login required."
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
