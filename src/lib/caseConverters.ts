export const toSentenceCase = (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
export const toLowerCaseText = (t: string) => t.toLowerCase();
export const toUpperCaseText = (t: string) => t.toUpperCase();
export const toCapitalizedCase = (t: string) => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
export const toTitleCase = (t: string) => {
  const minor = new Set(["a","an","the","and","but","or","for","nor","on","at","to","by","in","of","up","as","is"]);
  return t.toLowerCase().split(" ").map((w,i) => i===0||!minor.has(w) ? w.charAt(0).toUpperCase()+w.slice(1) : w).join(" ");
};
export const toInverseCase = (t: string) => t.split("").map(c => c===c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
