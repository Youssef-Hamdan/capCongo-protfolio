type ContentPageHeroProps = {
  title: string;
  subtitle: string;
  accentClass?: string;
};

export function ContentPageHero({
  title,
  subtitle,
  accentClass = "text-cap-dark-green",
}: ContentPageHeroProps) {
  return (
    <header className="border-b border-cap-dark/[0.06] bg-background px-6 pb-12 pt-28 md:px-16 md:pb-16 md:pt-32 lg:px-24">
      <div className="mx-auto max-w-4xl text-center">
        <p
          className={`font-unbounded text-[11px] font-semibold uppercase tracking-[0.25em] ${accentClass}`}
        >
          CAP Congo
        </p>
        <h1 className="mt-4 font-unbounded text-4xl font-semibold uppercase tracking-wide text-cap-dark md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-cap-grey md:text-xl">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
