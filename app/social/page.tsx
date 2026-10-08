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
  AnimatePresence,
} from 'framer-motion';
import { TextSequence } from '../components/text-sequence';
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
          src="/images/socialheroimage.webp"
          alt="Impact social — CAP Congo"
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
              Impact social
            </h1>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
export function SocialImpactScrollSequence() {
  return (
    <TextSequence
      text={[
        "Engagés pour le développement communautaire",
        "Cap Congo agit concrètement en faveur du développement local à travers des initiatives dans les domaines de l’éducation, de la santé et de l’accompagnement des populations.",
        "Ces actions, menées en lien avec les acteurs locaux, contribuent à améliorer durablement les conditions de vie et à créer une valeur sociale positive et pérenne.",
      ].join("\n")}
      accentClass="text-cap-blue"
    />
  );
}

// --- Data Structure ---
const stories = [
  {
    id: 4,
    imageSrc: "/images/school.webp",
    imageAlt: "École Primaire EP UJCCM — Kisangani",
    title: "Grandir ensemble",
    text: "Dans le cadre de son engagement en faveur du développement local, CAP CONGO a contribué à la construction de l’École Primaire EP UJCCM à Kisangani, dans la province de la Tshopo.\n\nCette initiative témoigne de l’engagement de CAP CONGO à améliorer les conditions d’apprentissage des enfants et à soutenir durablement le développement des communautés locales.",
    credit: "Cap Congo, Kisangani — Tshopo",
  },
  {
    id: 1,
    imageSrc: "/images/hospital.webp",
    imageAlt: "Hôpital de Babama",
    title: "Hôpital de Babama",
    text: "Dans le cadre de son engagement en faveur du développement durable et du soutien aux communautés locales, Cap Congo Agro Palm a construit l’Hôpital de Babama, situé à Kisangani, afin de renforcer les infrastructures de santé et de faciliter l’accès des populations aux services de soins, contribuant ainsi à l’amélioration de la qualité de vie et au bien-être des communautés locales.",
    credit: "Cap Congo Agro Palm, Kisangani",
  },
  {
    id: 3,
    imageSrc: "/images/socialimage2.webp",
    imageAlt: "Don de vareuses à la population de Lubunga",
    title: "Don de vareuses",
    text: "La société Cap Congo Agro Palm a procédé à un don de vareuses en faveur de la population de Lubunga, témoignant ainsi de son engagement social et de sa proximité avec les communautés locales.",
    credit: "Cap Congo Agro Palm, Lubunga",
  },
  {
    id: 5,
    imageSrc: "/images/socailimage5.webp",
    imageAlt:
      "Visite de l'Honorable Claude KUMPEL MPASI — Cap Congo Agricole Bandundu",
    title: "Visite officielle",
    text: "Le 3 juillet, Cap Congo Agricole Bandundu a eu l’honneur d’accueillir le Président de l’Assemblée Provinciale du Kwilu, l’Honorable Claude KUMPEL MPASI.\n\nCette visite a été l’occasion de présenter nos infrastructures, notre vision et notre engagement en faveur d’une agriculture moderne et durable, créatrice d’emplois et de valeur pour la province du Kwilu et la RDC.",
    credit: "Cap Congo Agricole Bandundu, Kwilu — 3 juillet",
  },
];

// --- Smooth Staggered Animation ---
// FIX APPLIED HERE: Added ": Variants" to strictly type the object
const textVariants: Variants = {
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
          // First story on the right, then alternate (right, left, right, left…)
          const textOnLeft = idx % 2 === 1;

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
              {/* Alternating Gradient:
                If text is on left, fade from dark left to clear right.
                If text is on right, fade from dark right to clear left.
                Mobile is always bottom-to-top.
              */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-cap-ink/90 via-cap-ink/40 to-transparent 
                ${textOnLeft 
                  ? 'md:bg-gradient-to-r md:from-cap-ink/90 md:via-cap-ink/50 md:to-transparent' 
                  : 'md:bg-gradient-to-l md:from-cap-ink/90 md:via-cap-ink/50 md:to-transparent'
                }`} 
              />
              
              {/* Photo Credit swaps to the opposite side of the text */}
              <div 
                className={`absolute bottom-6 font-sans text-xs font-medium tracking-widest text-white/70 
                ${textOnLeft ? 'right-6 md:right-12' : 'left-6 md:left-12'}`}
              >
                Crédit photo &copy; {story.credit}
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
          const textOnLeft = idx % 2 === 1;

          return (
            <motion.div
              key={story.id}
              // Swap flex alignment on desktop based on index
              className={`flex min-h-screen w-full items-end px-6 pb-24 md:items-center md:px-16 lg:px-24 
              ${textOnLeft ? 'justify-start md:justify-start' : 'justify-start md:justify-end'}`}
              onViewportEnter={() => setActiveIndex(idx)}
              viewport={{ amount: 0.5 }}
              initial="hidden"
              whileInView="visible"
            >
              {/* Text Alignment Container */}
              <div className={`w-full max-w-2xl ${textOnLeft ? 'text-left' : 'text-left md:text-right'}`}>
                
                {/* Accent line follows the text alignment */}
                <motion.div 
                  variants={textVariants} 
                  className={`mb-8 h-1 w-16 bg-cap-yellow ${textOnLeft ? '' : 'md:ml-auto'}`} 
                />

                <motion.h2 
                  variants={textVariants}
                  className="font-unbounded text-2xl font-bold uppercase leading-tight tracking-wide text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  {story.title}
                </motion.h2>
                
                <motion.div
                  variants={textVariants}
                  className={`mt-6 max-w-xl space-y-4 text-lg font-light leading-relaxed text-white/90 drop-shadow md:mt-8 md:text-2xl 
                  ${textOnLeft ? '' : 'md:ml-auto'}`}
                >
                  {story.text.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </motion.div>

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
    <div className="relative z-10 flex flex-col flex-1">
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <SocialImpactHero />
      
      {/* Impact Metrics */}
      <div className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <AnimatedStat value={360} label="Élèves par école" suffix="+" />
            <AnimatedStat value={20} label="Bancs par salle de classe" />
            <AnimatedStat value={10} label="Lits au centre de santé" suffix="+" />
          </div>
        </div>
      </div>
      <SocialImpactScrollSequence/>
      <StoryRotator/>
  
    </main>

    <HeroFooter />
    </div>
  );
}