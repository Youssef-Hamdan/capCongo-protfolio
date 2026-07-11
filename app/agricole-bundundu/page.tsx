import type { Metadata } from "next";
import CompanyPage from "../components/company-page";

export const metadata: Metadata = {
  title: "Agricole Bundundu",
  description:
    "Développement agricole et cultures vivrières en RDC. Agricole Bundundu valorise la production locale et renforce la sécurité alimentaire.",
  alternates: {
    canonical: "/agricole-bundundu",
  },
  openGraph: {
    title: "Agricole Bundundu | CAP Congo",
    description:
      "Projets agricoles durables, cultures vivrières et sécurité alimentaire en République Démocratique du Congo.",
    url: "/agricole-bundundu",
    images: [
      {
        url: "/images/bundundu/DJI_20251125123306_0693_D.webp",
        alt: "Agricole Bundundu",
      },
    ],
  },
};

export default function AgricoleBundunduPage() {
  return (
    <CompanyPage
      title="AGRICOLE BUNDUNDU"
      intro="Acteur engagé dans le développement agricole en République Démocratique du Congo, nous œuvrons à la valorisation des cultures vivrières et au renforcement de la sécurité alimentaire."
      paragraphs={[
        "Nous développons et exploitons des projets agricoles durables, en mettant l’accent sur l’optimisation des rendements, la modernisation des pratiques culturales et la préservation des ressources naturelles.",
        "À travers une approche intégrée, nous accompagnons l’ensemble de la chaîne de valeur : production, transformation et distribution, afin de garantir des produits de qualité, accessibles et adaptés aux besoins des marchés locaux.",
        "Notre mission est de contribuer activement au développement économique des territoires, en soutenant les communautés agricoles et en favorisant des modèles de production responsables et pérennes."
      ]}
      paragraphSubtitles={[
        "Projets agricoles **durables** et **rendements**",
        "Chaîne de valeur : **production** à la **distribution**",
        "**Territoires**, communautés et modèles **pérennes**",
      ]}
      heroImages={[
        "/images/bundundu/DJI_20251125123306_0693_D.webp",
        "/images/bundundu/DJI_20251112123547_0512_D.webp",
        "/images/bundundu/DJI_20251028123130_0313_D.webp",
      ]}
      showcaseImages={[
        "/images/bundundu/BANANADEMOFIELD.webp",
        "/images/bundundu/SILO.webp",
        "/images/bundundu/WeedingONION.webp",
      ]}
      accentColor="yellow"
      logoSrc="/images/logos/Asset%2012@4x.png"
      iconName="Wheat"
      vimeoVideoId="1198419679"
    />
  );
}
