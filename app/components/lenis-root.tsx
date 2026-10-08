"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef, useLenis } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis keeps scroll position across client navigations — reset so hero layouts start at top. */
function ScrollOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();

  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, lenis]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

export function LenisRoot({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <ScrollOnNavigate />
      {children}
    </ReactLenis>
  );
}
