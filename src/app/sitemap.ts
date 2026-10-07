import type { MetadataRoute } from "next";
import { site } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: set NEXT_PUBLIC_SITE_URL; sitemap entries need absolute URLs.
  if (!site.url) return [];
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: p.tier === "flagship" ? 0.9 : 0.7,
    })),
  ];
}
