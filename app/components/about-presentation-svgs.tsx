"use client";

import { AnimateSvg, type PathData } from "./animate-svg";

const GREEN = "#70aa43";
const YELLOW = "#f7d616";
/** Secondary stroke — cap-grey at reduced opacity. */
const MUTED = "rgba(87, 87, 86, 0.45)";

/** Identity — soft organic underline under the headline (growth / roots). */
export function AboutIdentityLine() {
  return (
    <div
      className="mx-auto w-full max-w-sm lg:mx-0"
      aria-hidden
    >
      <AnimateSvg
        width="100%"
        height="20"
        viewBox="0 0 300 20"
        className="h-5 w-full max-w-[300px] object-contain opacity-90"
        paths={[
          {
            d: "M 2 10 Q 75 2 150 10 T 298 10",
            stroke: GREEN,
            strokeWidth: 1.5,
            strokeLinecap: "round",
          },
          {
            d: "M 0 16 L 300 16",
            stroke: MUTED,
            strokeWidth: 0.8,
            strokeLinecap: "round",
          },
        ]}
        strokeColor={GREEN}
        strokeWidth={1.5}
        animationDuration={1.8}
        staggerDelay={0.25}
      />
    </div>
  );
}

/** Value chain — drawn “flow” between intro and the two stages (read left → right). */
export function AboutChainFlow() {
  const paths: PathData[] = [
    {
      d: "M 8 20 L 210 20",
      stroke: GREEN,
      strokeWidth: 1.4,
    },
    {
      d: "M 220 20 Q 300 4 300 4 Q 380 4 400 20",
      stroke: YELLOW,
      strokeWidth: 1.6,
    },
    {
      d: "M 410 20 L 592 20",
      stroke: GREEN,
      strokeWidth: 1.4,
    },
  ];
  return (
    <div className="mx-auto w-full max-w-3xl px-1 py-1 md:max-w-4xl" aria-hidden>
      <AnimateSvg
        width="100%"
        height="48"
        viewBox="0 0 600 40"
        className="h-9 w-full object-contain md:h-12"
        paths={paths}
        strokeColor={GREEN}
        strokeWidth={1.4}
        animationDuration={1.2}
        staggerDelay={0.22}
      />
    </div>
  );
}

/** Activities — vine-like line suggesting diversity of filières. */
export function AboutActivitiesVine() {
  return (
    <div
      className="mx-auto w-full max-w-2xl py-2 text-center lg:ml-auto lg:max-w-xl lg:py-0"
      aria-hidden
    >
      <AnimateSvg
        width="100%"
        height="32"
        viewBox="0 0 400 32"
        className="h-6 w-full max-w-md object-contain opacity-80 md:mx-0 md:ml-0"
        path="M 0 24 C 60 2 100 2 120 20 S 200 4 200 4 S 280 28 320 18 S 380 8 400 18"
        strokeColor={YELLOW}
        strokeWidth={1.2}
        animationDuration={2}
      />
    </div>
  );
}

/** Mission — three short strokes, one per pillar. */
export function AboutMissionTrio() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center py-2" aria-hidden>
      <AnimateSvg
        width="200"
        height="24"
        viewBox="0 0 200 24"
        className="h-6 w-[200px] max-w-full"
        paths={[
          { d: "M 0 8 L 52 8", stroke: YELLOW, strokeWidth: 2.2, strokeLinecap: "round" },
          { d: "M 68 8 L 132 8", stroke: YELLOW, strokeWidth: 2.2, strokeLinecap: "round" },
          { d: "M 148 8 L 200 8", stroke: YELLOW, strokeWidth: 2.2, strokeLinecap: "round" },
        ]}
        strokeColor={YELLOW}
        strokeWidth={2}
        staggerDelay={0.2}
        animationDuration={0.9}
      />
    </div>
  );
}

/** Organisation — timeline spine with nodes (4 segments). */
export function AboutOrganisationSpine() {
  return (
    <div
      className="mb-2 w-full max-w-2xl px-0 md:mb-0 md:mt-0 lg:max-w-3xl"
      aria-hidden
    >
      <AnimateSvg
        width="100%"
        height="28"
        viewBox="0 0 520 28"
        className="h-7 w-full object-contain opacity-75"
        paths={[
          { d: "M 0 12 L 115 12", stroke: MUTED, strokeWidth: 1, strokeLinecap: "round" },
          { d: "M 120 4 L 120 20 M 120 12 L 245 12", stroke: GREEN, strokeWidth: 1.2, strokeLinecap: "round" },
          { d: "M 250 4 L 250 20 M 250 12 L 375 12", stroke: GREEN, strokeWidth: 1.2, strokeLinecap: "round" },
          { d: "M 380 4 L 380 20 M 380 12 L 505 12", stroke: GREEN, strokeWidth: 1.2, strokeLinecap: "round" },
          { d: "M 520 4 L 520 20 M 512 12 L 520 12", stroke: MUTED, strokeWidth: 1, strokeLinecap: "round" },
        ]}
        strokeColor={GREEN}
        strokeWidth={1.1}
        staggerDelay={0.1}
        animationDuration={0.6}
      />
    </div>
  );
}

/** Ambition — large horizon / sunrise arc over the statement. */
export function AboutAmbitionHorizon() {
  return (
    <div className="mx-auto mb-8 w-full max-w-3xl opacity-80 sm:mb-10" aria-hidden>
      <AnimateSvg
        width="100%"
        height="64"
        viewBox="0 0 480 64"
        className="h-12 w-full object-contain sm:h-16"
        paths={[
          {
            d: "M 0 52 Q 120 4 240 4 Q 360 4 480 52",
            stroke: GREEN,
            strokeWidth: 1.5,
            strokeLinecap: "round",
          },
          {
            d: "M 0 60 Q 200 28 240 32 Q 280 28 480 60",
            stroke: MUTED,
            strokeWidth: 0.6,
            strokeLinecap: "round",
          },
        ]}
        strokeColor={GREEN}
        animationDuration={2.2}
        staggerDelay={0.2}
      />
    </div>
  );
}
