import type { Metadata } from "next";
import HeroSection from "./components/hero-section";
import AboutSection from "./components/about-section";
import { HeroFooter } from "./components/hero-footer";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Produire local, nourrir durablement`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function CAPCongoLanding() {
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-background text-foreground font-sans selection:bg-cap-yellow/40">
      <main className="w-full min-w-0">
        <HeroSection />
        <AboutSection />
      </main>
      <HeroFooter/>
    </div>
  );
}
