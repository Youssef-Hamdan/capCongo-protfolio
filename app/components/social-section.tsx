import Image from "next/image";
import Link from "next/link";
import { PartnershipStakeholderFlow } from "./section-flow-svgs";

const SOCIAL_BG =
  "https://images.squarespace-cdn.com/content/v1/6725eb8c294772482c9b072a/0dd3a6b3-ed84-4b96-be97-a0832e3b377b/falcon.jpg";

export default function SocialSection() {
  return (
    <section
      id="societe"
      className="relative flex min-h-[60vh] flex-col items-center justify-center bg-background px-6 py-24 text-center text-foreground md:px-16 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={SOCIAL_BG}
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/88" />
      </div>

      <div className="relative z-10 max-w-4xl space-y-8">
        <h2 className="font-unbounded text-4xl font-semibold uppercase tracking-wide text-cap-dark md:text-5xl">
          Engagement social
        </h2>
        <h2 className="text-2xl font-light text-cap-dark-green">
          Au service des communautés et du territoire
        </h2>
        <PartnershipStakeholderFlow />
        <p className="text-lg leading-relaxed text-cap-grey">
          CAP Congo place l&apos;humain au cœur de son modèle : sécurité
          alimentaire, emplois durables et valorisation des ressources locales
          au profit des populations riveraines. Nous agissons aux côtés des
          institutions, des producteurs et des communautés pour renforcer les
          filières et l&apos;autonomie des territoires.
        </p>
        <div className="pt-6">
          <Link
            href="/#contact"
            className="inline-block rounded-full bg-cap-green px-10 py-4 font-unbounded text-xs uppercase tracking-widest text-background transition-colors hover:bg-cap-dark-green"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
