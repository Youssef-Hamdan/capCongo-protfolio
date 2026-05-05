import Image from "next/image";
import { SustainabilityFlowStages } from "./section-flow-svgs";

const REPORT_COVER =
  "https://images.squarespace-cdn.com/content/v1/6725eb8c294772482c9b072a/3360b5b4-af3f-4b00-921b-d6abfca9d0a6/fy24report.jpg";

export default function SustainabilitySection() {
  return (
    <section
      id="sustainability"
      className="bg-background text-foreground py-24 px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <div className="space-y-8 max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1 text-center lg:text-left">
        <h2 className="font-unbounded text-4xl md:text-5xl font-semibold uppercase tracking-wide text-cap-dark-green">
          Rapport durabilité
        </h2>
        <h3 className="text-2xl text-cap-blue font-light">
          Des choix responsables pour notre territoire
        </h3>
        <SustainabilityFlowStages />
        <p className="text-lg leading-relaxed text-cap-grey">
          CAP Congo documente ses actions en faveur d&apos;une agriculture plus
          durable, d&apos;un impact social positif et d&apos;une gestion
          attentive des ressources naturelles.
        </p>
        <div className="pt-6">
          <a
            href="#"
            className="bg-cap-dark-green text-background px-10 py-4 rounded-full font-unbounded uppercase text-xs tracking-widest hover:bg-cap-green transition-colors inline-block"
          >
            Télécharger le rapport
          </a>
        </div>
      </div>

      <div className="relative aspect-[3/4] max-h-[600px] w-full max-w-md mx-auto overflow-hidden shadow-[0_20px_50px_-12px_rgba(29,29,27,0.18)] order-1 lg:order-2">
        <Image
          src={REPORT_COVER}
          alt="Couverture du rapport de durabilité"
          fill
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
