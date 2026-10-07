"use client";
import { useState, useEffect } from "react";
import type { Locale } from "./translations";

// English strings are bundled inline (fast default)
// Other languages are dynamically imported only when needed

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");
  return { locale, setLocale };
}
