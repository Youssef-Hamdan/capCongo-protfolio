import type { Metadata } from "next";
import CompanyPage from "../components/company-page";

export const metadata: Metadata = {
  title: "Pisciculture",
  description:
    "Production de poissons d'eau douce en RDC : tilapia et clarias. Pisciculture CAP Congo développe l'aquaculture et renforce la sécurité alimentaire.",
  alternates: {
    canonical: "/pisciculture",
  },
  openGraph: {
    title: "Pisciculture | CAP Congo",
    description:
      "Pisciculture intégrée en République Démocratique du Congo — tilapia, clarias et aliments pour poissons.",
    url: "/pisciculture",
    images: [{ url: "/images/pisiculture/fish3.webp", alt: "Pisciculture" }],
  },
};

export default function PisciculturePage() {
  return (
    <CompanyPage
      title="PISCICULTURE"
      intro="Entreprise spécialisée en pisciculture en République Démocratique du Congo, nous développons une production intégrée de poissons d’eau douce, notamment le tilapia (rouge et noir) et le clarias."
      paragraphs={[
        "En complément de notre activité, nous assurons la distribution d’aliments pour poissons, sélectionnés auprès de fournisseurs fiables afin de garantir des performances optimales en élevage.",
        "Grâce à la maîtrise de notre production et à notre expertise terrain, nous proposons des solutions adaptées aux besoins des pisciculteurs, alliant qualité, régularité et efficacité.",
        "Notre mission est de contribuer au développement de l’aquaculture en RDC en offrant des produits performants et accessibles, tout en renforçant la sécurité alimentaire."
      ]}
      paragraphSubtitles={[
        "**Aliments** pour poissons et performances d’**élevage**",
        "**Maîtrise** de la production et solutions **pisciculteurs**",
        "**Aquaculture** en RDC et **sécurité alimentaire**",
      ]}
      heroImages={[
        "/images/pisiculture/fish3.webp",
        "/images/pisiculture/DJI_0307.webp",
        "/images/pisiculture/fish1.webp",
      ]}
      showcaseImages={[
        "/images/pisiculture/HR5A3722.webp",
        "/images/pisiculture/HR5A3714.webp",
        "/images/pisiculture/DJI_0312.webp",
      ]}
      accentColor="blue"
      logoSrc="/images/logos/Asset%2013@4x.png"
      iconName="Fish"
      vimeoVideoId="1203824965"
    />
  );
}
