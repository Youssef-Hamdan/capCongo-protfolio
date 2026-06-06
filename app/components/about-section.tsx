"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Fish, Leaf, Sprout, Wheat } from "lucide-react";
import { AboutEvolutionHorizontal } from "./about-evolution-horizontal";
import { AboutRdcPresenceMap } from "./about-rdc-presence-map";
import { SectionLabel } from "./about-section-label";
import { ManifestoSteps } from "./about-manifesto-steps";
import { IntroSequence, EvolutionSequence } from "./about-intro-sequence";

const ORGANIZATION_BRANCHES = [
  { name: "PISCICULTURE", year: "2018", description: "Production de poissons d'eau douce" },
  { name: "AGRO-PASTORAL", year: "2019", description: "Production agricole et élevage" },
  { name: "AGRO PALM", year: "2023", description: "Production et transformation de palmiers à huile" },
  { name: "AGRICOLE BUNDUNDU", year: "2024", description: "Développement agricole et cultures vivrières" },
];

const ACTIVITIES: { icon: LucideIcon; title: string; text: string; bgImage: string; href: string }[] = [
  {
    icon: Sprout,
    title: "Palmiers à huile",
    text: "Exploitation et transformation de plantations.",
    bgImage: "/images/agro-palm/hero.jpeg",
    href: "/agro-palm",
  },
  {
    icon: Wheat,
    title: "Cultures Vivrières",
    text: "Transformation du maïs et du manioc en farines.",
    bgImage: "/images/bundundu/BANANA DEMO FIELD.JPG",
    href: "/agricole-bundundu",
  },
  {
    icon: Leaf,
    title: "Maraîchère & Café",
    text: "Production maraîchère, café et arachide.",
    bgImage: "/images/mais.jpg",
    href: "/agro-pastoral",
  },
  {
    icon: Fish,
    title: "Pisciculture",
    text: "Élevage de poissons d'eau douce africains.",
    bgImage: "/images/pisiculture/DJI_0312.JPG",
    href: "/pisciculture",
  },
];

export default function AboutSection() {
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(0); // Default to first open

  return (
    <section
      id="about"
      className="scroll-mt-20 relative w-full max-w-full bg-gradient-to-b from-background from-0% via-cap-yellow/[0.08] via-50% to-background to-100% py-20 md:py-28 text-foreground"
    >
      {/* Manifesto-Style Intro (Sticky + Fill + Fade) */}
      <IntroSequence />

      {/* Subtle light-surface accents */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_15%_20%,rgba(112,170,67,0.12),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-[800px] w-[800px] rounded-full bg-cap-green/10 blur-[120px]" aria-hidden />

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
                  src="/images/2_mais.jpg"
                  alt="Agriculture locale"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Luxury gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cap-dark-green/30 to-transparent mix-blend-multiply" />
              </div>

              {/* Overlapping secondary image (circular, breaking the grid) */}
              <div className="absolute -bottom-6 -right-12 sm:-right-16 h-32 w-32 sm:h-40 sm:w-40 rounded-full border-8 border-background overflow-hidden shadow-xl z-10 transition-transform duration-700 hover:scale-110">
                <Image
                  src="/images/mais.jpg"
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

            {/* Activities Accordion */}
            <div className="pt-8">
              <SectionLabel className="mb-8">Nos Activités Principales</SectionLabel>
              <div className="flex flex-col h-[500px] md:h-[600px] gap-3 group/accordion">
                {ACTIVITIES.map((activity, i) => {
                  const isActive = hoveredActivity === i;
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredActivity(i)}
                      className={`relative flex-1 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-cap-dark/15 ${
                        isActive ? "flex-[4]" : "min-h-[3.25rem] flex-[0.65]"
                      }`}
                    >
                      {/* Activity Background Image */}
                      <div className="absolute inset-0 z-0">
                        <Image 
                          src={activity.bgImage} 
                          alt={activity.title} 
                          fill 
                          className={`object-cover transition-transform duration-[1.5s] ${isActive ? "scale-105" : "scale-100"}`} 
                        />
                      </div>

                      {/* Content — collapsed: inset + vertical center so icon clears top/bottom of short strip */}
                      <div
                        className={`absolute z-10 flex gap-5 transition-all duration-700 ${
                          isActive
                            ? "bottom-0 left-0 right-0 items-end p-6 md:p-8"
                            : "inset-0 items-center px-7 sm:px-9"
                        }`}
                      >
                        <div className={`flex shrink-0 items-center justify-center rounded-2xl bg-cap-dark/90 backdrop-blur-md text-cap-green ring-1 ring-background/20 transition-all duration-700 ${
                          isActive ? "h-16 w-16" : "h-12 w-12"
                        }`}>
                          <activity.icon className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <div
                          className={`overflow-hidden transition-all duration-700 ${
                            isActive
                              ? "max-h-40 opacity-100 translate-y-0"
                              : "max-h-0 w-0 max-w-0 translate-y-8 opacity-0"
                          }`}
                        >
                          <h4 className="font-unbounded text-xl font-semibold text-background mb-2">{activity.title}</h4>
                          <p className="text-sm md:text-base text-background/80 line-clamp-2">{activity.text}</p>
                          <Link 
                            href={activity.href} 
                            className="mt-3 inline-block font-unbounded text-[10px] font-bold uppercase tracking-widest text-cap-yellow transition-colors hover:text-white"
                          >
                            En savoir plus
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>



      {/* --- EVOLUTION PART --- */}
      <div className="relative z-10 mt-32 w-full px-5 sm:px-8 md:px-16 lg:px-20 lg:mt-48">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center ">
          <SectionLabel className="justify-center">Notre Évolution</SectionLabel>
        </div>
        <EvolutionSequence />
      </div>

      <div className="relative z-10 w-full min-w-0">
        <AboutEvolutionHorizontal branches={ORGANIZATION_BRANCHES.map(branch => ({
          ...branch,
          bgImage: branch.name === "PISCICULTURE" ? "/images/pisiculture/DJI_0312.JPG" : branch.name === "AGRO-PASTORAL" ? "/images/mais.jpg" : branch.name === "AGRO PALM" ? "/images/agro-palm/hero.jpeg" : "/images/bundundu/BANANA DEMO FIELD.JPG",
        }))} />
      </div>

      <AboutRdcPresenceMap />
    </section>
  );
}
