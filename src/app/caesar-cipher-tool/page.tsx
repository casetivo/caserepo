import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Caesar Cipher Tool Online – Encrypt, Decrypt & Crack Shift Ciphers | Casetivo",
  description:
    "Encrypt and decrypt text with the Caesar Cipher online. Test custom shift keys (1–25), decrypt ROT13, brute-force all 25 shifts simultaneously, and analyze letter frequencies. Free and 100% private.",
  keywords: [
    "caesar cipher tool",
    "caesar cipher decoder",
    "caesar cipher encoder",
    "caesar cipher crack",
    "caesar cipher online",
    "shift cipher decoder",
    "rot13 decoder",
    "caesar cipher solver",
    "caesar cipher all shifts",
  ],
  alternates: {
    canonical: `${BASE}/caesar-cipher-tool`,
  },
  openGraph: {
    title: "Caesar Cipher Tool Online – Encrypt, Decrypt & Crack Shift Ciphers | Casetivo",
    description:
      "Encrypt and decrypt text with the Caesar Cipher online. Test custom shift keys (1–25), decrypt ROT13, brute-force all 25 shifts simultaneously, and analyze letter frequencies. Free and 100% private.",
    url: `${BASE}/caesar-cipher-tool`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Caesar Cipher Tool Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caesar Cipher Tool Online – Encrypt, Decrypt & Crack Shift Ciphers | Casetivo",
    description:
      "Encrypt and decrypt text with the Caesar Cipher online. Test custom shift keys (1–25), decrypt ROT13, brute-force all 25 shifts simultaneously, and analyze letter frequencies. Free and 100% private.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("caesarCipherTool", "Caesar Cipher Tool");

  return (
    <>
      <SchemaMarkup
        toolName="Caesar Cipher Tool"
        url={`${BASE}/caesar-cipher-tool`}
        description="Encode, decode, and solve Caesar shift ciphers online. Supports custom shifts from 1 to 25, automated brute-force solving across all shifts, ROT13 presets, and frequency analysis."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
