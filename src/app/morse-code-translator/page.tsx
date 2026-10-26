import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Morse Code Translator Online – Text to Morse & Morse to Text Audio Player | Casetivo",
  description:
    "Translate English text to Morse code and decode Morse code to text instantly. Listen to real-time audio beeps with adjustable WPM speed, dit/dah telemetry, and 100% private in-browser decoding.",
  keywords: [
    "morse code translator",
    "text to morse code",
    "morse code to text",
    "morse code audio player",
    "morse code sound generator",
    "sos morse code",
    "international morse code chart",
    "itu morse code",
    "cw morse code audio",
  ],
  alternates: {
    canonical: `${BASE}/morse-code-translator`,
  },
  openGraph: {
    title: "Morse Code Translator Online – Text to Morse & Morse to Text Audio Player | Casetivo",
    description:
      "Translate English text to Morse code and decode Morse code to text instantly. Listen to real-time audio beeps with adjustable WPM speed, dit/dah telemetry, and 100% private in-browser decoding.",
    url: `${BASE}/morse-code-translator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Morse Code Translator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morse Code Translator Online – Text to Morse & Morse to Text Audio Player | Casetivo",
    description:
      "Translate English text to Morse code and decode Morse code to text instantly. Listen to real-time audio beeps with adjustable WPM speed, dit/dah telemetry, and 100% private in-browser decoding.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("morseCodeTranslator", "Morse Code Translator");

  return (
    <>
      <SchemaMarkup
        toolName="Morse Code Translator"
        url={`${BASE}/morse-code-translator`}
        description="Translate plain English to International Morse code and decode Morse sequences back to text. Features audio dit/dah tone synthesizer, WPM playback control, and live dit-dah telemetry."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
