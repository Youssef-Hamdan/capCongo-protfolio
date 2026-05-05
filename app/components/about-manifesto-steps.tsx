export function ManifestoSteps({
  title,
  variant,
  lines,
}: {
  title: string;
  variant: "mission" | "ambition";
  lines: readonly [string, string, string];
}) {
  const spine =
    variant === "mission"
      ? "from-cap-yellow via-cap-green to-cap-dark-green/55"
      : "from-cap-green via-cap-blue/60 to-cap-dark-green/45";

  const accentBar =
    variant === "mission" ? "from-cap-yellow to-cap-green" : "from-cap-green to-cap-blue/70";

  const badgeRing =
    variant === "mission"
      ? "border-cap-yellow/45 shadow-[0_0_0_3px_rgba(247,214,22,0.14)]"
      : "border-cap-green/50 shadow-[0_0_0_3px_rgba(112,170,67,0.16)]";

  return (
    <div className="relative">
      <header className="relative mb-12 md:mb-16">
        <span
          className="pointer-events-none absolute -left-4 -top-12 select-none font-serif text-[clamp(3.5rem,14vw,7rem)] leading-none text-cap-green/[0.1] md:-left-2"
          aria-hidden
        >
          {variant === "mission" ? "\u00AB" : "\u00BB"}
        </span>
        <h3
          className={`relative z-10 max-w-[20ch] font-unbounded text-base font-bold uppercase leading-tight tracking-[0.2em] sm:text-lg md:text-xl ${
            variant === "mission"
              ? "bg-gradient-to-r from-cap-dark from-30% to-cap-dark-green bg-clip-text text-transparent"
              : "bg-gradient-to-r from-cap-dark from-20% via-cap-dark-green to-cap-blue/80 bg-clip-text text-transparent"
          }`}
        >
          {title}
        </h3>
        <div
          className={`relative z-10 mt-6 h-1 w-20 rounded-full bg-gradient-to-r shadow-[0_2px_16px_rgba(112,170,67,0.25)] md:mt-7 md:h-[5px] md:w-28 ${accentBar}`}
        />
      </header>

      <div className="relative">
        <div
          className={`pointer-events-none absolute left-6 top-14 bottom-14 z-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b shadow-[0_0_20px_rgba(112,170,67,0.15)] md:left-7 md:top-16 md:bottom-16 ${spine}`}
          aria-hidden
        />

        <ol className="relative z-[1] list-none space-y-0">
          {lines.map((line, i) => (
            <li
              key={i}
              className="group relative flex items-start gap-5 pb-12 last:pb-0 sm:gap-6 md:gap-8"
            >
              <span
                className={`relative z-[2] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-background font-unbounded text-sm font-black tabular-nums text-cap-dark-green transition-transform duration-500 group-hover:scale-105 md:h-14 md:w-16 md:text-base ${badgeRing}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={`min-w-0 max-w-prose flex-1 border-l-2 pt-1.5 pl-5 font-unbounded text-lg font-light leading-[1.35] tracking-[-0.01em] text-balance text-cap-dark/90 sm:pl-6 sm:text-xl md:pt-2 md:pl-7 md:text-2xl md:leading-[1.3] ${
                  variant === "mission" ? "border-cap-yellow/35" : "border-cap-green/40"
                }`}
              >
                {line}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
