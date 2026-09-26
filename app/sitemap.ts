import type { MetadataRoute } from "next";
import { absoluteUrl, ROUTES } from "@/lib/seo";

/** Stable date — update when site content changes meaningfully. */
const LAST_CONTENT_UPDATE = new Date("2026-03-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
