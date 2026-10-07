"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.15s ease" }}>
      {children}
    </div>
  );
}
