import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="relative mb-6">
          <h1 className="text-[10rem] sm:text-[12rem] font-bold leading-none tracking-tighter text-primary/10 select-none" style={{ fontFamily: "var(--font-display)" }}>404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-16 w-16 text-primary/40" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>Page Not Found</h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all min-w-[180px] justify-center">
            <Home className="h-4 w-4" />Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
