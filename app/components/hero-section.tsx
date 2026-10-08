"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  { src: "/images/home-hero/mais.webp", alt: "Cultures vivrières — maïs" },
  { src: "/images/home-hero/mais-field.webp", alt: "Champs agricoles — CAP Congo" },
  {
    src: `/images/${encodeURIComponent("hero image bandundu.jpeg")}`,
    alt: "Agricole Bandundu — CAP Congo",
  },
  { src: "/images/agro-pastoral/HR5A4473.webp", alt: "Élevage agro-pastoral" },
  { src: "/images/pisiculture/farm-aerial.webp", alt: "Pisciculture — bassins" },
] as const;

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 35,
      dragFree: false,
      watchDrag: true,
    },
    [autoplayPlugin.current],
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

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const bg = root.querySelector<HTMLElement>(".hero-bg-wrap");
      const accentBar = root.querySelector<HTMLElement>(".hero-accent-bar");
      const badge = root.querySelector<HTMLElement>(".hero-badge");
      const subline = root.querySelector<HTMLElement>(".hero-subline");
      const cta = root.querySelector<HTMLElement>(".hero-cta");
      const headlineEl = root.querySelector<HTMLElement>(".hero-headline");

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const parallaxTween =
        reduced || !bg
          ? null
          : gsap.to(bg, {
              yPercent: 30,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.65,
              },
            });

      if (reduced) {
        if (bg) gsap.set(bg, { scale: 1, opacity: 1 });
        return () => {
          parallaxTween?.scrollTrigger?.kill();
          parallaxTween?.kill();
        };
      }

      let split: SplitType | null = null;
      if (headlineEl) {
        split = new SplitType(headlineEl, {
          types: "words",
          tagName: "span",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bg) {
        tl.fromTo(
          bg,
          { scale: 1.4, opacity: 0, filter: "blur(10px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.8, ease: "power4.out" },
          0,
        );
      }

      if (accentBar) {
        tl.from(
          accentBar,
          { scaleY: 0, transformOrigin: "0% 0%", duration: 1, ease: "power2.inOut" },
          0.4,
        );
      }

      if (badge) {
        tl.from(badge, { x: -20, opacity: 0, duration: 0.6 }, 0.5);
      }

      if (split?.words?.length) {
        tl.from(
          split.words,
          {
            y: 30,
            opacity: 0,
            filter: "blur(12px)",
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.55,
        );
      }

      if (subline) {
        tl.from(
          subline,
          { y: 20, opacity: 0, duration: 0.8 },
          split?.words?.length ? "-=0.5" : 0.85,
        );
      }

      if (cta) {
        tl.from(
          cta,
          { y: 20, opacity: 0, duration: 0.6, ease: "back.out(1.2)" },
          "-=0.4",
        );
      }

      return () => {
        parallaxTween?.scrollTrigger?.kill();
        parallaxTween?.kill();
        split?.revert();
        tl.kill();
      };
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="hero"
      className="hero-section relative min-h-[100svh] w-full max-w-full min-w-0 overflow-x-clip overflow-y-hidden bg-cap-dark"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 bg-cap-dark">
        <div className="hero-bg-wrap absolute inset-0 overflow-hidden">
          <div ref={emblaRef} className="h-full w-full max-w-full overflow-hidden touch-pan-y">
            <div className="flex h-full">
              {HERO_IMAGES.map((image, i) => (
                <div
                  key={image.src}
                  className="relative h-full min-w-0 flex-[0_0_100%] select-none"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    draggable={false}
                    className="pointer-events-none object-cover object-center"
                    sizes="100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Image précédente"
        className="absolute left-3 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cap-yellow md:left-6 md:size-12"
      >
        <ChevronLeft className="size-6" strokeWidth={2.5} aria-hidden />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Image suivante"
        className="absolute right-3 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cap-yellow md:right-6 md:size-12"
      >
        <ChevronRight className="size-6" strokeWidth={2.5} aria-hidden />
      </button>

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:bottom-8">
        {HERO_IMAGES.map((_, i) => (
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

      {/* --- CONTENT LAYER --- */}
      {/* pointer-events-none so mobile swipes reach the Embla carousel underneath */}
      <div className="pointer-events-none relative z-20 flex min-h-[100svh] flex-col items-start justify-end px-6 pb-14 pt-20 sm:px-12 sm:pb-16 md:px-20 md:pb-16 lg:px-32 lg:pb-20">
        
        {/* Free-floating Typography Layout */}
        <div className="relative flex w-full max-w-6xl flex-col gap-6 md:gap-8">
          
          {/* Decorative Thick Accent Line */}
          <div className="hero-accent-bar absolute -left-6 md:-left-12 top-2 bottom-2 w-1.5 md:w-2 rounded-r-full bg-cap-yellow" aria-hidden />



          {/* Massive Typography (Text color changed to background/white) */}
          <div className="flex flex-col gap-4 drop-shadow-2xl">
            {/* The SplitType library targets this headline for the 3D flip effect */}
            <h1 className="hero-headline font-unbounded text-3xl font-black uppercase leading-[1.08] tracking-tight text-background sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
              Produire local,<br /> nourrir durablement.
            </h1>
            <p className="hero-subline max-w-2xl font-unbounded text-[11px] font-light uppercase tracking-[0.15em] text-background/80 sm:text-xs md:text-sm mt-1">
              Engageons-nous pour développer l'agriculture et nourrir le Congo d'aujourd'hui et de demain.
            </p>
          </div>

          {/* Call To Action (Updated for dark mode context) */}
          <div className="hero-cta pointer-events-auto mt-4 sm:mt-6">
            <Link
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full bg-cap-green py-2.5 pl-6 pr-2.5 font-unbounded text-[10px] font-bold uppercase tracking-widest text-background shadow-[0_20px_40px_-10px_rgba(112,170,67,0.4)] transition-all duration-400 hover:bg-cap-dark-green hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-1 sm:text-[11px]"
            >
              <span>Découvrir</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-background/20 transition-transform duration-400 group-hover:bg-background group-hover:text-cap-dark-green sm:size-9">
                <ArrowRight className="size-3.5 transition-transform duration-400 group-hover:translate-x-1 sm:size-4" strokeWidth={2.5} />
              </span>
            </Link>
          </div>



        </div>

      </div>
    </section>
  );
}