import { createBreadcrumbSchema } from "@/lib/seo";
import { PageJsonLd } from "./json-ld";

type PageBreadcrumbJsonLdProps = {
  path: string;
  pageName: string;
};

export function PageBreadcrumbJsonLd({ path, pageName }: PageBreadcrumbJsonLdProps) {
  return <PageJsonLd schema={createBreadcrumbSchema(path, pageName)} />;
}
