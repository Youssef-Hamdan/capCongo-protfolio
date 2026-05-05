"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Same sticky + scroll progress + character fill as the home “À propos” intro. */
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
          <IntroFillText progress={scrollYProgress} text={text} accentClass={accentClass} />
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
          <IntroFillText
            progress={scrollYProgress}
            text="CAP CONGO est structurée en quatre branches complémentaires, couvrant l'ensemble de la chaîne de valeur agricole au fil du temps. La première vue se fixe en entier, puis le défilement révèle chaque branche ; la dernière reste visible en entier avant la suite."
          />
        </div>
      </motion.div>
    </div>
  );
}

function IntroFillText({
  text,
  progress,
  accentClass = "text-cap-dark-green",
}: {
  text: string;
  progress: MotionValue<number>;
  accentClass?: string;
}) {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center text-center font-unbounded text-xl font-semibold leading-[1.4] tracking-wide sm:text-2xl md:text-3xl lg:text-4xl pointer-events-auto">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const mappedStart = 0.15 + start * 0.3;
        const mappedEnd = 0.15 + end * 0.3;
        return (
          <IntroWord
            key={i}
            progress={progress}
            range={[mappedStart, mappedEnd]}
            word={word}
            accentClass={accentClass}
          />
        );
      })}
    </div>
  );
}

function IntroWord({
  word,
  progress,
  range,
  accentClass = "text-cap-dark-green",
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accentClass?: string;
}) {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / Math.max(characters.length, 1);

  return (
    <span className="relative mr-[0.3em] inline-block mt-2">
      {characters.map((char, i) => {
        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);
        return (
          <IntroCharacter key={i} char={char} progress={progress} range={[start, end]} accentClass={accentClass} />
        );
      })}
    </span>
  );
}

function IntroCharacter({
  char,
  progress,
  range,
  accentClass = "text-cap-dark-green",
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  accentClass?: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span className="relative inline-block">
      <span className="text-cap-grey/30">{char}</span>
      <motion.span style={{ opacity }} className={`absolute left-0 top-0 ${accentClass}`}>
        {char}
      </motion.span>
    </span>
  );
}
