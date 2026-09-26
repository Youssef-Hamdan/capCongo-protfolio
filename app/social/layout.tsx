import { PageBreadcrumbJsonLd } from "../components/page-breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Impact social",
  description:
    "Engagement communautaire de CAP Congo : hôpital à Babama, distributions alimentaires et soutien aux populations locales en RDC.",
  path: "/social",
  ogImage: "/images/social/hospital_7.webp",
  ogImageAlt: "Impact social — CAP Congo",
  keywords: [
    "impact social RDC",
    "développement communautaire Congo",
    "CAP Congo social",
    "humanitaire agriculture",
  ],
});

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBreadcrumbJsonLd path="/social" pageName="Impact social" />
      {children}
    </>
  );
}
