"use client";

import { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Sticky scroll runway with word-rise text reveal (shared by home + subsidiary intros). */
export function StickyIntroFillScroll({
  text,
  accentClass = "text-cap-dark-green",
  className = "",
}: {
  text: string;
  accentClass?: string;
  /** Applied to the outer scroll runway (e.g. `bg-background` on subsidiary pages). */
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.65, 0.75], [1, 0.95]);

  return (
    <div ref={containerRef} className={cn("relative h-[300vh] w-full z-20", className)}>
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 flex h-screen w-full items-center justify-center px-5 sm:px-8 md:px-16 lg:px-20 pointer-events-none"
      >
        <div className="w-full max-w-5xl">
          <IntroRiseText progress={scrollYProgress} text={text} accentClass={accentClass} />
        </div>
      </motion.div>
    </div>
  );
}

export function IntroSequence() {
  return (
    <StickyIntroFillScroll text="Société agro-pastorale en pleine expansion, engagée dans le développement d'une agriculture moderne, durable et créatrice de valeur en Afrique. Nous garantissons qualité, traçabilité et performance." />
  );
}

export function EvolutionSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.65, 0.75], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative h-[80vh] w-full z-20">
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 flex h-screen w-full items-center justify-center pointer-events-none"
      >
        <div className="w-full max-w-5xl">
          <IntroRiseText
            progress={scrollYProgress}
            text="CAP CONGO est structurée en quatre branches complémentaires, couvrant l'ensemble de la chaîne de valeur agricole au fil du temps. La première vue se fixe en entier, puis le défilement révèle chaque branche ; la dernière reste visible en entier avant la suite."
          />
        </div>
      </motion.div>
    </div>
  );
}

function IntroRiseText({
  text,
  progress,
  accentClass = "text-cap-dark-green",
}: {
  text: string;
  progress: MotionValue<number>;
  accentClass?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <p className="flex flex-wrap justify-center text-center font-unbounded text-xl font-semibold leading-[1.45] tracking-wide sm:text-2xl md:text-3xl lg:text-4xl pointer-events-auto">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // Reveal across the sticky hold window (mid-runway)
        const mappedStart = 0.12 + start * 0.42;
        const mappedEnd = 0.12 + end * 0.42;
        return (
          <IntroRiseWord
            key={`${word}-${i}`}
            progress={progress}
            range={[mappedStart, mappedEnd]}
            word={word}
            accentClass={accentClass}
            reduceMotion={!!reduceMotion}
          />
        );
      })}
    </p>
  );
}

function IntroRiseWord({
  word,
  progress,
  range,
  accentClass,
  reduceMotion,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accentClass: string;
  reduceMotion: boolean;
}) {
  const opacity = useTransform(progress, range, reduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(progress, range, reduceMotion ? [0, 0] : [22, 0]);
  const blur = useTransform(progress, range, reduceMotion ? [0, 0] : [8, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <span className="relative mr-[0.28em] mt-2 inline-block">
      {/* Ghost word keeps layout stable while the live word rises in */}
      <span className="invisible" aria-hidden>
        {word}
      </span>
      <span className="absolute left-0 top-0 text-cap-grey/25 select-none" aria-hidden>
        {word}
      </span>
      <motion.span
        style={{ opacity, y, filter }}
        className={cn("absolute left-0 top-0 will-change-transform", accentClass)}
      >
        {word}
      </motion.span>
    </span>
  );
}
