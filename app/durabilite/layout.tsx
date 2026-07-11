import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Durabilité",
  description:
    "Protection de la nature et agriculture responsable. CAP Congo régénère la couverture végétale et utilise ses espaces agricoles de manière durable.",
  alternates: {
    canonical: "/durabilite",
  },
  openGraph: {
    title: "Durabilité | CAP Congo",
    description:
      "Approche durable : agriculture responsable et régénération de la couverture végétale en RDC.",
    url: "/durabilite",
  },
};

export default function DurabiliteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
