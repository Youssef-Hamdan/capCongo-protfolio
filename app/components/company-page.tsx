
"use client";

import Image from "next/image";
import { type LucideIcon, Fish, Leaf, Sprout, Wheat, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroFooter } from "./hero-footer";
import { StickyIntroFillScroll } from "./about-intro-sequence";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
  /** Hero background carousel (auto + manual). Falls back to `heroImage` when omitted. */
  heroImages?: string[];
  /** Left column of the split showcase — one image per slide, cycled with modulo if shorter than `paragraphs`. */
  showcaseImages?: string[];
  accentColor?: "green" | "yellow" | "blue";
  logoSrc: string;
  iconName?: keyof typeof iconMap;
  /** Vimeo video ID — full-viewport reveal after the split showcase when set. */
  vimeoVideoId?: string;
}

// =========================================================================
// 1. HERO SECTION (GSAP Reference Behavior via Framer Motion)
// =========================================================================

function HeroSection({ 
  title, 
  logoSrc, 
  heroImage,
  heroImages,
  accentTextClass 
}: { 
  title: string; 
  logoSrc: string; 
  heroImage: string;
  heroImages?: string[];
  accentTextClass: string; 
}) {
  const containerRef = useRef<HTMLElement>(null);
  const slides = heroImages?.length ? heroImages : [heroImage];
  const isCarousel = slides.length > 1;

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 35 },
    isCarousel ? [autoplayPlugin.current] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  
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
          {isCarousel ? (
            <div ref={emblaRef} className="h-full w-full overflow-hidden">
              <div className="flex h-full">
                {slides.map((src, i) => (
                  <div key={src} className="relative h-full min-w-0 flex-[0_0_100%]">
                    <Image
                      src={src}
                      alt={`${title} — vue ${i + 1}`}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Image
              src={heroImage}
              alt={`${title} Background`}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-100"
            />
          )}
        </motion.div>

      </motion.div>

      {isCarousel ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 md:left-6 md:size-12"
          >
            <ChevronLeft className="size-6" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 md:right-6 md:size-12"
          >
            <ChevronRight className="size-6" strokeWidth={2.5} />
          </button>
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-8">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Aller à l'image ${i + 1}`}
                aria-current={selectedIndex === i ? "true" : undefined}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i ? "w-8 bg-cap-yellow" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}

      <motion.div 
        style={{ opacity: heroFade }}
        className="relative z-10 flex flex-1 flex-col justify-end w-full pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex w-full flex-col items-center gap-5 px-4 text-center sm:gap-6 md:gap-7 ${
            isCarousel ? "pb-14 md:pb-16" : "pb-10 md:pb-12"
          }`}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: cinematicEase }}
            className="relative size-48 drop-shadow-2xl sm:size-56 md:size-64 lg:size-72 xl:size-80"
          >
            <Image src={logoSrc} alt={`${title} Logo`} fill className="object-contain" priority />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: cinematicEase }}
            className={`font-unbounded text-3xl font-black uppercase tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl lg:text-6xl ${accentTextClass}`}
          >
            {title}
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}

// =========================================================================
// 2. EDITORIAL 50/50 SPLIT SHOWCASE (Dynamic Colors + Advanced Animation)
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

function vimeoBackgroundSrc(videoId: string) {
  return `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&muted=1&loop=1&badge=0&title=0&byline=0&portrait=0&controls=0&autopause=0&playsinline=1&dnt=1`;
}

function SplitShowcase({
  title,
  paragraphs,
  paragraphSubtitles,
  images,
  vimeoVideoId,
}: {
  title: string;
  paragraphs: string[];
  paragraphSubtitles: string[];
  images: { id: string; src: string }[];
  vimeoVideoId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoSlideIndex = vimeoVideoId ? paragraphs.length : -1;
  const totalSlides = paragraphs.length + (vimeoVideoId ? 1 : 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionLength = 1 / totalSlides;
    const index = Math.min(Math.floor((latest + 0.01) / sectionLength), totalSlides - 1);
    setActiveIndex(index);
  });

  const currentPreset = SLIDE_PRESETS[activeIndex % SLIDE_PRESETS.length];
  const onVideoSlide = vimeoVideoId != null && activeIndex === videoSlideIndex;

  // Ultra-smooth Apple-style spring easing (cubic-bezier tuple)
  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <div ref={containerRef} style={{ height: `${totalSlides * 100}vh` }} className="relative w-full z-20">
      
      <div className="sticky top-0 relative h-screen w-full flex flex-col lg:flex-row overflow-hidden">

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

        {/* Full-viewport video — same crossfade as image slides */}
        {vimeoVideoId ? (
          <motion.div
            className="absolute inset-0 z-30 overflow-hidden bg-black"
            initial={{ opacity: 0, scale: 1.1, y: "5%" }}
            animate={{
              opacity: onVideoSlide ? 1 : 0,
              scale: onVideoSlide ? 1 : 1.1,
              y: onVideoSlide ? "0%" : "5%",
            }}
            transition={{ duration: 1, ease: cinematicEase }}
          >
            <iframe
              src={vimeoBackgroundSrc(vimeoVideoId)}
              title="MH"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
            />
          </motion.div>
        ) : null}

        {/* RIGHT HALF: Smooth Animated Color Transitions */}
        <motion.div 
          animate={{
            backgroundColor: currentPreset.bgColorHex,
            color: currentPreset.textColorHex,
            opacity: onVideoSlide ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full lg:w-1/2 h-[60vh] lg:h-full flex flex-col justify-between p-8 sm:p-12 lg:p-20 xl:p-24"
        >
          {/* Top: Pill Pagination Navigation */}
          <div className="flex items-center gap-2 lg:gap-3">
            {Array.from({ length: totalSlides }, (_, i) => {
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
  heroImage = "/images/mais.webp",
  heroImages,
  showcaseImages,
  accentColor = "green",
  logoSrc,
  iconName,
  vimeoVideoId,
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
          { id: "img2", src: heroImage === "/images/mais.webp" ? "/images/2_mais.webp" : "/images/mais.webp" },
          { id: "img3", src: "/images/mais.webp" },
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
            heroImages={heroImages}
            accentTextClass={accentTextClass} 
          />

          {/* 2. Text intro (word-rise scroll reveal — shared with home) */}
          <StickyIntroFillScroll
            text={intro}
            accentClass={accentTextClass}
            className="bg-background"
          />

          {/* 3. Editorial 50/50 Split Showcase (Dynamic Backgrounds + Time mapping) */}
          <SplitShowcase
            title={title}
            paragraphs={paragraphs}
            paragraphSubtitles={paragraphSubtitles}
            images={scrollCards}
            vimeoVideoId={vimeoVideoId}
          />

        </main>
        <HeroFooter />
      </div>
    </div>
  );
}