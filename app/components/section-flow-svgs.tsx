"use client";

import { AnimateSvg, type PathData } from "./animate-svg";

const GREEN = "#70aa43";
const DARK_GREEN = "#3d632f";
const YELLOW = "#f7d616";
const BLUE = "#4377bc";
/** Muted line on light sections — cap-grey. */
const GREY_MUTED = "rgba(87, 87, 86, 0.35)";

/** Durabilité — trois dimensions d’engagement (agriculture → impact → ressources). */
export function SustainabilityFlowStages() {
  const paths: PathData[] = [
    {
      d: "M 8 22 L 118 22",
      stroke: DARK_GREEN,
      strokeWidth: 2,
      strokeLinecap: "round",
    },
    {
      d: "M 128 22 Q 200 6 272 22",
      stroke: BLUE,
      strokeWidth: 2,
      strokeLinecap: "round",
    },
    {
      d: "M 282 22 L 392 22",
      stroke: GREEN,
      strokeWidth: 2,
      strokeLinecap: "round",
    },
  ];
  return (
    <div
      className="mx-auto w-full max-w-lg py-2"
      aria-hidden
    >
      <p className="mb-2 text-center font-unbounded text-[9px] uppercase tracking-[0.25em] text-cap-grey">
        Documenter · Agir · Préserver
      </p>
      <AnimateSvg
        width="100%"
        height="40"
        viewBox="0 0 400 40"
        className="h-9 w-full object-contain md:h-10"
        paths={paths}
        strokeColor={DARK_GREEN}
        strokeWidth={2}
        animationDuration={1.1}
        staggerDelay={0.15}
        viewport={{ amount: 0.15 }}
      />
    </div>
  );
}

/** Partenariats — chaîne d’acteurs (institutions → producteurs → communautés). */
export function PartnershipStakeholderFlow() {
  const paths: PathData[] = [
    { d: "M 4 24 L 140 24", stroke: YELLOW, strokeWidth: 1.8, strokeLinecap: "round" },
    { d: "M 150 10 L 150 36 M 150 24 L 240 24", stroke: YELLOW, strokeWidth: 1.6, strokeLinecap: "round" },
    { d: "M 250 10 L 250 36 M 250 24 L 386 24", stroke: YELLOW, strokeWidth: 1.8, strokeLinecap: "round" },
  ];
  return (
    <div className="mx-auto w-full max-w-2xl px-2 py-3" aria-hidden>
      <p className="mb-2 text-center font-unbounded text-[9px] uppercase tracking-[0.25em] text-cap-grey">
        Institutions · Producteurs · Communautés
      </p>
      <AnimateSvg
        width="100%"
        height="48"
        viewBox="0 0 400 40"
        className="h-10 w-full object-contain opacity-90 md:h-12"
        paths={paths}
        strokeColor={YELLOW}
        strokeWidth={1.6}
        animationDuration={1.2}
        staggerDelay={0.2}
        viewport={{ amount: 0.2 }}
      />
    </div>
  );
}

/** Carrières — progression des engagements (diversité → sécurité → compétences). */
export function CareersTalentFlow() {
  const paths: PathData[] = [
    { d: "M 0 20 L 96 20", stroke: GREY_MUTED, strokeWidth: 1.2, strokeLinecap: "round" },
    { d: "M 104 20 L 200 20", stroke: YELLOW, strokeWidth: 2, strokeLinecap: "round" },
    { d: "M 208 20 L 304 20", stroke: GREEN, strokeWidth: 2, strokeLinecap: "round" },
  ];
  return (
    <div className="mx-auto w-full max-w-md py-2" aria-hidden>
      <p className="mb-2 text-center font-unbounded text-[9px] uppercase tracking-[0.25em] text-cap-grey">
        Diversité · Sécurité · Compétences
      </p>
      <AnimateSvg
        width="100%"
        height="36"
        viewBox="0 0 304 32"
        className="h-7 w-full object-contain md:h-8"
        paths={paths}
        strokeColor={YELLOW}
        strokeWidth={1.5}
        animationDuration={1}
        staggerDelay={0.18}
        viewport={{ amount: 0.2 }}
      />
    </div>
  );
}
