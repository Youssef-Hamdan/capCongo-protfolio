import CompanyPage from "../components/company-page";

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
      heroImage="/images/pisiculture/DJI_0307.JPG"
      showcaseImages={[
        "/images/pisiculture/HR5A3722.JPG",
        "/images/pisiculture/HR5A3714.JPG",
        "/images/pisiculture/DJI_0312.JPG",
      ]}
      accentColor="blue"
      logoSrc="/images/logos/Asset%2013@4x.png"
      iconName="Fish"
    />
  );
}
