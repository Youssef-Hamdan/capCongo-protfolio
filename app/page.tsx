import HeroSection from "./components/hero-section";
import AboutSection from "./components/about-section";
import { HeroFooter } from "./components/hero-footer";

export default function CAPCongoLanding() {
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full bg-background text-foreground font-sans selection:bg-cap-yellow/40">
      <main className="w-full min-w-0 max-w-full">
        <HeroSection />
        <AboutSection />
      </main>
      <HeroFooter/>
    </div>
  );
}
