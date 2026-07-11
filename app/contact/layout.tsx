import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez CAP Congo SARL. Agro Palm & Agricole Bandundu : +243 816 448 888 — Pisciculture : +243 826 200 575 — E-mail : info@cap-congo.com.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | CAP Congo",
    description:
      "Écrivez-nous ou appelez CAP Congo SARL pour vos projets agricoles et partenariats.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
