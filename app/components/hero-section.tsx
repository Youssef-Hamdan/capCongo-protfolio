"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ChevronDown, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Parallax for the background
      const parallaxTween = reduced
        ? null
        : gsap.to(".hero-bg-image", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          });

      if (reduced) {
        gsap.set(".hero-bg-image", { scale: 1, opacity: 1 });
        return () => {};
      }

      // Split text for 3D typography animation
      const headlineEl = root.querySelector<HTMLElement>(".hero-headline");
      let split: SplitType | null = null;
      if (headlineEl) {
        split = new SplitType(headlineEl, {
          types: "words",
          tagName: "span",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Majestic Background Reveal
      tl.fromTo(
        ".hero-bg-image",
        { scale: 1.4, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.8, ease: "power4.out" },
        0
      )
        .fromTo(
          ".hero-wash",
          { opacity: 0 },
          { opacity: 1, duration: 1.4 },
          0.15
        )
        .fromTo(
          ".hero-bloom",
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
          0.2
        )
        .from(
          ".hero-accent-bar",
          { scaleY: 0, transformOrigin: "0% 0%", duration: 1, ease: "power2.inOut" },
          0.4
        )
        .from(
          ".hero-badge",
          { x: -20, opacity: 0, duration: 0.6 },
          0.5
        );

      // Staggered 3D Word Reveal (Now massive and directly on background)
      if (split?.words?.length) {
        tl.from(
          split.words,
          {
            y: 80,
            opacity: 0,
            rotateX: -40,
            transformOrigin: "50% 100%",
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.55
        );
      }

      tl.from(
        ".hero-subline",
        { y: 20, opacity: 0, duration: 0.8 },
        split?.words?.length ? "-=0.5" : 0.85
      )
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.6, ease: "back.out(1.2)" },
          "-=0.4"
        )
        .from(
          ".hero-scroll-hint",
          { y: 10, opacity: 0, duration: 0.5 },
          "-=0.2"
        );

      // Bouncing scroll chevron
      const chevronTween = gsap.to(".hero-scroll-chevron", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });

      return () => {
        parallaxTween?.scrollTrigger?.kill();
        parallaxTween?.kill();
        chevronTween.kill();
        split?.revert();
        tl.kill();
      };
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="hero-section relative min-h-[100svh] w-full max-w-full min-w-0 overflow-x-clip overflow-y-hidden bg-cap-dark"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 bg-cap-dark">
        <Image
          src="/images/mais.jpg"
          alt="Production agricole locale — champ"
          fill
          className="hero-bg-image object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Darker Wash to ensure the white text pops beautifully
        <div
          className="hero-wash pointer-events-none absolute inset-0 z-[6] bg-gradient-to-b from-cap-dark/80 via-cap-dark/40 to-cap-dark/90"
          aria-hidden
        /> */}
        {/* Glow accents */}
        <div
          className="hero-bloom pointer-events-none absolute -right-[10%] top-1/4 z-[7] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-cap-green/25 blur-[120px]"
          aria-hidden
        />
        <div
          className="hero-bloom pointer-events-none absolute -left-[10%] bottom-0 z-[7] h-[50vw] max-h-[400px] w-[50vw] rounded-full bg-cap-yellow/20 blur-[100px]"
          aria-hidden
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 flex min-h-[100svh] flex-col items-start justify-end px-6 pb-10 pt-20 sm:px-12 sm:pb-12 md:px-20 md:pb-14 lg:px-32 lg:pb-16">
        
        {/* Free-floating Typography Layout */}
        <div className="relative flex w-full max-w-6xl flex-col gap-6 md:gap-8">
          
          {/* Decorative Thick Accent Line */}
          <div className="hero-accent-bar absolute -left-6 md:-left-12 top-2 bottom-2 w-1.5 md:w-2 rounded-r-full bg-cap-yellow" aria-hidden />

          {/* Badge (Updated colors for dark background) */}
          <div className="hero-badge inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 font-unbounded text-[8px] font-semibold uppercase tracking-[0.2em] text-background sm:text-[9px] shadow-xl">
            <span className="size-1.5 shrink-0 rounded-full bg-cap-yellow shadow-[0_0_12px_rgba(255,204,0,0.8)] animate-pulse" />
            Terroir &amp; transformation
          </div>

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
          <div className="hero-cta mt-4 sm:mt-6">
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