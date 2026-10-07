import { MetadataRoute } from "next";

const BASE_URL = "https://www.casetivo.com";

const toolRoutes = [
  // Case converters
  { url: "/sentence-case", priority: 0.9, changeFrequency: "monthly" },
  { url: "/lower-case", priority: 0.9, changeFrequency: "monthly" },
  { url: "/upper-case", priority: 0.9, changeFrequency: "monthly" },
  { url: "/capitalized-case", priority: 0.9, changeFrequency: "monthly" },
  { url: "/title-case", priority: 0.9, changeFrequency: "monthly" },
  { url: "/inverse-case", priority: 0.8, changeFrequency: "monthly" },
  // Text tools
  { url: "/duplicate-line-remover", priority: 0.8, changeFrequency: "monthly" },
  { url: "/duplicate-word-finder", priority: 0.8, changeFrequency: "monthly" },
  { url: "/em-dash-remover", priority: 0.7, changeFrequency: "monthly" },
  { url: "/plain-text-converter", priority: 0.8, changeFrequency: "monthly" },
  { url: "/remove-letters-characters", priority: 0.7, changeFrequency: "monthly" },
  { url: "/sentence-rewriter", priority: 0.8, changeFrequency: "monthly" },
  { url: "/repeat-text-generator", priority: 0.7, changeFrequency: "monthly" },
  { url: "/reverse-text-generator", priority: 0.7, changeFrequency: "monthly" },
  { url: "/roman-numeral-date-converter", priority: 0.7, changeFrequency: "monthly" },
  { url: "/sort-words-alphabetically", priority: 0.7, changeFrequency: "monthly" },
  { url: "/text-replacement-tool", priority: 0.8, changeFrequency: "monthly" },
  // Code & data tools
  { url: "/base64-encoder-decoder", priority: 0.9, changeFrequency: "monthly" },
  { url: "/binary-code-translator", priority: 0.8, changeFrequency: "monthly" },
  { url: "/css-formatter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/csv-to-json-converter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/caesar-cipher-tool", priority: 0.7, changeFrequency: "monthly" },
  { url: "/graphql-formatter", priority: 0.8, changeFrequency: "monthly" },
  { url: "/html-formatter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/hex-to-text-converter", priority: 0.8, changeFrequency: "monthly" },
  { url: "/json-formatter", priority: 1.0, changeFrequency: "monthly" },
  { url: "/url-encoder-decoder", priority: 0.9, changeFrequency: "monthly" },
  { url: "/markdown-to-html-converter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/json-stringifier", priority: 0.8, changeFrequency: "monthly" },
  { url: "/json-to-yaml-converter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/json-stringify-text-generator", priority: 0.7, changeFrequency: "monthly" },
  { url: "/javascript-formatter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/md5-hash-generator", priority: 0.8, changeFrequency: "monthly" },
  { url: "/markdown-formatter-previewer", priority: 0.8, changeFrequency: "monthly" },
  { url: "/markdown-table-generator", priority: 0.8, changeFrequency: "monthly" },
  { url: "/morse-code-translator", priority: 0.7, changeFrequency: "monthly" },
  { url: "/number-sorter", priority: 0.7, changeFrequency: "monthly" },
  { url: "/rot13-encoder-decoder", priority: 0.7, changeFrequency: "monthly" },
  { url: "/regex-text-tool", priority: 0.8, changeFrequency: "monthly" },
  { url: "/scss-formatter", priority: 0.8, changeFrequency: "monthly" },
  // Image tools
  { url: "/ai-image-to-text", priority: 0.9, changeFrequency: "monthly" },
  { url: "/ascii-art-generator", priority: 0.8, changeFrequency: "monthly" },
  { url: "/jpg-to-png-converter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/jpg-to-webp-converter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/png-to-jpg-converter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/png-to-webp-converter", priority: 0.9, changeFrequency: "monthly" },
  { url: "/svg-to-png-converter", priority: 0.8, changeFrequency: "monthly" },
  { url: "/webp-to-png-converter", priority: 0.8, changeFrequency: "monthly" },
  { url: "/webp-to-jpg-converter", priority: 0.8, changeFrequency: "monthly" },
  // Random generators
  { url: "/random-choice-generator", priority: 0.7, changeFrequency: "monthly" },
  { url: "/random-data-generator", priority: 0.8, changeFrequency: "monthly" },
  { url: "/random-ip-address-generator", priority: 0.7, changeFrequency: "monthly" },
  { url: "/random-letter-generator", priority: 0.7, changeFrequency: "monthly" },
  { url: "/random-month-generator", priority: 0.6, changeFrequency: "monthly" },
  { url: "/random-number-generator", priority: 0.8, changeFrequency: "monthly" },
  { url: "/strong-password-generator", priority: 0.9, changeFrequency: "monthly" },
  { url: "/uuid-generator", priority: 0.9, changeFrequency: "monthly" },
  // Blog
  { url: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { url: "/invoice-generator", priority: 0.9, changeFrequency: "monthly" },
  // Legal & Corporate
  { url: "/about", priority: 0.8, changeFrequency: "monthly" },
  { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { url: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
] as const;

import { getSortedPostsData } from "@/lib/blog";
import fs from "fs";
import path from "path";

function getLastModifiedDate(routeUrl: string): string {
  try {
    const routePath = routeUrl === "" ? "/" : routeUrl;
    const filePath = path.join(process.cwd(), "src", "app", routePath, "page.tsx");
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: getLastModifiedDate(""),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toolRoutes.map(({ url, priority, changeFrequency }) => ({
      url: `${BASE_URL}${url}`,
      lastModified: getLastModifiedDate(url),
      changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority,
    })),
  ];

  const blogPosts = getSortedPostsData();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.publish_date ? new Date(post.publish_date).toISOString() : new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
