import CompanyPage from "../components/company-page";
import { PageBreadcrumbJsonLd } from "../components/page-breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";
import type { CompanyActivity } from "../components/company-activities-section";

export const metadata = createPageMetadata({
  title: "Agro Palm",
  description:
    "Production et transformation du palmier à huile en RDC. Agro Palm maîtrise la chaîne de valeur, de la palmeraie à l'huile certifiée pour les marchés locaux et internationaux.",
  path: "/agro-palm",
  ogImage: "/images/agro-palm/A1.webp",
  ogImageAlt: "Palmeraie — Agro Palm",
  keywords: [
    "Agro Palm",
    "huile de palme RDC",
    "palmeraie Congo",
    "agro-industrie palmier",
  ],
});

const agroPalmActivities: CompanyActivity[] = [
  {
    name: "Palmeraie Kisangani",
    subtitle: "De la pépinière à la récolte",
    steps: [
      {
        title: "Pré-pépinière & pépinière",
        description:
          "De la germination au développement, chaque jeune plant reçoit un suivi rigoureux pour former des palmiers robustes, indispensables à une production durable.",
        image: `/images/${encodeURIComponent("agroplam activity1 step1.jpeg")}`,
      },
      {
        title: "Présentation – Plantation de troisième année",
        description:
          "Nos palmiers gagnent en maturité grâce à des pratiques agricoles durables, témoignant de notre engagement pour la RDC.",
        image: `/images/${encodeURIComponent("agropalm activity1 step2.jpeg")}`,
      },
      {
        title: "Rings, rigoles & récolte",
        description:
          "Rings et rigoles retiennent eau et nutriments. Chaque régime d'environ 5 kg récolté témoigne de notre exigence de qualité.",
        image: `/images/${encodeURIComponent("agropalm activity1 step3.jpeg")}`,
      },
    ],
  },
  {
    name: "Usine Huile Tshela",
    subtitle: "Pour la transformation",
    steps: [
      {
        title: "Déchargement tri des régimes et Contrôle de qualité des régimes",
        description:
          "À la réception, les régimes sont triés et inspectés : seuls les régimes sains et conformes partent à l'usine.",
        image: `/images/${encodeURIComponent("agroplam activity2 step1.jpeg")}`,
      },
      {
        title: "Acheminement vers le stérilisateur et Passage au grattoir après la cuisson",
        description:
          "Les régimes sont cuits en stérilisateur, puis un grattoir sépare fruits et rafles pour acheminer les noix vers le pressage.",
        image: "/images/agropalmactivity2step2.webp",
      },
      {
        title: "Filtration & stockage des huiles",
        description:
          "Les noix sont pressées pour extraire l'huile brute, puis décantées afin d'éliminer les impuretés.",
        image: "/images/agropalmactivity2step3.webp",
      },
      {
        title: "Filtration & stockage des huiles",
        description:
          "Après filtration, les huiles passent en cuves et tanks finaux : CPO (palme rouge) et CPKO (palmiste).",
        image: "/images/agropalmactivity2step4.webp",
      },
    ],
  },
  {
    name: "Unités de Production & Produits - Agro Palm",
    subtitle: "De la transformation aux produits finis",
    steps: [
      {
        title: "Savonnerie CAP Congo Agro Palm",
        description:
          "Unité industrielle produisant des savons de qualité pour ménages et professionnels, contribuant à l'industrialisation de la RDC et au Made in Congo.",
        image: "/images/agropalmactivity3step1.webp",
      },
      {
        title: "L'usine d'huile – CAP Congo Agro Palm",
        description:
          "Transformation moderne des régimes de palme en une huile de qualité, valorisant nos plantations pour le développement agro-industriel de la RDC.",
        image: "/images/agropalmactivity3step2.webp",
      },
      {
        title: "L'usine d'huile – CAP Congo Agro Palm (Chaîne de production)",
        description:
          "Transformation moderne des régimes de palme en une huile de qualité, valorisant nos plantations pour le développement agro-industriel de la RDC.",
        image: `/images/${encodeURIComponent("agropalm activity3 step3.jpeg")}`,
      },
      {
        title: "L'emballage : la touche finale d'une qualité préservée",
        description:
          "Conditionnement moderne et précis des pots de margarine, garantissant hygiène, protection et conservation de la fraîcheur.",
        image: `/images/${encodeURIComponent("agropalm activity 3 step 4.jpeg")}`,
      },
    ],
  },
];

export default function AgroPalmPage() {
  return (
    <>
      <PageBreadcrumbJsonLd path="/agro-palm" pageName="Agro Palm" />
      <CompanyPage
        title="AGRO PALM"
        intro="Spécialisée dans la production et la transformation du palmier à huile en République Démocratique du Congo, notre entreprise se positionne en tant qu’acteur pleinement engagé dans le développement durable de la filière agro-industrielle."
        paragraphs={[
          "Maîtrisant l’ensemble de la chaîne de valeur, de la culture des palmeraies à la transformation des fruits, nous assurons la production d’une huile de palme répondant rigoureusement aux exigences des marchés locaux et internationaux.",
          "Notre mission consiste à valoriser les ressources naturelles nationales tout en favorisant la création d’emplois locaux et le développement économique des communautés environnantes.",
          "Par le recours à des méthodes de production optimisées et responsables, nous nous engageons à fournir des produits fiables, compétitifs et strictement conformes aux besoins des industries alimentaires et non alimentaires.",
        ]}
        paragraphSubtitles={[
          "De la **palmeraie** à l’huile certifiée **marchés**",
          "**Ressources** nationales, **emplois** et communautés",
          "Méthodes **responsables** et conformité **industrielle**",
        ]}
        heroImages={[
          "/images/agro-palm/A1.webp",
          "/images/agropalm_hero.webp",
          "/images/agro-palm/A3.webp",
        ]}
        showcaseImages={[
          "/images/agropalm_firstimage.webp",
          "/images/agropalm_secondimage.webp",
          "/images/agropalm_thirdimage.webp",
        ]}
        accentColor="green"
        logoSrc="/images/logos/Asset%2014@4x.png"
        iconName="Sprout"
        vimeoVideoId="1204217787"
        activities={agroPalmActivities}
      />
    </>
  );
}
