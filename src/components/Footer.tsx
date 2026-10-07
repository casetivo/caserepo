import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 mt-auto border-t border-border/40 bg-card/30">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          &copy; 2026 Casetivo. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/about" className="hover:text-foreground transition-colors">
            About Us
          </Link>
          <span className="text-border/50">•</span>
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <span className="text-border/50">•</span>
          <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
