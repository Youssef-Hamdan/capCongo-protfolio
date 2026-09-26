import CompanyPage from "../components/company-page";
import { PageBreadcrumbJsonLd } from "../components/page-breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";
import type { CompanyActivity } from "../components/company-activities-section";
export const metadata = createPageMetadata({
  title: "Agricole Bandundu",
  description:
    "Développement agricole et cultures vivrières en RDC. Agricole Bandundu valorise la production locale et renforce la sécurité alimentaire.",
  path: "/agricole-bundundu",
  ogImage: "/images/bundundu/DJI_20251125123306_0693_D.webp",
  ogImageAlt: "Champs agricoles — Agricole Bandundu",
  keywords: [
    "Agricole Bandundu",
    "agriculture Bandundu",
    "cultures vivrières RDC",
    "sécurité alimentaire Congo",
  ],
});

export const bundunduActivities: CompanyActivity[] = [
  {
    name: "Agricole Bandundu - Maïs",
    subtitle: "De la préparation du sol à l'expédition",
    steps: [
      {
        title: "Préparation du terrain et plantation",
        description:
          "De la préparation du sol à la mise en terre, notre travail minutieux crée les meilleures conditions pour garantir des cultures saines, abondantes et de qualité.",
        image: "/images/bundundu/Maize/step1.webp",
      },
      {
        title: "Protection des plantes",
        description:
          "Grâce à un suivi rigoureux et des pratiques adaptées, nous protégeons nos cultures contre les maladies, les ravageurs et les mauvaises herbes pour assurer une croissance saine.",
        image: "/images/bundundu/Maize/step2.webp",
      },
      {
        title: "Le mécanisme de la récolte",
        description:
          "Organisée avec efficacité et exécutée au moment idéal, notre récolte préserve la fraîcheur, la valeur nutritionnelle et le rendement optimal du maïs.",
        image: "/images/bundundu/Maize/step3.webp",
      },
      {
        title: "Chargement du maïs : cap vers de nouveaux marchés",
        description:
          "Étape clé de notre chaîne logistique, le chargement par bateau garantit un approvisionnement fiable du maïs tout en soutenant l'économie locale et la RDC.",
        image: "/images/bundundu/Maize/step4.webp",
      },
    ],
  },
  {
    name: "Agricole Bandundu - Manioc",
    subtitle: "Étapes de la plantation du manioc",
    steps: [
      {
        title: "Étapes de la plantation du manioc",
        description:
          "De la préparation du terrain à la mise en terre, chaque ligne est tracée avec précision pour garantir une productivité optimale et une agriculture durable.",
        image: "/images/bundundu/kasava/step1.webp",
      },
      {
        title: "Coupage et sélection des boutures",
        description:
          "Nos boutures sont sélectionnées et découpées selon des standards rigoureux, assurant une croissance vigoureuse, homogène et productive dès la mise en terre.",
        image: "/images/bundundu/kasava/step2.webp",
      },
      {
        title: "Suivi de la plantation de manioc",
        description:
          "Chaque parcelle bénéficie d'une attention quotidienne — surveillance de la croissance et entretien ciblé — garantissant des plantations saines et un rendement prometteur.",
        image: "/images/bundundu/kasava/step3.webp",
      },
      {
        title: "Notre plantation de manioc",
        description:
          "Nos plantations incarnent un engagement fort pour la sécurité alimentaire et le développement local, en cultivant un manioc de qualité pour l'avenir agricole du pays.",
        image: "/images/bundundu/kasava/step4.webp",
      },
    ],
  },
];

export default function AgricoleBundunduPage() {
  return (
    <>
      <PageBreadcrumbJsonLd path="/agricole-bundundu" pageName="Agricole Bundundu" />
      <CompanyPage
        title="AGRICOLE BANDUNDU"
        intro="Acteur engagé dans le développement agricole en République Démocratique du Congo, nous œuvrons à la valorisation des cultures vivrières et au renforcement de la sécurité alimentaire."
        paragraphs={[
          "Nous développons et exploitons des projets agricoles durables, en mettant l’accent sur l’optimisation des rendements, la modernisation des pratiques culturales et la préservation des ressources naturelles.",
          "À travers une approche intégrée, nous accompagnons l’ensemble de la chaîne de valeur: production, transformation et distribution, afin de garantir des produits de qualité, accessibles et adaptés aux besoins des marchés locaux.",
          "Notre mission est de contribuer activement au développement économique des territoires, en soutenant les communautés agricoles et en favorisant des modèles de production responsables et pérennes."
        ]}
        paragraphSubtitles={[
          "Projets agricoles **durables** et **rendements**",
          "Chaîne de valeur: **production** à la **distribution**",
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
        activities={bundunduActivities}
      />
    </>
  );
}
