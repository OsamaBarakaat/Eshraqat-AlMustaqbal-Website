import { MetadataRoute } from "next";
import { ApiService } from "@/lib/api-service";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eshraqat-almustaqbal.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Properties URLs from database
  try {
    const properties = await ApiService.getProperties();

    const propertyUrls: MetadataRoute.Sitemap = (properties || [])
      .filter((prop) => prop.status === "PUBLISHED")
      .map((prop) => {
        const identifier = prop.slug || prop.id;
        const lastMod = prop.updatedAt ? new Date(prop.updatedAt) : new Date();
        return {
          url: `${siteUrl}/properties/${identifier}`,
          lastModified: lastMod,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });

    return [...staticPages, ...propertyUrls];
  } catch (err) {
    console.error("Error generating dynamic property sitemap:", err);
    return staticPages;
  }
}
