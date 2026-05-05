"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

export function ScrollRevealText({ text }: { text: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Tracks the scroll progress specifically over this paragraph
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 85%", "end 50%"], // Animation starts when top hits 85% of screen, ends at center
  });

  const words = text.split(" ");

  return (
    <div 
      ref={targetRef} 
      // Proportionally sized font: xl -> 2xl -> 3xl -> 4xl
      className="flex flex-wrap justify-center text-center font-unbounded text-xl font-semibold leading-[1.4] tracking-wide sm:text-2xl md:text-3xl lg:text-4xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} word={word} />
        );
      })}
    </div>
  );
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / word.length;

  return (
    <span className="relative mr-[0.3em] inline-block mt-2">
      {characters.map((char, i) => {
        const start = range[0] + (step * i);
        const end = range[0] + (step * (i + 1));
        return (
          <Character key={i} char={char} progress={progress} range={[start, end]} />
        );
      })}
    </span>
  );
}

function Character({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  // Opacity transitions from 0.15 to 1 as the user scrolls
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span className="relative inline-block">
      {/* Inactive Character (Light/Dark Grey depending on your theme) */}
      <span className="text-cap-grey/30">{char}</span>
      
      {/* Active Character (Dark Green) that fills in */}
      <motion.span 
        style={{ opacity }} 
        className="absolute left-0 top-0 text-cap-dark-green"
      >
        {char}
      </motion.span>
    </span>
  );
}
