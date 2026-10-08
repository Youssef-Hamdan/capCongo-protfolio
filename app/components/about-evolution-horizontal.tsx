"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

type AboutEvolutionHorizontalProps = {
  branches: Branch[];
};

/** Stable fragment id / route slug for in-page nav (matches cap-header hashes). */
function branchSectionId(name: string): string {
  const lower = name.toLowerCase().replace(/\s+/g, "-");
  // Page route uses historical "bundundu" spelling
  if (lower === "agricole-bandundu") return "agricole-bundundu";
  return lower;
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 30,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="relative mx-auto w-full max-w-[100vw] overflow-x-clip bg-background"
      aria-label="Chronologie des branches de CAP CONGO"
    >
      <div className="relative min-h-[100svh] w-full md:min-h-[88svh]">
        <div ref={emblaRef} className="h-full min-h-[100svh] overflow-hidden md:min-h-[88svh]">
          <ul className="flex h-full min-h-[100svh] md:min-h-[88svh]">
            {branches.map((branch, index) => {
              const WatermarkIcon = branch.icon || getFallbackIcon(branch.name);

              return (
                <li
                  key={branch.name}
                  id={branchSectionId(branch.name)}
                  className={`scroll-mt-28 relative flex h-full max-h-[100svh] min-h-[100svh] min-w-0 flex-[0_0_100%] flex-col items-center overflow-hidden bg-gradient-to-br pb-4 text-foreground md:max-h-none md:min-h-[88svh] md:justify-start md:pb-0 ${
                    SLIDE_BACKGROUNDS[index % SLIDE_BACKGROUNDS.length]
                  }`}
                >
                  <WatermarkIcon
                    className="pointer-events-none absolute right-0 top-10 -z-10 h-[60vw] w-[60vw] rotate-[-15deg] text-cap-dark-green/[0.04] sm:right-4 sm:top-8 sm:h-[45vw] sm:w-[45vw] md:right-8 md:top-12 md:h-[35vw] md:w-[35vw] lg:right-12 lg:top-4 lg:h-[30vw] lg:w-[30vw]"
                    strokeWidth={0.5}
                    aria-hidden
                  />

                  <div
                    className="pointer-events-none absolute left-4 top-16 -z-10 select-none font-unbounded text-[8rem] font-black leading-none text-cap-dark/[0.11] sm:left-8 sm:top-20 md:left-12 md:top-24 md:text-[14rem]"
                    aria-hidden
                  >
                    {branch.year}
                  </div>

                  <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-10 pt-10 text-center sm:px-16 sm:pt-14 md:max-w-6xl md:flex-none md:justify-start md:px-16 md:pt-[12vh] lg:px-20">
                    <span
                      className="rounded-full border border-cap-green/25 bg-cap-green/15 px-4 py-1.5 font-mono text-xs font-medium text-cap-dark-green shadow-md shadow-cap-dark/10 sm:px-5 sm:py-2 sm:text-sm md:text-base"
                    >
                      {branch.year}
                    </span>

                    <h2 className="font-unbounded mt-3 w-full px-1 text-balance text-[clamp(1.5rem,7.5vw,2.35rem)] font-bold uppercase leading-[1.08] tracking-tight text-cap-dark sm:mt-5 sm:text-[clamp(1.75rem,5vw,2.75rem)] md:mt-7 md:px-0 md:text-[clamp(1.35rem,calc(0.7rem+3.8vw),3.75rem)] md:leading-[1.02]">
                      {branch.name}
                    </h2>

                    <p className="mt-2 max-w-[18rem] text-pretty text-sm font-light leading-snug text-cap-grey sm:mt-4 sm:max-w-xl sm:text-base md:mt-5 md:max-w-md md:text-lg lg:text-xl">
                      {branch.description}
                    </p>
                  </div>

                  {/* Mobile: pin image to bottom of the slide; desktop keeps absolute bottom placement */}
                  <div className="relative z-20 mt-auto h-[min(46svh,340px)] w-[min(94vw,1000px)] shrink-0 sm:h-[min(42vh,300px)] md:absolute md:bottom-5 md:mt-0 md:h-[55vh] md:w-[75vw] lg:h-[55vh] lg:w-[1000px]">
                    <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[2rem] from-background/90 via-background/15 to-transparent md:rounded-t-[3rem]" />
                    <Image
                      src={branch.bgImage}
                      className="pointer-events-none h-full w-full rounded-[1.75rem] border-x border-t border-cap-dark/10 object-cover object-center opacity-95 shadow-[0_-12px_40px_rgba(29,29,27,0.12)] md:rounded-[2rem]"
                      width={1200}
                      height={800}
                      alt={`${branch.name} — agriculture`}
                      priority={index === 0}
                    />
                    <Link
                      href={`/${branchSectionId(branch.name)}`}
                      className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-cap-green px-6 py-2.5 font-unbounded text-[10px] font-bold uppercase tracking-widest text-background shadow-lg shadow-cap-dark/25 transition hover:bg-cap-dark-green md:bottom-8 md:px-8 md:text-xs"
                    >
                      Découvrir
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Branche précédente"
          className="absolute left-3 top-[74%] z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-cap-dark/15 bg-background/90 text-cap-dark shadow-lg backdrop-blur-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cap-green md:left-6 md:top-[68%] md:size-12"
        >
          <ChevronLeft className="size-6" strokeWidth={2.5} aria-hidden />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Branche suivante"
          className="absolute right-3 top-[74%] z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-cap-dark/15 bg-background/90 text-cap-dark shadow-lg backdrop-blur-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cap-green md:right-6 md:top-[68%] md:size-12"
        >
          <ChevronRight className="size-6" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </section>
  );
}
