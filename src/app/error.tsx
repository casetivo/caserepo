"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-accent transition-all min-w-[180px] justify-center"
          >
            <RefreshCw className="h-4 w-4" />Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all min-w-[180px] justify-center"
          >
            <Home className="h-4 w-4" />Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
