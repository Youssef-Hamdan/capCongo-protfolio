"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Shared editorial typography for all text sequences site-wide. */
export const TEXT_SEQUENCE_TYPOGRAPHY =
  "font-unbounded text-lg font-semibold leading-[1.35] tracking-wide sm:text-xl md:text-2xl md:leading-[1.3] lg:text-3xl xl:text-4xl";

export const TEXT_SEQUENCE_SECTION_PADDING =
  "px-5 py-24 sm:px-8 md:px-16 lg:px-20";

export type TextSequenceProps = {
  text: string;
  accentClass?: string;
  className?: string;
};

function wordCount(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function splitLongPhrase(text: string): string[] {
  const clauses = text.split(/(?<=,)\s+/);
  if (clauses.length === 1) return [text];

  const lines: string[] = [];
  let buf = "";
  for (const clause of clauses) {
    const next = buf ? `${buf} ${clause}` : clause;
    if (buf && wordCount(next) > 12) {
      lines.push(buf);
      buf = clause;
    } else {
      buf = next;
    }
  }
  if (buf) lines.push(buf);
  return lines.length > 1 ? lines : [text];
}

function toLines(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.includes("\n")) {
    return trimmed
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
  }

  const sentences = trimmed
    .split(/(?<=[.!;])\s+/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (sentences.length <= 1) {
    return splitLongPhrase(trimmed);
  }

  return sentences.flatMap((s) =>
    wordCount(s) > 14 ? splitLongPhrase(s) : [s],
  );
}

/** Viewport-triggered line clip-reveal — used on every page with per-page `accentClass`. */
export function TextSequence({
  text,
  accentClass = "text-cap-dark-green",
  className = "",
}: TextSequenceProps) {
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
        "relative flex w-full items-center justify-center",
        TEXT_SEQUENCE_SECTION_PADDING,
        className,
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-18%" }}
        className={cn(
          "flex max-w-5xl flex-col items-center text-balance text-center",
          TEXT_SEQUENCE_TYPOGRAPHY,
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
