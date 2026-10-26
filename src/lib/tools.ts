// Single source of truth for tool routes. Used by the homepage directory,
// the site-wide footer navigation, and the sitemap.

export interface ToolLink {
  href: string;
  label: string;
}

export interface ToolCategory {
  name: string;
  tools: readonly ToolLink[];
}

export const TOOL_CATEGORIES: readonly ToolCategory[] = [
  {
    name: "Text Tools",
    tools: [
      { href: "/sentence-case", label: "Sentence Case" },
      { href: "/lower-case", label: "lower case" },
      { href: "/upper-case", label: "UPPER CASE" },
      { href: "/capitalized-case", label: "Capitalized Case" },
      { href: "/title-case", label: "Title Case" },
      { href: "/inverse-case", label: "iNVERSE cASE" },
      { href: "/duplicate-line-remover", label: "Duplicate Line Remover" },
      { href: "/duplicate-word-finder", label: "Duplicate Word Finder" },
      { href: "/em-dash-remover", label: "Em Dash Remover" },
      { href: "/plain-text-converter", label: "Plain Text Converter" },
      { href: "/remove-letters-characters", label: "Remove Letters & Characters" },
      { href: "/sentence-rewriter", label: "Sentence Rewriter" },
      { href: "/repeat-text-generator", label: "Repeat Text Generator" },
      { href: "/reverse-text-generator", label: "Reverse Text Generator" },
      { href: "/roman-numeral-date-converter", label: "Roman Numeral Date Converter" },
      { href: "/sort-words-alphabetically", label: "Sort Words Alphabetically" },
      { href: "/text-replacement-tool", label: "Text Replacement Tool" },
    ],
  },
  {
    name: "Code & Data",
    tools: [
      { href: "/base64-encoder-decoder", label: "Base64 Encoder & Decoder" },
      { href: "/binary-code-translator", label: "Binary Code Translator" },
      { href: "/css-formatter", label: "CSS Formatter" },
      { href: "/csv-to-json-converter", label: "CSV to JSON Converter" },
      { href: "/caesar-cipher-tool", label: "Caesar Cipher Tool" },
      { href: "/graphql-formatter", label: "GraphQL Formatter" },
      { href: "/html-formatter", label: "HTML Formatter" },
      { href: "/hex-to-text-converter", label: "Hex to Text Converter" },
      { href: "/json-formatter", label: "JSON Formatter" },
      { href: "/url-encoder-decoder", label: "URL Encoder & Decoder" },
      { href: "/markdown-to-html-converter", label: "Markdown to HTML" },
      { href: "/json-stringifier", label: "JSON Stringifier" },
      { href: "/json-to-yaml-converter", label: "JSON to YAML" },
      { href: "/json-stringify-text-generator", label: "JSON Stringify Text Generator" },
      { href: "/javascript-formatter", label: "JavaScript Formatter" },
      { href: "/md5-hash-generator", label: "MD5 Hash Generator" },
      { href: "/markdown-formatter-previewer", label: "Markdown Formatter" },
      { href: "/markdown-table-generator", label: "Markdown Table Generator" },
      { href: "/morse-code-translator", label: "Morse Code Translator" },
      { href: "/number-sorter", label: "Number Sorter" },
      { href: "/rot13-encoder-decoder", label: "ROT13 Encoder & Decoder" },
      { href: "/regex-text-tool", label: "Regex Text Tool" },
      { href: "/scss-formatter", label: "SCSS Formatter" },
    ],
  },
  {
    name: "Image Tools",
    tools: [
      { href: "/ai-image-to-text", label: "AI Image to Text" },
      { href: "/ascii-art-generator", label: "ASCII Art Generator" },
      { href: "/jpg-to-png-converter", label: "JPG to PNG" },
      { href: "/jpg-to-webp-converter", label: "JPG to WebP" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG" },
      { href: "/png-to-webp-converter", label: "PNG to WebP" },
      { href: "/svg-to-png-converter", label: "SVG to PNG" },
      { href: "/webp-to-png-converter", label: "WebP to PNG" },
      { href: "/webp-to-jpg-converter", label: "WebP to JPG" },
    ],
  },
  {
    name: "Random Generators",
    tools: [
      { href: "/random-choice-generator", label: "Random Choice Generator" },
      { href: "/random-data-generator", label: "Random Data Generator" },
      { href: "/random-ip-address-generator", label: "Random IP Generator" },
      { href: "/random-letter-generator", label: "Random Letter Generator" },
      { href: "/random-month-generator", label: "Random Month Generator" },
      { href: "/random-number-generator", label: "Random Number Generator" },
      { href: "/strong-password-generator", label: "Password Generator" },
      { href: "/uuid-generator", label: "UUID Generator" },
    ],
  },
];

// Indexable routes that are not part of a tool category.
export const OTHER_ROUTES = ["/invoice-generator", "/blog", "/about", "/privacy-policy", "/terms-of-service"] as const;

export const ALL_TOOL_HREFS = TOOL_CATEGORIES.flatMap((c) => c.tools.map((t) => t.href));
