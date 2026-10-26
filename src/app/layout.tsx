import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const BASE_URL = "https://www.casetivo.com";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Casetivo — 55+ Free Online Text, Code & Image Tools",
    template: "%s | Casetivo",
  },
  description:
    "Casetivo offers 55+ free online developer utilities and text tools. Convert text cases, format JSON, encode Base64, convert images, and generate random data instantly.",
  authors: [{ name: "Casetivo", url: BASE_URL }],
  creator: "Casetivo",
  publisher: "Casetivo",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Casetivo",
    title: "Casetivo — 55+ Free Online Text, Code & Image Tools",
    description: "Casetivo offers 55+ free online developer utilities and text tools. Convert text cases, format JSON, encode Base64, convert images, and generate random data instantly.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Casetivo — Free Online Developer & Text Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@casetivo",
    creator: "@casetivo",
    title: "Casetivo — 55+ Free Online Text, Code & Image Tools",
    description: "Casetivo offers 55+ free online developer utilities and text tools.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "aFAtUYF4NiGv97YXgkegkT0S13cKMtNf7jFelbErdxk",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground top-0 left-0">Skip to content</a>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
