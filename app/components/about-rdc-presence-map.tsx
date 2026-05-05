"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "./about-section-label";

const MAP_SRC = `/images/${encodeURIComponent("Carte RDC CCS.png")}`;

const easeOut = [0.16, 1, 0.3, 1] as const;

export function AboutRdcPresenceMap() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 mx-auto mt-20 w-full max-w-[90rem] px-5 sm:px-8 md:px-16 lg:px-20 md:mt-28 lg:mt-36">
      {/* Divider: separates map section from editorial content above */}
      <div className="mx-auto mb-10 max-w-4xl md:mb-12" aria-hidden>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cap-dark to-transparent sm:via-cap-dark" />
      </div>

      <motion.div
        className="mx-auto max-w-5xl text-center"
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 36 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-10% 0px -5% 0px" },
              transition: { duration: 0.75, ease: easeOut },
            })}
      >
        <SectionLabel className="justify-center">Réseau national</SectionLabel>
        <h2 className="mx-auto mt-5 max-w-4xl font-unbounded text-5xl font-bold uppercase leading-[1.1] tracking-tight text-cap-dark lg:text-7xl">
          Notre réseau
          <span className="mt-3 block text-cap-dark-green">en RDC</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-sora text-base leading-relaxed text-cap-grey md:text-lg">
          Kisangani, Bandundu, Kinshasa et Kongo Central — nos sites d&apos;activité sur la carte nationale.
        </p>
      </motion.div>

      <motion.div
        className="relative mx-auto mt-10 w-full max-w-6xl md:mt-14"
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 28 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-8% 0px" },
              transition: { duration: 0.85, delay: 0.08, ease: easeOut },
            })}
      >
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/11] md:aspect-[16/10] lg:aspect-[2/1]">
          <Image
            src={MAP_SRC}
            alt="Carte de la République Démocratique du Congo avec les emplacements CAP Congo : Kisangani, Bandundu, Kinshasa et Kongo Central"
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority={false}
          />
        </div>
      </motion.div>

      {/* Divider: before evolution section */}
      {/* <div className="mx-auto mt-14 max-w-4xl md:mt-16" aria-hidden>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cap-dark to-transparent" />
      </div> */}
    </div>
  );
}
