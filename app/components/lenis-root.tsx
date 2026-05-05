"use client";

import { ReactLenis } from "lenis/react";

export function LenisRoot({ children }: { children: React.ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
