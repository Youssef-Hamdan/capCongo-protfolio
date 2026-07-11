export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.cap-congo.com";

export const SITE_NAME = "CAP Congo";

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
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
] as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
