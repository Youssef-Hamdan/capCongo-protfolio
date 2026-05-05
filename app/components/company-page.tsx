
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, type LucideIcon, Fish, Leaf, Sprout, Wheat } from "lucide-react";
import { HeroFooter } from "./hero-footer";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  Fish,
  Leaf,
  Sprout,
  Wheat,
};

interface CompanyPageProps {
  title: string;
  intro: string;
  paragraphs: string[];
  /** One line per split slide. Wrap phrases in **double asterisks** for the accent color (contrast on each slide). */
  paragraphSubtitles: string[];
  heroImage?: string;
  /** Left column of the split showcase — one image per slide, cycled with modulo if shorter than `paragraphs`. */
  showcaseImages?: string[];
  accentColor?: "green" | "yellow" | "blue";
  logoSrc: string;
  iconName?: keyof typeof iconMap;
}

// =========================================================================
// 1. HERO SECTION (GSAP Reference Behavior via Framer Motion)
// =========================================================================

function HeroSection({ 
  title, 
  logoSrc, 
  heroImage,
  accentTextClass 
}: { 
  title: string; 
  logoSrc: string; 
  heroImage: string;
  accentTextClass: string; 
}) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const heroFade = useTransform(scrollY, [0, 350, 750], [1, 0.75, 0]);
  const heroY = useTransform(scrollY, [0, 750], ["0px", "-80px"]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Premium easing matching your GSAP power3.out / power4.out feel
  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background z-20"
    >
      <motion.div 
        style={{ opacity: heroFade, y: heroY }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div 
          style={{ y: imgY, scale: imgScale }} 
          className="absolute inset-0 z-[1] origin-center"
        >
          <Image
            src={heroImage}
            alt={`${title} Background`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-100"
          />
        </motion.div>

      </motion.div>

      <motion.div 
        style={{ opacity: heroFade }}
        className="relative z-10 flex flex-col flex-1 justify-end pb-12 w-full"
      >
        <div className="flex flex-col items-center gap-6 md:gap-10 text-center w-full px-4 mb-6 md:mb-10">
          
          {/* LOGO: Slides up and fades in (matches GSAP hero-subline) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: cinematicEase }}
            className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl"
          >
            <Image src={logoSrc} alt={`${title} Logo`} fill className="object-contain" priority />
          </motion.div>
          
          {/* TITLE: Slides up and fades in slightly after the logo */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: cinematicEase }}
            className={`font-unbounded text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] ${accentTextClass}`}
          >
            {title}
          </motion.h1>

        </div>
      </motion.div>
    </section>
  );
}

// =========================================================================
// 2. TEXT INTRO SEQUENCE (Sticky + Fill)
// =========================================================================

function TextIntroSequence({ 
  intro, 
  accentTextClass 
}: { 
  intro: string; 
  accentTextClass: string; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], 
  });

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full z-20 bg-background">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 pointer-events-none">
        <div className="w-full max-w-4xl pointer-events-auto z-10">
          <IntroFillText 
            text={intro} 
            progress={scrollYProgress} 
            accentClass={accentTextClass} 
          />
        </div>
      </div>
    </div>
  );
}

function IntroFillText({ text, progress, accentClass }: { text: string; progress: MotionValue<number>; accentClass: string }) {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center text-center font-unbounded text-xl font-semibold leading-[1.4] tracking-wide sm:text-2xl md:text-3xl lg:text-4xl pointer-events-auto">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const mappedStart = 0.2 + (start * 0.40); 
        const mappedEnd = 0.2 + (end * 0.40);
        return <IntroWord key={i} progress={progress} range={[mappedStart, mappedEnd]} word={word} accentClass={accentClass} />;
      })}
    </div>
  );
}

function IntroWord({ word, progress, range, accentClass }: { word: string; progress: MotionValue<number>; range: [number, number]; accentClass: string }) {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / word.length;

  return (
    <span className="relative mr-[0.3em] inline-block mt-2">
      {characters.map((char, i) => {
        const start = range[0] + (step * i);
        const end = range[0] + (step * (i + 1));
        return (
          <IntroCharacter key={i} char={char} progress={progress} range={[start, end]} accentClass={accentClass} />
        );
      })}
    </span>
  );
}

function IntroCharacter({ char, progress, range, accentClass }: { char: string; progress: MotionValue<number>; range: [number, number]; accentClass: string }) {
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

// =========================================================================
// 3. EDITORIAL 50/50 SPLIT SHOWCASE (Dynamic Colors + Advanced Animation)
// =========================================================================

const SLIDE_PRESETS = [
  {
    bgColorHex: "#4377bc", // cap-blue
    textColorHex: "#ffffff",
    subtitleHighlightHex: "#f7d616", // cap-yellow — pops on blue
    pillInactiveBg: "rgba(0,0,0,0.2)",
    pillInactiveText: "#ffffff",
    pillActiveBg: "#ffffff",
    pillActiveText: "#4377bc",
    btnBg: "#ffffff",
    btnText: "#4377bc"
  },
  {
    bgColorHex: "#f7d616", // cap-yellow
    textColorHex: "#1d1d1b", // cap-dark
    subtitleHighlightHex: "#3d632f", // dark green on yellow
    pillInactiveBg: "rgba(29, 29, 27, 0.1)", 
    pillInactiveText: "#1d1d1b",
    pillActiveBg: "#1d1d1b",
    pillActiveText: "#f7d616",
    btnBg: "#1d1d1b",
    btnText: "#f7d616"
  },
  {
    bgColorHex: "#70aa43", // cap-green
    textColorHex: "#ffffff",
    subtitleHighlightHex: "#f7d616",
    pillInactiveBg: "rgba(0,0,0,0.2)",
    pillInactiveText: "#ffffff",
    pillActiveBg: "#ffffff",
    pillActiveText: "#70aa43",
    btnBg: "#ffffff",
    btnText: "#70aa43"
  },
  {
    bgColorHex: "#3d632f", // cap-dark-green
    textColorHex: "#ffffff",
    subtitleHighlightHex: "#f7d616",
    pillInactiveBg: "rgba(255,255,255,0.2)",
    pillInactiveText: "#ffffff",
    pillActiveBg: "#f7d616", // cap-yellow
    pillActiveText: "#3d632f",
    btnBg: "#f7d616",
    btnText: "#3d632f"
  }
];

/** Splits `**like this**` into alternating plain / highlighted runs (PepsiCo-style dual tone). */
function parseSubtitleHighlights(input: string): { highlighted: boolean; text: string }[] {
  if (!input.includes("**")) {
    return [{ highlighted: false, text: input }];
  }
  const chunks = input.split("**");
  const segments: { highlighted: boolean; text: string }[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const text = chunks[i];
    if (text === "") continue;
    segments.push({ highlighted: i % 2 === 1, text });
  }
  return segments.length > 0 ? segments : [{ highlighted: false, text: input.replace(/\*\*/g, "") }];
}

function stripSubtitleMarks(input: string): string {
  return input.replace(/\*\*/g, "");
}

function SplitShowcaseSubtitle({
  raw,
  highlightHex,
}: {
  raw: string;
  highlightHex: string;
}) {
  const segments = parseSubtitleHighlights(raw);
  return (
    <h2
      className="font-unbounded text-xl font-bold uppercase leading-[1.15] tracking-tight text-balance sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem]"
      aria-label={stripSubtitleMarks(raw)}
    >
      {segments.map((seg, j) =>
        seg.highlighted ? (
          <span key={j} style={{ color: highlightHex }} className="font-black">
            {seg.text}
          </span>
        ) : (
          <span key={j}>{seg.text}</span>
        )
      )}
    </h2>
  );
}

function SplitShowcase({
  title,
  paragraphs,
  paragraphSubtitles,
  images,
}: {
  title: string;
  paragraphs: string[];
  paragraphSubtitles: string[];
  images: { id: string; src: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionLength = 1 / paragraphs.length;
    const index = Math.min(Math.floor((latest + 0.01) / sectionLength), paragraphs.length - 1);
    setActiveIndex(index);
  });

  const currentPreset = SLIDE_PRESETS[activeIndex % SLIDE_PRESETS.length];

  // Ultra-smooth Apple-style spring easing (cubic-bezier tuple)
  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <div ref={containerRef} style={{ height: `${paragraphs.length * 100}vh` }} className="relative w-full z-20">
      
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT HALF: Crossfading Images with Slide & Scale */}
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-full overflow-hidden bg-black">
          {paragraphs.map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 origin-center"
              initial={{ opacity: 0, scale: 1.1, y: "5%" }}
              animate={{
                opacity: activeIndex === i ? 1 : 0,
                scale: activeIndex === i ? 1 : 1.1,
                y: activeIndex === i ? "0%" : "5%",
                zIndex: activeIndex === i ? 10 : 0
              }}
              transition={{ duration: 1, ease: cinematicEase }}
            >
              <Image
                src={images[i % images.length].src}
                alt={`${title} Phase ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* RIGHT HALF: Smooth Animated Color Transitions */}
        <motion.div 
          animate={{
            backgroundColor: currentPreset.bgColorHex,
            color: currentPreset.textColorHex
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full lg:w-1/2 h-[60vh] lg:h-full flex flex-col justify-between p-8 sm:p-12 lg:p-20 xl:p-24"
        >
          {/* Top: Pill Pagination Navigation */}
          <div className="flex items-center gap-2 lg:gap-3">
            {paragraphs.map((_, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor: isActive ? currentPreset.pillActiveBg : currentPreset.pillInactiveBg,
                    color: isActive ? currentPreset.pillActiveText : currentPreset.pillInactiveText,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5, ease: cinematicEase }}
                  className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full font-unbounded text-[10px] lg:text-xs font-bold shadow-sm"
                >
                  0{i + 1}
                </motion.div>
              );
            })}
          </div>

          {/* Middle: headline = paragraph subtitle (replaces year/time) */}
          <div className="w-full mt-auto mb-8 lg:my-auto">
            <div className="relative w-full min-h-[5.5rem] sm:min-h-[6.5rem] md:min-h-[8rem] lg:min-h-[10rem]">
              {paragraphs.map((_, i) => {
                const preset = SLIDE_PRESETS[i % SLIDE_PRESETS.length];
                return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.98 }}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 30,
                    scale: activeIndex === i ? 1 : 0.98,
                    filter: activeIndex === i ? "blur(0px)" : "blur(8px)",
                    pointerEvents: activeIndex === i ? "auto" : "none"
                  }}
                  transition={{ duration: 0.8, ease: cinematicEase }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <SplitShowcaseSubtitle
                    raw={paragraphSubtitles[i] ?? `Phase 0${i + 1}`}
                    highlightHex={preset.subtitleHighlightHex}
                  />
                </motion.div>
              );
              })}
            </div>
          </div>

          {/* Bottom: Crossfading Paragraphs with Staggered Blur */}
          <div className="w-full max-w-xl relative flex flex-col justify-end min-h-[160px] lg:min-h-[180px]">
            <div className="relative w-full h-24 lg:h-28">
              {paragraphs.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 20,
                    filter: activeIndex === i ? "blur(0px)" : "blur(4px)",
                    pointerEvents: activeIndex === i ? "auto" : "none"
                  }}
                  transition={{ duration: 0.8, delay: activeIndex === i ? 0.1 : 0, ease: cinematicEase }}
                >
                  <p className="font-sora text-sm md:text-base lg:text-lg leading-relaxed opacity-90 text-pretty font-medium">
                    {p}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Animated Button */}
            <motion.div
              animate={{
                backgroundColor: currentPreset.btnBg,
                color: currentPreset.btnText,
                y: 0,
                opacity: 1
              }}
              transition={{ duration: 0.8, ease: cinematicEase }}
              className="mt-6 w-fit rounded-full shadow-lg"
            >
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}


// =========================================================================
// MAIN PAGE COMPONENT
// =========================================================================

export default function CompanyPage({
  title,
  intro,
  paragraphs,
  paragraphSubtitles,
  heroImage = "/images/mais.jpg",
  showcaseImages,
  accentColor = "green",
  logoSrc,
  iconName,
}: CompanyPageProps) {
  const Icon = iconName ? iconMap[iconName] : undefined;

  const accentTextClass =
    accentColor === "green" ? "text-cap-green" : 
    accentColor === "yellow" ? "text-amber-500" : "text-cap-blue";

  const scrollCards =
    showcaseImages && showcaseImages.length > 0
      ? showcaseImages.map((src, i) => ({ id: `showcase-${i}`, src }))
      : [
          { id: "img1", src: heroImage },
          { id: "img2", src: heroImage === "/images/mais.jpg" ? "/images/2_mais.jpg" : "/images/mais.jpg" },
          { id: "img3", src: "/images/mais.jpg" },
          { id: "img4", src: heroImage },
        ];

  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-foreground selection:bg-cap-yellow/40 flex flex-col overflow-x-clip">
      
      {/* Background Watermark (For empty spaces) */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-[0.03]">
        <div className="relative flex items-center justify-center w-[150vw] h-[150vh] sm:w-[100vw] sm:h-[100vh] max-w-[1000px] max-h-[1000px]">
          {Icon ? (
            <Icon className="w-full h-full max-h-[80%] max-w-[80%]" strokeWidth={0.5} />
          ) : (
            <Image src={logoSrc} alt={`${title} Watermark`} fill className="object-contain" priority />
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <main className="flex-1 w-full min-w-0">
          
          {/* 1. Hero Section (Parallax Image + Linear Mask Fade) */}
          <HeroSection 
            title={title} 
            logoSrc={logoSrc} 
            heroImage={heroImage}
            accentTextClass={accentTextClass} 
          />

          {/* 2. Text intro (Scroll to Fill) */}
          <TextIntroSequence 
            intro={intro} 
            accentTextClass={accentTextClass} 
          />

          {/* 3. Editorial 50/50 Split Showcase (Dynamic Backgrounds + Time mapping) */}
          <SplitShowcase
            title={title}
            paragraphs={paragraphs}
            paragraphSubtitles={paragraphSubtitles}
            images={scrollCards}
          />

        </main>
        <HeroFooter />
      </div>
    </div>
  );
}