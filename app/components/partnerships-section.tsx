import Image from "next/image";
import Link from "next/link";
import { PartnershipStakeholderFlow } from "./section-flow-svgs";

const PARTNERSHIPS_BG =
  "https://images.squarespace-cdn.com/content/v1/6725eb8c294772482c9b072a/0dd3a6b3-ed84-4b96-be97-a0832e3b377b/falcon.jpg";

export default function PartnershipsSection() {
  return (
    <section
      id="partnerships"
      className="relative bg-background py-32 px-6 md:px-16 lg:px-24 text-center flex flex-col items-center justify-center min-h-[60vh] text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={PARTNERSHIPS_BG}
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/88" />
      </div>

      <div className="relative z-10 max-w-4xl space-y-8">
        <h2 className="font-unbounded text-4xl md:text-5xl font-semibold uppercase tracking-wide text-cap-dark">
          Partenariats
        </h2>
        <h3 className="text-2xl font-light text-cap-dark-green">
          Agir avec les acteurs du territoire
        </h3>
        <PartnershipStakeholderFlow />
        <p className="text-lg leading-relaxed text-cap-grey">
          Nous construisons des alliances durables avec les institutions, les
          producteurs et les communautés pour renforcer les filières locales et
          la résilience alimentaire.
        </p>
        <blockquote className="text-2xl md:text-3xl italic font-sora font-light pt-6 text-cap-dark/90">
          « Ensemble, produisons local et nourrissons durablement. »
        </blockquote>
        <div className="pt-8">
          <Link
            href="#contact"
            className="border-2 border-cap-dark-green text-cap-dark-green px-10 py-4 rounded-full font-unbounded uppercase text-xs tracking-widest hover:bg-cap-green hover:border-cap-green hover:text-background transition-all duration-300 inline-block"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  );
}
