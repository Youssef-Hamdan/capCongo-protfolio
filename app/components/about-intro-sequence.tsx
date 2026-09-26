"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const TARGET_LINE_LEN = 52;

/** Merge comma/clause fragments into balanced editorial lines. */
function balancePhrases(parts: string[]): string[] {
  if (parts.length <= 1) return parts;
  const lines: string[] = [];
  let buf = "";
  for (const part of parts) {
    const next = buf ? `${buf} ${part}` : part;
    if (buf && next.length > TARGET_LINE_LEN) {
      lines.push(buf);
      buf = part;
    } else {
      buf = next;
    }
  }
  if (buf) lines.push(buf);
  return lines.length > 1 ? lines : parts;
}

/**
 * Split into editorial lines:
 * 1) explicit `\n`
 * 2) sentences (`.!;`)
 * 3) long single sentences → comma / "et" phrases (company / social / durabilité copy)
 */
function toLines(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.includes("\n")) {
    return trimmed.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  }

  const sentences = trimmed
    .split(/(?<=[.!;])\s+/)
    .map((l) => l.trim())
    .filter(Boolean);

  return sentences.flatMap((sentence) => {
    if (sentence.length <= TARGET_LINE_LEN + 12) return [sentence];

    const commaParts = sentence.split(/(?<=,)\s+/).filter(Boolean);
    if (commaParts.length > 1) return balancePhrases(commaParts);

    // No commas: split before a mid-sentence " et " when long enough
    const etMatch = sentence.match(/^(.{28,}?)\s+(et\s+.+)$/i);
    if (etMatch) return [etMatch[1].trim(), etMatch[2].trim()];

    return [sentence];
  });
}

export function BlurFadeUpSequence({
  text,
  accentClass = "text-cap-dark-green",
  className = "",
}: {
  text: string;
  accentClass?: string;
  className?: string;
}) {
  const lines = toLines(text);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.06,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div
      className={cn(
        "relative mb-20 flex w-full items-center justify-center px-5 py-24 sm:px-8 md:px-16 lg:px-20",
        className,
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-18%" }}
        className={cn(
          "flex max-w-5xl flex-col items-center text-center font-unbounded text-xl font-semibold leading-[1.35] tracking-wide sm:text-2xl md:text-3xl md:leading-[1.3] lg:text-4xl",
          accentClass,
        )}
      >
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden py-[0.12em]">
            <motion.p variants={lineVariants} className="m-0">
              {line}
            </motion.p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function IntroSequence() {
  return (
    <BlurFadeUpSequence
      text={[
        "Société agro-pastorale en pleine expansion,",
        "engagée dans le développement d'une agriculture",
        "moderne, durable et créatrice de valeur en Afrique.",
        "Nous garantissons qualité, traçabilité et performance.",
      ].join("\n")}
    />
  );
}

export function EvolutionSequence() {
  return (
    <BlurFadeUpSequence
      text={[
        "CAP CONGO est structurée en quatre branches complémentaires,",
        "couvrant l'ensemble de la chaîne de valeur agricole au fil du temps.",
        "La première vue se fixe en entier, puis le défilement révèle chaque branche ;",
        "la dernière reste visible en entier avant la suite.",
      ].join("\n")}
    />
  );
}
