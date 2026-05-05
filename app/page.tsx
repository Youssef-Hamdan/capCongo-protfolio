import HeroSection from "./components/hero-section";
import AboutSection from "./components/about-section";
import SustainabilitySection from "./components/sustainability-section";
import PartnershipsSection from "./components/partnerships-section";
import CareersSection from "./components/careers-section";
import BrandSloganSection from "./components/brand-slogan-section";
import { HeroFooter } from "./components/hero-footer";

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
