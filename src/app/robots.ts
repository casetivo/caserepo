import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/invoice-generator/edit/"],
      },
    ],
    sitemap: "https://www.casetivo.com/sitemap.xml",
    host: "https://www.casetivo.com",
  };
}
