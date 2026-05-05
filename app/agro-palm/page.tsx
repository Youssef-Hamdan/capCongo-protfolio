import CompanyPage from "../components/company-page";

export default function AgroPalmPage() {
  return (
    <CompanyPage
      title="AGRO PALM"
      intro="Spécialisée dans la production et la transformation du palmier à huile en République Démocratique du Congo, notre entreprise se positionne en tant qu’acteur pleinement engagé dans le développement durable de la filière agro-industrielle."
      paragraphs={[
        "Maîtrisant l’ensemble de la chaîne de valeur, de la culture des palmeraies à la transformation des fruits, nous assurons la production d’une huile de palme répondant rigoureusement aux exigences des marchés locaux et internationaux.",
        "Notre mission consiste à valoriser les ressources naturelles nationales tout en favorisant la création d’emplois locaux et le développement économique des communautés environnantes.",
        "Par le recours à des méthodes de production optimisées et responsables, nous nous engageons à fournir des produits fiables, compétitifs et strictement conformes aux besoins des industries alimentaires et non alimentaires."
      ]}
      paragraphSubtitles={[
        "De la **palmeraie** à l’huile certifiée **marchés**",
        "**Ressources** nationales, **emplois** et communautés",
        "Méthodes **responsables** et conformité **industrielle**",
      ]}
      heroImage="/images/agro-palm/hero.jpeg"
      showcaseImages={[
        "/images/agro-palm/image2.jpeg", 
        "/images/agro-palm/image1.jpg",
        "/images/agro-palm/image3.jpeg",
      ]}
      accentColor="green"
      logoSrc="/images/logos/Asset%2014@4x.png"
      iconName="Sprout"
    />
  );
}
