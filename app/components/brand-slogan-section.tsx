export default function BrandSloganSection() {
  return (
    <section className="bg-cap-green/15 text-foreground py-24 px-6 text-center border-y border-cap-green/25">
      <div className="max-w-4xl mx-auto space-y-8">
        <p className="font-unbounded text-sm uppercase tracking-[0.2em] text-cap-dark-green">
          CAP Congo
        </p>
        <h2 className="text-2xl md:text-4xl font-light leading-relaxed font-sora text-foreground">
          Produire local, nourrir durablement.{" "}
          <span className="font-medium text-cap-dark-green">
            Engageons-nous pour nourrir le Congo.
          </span>
        </h2>
      </div>
    </section>
  );
}
