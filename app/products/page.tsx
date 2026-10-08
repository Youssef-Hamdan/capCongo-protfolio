'use client'

import { useState } from 'react'
import { HeroFooter } from '../components/hero-footer'

const products = [
  {
    id: 1,
    name: 'Savon Dona Nectar de Fleur',
    category: 'Savon',
    description:
      "Découvrez Dona Nectar de Fleur, le savon de soin corporel conçu pour révéler toute la beauté naturelle de votre peau. Grâce à sa mousse onctueuse et à son parfum floral délicat, il nettoie en douceur, procure une agréable sensation de fraîcheur et laisse la peau douce, propre et délicatement parfumée — fabriqué par CAP Congo Agro Palm.",
    image: '/images/products/savon/Dona blue.webp',
    tag: 'Soin Floral',
  },
  {
    id: 2,
    name: 'Savon Dona Arôme de Fleur',
    category: 'Savon',
    description:
      "Offrez à votre peau un véritable moment de douceur avec le Savon Dona – Arôme de Fleur. Sa mousse onctueuse nettoie délicatement la peau tout en laissant un parfum floral frais et raffiné. Conçu pour le soin corporel quotidien, il transforme chaque bain en un instant de plaisir — un produit de CAP Congo Agro Palm.",
    image: '/images/products/savon/Dona green.webp',
    tag: 'Fraîcheur',
  },
  {
    id: 3,
    name: 'Savon Dona au Miel',
    category: 'Savon',
    description:
      "Offrez à votre peau le meilleur de la nature avec le Savon Dona au Miel. Enrichi en miel, reconnu pour ses propriétés nourrissantes et adoucissantes, il nettoie délicatement tout en préservant l'hydratation naturelle. Idéal pour un soin corporel quotidien — un produit de CAP Congo Agro Palm.",
    image: '/images/products/savon/Dona yellow.webp',
    tag: 'Nourrissant',
  },
  {
    id: 4,
    name: 'Savon DONA Bouquet de Fleur',
    category: 'Savon',
    description:
      "Offrez à votre peau un véritable moment de douceur avec le Savon DONA Bouquet de Fleur. Enrichi d'un délicat parfum floral, il nettoie efficacement tout en laissant fraîcheur et fragrance raffinée. Un soin corporel quotidien alliant confort, élégance et bien-être — CAP Congo Agro Palm.",
    image: '/images/products/savon/Dona purpel.webp',
    tag: 'Parfumé',
  },
  {
    id: 5,
    name: 'Super+',
    category: 'Savon',
    description:
      "Super+ est un savon médical antibactérien conçu pour une hygiène optimale au quotidien. Sa formule aide à éliminer les bactéries, purifier la peau et protéger toute la famille contre les impuretés responsables de nombreuses infections cutanées — fabriqué par CAP Congo Agro Palm.",
    image: '/images/products/savon/super.webp',
    tag: 'Antibactérien',
  },
  {
    id: 6,
    name: 'Savon SOPA Beauty glycérine blanche (Vert)',
    category: 'Savon',
    description:
      "Le savon conçu pour nettoyer en douceur tout en préservant l'hydratation naturelle de votre peau. Grâce à sa formule enrichie en glycérine, il laisse la peau douce, souple et agréablement parfumée. Adapté à un usage quotidien — un produit de CAP Congo Agro Palm.",
    image: '/images/products/savon/sopa green.webp',
    tag: 'Glycérine',
  },
  {
    id: 7,
    name: 'Savon SOPA Beauty glycérine blanche (Jaune)',
    category: 'Savon',
    description:
      "Le savon conçu pour nettoyer en douceur tout en préservant l'hydratation naturelle de votre peau. Grâce à sa formule enrichie en glycérine, il laisse la peau douce, souple et agréablement parfumée. Adapté à un usage quotidien — un produit de CAP Congo Agro Palm.",
    image: '/images/products/savon/Sopa yellow.webp',
    tag: 'Glycérine',
  },
  {
    id: 8,
    name: 'Savon SOPA Beauty glycérine blanche (Rose)',
    category: 'Savon',
    description:
      "Le savon conçu pour nettoyer en douceur tout en préservant l'hydratation naturelle de votre peau. Grâce à sa formule enrichie en glycérine, il laisse la peau douce, souple et agréablement parfumée. Adapté à un usage quotidien — un produit de CAP Congo Agro Palm.",
    image: '/images/products/savon/sopa pink.webp',
    tag: 'Glycérine',
  },
  {
    id: 9,
    name: 'Savon Magic+ — Un savon, plusieurs usages',
    category: 'Savon',
    description:
      "Magic+ est un savon polyvalent conçu pour répondre aux besoins quotidiens de toute la famille. Efficace pour la vaisselle et le nettoyage des mains, il convient également au bain et à tous types de peau. Sa formule offre un nettoyage efficace tout en laissant une agréable sensation de propreté.",
    image: '/images/products/savon/magic-plus.jpeg',
    tag: 'Polyvalent',
  },
  {
    id: 10,
    name: 'Savon de Marseille Fleuri (Safi+)',
    category: 'Savon',
    description:
      "Le Safi+ savon de Marseille Fleuri allie la tradition du savon de Marseille à un délicat parfum floral. Il nettoie la peau en douceur, laisse une fragrance fleurie durable et apporte douceur, propreté et confort à toute la famille — un produit de CAP Congo Agro Palm.",
    image: '/images/products/savon/Safi pink.webp',
    tag: 'Traditionnel',
  },
  {
    id: 17,
    name: 'Savon Éléphant',
    category: 'Savon',
    description:
      "Le savon Éléphant est votre allié au quotidien pour le ménage, la vaisselle et la lessive. Un savon polyvalent pour entretenir votre maison, nettoyer vos ustensiles et laver votre linge.",
    image: '/images/Elephantsavon.webp',
    tag: 'Polyvalent',
  },
  {
    id: 18,
    name: 'Savon Cristo',
    category: 'Savon',
    description:
      "Le savon Cristo accompagne vos gestes de propreté. Idéal pour le ménage et l'entretien de votre maison. Votre partenaire au quotidien pour un intérieur soigné.",
    image: '/images/Cristosavon.webp',
    tag: 'Ménage',
  },
  {
    id: 11,
    name: 'Huile végétale Palmina – Bidon 25 L',
    category: 'Huiles',
    description:
      "Une huile végétale de qualité, adaptée aux besoins des familles, restaurants et professionnels de la restauration. Son format de 25 litres est idéal pour une utilisation régulière et en grande quantité.",
    image: '/images/products/palmina-25l.jpeg',
    tag: '25 L',
  },
  {
    id: 12,
    name: 'Huile végétale Palma – Bidon 25 L',
    category: 'Huiles',
    description:
      "Une huile pratique et polyvalente pour vos différentes préparations culinaires. Le bidon de 25 litres offre un format économique adapté aux usages professionnels et collectifs.",
    image: '/images/products/palma-25l.jpeg',
    tag: '25 L',
  },
  {
    id: 13,
    name: 'Huile végétale Palmina – Bidon 3 L',
    category: 'Huiles',
    description:
      "Pratique au quotidien, l'huile végétale Palmina est idéale pour la cuisson, la friture et la préparation de vos plats préférés. Son format de 3 litres offre un excellent équilibre entre praticité et quantité, pour accompagner facilement toutes vos recettes.",
    image: '/images/products/palmina-3l.jpeg',
    tag: '3 L',
  },
  {
    id: 14,
    name: "BioMar : L'aliment de qualité pour une pisciculture performante",
    category: 'Pisciculture',
    description:
      "Chez Cap Congo Pisciculture, nous mettons à la disposition des pisciculteurs l'aliment BioMar, une marque reconnue en Europe pour son expertise dans la nutrition aquacole. Grâce à des formulations équilibrées et adaptées aux besoins des poissons, BioMar favorise une croissance rapide, une excellente conversion alimentaire et une meilleure santé des élevages. Conçu pour répondre aux exigences de l'aquaculture moderne, l'aliment BioMar contribue à améliorer les performances de production tout en garantissant le bien-être des poissons.",
    image: '/images/products/Biomar.webp',
    tag: 'Aquacole',
  },
  {
    id: 15,
    name: "Poisson-chat (Ngolo) : Le goût du frais, la qualité du local",
    category: "Pisciculture",
    description: "Le goût du frais, la qualité du local ! Élevé avec soin par Cap Congo Pisciculture, notre poisson-chat, également appelé Ngolo, est une production locale destinée à offrir aux familles congolaises un poisson frais et de qualité. De l’élevage à la commercialisation, nous veillons à chaque étape pour proposer un produit frais, savoureux et adapté aux besoins du marché congolais.",
    image: "/images/catfish.webp",
    tag: "Production locale"
  },
  {
    id: 16,
    name: 'Maïs Jaune Tiger – La qualité qui nourrit vos meilleures recettes',
    category: 'Céréales',
    description:
      "Le Maïs jaune Tiger est sélectionné avec soin pour vous offrir des grains de qualité, riches en saveur et en valeur nutritive. Idéal pour préparer une farine de maïs, des bouillies, des plats traditionnels et bien d'autres recettes, il est le choix parfait pour une alimentation saine et savoureuse au quotidien.",
    image: '/images/products/SacmasTiger.webp',
    tag: 'Maïs',
  },
]

const categories = [
  'Savon',
  'Huiles',
  'Pisciculture',
  'Céréales',
  'Tous',
]

export default function ProductsPage() {
  const [active, setActive] = useState('Savon')
  const [hovered, setHovered] = useState<number | null>(null)

  const filtered =
    active === 'Tous' ? products : products.filter((p) => p.category === active)

  return (
    <div className="flex min-h-screen flex-col bg-background font-sora text-cap-dark selection:bg-cap-yellow selection:text-cap-dark">
      <main className="flex-1 pt-24 md:pt-28">
        <section className="mx-auto max-w-[1400px] px-6 pb-12 md:pb-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-10">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cap-green md:mb-6">
                Nos produits
              </p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-cap-dark md:text-6xl lg:text-7xl">
                La gamme CAP Congo
                <br />
                <span className="text-cap-green">savons, huiles & plus.</span>
              </h1>
            </div>
            <p className="max-w-md pb-2 text-base font-light leading-relaxed text-black/60 md:text-lg">
              Savons Agro Palm, huiles végétales Palmina & Palma, aliment BioMar
              pour la pisciculture et maïs Tiger — des produits locaux de qualité
              pour les familles et professionnels en RDC.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-6 pb-12 md:pb-16">
          <div className="flex w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-2xl border border-black/5 bg-black/5 p-1.5 shadow-sm md:w-auto md:max-w-fit md:flex-wrap md:rounded-full [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cap-dark/40 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black/10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ease-out sm:text-[11px] ${
                  active === cat
                    ? 'bg-cap-yellow text-cap-dark shadow-sm'
                    : 'bg-transparent text-black/50 hover:bg-black/5 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group flex cursor-pointer flex-col"
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border border-black/5 bg-gray-50 ring-1 ring-black/0 transition-all duration-500 group-hover:ring-black/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {product.tag && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-cap-yellow px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-cap-dark shadow-md md:left-5 md:top-5 md:px-3.5 md:py-1.5 md:text-[10px]">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-1">
                  <h2 className="mb-2 text-lg font-semibold leading-tight tracking-tight text-cap-dark transition-colors duration-300 group-hover:text-cap-green md:text-xl">
                    {product.name}
                  </h2>

                  <span className="mb-4 block text-[10px] font-semibold uppercase tracking-widest text-cap-green md:text-[11px]">
                    {product.category}
                  </span>

                  <p className="flex-1 whitespace-pre-line text-sm font-light leading-relaxed text-black/60">
                    {product.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 transition-colors duration-300 group-hover:text-cap-dark">
                      Voir le produit
                    </span>
                    <div
                      className="h-[2px] rounded-full bg-cap-green transition-all duration-500 ease-out"
                      style={{
                        width: hovered === product.id ? '2.5rem' : '0rem',
                        opacity: hovered === product.id ? 1 : 0,
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center text-sm font-light text-black/40 md:py-32">
              Aucun produit ne correspond à cette catégorie.
            </div>
          )}
        </div>
      </main>

      <HeroFooter />
    </div>
  )
}
