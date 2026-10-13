const SENTENCE_CASE_TERMS: Record<string, string> = {
  api: "API", css: "CSS", csv: "CSV", html: "HTML", http: "HTTP", https: "HTTPS",
  id: "ID", ip: "IP", javascript: "JavaScript", json: "JSON", md5: "MD5", nasa: "NASA",
  pdf: "PDF", php: "PHP", seo: "SEO", sql: "SQL", svg: "SVG", ui: "UI", url: "URL",
  uuid: "UUID", webp: "WebP", xml: "XML", yaml: "YAML", youtube: "YouTube", chatgpt: "ChatGPT",
  github: "GitHub", iphone: "iPhone", ipad: "iPad", ios: "iOS", macos: "macOS", nextjs: "Next.js",
};

const PROTECTED_TEXT_PATTERN = /(?:https?:\/\/[^\s]+|www\.[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/gi;

/** Converts prose to sentence case while preserving URLs, emails, and common technical terms. */
export const toSentenceCase = (text: string) => {
  const protectedValues: string[] = [];
  const masked = text.replace(PROTECTED_TEXT_PATTERN, (value) => {
    protectedValues.push(value);
    return `\uE000${protectedValues.length - 1}\uE001`;
  });

  const sentenceCased = masked
    .toLocaleLowerCase()
    .replace(/(^|[.!?](?=\s|$))(\s*)(\p{L})/gu, (_match, boundary, whitespace, letter) => `${boundary}${whitespace}${letter.toLocaleUpperCase()}`)
    .replace(/\b[\p{L}\p{N}.+-]+\b/gu, (word) => SENTENCE_CASE_TERMS[word.toLowerCase()] ?? word);

  return sentenceCased.replace(/\uE000(\d+)\uE001/g, (_match, index) => protectedValues[Number(index)] ?? "");
};
export const toLowerCaseText = (t: string) => t.toLowerCase();
export const toUpperCaseText = (t: string) => t.toUpperCase();
export const toCapitalizedCase = (t: string) => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
export const toTitleCase = (t: string) => {
  const minor = new Set(["a","an","the","and","but","or","for","nor","on","at","to","by","in","of","up","as","is"]);
  return t.toLowerCase().split(" ").map((w,i) => i===0||!minor.has(w) ? w.charAt(0).toUpperCase()+w.slice(1) : w).join(" ");
};
export const toInverseCase = (t: string) => t.split("").map(c => c===c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
