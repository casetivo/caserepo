import React from "react";
import { FAQ } from "@/components/SeoContentBlock";

export interface ToolSeoContent {
  title: string;
  content: React.ReactNode;
  faqs: FAQ[];
}

import { caseConvertersSeo } from "./seo/caseConverters";
import { codeDataToolsSeo } from "./seo/codeDataTools";
import { textToolsSeo } from "./seo/textTools";
import { imageToolsSeo } from "./seo/imageTools";
import { randomGeneratorsSeo } from "./seo/randomGenerators";

export const toolSeoContent: Record<string, ToolSeoContent> = {
  ...caseConvertersSeo,
  ...codeDataToolsSeo,
  ...textToolsSeo,
  ...imageToolsSeo,
  ...randomGeneratorsSeo,
};

export function getSeoContent(toolKey: string, fallbackName: string): ToolSeoContent {
  if (toolSeoContent[toolKey]) {
    return toolSeoContent[toolKey];
  }

  // Fallback content if unique content hasn't been written yet
  return {
    title: `How does the ${fallbackName} work?`,
    content: null,
    faqs: []
  };
}
