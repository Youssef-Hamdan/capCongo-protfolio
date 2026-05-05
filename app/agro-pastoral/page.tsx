import CompanyPage from "../components/company-page";

export default function AgroPastoralPage() {
  return (
    <CompanyPage
      title="AGRO-PASTORAL"
      intro="Entreprise agro-pastorale basée en République Démocratique du Congo, nous développons des activités intégrées alliant agriculture et élevage, au service de la sécurité alimentaire et du développement durable."
      paragraphs={[
        "Nous intervenons sur l’ensemble de la chaîne de valeur, de la production à la valorisation des produits agricoles et d’élevage, en garantissant qualité, traçabilité et régularité.",
        "Grâce à des pratiques modernes et responsables, nous optimisons les rendements tout en préservant les ressources naturelles et en soutenant les communautés locales.",
        "Notre ambition est de bâtir un modèle agro-pastoral performant, capable de répondre aux besoins croissants du marché tout en contribuant au développement économique du pays."
      ]}
      paragraphSubtitles={[
        "Chaîne de valeur, **qualité** et **traçabilité**",
        "**Rendements**, ressources et **communautés** locales",
        "Modèle **agro-pastoral** performant et **national**",
      ]}
      heroImage="/images/2_mais.jpg"
      accentColor="green"
      logoSrc="/images/logos/Asset%2015@4x.png"
      iconName="Leaf"
    />
  );
}
