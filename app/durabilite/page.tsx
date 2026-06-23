import type { Metadata } from "next";
import { ContentPageHero } from "../components/content-page-hero";
import SustainabilitySection from "../components/sustainability-section";
import { HeroFooter } from "../components/hero-footer";

export const metadata: Metadata = {
  title: "Durabilité | CAP Congo",
  description:
    "Rapport durabilité CAP Congo — agriculture responsable, impact social positif et gestion attentive des ressources naturelles.",
};

export default function DurabilitePage() {
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-background font-sans text-foreground selection:bg-cap-yellow/40">
      <main className="w-full min-w-0">
        <ContentPageHero
          title="Durabilité"
          subtitle="Des choix responsables pour notre territoire — documenter, agir et préserver."
        />
        <SustainabilitySection />
      </main>
      <HeroFooter />
    </div>
  );
}
