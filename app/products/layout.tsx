import { PageBreadcrumbJsonLd } from "../components/page-breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Produits",
  description:
    "Gamme CAP Congo : savons Agro Palm, huile végétale Palmina, aliment BioMar pour la pisciculture et maïs Tiger — produits locaux de qualité en RDC.",
  path: "/products",
  ogImage: "/images/products/HuilevgtalePalminaBidon3L.webp",
  ogImageAlt: "Huile végétale Palmina — CAP Congo",
  keywords: [
    "produits CAP Congo",
    "savon Agro Palm",
    "huile Palmina",
    "BioMar pisciculture",
    "maïs Tiger",
  ],
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBreadcrumbJsonLd path="/products" pageName="Produits" />
      {children}
    </>
  );
}
