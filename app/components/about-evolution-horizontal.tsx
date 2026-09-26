"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { animate, scroll } from "motion";
import { ChevronLeft, ChevronRight, Fish, Leaf, Sprout, Wheat } from "lucide-react";

type Branch = {
  name: string;
  year: string;
  description: string;
  icon?: React.ElementType; 
  bgImage: string;
};

/** Light surface variants — only brand palette, matches rest of site. */
const SLIDE_BACKGROUNDS = [
  "from-background via-cap-green/[0.1] to-background",
  "from-background via-cap-yellow/[0.12] to-background",
  "from-background via-cap-blue/[0.07] to-background",
  "from-background via-cap-green/[0.06] to-cap-yellow/[0.08]",
] as const;

/** Share of each slide’s scroll range used for the h2 x-sweep (smaller = faster). */
const TEXT_SWEEP_SCROLL_FRACTION = 0.32;

type AboutEvolutionHorizontalProps = {
  branches: Branch[];
};

/** Stable fragment id for in-page nav (matches cap-header hashes). */
function branchSectionId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** Automatically picks an icon if none is provided in the branch data */
function getFallbackIcon(name: string) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("pisci")) return Fish;
  if (lowerName.includes("palm")) return Leaf;
  if (lowerName.includes("bundundu")) return Wheat;
  return Sprout;
}

export function AboutEvolutionHorizontal({ branches }: AboutEvolutionHorizontalProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Track viewport size to detach/attach animations safely.
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 768);
    checkViewport(); // Check on mount
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const ul = ulRef.current;

    // If mobile, ensure we clear any leftover desktop transforms and abort animation binding
    if (!ul || !section || !isDesktop) {
      if (ul) ul.style.transform = "none";
      ul?.querySelectorAll("h2").forEach((h) => (h.style.transform = "none"));
      return;
    }

    const items = ul.querySelectorAll<HTMLLIElement>(":scope > li");
    if (items.length === 0) return;

    const n = items.length;
    const translateVw = -((n - 1) * 100);
    
    const pad = 1 / (n + 1);
    const tEnd = 1 - pad;
    const controls = animate(
      ul,
      {
        x:
          n <= 1
            ? (["0vw", "0vw", "0vw", "0vw"] as const)
            : (["0vw", "0vw", `${translateVw}vw`, `${translateVw}vw`] as const),
      } as never,
      {
        duration: 1,
        ease: "linear",
        times: n <= 1 ? [0, 0.25, 0.5, 1] : [0, pad, tEnd, 1],
      } as never
    );

    const container =
      document.scrollingElement ?? (document.documentElement as unknown as Element);

    const unsubs: VoidFunction[] = [scroll(controls, { target: section, container, axis: "y" })];

    // Text (h2) motion
    const segmentLength = 1 / n;
    items.forEach((item, i) => {
      const header = item.querySelector("h2");
      if (!header) return;
      header.style.transform = "none"; // Reset before tracking
      const a = i * segmentLength;
      const b = (i + 1) * segmentLength;
      const mid = (a + b) / 2;
      const half = ((b - a) * TEXT_SWEEP_SCROLL_FRACTION) / 2;
      unsubs.push(
        scroll(animate([header] as any, { x: [800, -800] } as any) as any, {
          target: section,
          offset: [
            [mid - half, 1],
            [mid + half, 0],
          ],
        })
      );
    });

    return () => {
      for (const u of unsubs) u();
      // Cleanup transforms on unmount/resize
      if (ul) ul.style.transform = "none";
      items.forEach((item) => {
        const header = item.querySelector("h2");
        if (header) header.style.transform = "none";
      });
    };
  }, [branches.length, isDesktop]);

  const handleNextSlide = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrevSlide = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const n = branches.length;
  const scrollVh = Math.max(n + 1, 2) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-full overflow-x-clip bg-background h-auto md:h-[var(--scroll-vh)]"
      style={{
        "--scroll-vh": `${scrollVh}vh`,
        "--ul-width": `${n * 100}%`,
        "--slide-width": `${100 / n}%`,
      } as React.CSSProperties}
    >
      {/* Global Mobile Prev Side Button */}
      <button
        type="button"
        onClick={handlePrevSlide}
        aria-label="Branche précédente"
        className="absolute left-3 top-1/2 z-40 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-cap-dark/10 bg-background/80 text-cap-dark shadow-lg backdrop-blur-md transition hover:bg-background active:scale-95 md:hidden"
      >
        <ChevronLeft className="size-6" />
      </button>

      {/* Global Mobile Next Side Button */}
      <button
        type="button"
        onClick={handleNextSlide}
        aria-label="Branche suivante"
        className="absolute right-3 top-1/2 z-40 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-cap-dark/10 bg-background/80 text-cap-dark shadow-lg backdrop-blur-md transition hover:bg-background active:scale-95 md:hidden"
      >
        <ChevronRight className="size-6" />
      </button>

      <div
        ref={scrollContainerRef}
        className="relative flex w-full overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:sticky md:top-0 md:z-10 md:h-screen md:min-h-0 md:max-w-full md:overflow-x-clip"
      >
        <ul
          ref={ulRef}
          className="flex h-full will-change-transform w-max md:w-[var(--ul-width)]"
          aria-label="Chronologie des branches de CAP CONGO"
        >
          {branches.map((branch, index) => {
            const WatermarkIcon = branch.icon || getFallbackIcon(branch.name);

            return (
              <li
                key={branch.name}
                id={branchSectionId(branch.name)}
                className={`scroll-mt-28 relative flex h-[100svh] md:h-full w-screen md:w-[var(--slide-width)] shrink-0 snap-center flex-col items-center justify-start overflow-hidden bg-gradient-to-br pt-[12vh] md:pt-[15vh] text-foreground ${
                  SLIDE_BACKGROUNDS[index % SLIDE_BACKGROUNDS.length]
                }`}
              >
                {/* 1. MASSIVE ICON WATERMARK */}
                <WatermarkIcon
                  className="pointer-events-none absolute right-0 top-10 -z-10 h-[50vw] w-[50vw] rotate-[-15deg] text-cap-dark-green/[0.04] sm:right-4 sm:top-8 sm:h-[45vw] sm:w-[45vw] md:right-8 md:top-12 md:h-[35vw] md:w-[35vw] lg:right-12 lg:top-4 lg:h-[30vw] lg:w-[30vw]"
                  strokeWidth={0.5}
                  aria-hidden
                />

                {/* 2. MASSIVE DATE WATERMARK */}
                <div
                  className="pointer-events-none absolute left-3 top-14 -z-10 select-none font-unbounded text-[6rem] font-black leading-none text-cap-dark/[0.11] sm:left-8 sm:top-20 md:left-12 md:top-24 md:text-[14rem]"
                  aria-hidden
                >
                  {branch.year}
                </div>
                
                <span
                  className="absolute top-8 md:top-10 z-10 rounded-full border border-cap-green/25 bg-cap-green/15 font-mono text-xs font-medium text-cap-dark-green shadow-md shadow-cap-dark/10 md:text-base px-3 py-1 md:px-5 md:py-2"
                >
                  {branch.year}
                </span>
                
                {/* Shrunk Mobile Typography */}
                <h2 className="font-unbounded relative z-10 mt-6 md:mt-8 inline-block text-[min(11vw,2.75rem)] sm:text-[min(15vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-cap-dark md:text-7xl lg:text-8xl px-14 text-center">
                  {branch.name}
                </h2>
                
                {/* Shrunk Mobile Paragraph */}
                <p className="z-10 mt-3 md:mt-6 max-w-2xl px-12 text-center text-xs sm:text-sm font-light text-cap-grey md:text-lg lg:text-xl">
                  {branch.description}
                </p>
                
                <div className="absolute bottom-5 z-20 h-[45vh] w-[92vw] md:h-[55vh] md:w-[75vw] lg:h-[55vh] lg:w-[1000px]">
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[2rem] from-background/90 via-background/15 to-transparent md:rounded-t-[3rem]" />
                  <Image
                    src={branch.bgImage}
                    className="pointer-events-none rounded-[2rem] h-full w-full border-x border-t border-cap-dark/10 object-cover object-center opacity-95 shadow-[0_-12px_40px_rgba(29,29,27,0.12)]"
                    width={1200}
                    height={800}
                    alt={`${branch.name} — agriculture`}
                    priority={index === 0}
                  />
                  <Link
                    href={`/${branchSectionId(branch.name)}`}
                    className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-cap-green px-6 py-2.5 font-unbounded text-[10px] font-bold uppercase tracking-widest text-background shadow-lg shadow-cap-dark/25 transition hover:bg-cap-dark-green md:bottom-8 md:px-8 md:text-xs"
                  >
                    Découvrir
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}