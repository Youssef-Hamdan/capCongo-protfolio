"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { Fish, Leaf, Sprout, Wheat } from "lucide-react";

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
  if (lowerName.includes("bandundu")) return Wheat;
  return Sprout;
}

export function AboutEvolutionHorizontal({ branches }: AboutEvolutionHorizontalProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const ul = ulRef.current;
    if (!ul || !section) return;

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
    };
  }, [branches.length]);

  const n = branches.length;
  const scrollVh = Math.max(n + 1, 2) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-full overflow-x-clip bg-background"
      style={{ height: `${scrollVh}vh` }}
    >
      <div className="sticky top-0 z-10 h-screen w-full min-h-0 overflow-x-clip">
        <ul
          ref={ulRef}
          className="flex h-full w-max will-change-transform"
          aria-label="Chronologie des branches de CAP CONGO"
        >
          {branches.map((branch, index) => {
            const WatermarkIcon = branch.icon || getFallbackIcon(branch.name);

            return (
              <li
                key={branch.name}
                id={branchSectionId(branch.name)}
                className={`scroll-mt-28 relative flex h-full w-[100dvw] max-w-[100dvw] shrink-0 flex-col items-center justify-start overflow-hidden bg-gradient-to-br pt-[15vh] text-foreground ${
                  SLIDE_BACKGROUNDS[index % SLIDE_BACKGROUNDS.length]
                }`}
              >
                {/* 1. MASSIVE ICON WATERMARK (Nudged further left) */}
                <WatermarkIcon
                  className="pointer-events-none absolute right-0 top-10 -z-10 h-[60vw] w-[60vw] rotate-[-15deg] text-cap-dark-green/[0.04] sm:right-4 sm:top-8 sm:h-[45vw] sm:w-[45vw] md:right-8 md:top-12 md:h-[35vw] md:w-[35vw] lg:right-12 lg:top-4 lg:h-[30vw] lg:w-[30vw]"
                  strokeWidth={0.5}
                  aria-hidden
                />

                {/* 2. MASSIVE DATE WATERMARK (Anchored Top-Left) */}
                <div
                  className="pointer-events-none absolute left-4 top-16 -z-10 select-none font-unbounded text-[8rem] font-black leading-none text-cap-dark/[0.11] sm:left-8 sm:top-20 md:left-12 md:top-24 md:text-[14rem]"
                  aria-hidden
                >
                  {branch.year}
                </div>
                
                <span
                  className="absolute top-10 z-10 rounded-full border border-cap-green/25 bg-cap-green/15 font-mono text-sm font-medium text-cap-dark-green shadow-md shadow-cap-dark/10 md:text-base"
                  style={{ padding: "0.5rem 1.25rem" }}
                >
                  {branch.year}
                </span>
                
                <h2 className="font-unbounded relative z-10 mt-8 inline-block text-[min(18vw,5rem)] font-bold uppercase leading-none tracking-tight text-cap-dark md:text-7xl lg:text-8xl">
                  {branch.name}
                </h2>
                
                <p className="z-10 mt-6 max-w-2xl px-6 text-center text-base font-light text-cap-grey md:text-lg lg:text-xl">
                  {branch.description}
                </p>
                
                <div className="absolute bottom-5 z-20 h-[45vh] w-[92vw] md:h-[55vh] md:w-[75vw] lg:h-[55vh] lg:w-[1000px]">
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[2rem] from-background/90 via-background/15 to-transparent md:rounded-t-[3rem]" />
                  <Image
                    src={index % 2 === 0 ? branch.bgImage : branch.bgImage}
                    className="pointer-events-none rounded-[2rem] h-full w-full border-x border-t border-cap-dark/10 object-cover object-center  opacity-95 shadow-[0_-12px_40px_rgba(29,29,27,0.12)]"
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