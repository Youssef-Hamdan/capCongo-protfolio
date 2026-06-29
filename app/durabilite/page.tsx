'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView, 
  useMotionValue, 
  useSpring, 
  Variants,
  type MotionValue,
} from 'framer-motion';
import { cn } from "@/lib/utils";
import { HeroFooter } from '../components/hero-footer';

// ==========================================
// 1. ANIMATED STATS COMPONENT
// ==========================================
type StatProps = {
  value: number;
  label: string;
  suffix?: string;
};

function AnimatedStat({ value, label, suffix = '' }: StatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('fr-FR').format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex items-baseline gap-1">
        <span ref={ref} className="font-unbounded text-5xl font-bold text-cap-dark-green md:text-6xl">
          0
        </span>
        <span className="font-unbounded text-3xl font-bold text-cap-dark-green md:text-4xl">
          {suffix}
        </span>
      </div>
      <span className="mt-3 text-sm font-medium uppercase tracking-wider text-cap-grey md:text-base">
        {label}
      </span>
    </div>
  );
}

// ==========================================
// 2. HERO COMPONENT
// ==========================================
function SustainabilityHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div 
      ref={ref} 
      className="relative flex h-[80vh] w-full items-end justify-center overflow-hidden bg-cap-ink"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=2000&auto=format&fit=crop"
          alt="Plantation verte et dense"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cap-ink/90 via-cap-ink/30 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex w-full flex-col items-center justify-end px-6 pb-3 text-center md:px-8 md:pb-6 lg:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Image 
              src="/images/logos/Asset 11@4x.png"
              alt="Cap Congo Logo"
              width={300}
              height={300}
              className="mb-2 opacity-90"
            />
          </motion.div>

          <div className="space-y-4">
            <h1 className="font-unbounded text-4xl font-semibold uppercase tracking-wide text-cap-yellow md:text-6xl lg:text-7xl">
              Protection de la Nature
            </h1>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SCROLL SEQUENCE COMPONENTS
// ==========================================
export function SustainabilityScrollSequence() {
  return (
    <StickyIntroFillScroll 
      text="Notre approche vise non seulement à utiliser nos espaces agricoles de manière responsable, mais également à participer activement à la régénération de la couverture végétale pour enrichir l'environnement." 
      accentClass="text-cap-dark-green"
    />
  );
}

export function StickyIntroFillScroll({
  text,
  accentClass = "text-cap-dark-green",
  className = "",
}: {
  text: string;
  accentClass?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 0.85], [1, 0.95]);

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
    <div className="flex flex-wrap justify-center text-center font-unbounded text-xl font-semibold leading-[1.5] tracking-wide sm:text-2xl md:text-3xl lg:text-4xl pointer-events-auto">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const mappedStart = 0.15 + start * 0.5;
        const mappedEnd = 0.15 + end * 0.5;
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
    <span className="relative mr-[0.3em] inline-block mt-2 md:mt-4">
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
      <span className="text-cap-grey/20">{char}</span>
      <motion.span style={{ opacity }} className={`absolute left-0 top-0 ${accentClass}`}>
        {char}
      </motion.span>
    </span>
  );
}

// ==========================================
// 4. STORY ROTATOR & DATA
// ==========================================
const stories = [
  {
    id: 1,
    imageSrc: "/images/durabilite_1.webp",
    imageAlt: "Anciennes zones agricoles",
    title: "Valorisation des Terres",
    text: "En ce qui concerne la protection de la nature, les espaces que nous utilisons pour nos plantations sont principalement des anciennes zones agricoles exploitées par les communautés. Il s’agit d'espaces qui avaient déjà été déboisés auparavant pour les besoins des champs.",
    credit: "Cap Congo Agro Palm",
  },
  {
    id: 2,
    imageSrc: "/images/durabilite_2.webp",
    imageAlt: "Restauration de l'écosystème",
    title: "Préservation de l'Écosystème",
    text: "Certes, quelques arbres présents sur ces sites ont dû être coupés, mais cela n’a pas entraîné une destruction de l’écosystème, car nous mettons en place de fortes actions de restauration à travers nos plantations.",
    credit: "Cap Congo Agro Palm",
  },
  {
    id: 3,
    imageSrc: "/images/bundundu/BANANADEMOFIELD.webp",
    imageAlt: "Plantations de palmiers à grande échelle",
    title: "Plantations à Grande Échelle",
    text: "Nous avons réalisé des plantations à grande échelle, notamment de palmiers et d’autres essences, qui ont aujourd’hui bien évolué. La végétation est redevenue verte et dense, ce qui contribue à l’enrichissement de l’environnement.",
    credit: "Cap Congo Agro Palm",
  },
  {
    id: 4,
    imageSrc: "/images/bundundu/DJI_20251112123547_0512_D.webp",
    imageAlt: "Régénération végétale",
    title: "Régénération Responsable",
    text: "Ainsi, notre approche vise non seulement à utiliser ces espaces de manière responsable, mais également à participer activement à la régénération de la couverture végétale pour les générations futures.",
    credit: "Cap Congo Agro Palm",
  },
];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function SustainabilityStoryRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-cap-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {stories.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === idx ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={story.imageSrc}
                alt={story.imageAlt}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-cap-ink/90 via-cap-ink/40 to-transparent 
                ${isEven 
                  ? 'md:bg-gradient-to-r md:from-cap-ink/90 md:via-cap-ink/50 md:to-transparent' 
                  : 'md:bg-gradient-to-l md:from-cap-ink/90 md:via-cap-ink/50 md:to-transparent'
                }`} 
              />
              <div 
                className={`absolute bottom-6 font-sans text-xs font-medium tracking-widest text-white/70 
                ${isEven ? 'right-6 md:right-12' : 'left-6 md:left-12'}`}
              >
                PHOTO &copy; {story.credit}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 -mt-[100vh] w-full">
        {stories.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={story.id}
              className={`flex min-h-screen w-full items-end px-6 pb-24 md:items-center md:px-16 lg:px-24 
              ${isEven ? 'justify-start md:justify-start' : 'justify-start md:justify-end'}`}
              onViewportEnter={() => setActiveIndex(idx)}
              viewport={{ amount: 0.5 }}
              initial="hidden"
              whileInView="visible"
            >
              <div className={`w-full max-w-2xl ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
                <motion.div 
                  variants={textVariants} 
                  className={`mb-8 h-1 w-16 bg-cap-yellow ${isEven ? '' : 'md:ml-auto'}`} 
                />

                <motion.h2 
                  variants={textVariants}
                  className="font-unbounded text-4xl font-bold uppercase leading-tight tracking-wide text-white drop-shadow-lg md:text-5xl lg:text-7xl"
                >
                  {story.title}
                </motion.h2>
                
                <motion.p 
                  variants={textVariants}
                  className={`mt-6 max-w-xl text-lg font-light leading-relaxed text-white/90 drop-shadow md:mt-8 md:text-2xl 
                  ${isEven ? '' : 'md:ml-auto'}`}
                >
                  {story.text}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ==========================================
// 5. MAIN PAGE COMPONENT
// ==========================================
export default function SustainabilityPage() {
  return (
    <div className="relative z-10 flex flex-col flex-1">
    <main className="min-h-screen bg-background">
     
      <SustainabilityHero />
      
      {/* Impact Metrics - Ajustez les valeurs selon vos données réelles */}
      <div className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <AnimatedStat value={100} label="Engagement Responsable" suffix="%" />
            <AnimatedStat value={50000} label="Arbres Plantés" suffix="+" />
            <AnimatedStat value={2000} label="Hectares Restaurés" suffix="+" />
          </div>
        </div>
      </div>
      
      {/* Scroll Sequence Intro */}
      <SustainabilityScrollSequence />
      
      {/* Main Text Content via Scroll Rotator */}
      <SustainabilityStoryRotator />
  
    </main>
    <HeroFooter />
    </div>
    
  );
}