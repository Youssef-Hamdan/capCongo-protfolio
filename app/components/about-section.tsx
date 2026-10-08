"use client";

import Image from "next/image";
import { AboutEvolutionHorizontal } from "./about-evolution-horizontal";
import { AboutRdcPresenceMap } from "./about-rdc-presence-map";
import { SectionLabel } from "./about-section-label";
import { ManifestoSteps } from "./about-manifesto-steps";
import { TextSequence } from "./text-sequence";

const ORGANIZATION_BRANCHES = [
  { name: "PISCICULTURE", year: "2018", description: "Production de poissons d'eau douce" },
  { name: "AGRO-PASTORAL", year: "2019", description: "Production agricole et élevage" },
  { name: "AGRO PALM", year: "2023", description: "Production et transformation de palmiers à huile" },
  { name: "AGRICOLE BANDUNDU", year: "2024", description: "Développement agricole et cultures vivrières" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 relative w-full max-w-full bg-background py-20 md:py-28 text-foreground"
    >
      <TextSequence
        accentClass="text-cap-dark-green"
        text="Société agro-pastorale en pleine expansion, engagée dans le développement d'une agriculture moderne, durable et créatrice de valeur en Afrique. Nous garantissons qualité, traçabilité et performance."
      />

     
      <div className="relative z-10 mx-auto max-w-[90rem] px-5 sm:px-8 md:px-16 lg:px-20">
        
        {/* NEW CREATIVE PRESENTATION: Sticky Editorial Layout */}
        <div className="relative flex flex-col items-start gap-16 lg:flex-row lg:gap-24">
          
          {/* Left Column: Sticky Title & Watermark */}
          <div className="relative z-10 shrink-0 lg:sticky lg:top-32 lg:w-[40%] lg:self-start">
            {/* Massive Typographic Watermark */}
            <div className="absolute -left-6 -top-16 -z-10 select-none font-unbounded text-[10rem] font-black leading-none text-cap-dark/[0.06] md:text-[14rem]">
              2018
            </div>
            
            <div className="relative">
              <span className="mb-8 inline-flex items-center rounded-full border border-cap-green/35 bg-cap-green/10 px-5 py-2 font-unbounded text-[10px] font-medium uppercase tracking-[0.2em] text-cap-green">
                Depuis 2018
              </span>
              
              <h2 className="font-unbounded text-5xl font-bold uppercase leading-[1.1] tracking-tight text-cap-dark lg:text-7xl">
                À propos <br />
                <span className="mt-3 block text-cap-dark-green">de CAP CONGO</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Scrolling Content */}
          <div className="flex-1 flex flex-col gap-20 lg:pt-8 w-full">
            
              <div className="md:mt-12">
                <ManifestoSteps
                  title="Notre mission"
                  variant="mission"
                  lines={[
                    "Contribuer à la sécurité alimentaire",
                    "Créer des emplois durables",
                    "Valoriser les ressources locales",
                  ]}
                />
              </div>
            <div className="relative mt-12 w-full lg:mt-16">
              
              {/* Main image with subtle tilt — same width as manifesto block above; fixed height preserved */}
              <div className="relative h-[325px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-cap-green/20 transition-transform duration-700 -rotate-3 hover:rotate-0 hover:scale-[1.02] sm:h-[400px]">
                <Image
                  src="/images/2_mais.webp"
                  alt="Agriculture locale"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Overlapping secondary image (circular, breaking the grid) */}
              <div className="absolute -bottom-6 -right-12 sm:-right-16 h-32 w-32 sm:h-40 sm:w-40 rounded-full border-8 border-background overflow-hidden shadow-xl z-10 transition-transform duration-700 hover:scale-110">
                <Image
                  src="/images/mais.webp"
                  alt="Détail agriculture"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>

              {/* Floating accent badge */}
              <div className="absolute top-10 -left-10 z-10 flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 shadow-xl ring-1 ring-cap-dark/5 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cap-green opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cap-green"></span>
                </span>
                <span className="font-unbounded text-[10px] font-bold tracking-wider text-cap-dark-green">100% LOCAL</span>
              </div>

            </div>

              <div className="mt-16 lg:mt-20">
                <ManifestoSteps
                  title="Notre ambition"
                  variant="ambition"
                  lines={[
                    "Développer une agriculture performante,",
                    "Responsable et inclusive",
                    "Au service du développement",
                  ]}
                />
              </div>
          </div>

        </div>
      </div>



      {/* --- EVOLUTION PART --- */}
      <div className="relative z-10 mt-32 w-full px-5 sm:px-8 md:px-16 lg:px-20 lg:mt-48">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center ">
          <SectionLabel className="justify-center">Notre Évolution</SectionLabel>
        </div>
        <TextSequence
          accentClass="text-cap-dark-green"
          className="py-16 md:py-20"
          text="CAP CONGO est structurée en quatre branches complémentaires, couvrant l'ensemble de la chaîne de valeur agricole au fil du temps. Parcourez chaque filière avec les flèches de navigation."
        />
      </div>

      <div className="relative z-10 w-full min-w-0">
        <AboutEvolutionHorizontal branches={ORGANIZATION_BRANCHES.map(branch => ({
          ...branch,
          bgImage:
            branch.name === "PISCICULTURE"
              ? `/images/pisiculture/${encodeURIComponent("fish list image.jpeg")}`
              : branch.name === "AGRO-PASTORAL"
                ? "/images/mais.webp"
                : branch.name === "AGRO PALM"
                  ? "/images/agro-palm/hero.jpeg"
                  : "/images/carrouselbandundu.webp",
        }))} />
      </div>

      <AboutRdcPresenceMap />
    </section>
  );
}
