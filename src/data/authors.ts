// Blog authors. A post opts in with `author: "<id>"` in its front matter;
// posts without one fall back to Casetivo as the author.

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  // Public profiles (LinkedIn, GitHub, X) that confirm who the author is.
  sameAs: string[];
}

export const AUTHORS: Record<string, Author> = {
  founder: {
    id: "founder",
    name: "Khizar Tahir",
    role: "Founder & Developer, Casetivo",
    bio: "Builds and maintains every Casetivo tool, drawing on 8+ years of experience in web development, data formats, and developer tooling.",
    sameAs: ["https://github.com/devkhizi"],
  },
};

export function getAuthor(id?: string): Author | undefined {
  return id ? AUTHORS[id] : undefined;
}
