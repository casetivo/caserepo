import Link from "next/link";
import { TOOL_CATEGORIES } from "@/lib/tools";

// Plain links (not dropdowns) so every tool is crawlable from every page.
function ToolDirectory() {
  return (
    <nav aria-label="All tools" className="max-w-6xl mx-auto px-4 pb-8 mb-6 border-b border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6">
      {TOOL_CATEGORIES.map((category) => (
        <div key={category.name}>
          <p className="text-base font-semibold text-foreground mb-3">{category.name}</p>
          <ul className="space-y-1.5">
            {category.tools.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} prefetch={false} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function Footer({ showToolDirectory = true }: { showToolDirectory?: boolean }) {
  return (
    <footer className="py-6 mt-auto border-t border-border/40 bg-card/30">
      {showToolDirectory && <ToolDirectory />}
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-base text-muted-foreground">
          &copy; {new Date().getFullYear()} Casetivo. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base font-medium text-muted-foreground">
          <Link href="/invoice-generator" className="hover:text-foreground transition-colors">
            Invoice Generator
          </Link>
          <span className="text-border/50">•</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <span className="text-border/50">•</span>
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
