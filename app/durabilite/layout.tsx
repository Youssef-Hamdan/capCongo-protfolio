import { PageBreadcrumbJsonLd } from "../components/page-breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Durabilité",
  description:
    "Protection de la nature et agriculture responsable. CAP Congo régénère la couverture végétale et utilise ses espaces agricoles de manière durable.",
  path: "/durabilite",
  ogImage: "/images/durabilite_1.webp",
  ogImageAlt: "Agriculture durable — CAP Congo",
  keywords: [
    "durabilité agricole",
    "agriculture responsable RDC",
    "environnement Congo",
    "couverture végétale",
  ],
});

export default function DurabiliteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBreadcrumbJsonLd path="/durabilite" pageName="Durabilité" />
      {children}
    </>
  );
}
