
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
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';

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
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex items-baseline gap-1">
        <span ref={ref} className="font-unbounded text-5xl font-bold text-cap-blue md:text-6xl">
          0
        </span>
        <span className="font-unbounded text-3xl font-bold text-cap-blue md:text-4xl">
          {suffix}
        </span>
      </div>
      <span className="mt-3 text-sm font-medium uppercase tracking-wider text-cap-grey md:text-base">
        {label}
      </span>
    </div>
  );
}

function SocialImpactHero() {
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
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2000&auto=format&fit=crop"
          alt="African women and children"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cap-ink/90 via-cap-ink/30 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex w-full flex-col items-center justify-end px-6 pb-3 text-center md:px-8 md:pb-6 lg:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          
          {/* Logo Placement */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Image 
              src="/images/logos/Asset 11@4x.png" // Replace with your actual logo path
              alt="Cap Congo Logo"
              width={300}
              height={300}
              className="mb-2 opacity-90"
            />
          </motion.div>

          <div className="space-y-4">
            
            <h1 className="font-unbounded text-4xl font-semibold uppercase tracking-wide text-cap-yellow md:text-6xl lg:text-7xl">
              Social Impact
            </h1>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}



import { cn } from "@/lib/utils";

export function SocialImpactScrollSequence() {
  return (
    <StickyIntroFillScroll 
      text="Engagée pour le développement communautaire, Cap Congo Agro Palm améliore le quotidien des populations locales à travers la construction d’un hôpital à Babama, des distributions alimentaires à Mushie Pentane et un soutien matériel continu à Lubunga." 
      accentClass="text-cap-blue" // Use your preferred Cap Congo color token here
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

// --- Data Structure ---
const stories = [
  {
    id: 1,
    imageSrc: "/images/social/hospital_7.webp",
    imageAlt: "Construction de l'hôpital de Babama",
    title: "Hôpital de Babama",
    text: "Dans le cadre de ses actions communautaires à Babama, la société Cap Congo Agro Palm a procédé à la construction d'un hôpital afin d'améliorer l'accès aux soins de santé pour la population locale.",
    credit: "Cap Congo Agro Palm, Babama",
  },
  {
    id: 2,
    imageSrc: "/images/social/school_4.webp",
    imageAlt: "Visite du Bourgmestre de Lubunga au chantier du CS Babama",
    title: "CS Babama",
    text: "Le chantier du CS Babama a accueilli la visite du Bourgmestre de Lubunga, un encouragement fort pour notre engagement social.",
    credit: "Cap Congo, Lubunga",
  },
  {
    id: 3,
    imageSrc: "/images/social/colothes.webp",
    imageAlt: "Don de vareuses à la population de Lubunga",
    title: "Don de vareuses",
    text: "La société Cap Congo Agro Palm a procédé à un don de vareuses en faveur de la population de Lubunga, témoignant ainsi de son engagement social et de sa proximité avec les communautés locales.",
    credit: "Cap Congo Agro Palm, Lubunga",
  },
  {
    id: 4,
    imageSrc: "/images/social/food_1.webp",
    imageAlt: "Distribution de maïs à Mushie Pentane",
    title: "Distribution de maïs",
    text: "Dans le cadre de ses actions communautaires, la Société Cap Congo agricole Bandundu avait organisé une distribution de maïs en faveur de la communauté de Mushie Pentane, contribuant ainsi au soutien alimentaire et au développement des communautés locales.",
    credit: "Cap Congo Agricole Bandundu, Mushie Pentane",
  },
];

// --- Smooth Staggered Animation ---
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function StoryRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-cap-ink">
      
      {/* ========================================== */}
      {/* 1. STICKY BACKGROUND GALLERY */}
      {/* ========================================== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {stories.map((story, idx) => {
          // Determine if this specific story is an even or odd index
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
              {/* 
                Alternating Gradient:
                If text is on left (isEven), fade from dark left to clear right.
                If text is on right (!isEven), fade from dark right to clear left.
                Mobile is always bottom-to-top.
              */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-cap-ink/90 via-cap-ink/40 to-transparent 
                ${isEven 
                  ? 'md:bg-gradient-to-r md:from-cap-ink/90 md:via-cap-ink/50 md:to-transparent' 
                  : 'md:bg-gradient-to-l md:from-cap-ink/90 md:via-cap-ink/50 md:to-transparent'
                }`} 
              />
              
              {/* Photo Credit swaps to the opposite side of the text */}
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

      {/* ========================================== */}
      {/* 2. SCROLLING TEXT SECTIONS */}
      {/* ========================================== */}
      <div className="relative z-10 -mt-[100vh] w-full">
        {stories.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={story.id}
              // Swap flex alignment on desktop based on index
              className={`flex min-h-screen w-full items-end px-6 pb-24 md:items-center md:px-16 lg:px-24 
              ${isEven ? 'justify-start md:justify-start' : 'justify-start md:justify-end'}`}
              onViewportEnter={() => setActiveIndex(idx)}
              viewport={{ amount: 0.5 }}
              initial="hidden"
              whileInView="visible"
            >
              {/* Text Alignment Container */}
              <div className={`w-full max-w-2xl ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
                
                {/* Accent line follows the text alignment */}
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


export default function SocialImpactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <SocialImpactHero />
      
      {/* Impact Metrics */}
      <div className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <AnimatedStat value={50000} label="Meals Distributed" suffix="+" />
            <AnimatedStat value={12} label="Hospitals Supported" />
            <AnimatedStat value={5000} label="Families Clothed" suffix="+" />
          </div>
        </div>
      </div>
      <SocialImpactScrollSequence/>
      <StoryRotator/>
  
    </main>
  );
}
