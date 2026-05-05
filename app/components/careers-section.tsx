import Image from "next/image";
import Link from "next/link";
import { CareersTalentFlow } from "./section-flow-svgs";

const CAREERS_BG =
  "https://images.squarespace-cdn.com/content/v1/6725eb8c294772482c9b072a/c8833c6c-d30b-40ed-82ab-2abc31001803/Alex22_7162.jpg";

export default function CareersSection() {
  return (
    <section
      id="careers"
      className="relative bg-background py-32 px-6 md:px-16 lg:px-24 text-center flex flex-col items-center justify-center min-h-[60vh] text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={CAREERS_BG}
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/88" />
      </div>

      <div className="relative z-10 max-w-4xl space-y-8">
        <h2 className="font-unbounded text-4xl md:text-5xl font-semibold uppercase tracking-wide text-cap-dark">
          Nos talents
        </h2>
        <h3 className="text-2xl font-light text-cap-dark-green">
          Un environnement inclusif et respectueux
        </h3>
        <CareersTalentFlow />
        <p className="text-lg leading-relaxed text-cap-grey">
          La force de CAP Congo, ce sont les femmes et les hommes qui portent
          chaque jour le projet sur le terrain. Nous cultivons la diversité, la
          sécurité et le développement des compétences.
        </p>
        <div className="pt-8 space-x-4">
          <Link
            href="#contact"
            className="bg-cap-green text-background px-10 py-4 rounded-full font-unbounded uppercase text-xs tracking-widest hover:bg-cap-dark-green transition-all duration-300 inline-block mb-4"
          >
            Carrières
          </Link>
        </div>
      </div>
    </section>
  );
}
