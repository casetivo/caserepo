"use client";
import { useState, useEffect } from "react";
import type { Locale } from "@/i18n/translations";
import { textToolTranslationsEn } from "@/i18n/textToolTranslationsEn";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";
import { randomToolTranslationsEn } from "@/i18n/randomToolTranslationsEn";
import { translationsEn } from "@/i18n/translationsTranslationsEn";

export type TranslationModule = "text" | "image" | "random" | "base";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enDefaults: Record<TranslationModule, any> = {
  text: textToolTranslationsEn,
  image: imageToolTranslationsEn,
  random: randomToolTranslationsEn,
  base: translationsEn,
};

// Module-level cache so translations survive navigation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: Record<string, any> = {};

export function useI18n(module: TranslationModule) {
  const [locale, setLocale] = useState<Locale>("en");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [t, setT] = useState<any>(enDefaults[module]);

  useEffect(() => {
    if (locale === "en") {
      setT(enDefaults[module]);
      return;
    }
    const cacheKey = `${module}:${locale}`;
    if (cache[cacheKey]) {
      setT(cache[cacheKey]);
      return;
    }
    // Lazy-load full translations only when a non-English locale is selected
    const loaders: Record<TranslationModule, () => Promise<unknown>> = {
      text:   () => import("@/i18n/textToolTranslations").then(m => m.textToolTranslations[locale]),
      image:  () => import("@/i18n/imageToolTranslations").then(m => m.imageToolTranslations[locale]),
      random: () => import("@/i18n/randomToolTranslations").then(m => m.randomToolTranslations[locale]),
      base:   () => import("@/i18n/translations").then(m => m.translations[locale]),
    };
    loaders[module]().then(data => {
      cache[cacheKey] = data;
      setT(data);
    });
  }, [locale, module]);

  return { locale, setLocale, t };
}
