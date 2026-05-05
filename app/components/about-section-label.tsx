import type { ReactNode } from "react";

export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={`flex items-center gap-3 font-unbounded text-[11px] font-semibold uppercase tracking-[0.25em] text-cap-dark-green ${className}`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-cap-dark-green/60 to-cap-green/20" aria-hidden />
      {children}
    </h3>
  );
}
