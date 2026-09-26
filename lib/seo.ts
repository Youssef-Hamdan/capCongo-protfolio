import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.cap-congo.com";

export const SITE_NAME = "CAP Congo";

export const SITE_TAGLINE = "Produire local, nourrir durablement";

export const SITE_DESCRIPTION =
  "Produire local, nourrir durablement. CAP Congo SARL développe l'agriculture, la pisciculture et l'agro-industrie en République Démocratique du Congo.";

export const SITE_OG_IMAGE = "/images/logos/Logo%20Cap%20Congo%20Horizontale.png";

export const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/agro-palm", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/agricole-bundundu",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/agro-pastoral",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/pisciculture",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/durabilite", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/social", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/products", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
] as const;

export type PageMetadataOptions = {
  /** Short page title — root layout template adds `| CAP Congo`. */
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  ogImage = SITE_OG_IMAGE,
  ogImageAlt,
  ogImageWidth,
  ogImageHeight,
  keywords,
}: PageMetadataOptions): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const socialTitle = `${title} | ${SITE_NAME}`;

  const imageEntry =
    ogImageWidth && ogImageHeight
      ? {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt ?? title,
        }
      : {
          url: ogImage,
          alt: ogImageAlt ?? title,
        };

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "fr_CD",
      url: canonical,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [imageEntry],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}

export function createBreadcrumbSchema(path: string, pageName: string) {
  const canonical = path.startsWith("/") ? path : `/${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: absoluteUrl(canonical),
      },
    ],
  };
}
