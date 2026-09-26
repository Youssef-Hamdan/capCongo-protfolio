import { PageBreadcrumbJsonLd } from "../components/page-breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contactez CAP Congo SARL. Agro Palm & Agricole Bandundu : +243 816 448 888 — Pisciculture : +243 826 200 575 — E-mail : info@cap-congo.com.",
  path: "/contact",
  ogImage: "/images/bundundu/DJI_20251028123130_0313_D.webp",
  ogImageAlt: "Champs agricoles — CAP Congo",
  keywords: ["contact CAP Congo", "CAP Congo SARL", "agriculture RDC contact"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBreadcrumbJsonLd path="/contact" pageName="Contact" />
      {children}
    </>
  );
}
