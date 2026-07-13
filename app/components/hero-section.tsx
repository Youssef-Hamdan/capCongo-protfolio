"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  {
    src: "/images/bundundu/DJI_20251028123130_0313_D.webp",
    alt: "Vue aérienne des installations agricoles — Agricole Bandundu",
  },
  {
    src: "/images/pisiculture/DJI_0312.webp",
    alt: "Installations de pisciculture — CAP Congo",
  },
  {
    src: "/images/agro-pastoral/HR5A4473.webp",
    alt: "Activités agro-pastorales — CAP Congo",
  },
  {
    src: "/images/agro-palm/hero.jpeg",
    alt: "Récolte de régimes de palmiers à huile — Agro Palm",
  },


] as const;

const SLIDE_MS = 5500;

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const parallaxTween = reduced
        ? null
        : gsap.to(".hero-bg-layer", {
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
        gsap.set(".hero-bg-layer", { scale: 1, opacity: 1 });
        return () => {};
      }

      const headlineEl = root.querySelector<HTMLElement>(".hero-headline");
      let split: SplitType | null = null;
      if (headlineEl) {
        split = new SplitType(headlineEl, {
          types: "words",
          tagName: "span",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-bg-layer",
        { scale: 1.4, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 2.8,
          ease: "power4.out",
        },
        0,
      )
        .fromTo(
          ".hero-wash",
          { opacity: 0 },
          { opacity: 1, duration: 1.4 },
          0.15,
        )
        .fromTo(
          ".hero-bloom",
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
          0.2,
        )
        .from(
          ".hero-accent-bar",
          {
            scaleY: 0,
            transformOrigin: "0% 0%",
            duration: 1,
            ease: "power2.inOut",
          },
          0.4,
        )
        .from(".hero-badge", { x: -20, opacity: 0, duration: 0.6 }, 0.5);

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
          0.55,
        );
      }

      tl.from(
        ".hero-subline",
        { y: 20, opacity: 0, duration: 0.8 },
        split?.words?.length ? "-=0.5" : 0.85,
      ).from(
        ".hero-cta",
        { y: 20, opacity: 0, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.4",
      );

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
      <div className="absolute inset-0 z-0 bg-cap-dark">
        <div className="hero-bg-layer absolute inset-0 origin-center will-change-transform">
          {HERO_IMAGES.map((image, i) => (
            <div
              key={image.src}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
              style={{ opacity: activeIndex === i ? 1 : 0 }}
              aria-hidden={activeIndex !== i}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div
          className="hero-wash pointer-events-none absolute inset-0 z-[6] bg-gradient-to-b from-cap-dark/40 via-cap-dark/15 to-cap-dark/55"
          aria-hidden
        />
        <div
          className="hero-bloom pointer-events-none absolute -right-[10%] top-1/4 z-[7] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-cap-green/25 blur-[120px]"
          aria-hidden
        />
        <div
          className="hero-bloom pointer-events-none absolute -left-[10%] bottom-0 z-[7] h-[50vw] max-h-[400px] w-[50vw] rounded-full bg-cap-yellow/20 blur-[100px]"
          aria-hidden
        />
      </div>

      <div className="relative z-20 flex min-h-[100svh] flex-col items-start justify-end px-6 pb-10 pt-20 sm:px-12 sm:pb-12 md:px-20 md:pb-14 lg:px-32 lg:pb-16">
        <div className="relative flex w-full max-w-6xl flex-col gap-6 md:gap-8">
          <div
            className="hero-accent-bar absolute -left-6 top-2 bottom-2 w-1.5 rounded-r-full bg-cap-yellow md:-left-12 md:w-2"
            aria-hidden
          />

          <div className="hero-badge inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-unbounded text-[8px] font-semibold uppercase tracking-[0.2em] text-background shadow-xl backdrop-blur-md sm:text-[9px]">
            <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-cap-yellow shadow-[0_0_12px_rgba(255,204,0,0.8)]" />
            Terroir &amp; transformation
          </div>

          <div className="flex flex-col gap-4 drop-shadow-2xl">
            <h1 className="hero-headline font-unbounded text-3xl font-black uppercase leading-[1.08] tracking-tight text-background sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
              Produire local,
              <br /> nourrir durablement.
            </h1>
            <p className="hero-subline mt-1 max-w-2xl font-unbounded text-[11px] font-light uppercase tracking-[0.15em] text-background/80 sm:text-xs md:text-sm">
              Engageons-nous pour développer l&apos;agriculture et nourrir le
              Congo d&apos;aujourd&apos;hui et de demain.
            </p>
          </div>

          <div className="hero-cta mt-4 sm:mt-6">
            <Link
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full bg-cap-green py-2.5 pl-6 pr-2.5 font-unbounded text-[10px] font-bold uppercase tracking-widest text-background shadow-[0_20px_40px_-10px_rgba(112,170,67,0.4)] transition-all duration-400 hover:-translate-y-1 hover:bg-cap-dark-green hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] sm:text-[11px]"
            >
              <span>Découvrir</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-background/20 transition-transform duration-400 group-hover:bg-background group-hover:text-cap-dark-green sm:size-9">
                <ArrowRight
                  className="size-3.5 transition-transform duration-400 group-hover:translate-x-1 sm:size-4"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          </div>

          <div
            className="mt-2 flex gap-2"
            role="tablist"
            aria-label="Images du hero"
          >
            {HERO_IMAGES.map((image, i) => (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Afficher l'image ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIndex === i
                    ? "w-8 bg-cap-yellow"
                    : "w-1.5 bg-background/35 hover:bg-background/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
