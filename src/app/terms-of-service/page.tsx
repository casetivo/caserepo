import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import SubHeaderNav from "@/components/SubHeaderNav";
import SearchButton from "@/components/SearchButton";

export const metadata = {
  title: "Terms of Service",
  description: "Read Casetivo's Terms of Service, including the conditions for using our free browser-based text, code, and image tools.",
  alternates: {
    canonical: "https://www.casetivo.com/terms-of-service",
  },
  openGraph: {
    description: "Read Casetivo's Terms of Service, including the conditions for using our free browser-based text, code, and image tools.",
    title: "Terms of Service | Casetivo",
    url: "https://www.casetivo.com/terms-of-service",
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Terms of Service | Casetivo" }],
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Back to all tools" className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Casetivo
            </Link>
          </div>
          <div className="hidden xl:flex flex-1 justify-center px-4 overflow-hidden">
            <SubHeaderNav />
          </div>
          <div className="flex items-center gap-2">
            <SearchButton />
          </div>
        </div>
        <div className="xl:hidden border-t border-border/60 bg-card/30 py-1 px-4">
          <SubHeaderNav />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Casetivo, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2>2. Use of Service</h2>
          <p>Casetivo provides a collection of online tools for formatting, converting, and generating data. These tools are provided for free for both personal and commercial use.</p>

          <h2>3. Disclaimer of Warranties</h2>
          <p>Our tools are provided on an "as is" and "as available" basis. Casetivo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <p>Furthermore, Casetivo does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the tools on its website.</p>

          <h2>4. Limitations of Liability</h2>
          <p>In no event shall Casetivo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on Casetivo's website.</p>

          <h2>5. Revisions and Errata</h2>
          <p>The materials appearing on Casetivo's website could include technical, typographical, or photographic errors. Casetivo does not warrant that any of the materials on its website are accurate, complete or current.</p>

          <h2>6. Modifications to Terms</h2>
          <p>Casetivo may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
