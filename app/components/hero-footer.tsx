"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Mail,
  Phone,
} from "lucide-react";

const PHONE_NUMBERS = [
  {
    label: "Agro Palm & Agricole Bandundu",
    display: "+243 816 448 888",
    href: "tel:+243816448888",
  },
  {
    label: "Pisciculture",
    display: "+243 826 200 575",
    href: "tel:+243826200575",
  },
] as const;
const EMAIL = "info@cap-congo.com";

/** Circular emblem (`public/images/logos/Asset 11@4x.png`). */
const FOOTER_MARK_SRC = "/images/logos/Asset%2011@4x.png";

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/agricole.bandundu/",
    label: "Agricole Bandundu",
    shortLabel: "Bandundu",
    accentClass: "bg-cap-yellow",
    hoverClass: "hover:bg-cap-yellow",
  },
  {
    href: "https://www.facebook.com/PiscicultureCapCongo/",
    label: "Pisciculture",
    shortLabel: "Pisciculture",
    accentClass: "bg-cap-blue",
    hoverClass: "hover:bg-cap-blue",
  },
  {
    href: "https://www.facebook.com/AGROPALM.RDC",
    label: "Agro Palm",
    shortLabel: "Agro Palm",
    accentClass: "bg-cap-green",
    hoverClass: "hover:bg-cap-green",
  },
] as const;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" />
    </svg>
  );
}

export function HeroFooter() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  };

  return (
    <section className="bg-background pt-10 font-sans md:pt-32">
      {/* Top Banner Wrapper */}
      <div className="mx-auto w-[min(100%,80rem)] px-4 sm:px-6">
        <div className="relative z-10 -mb-20 md:-mb-24">
          <div className="group relative h-[min(24rem,75vw)] overflow-hidden rounded-2xl shadow-[0_24px_60px_-12px_rgba(29,29,27,0.25)] sm:h-[22rem] md:h-96">
            <Image
              src="/images/mais.webp"
              alt="Champs — CAP Congo"
              fill
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1280px) 100vw, 80rem"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cap-forest/90 via-cap-dark-green/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-12 md:p-16 lg:p-24">
              <h2 className="max-w-2xl font-unbounded text-2xl font-bold leading-tight tracking-tight text-background sm:text-3xl md:text-5xl lg:text-6xl">
                Produire local, nourrir durablement.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Block */}
      <div className="w-full">
        <div className="rounded-t-3xl bg-cap-ink px-4 pb-12 pt-24 text-background sm:px-10 md:px-12 md:pb-16 md:pt-40">
          <div className="mx-auto max-w-7xl">
            
            {/* Split Content: Branding vs Contact */}
            <div className="grid grid-cols-1 gap-12 border-b border-background/15 pb-12 lg:grid-cols-2 lg:gap-16">
              
              {/* Left Column: Brand Identifiers */}
              <div className="space-y-10">
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-8">
                  <Link
                    href="/"
                    className="group relative shrink-0 w-fit outline-none focus-visible:ring-2 focus-visible:ring-cap-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-cap-ink rounded-full"
                    aria-label="CAP Congo — accueil"
                  >
                    <span className="block rounded-full bg-background p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-2 ring-cap-green/35 transition group-hover:ring-cap-yellow/60">
                      <span className="relative block size-20 sm:size-24 md:size-28 lg:size-32">
                        <Image
                          src={FOOTER_MARK_SRC}
                          alt="CAP CONGO SARL"
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 80px, 128px"
                        />
                      </span>
                    </span>
                  </Link>
                  
                  <div className="min-w-0 flex-1">
                    <p className="font-unbounded text-[10px] font-semibold uppercase tracking-[0.2em] text-cap-green sm:text-xs">
                      CAP Congo
                    </p>
                    <p className="mt-1.5 font-unbounded text-xl font-bold uppercase tracking-tight text-background sm:text-2xl md:text-3xl">
                      CAP CONGO <span className="text-cap-yellow">SARL</span>
                    </p>
                    <p className="mt-3.5 max-w-md text-sm leading-relaxed text-background/65">
                      Qualité, traçabilité et performance sur toute la chaîne de valeur agricole.
                    </p>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="space-y-3">
                  <h4 className="font-unbounded text-[11px] font-semibold uppercase tracking-[0.25em] text-cap-green/90">
                    Réseaux sociaux
                  </h4>
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-2.5 rounded-full border border-background/20 bg-background/5 py-1.5 pl-1.5 pr-3.5 text-background transition hover:border-transparent hover:text-cap-dark ${social.hoverClass}`}
                        aria-label={`Facebook — ${social.label}`}
                      >
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-cap-dark ${social.accentClass}`}
                          aria-hidden
                        >
                          <FacebookIcon className="size-3.5" />
                        </span>
                        <span className="font-unbounded text-[10px] font-semibold uppercase tracking-[0.12em]">
                          {social.shortLabel}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Details */}
              <div className="space-y-6 lg:pl-8 lg:text-right" id="contact">
                <h3 className="font-unbounded text-lg font-semibold text-background md:text-xl">
                  Contact
                </h3>
                <div className="space-y-6 text-background/80">
                  <div>
                    <span className="block font-unbounded text-[10px] font-semibold uppercase tracking-wider text-cap-green">
                      Téléphone
                    </span>
                    <div className="mt-2 space-y-3">
                      {PHONE_NUMBERS.map((phone) => (
                        <div key={phone.href} className="lg:text-right">
                          <p className="text-xs text-background/55">{phone.label}</p>
                          <a
                            href={phone.href}
                            className="mt-0.5 inline-flex items-center gap-2 text-lg font-medium text-background transition hover:text-cap-yellow"
                          >
                            <Phone className="size-4 shrink-0 opacity-80" aria-hidden />
                            {phone.display}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block font-unbounded text-[10px] font-semibold uppercase tracking-wider text-cap-green">
                      E-mail
                    </span>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 inline-flex items-center gap-2 break-all text-left text-lg font-medium text-background transition hover:text-cap-yellow lg:justify-end lg:text-right"
                    >
                      <Mail className="size-4 shrink-0 opacity-80" aria-hidden />
                      {EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Copy + Utility Scroll Action */}
            <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
              <span className="text-center font-unbounded text-xs font-semibold text-background/80 sm:text-sm md:text-left">
                © {new Date().getFullYear()} CAP Congo SARL
              </span>
              
              <button
                type="button"
                onClick={scrollTop}
                className="group flex items-center gap-2 text-sm text-background/60 transition hover:text-background"
              >
                Haut de page
                <span className="flex size-10 items-center justify-center rounded-full bg-cap-green text-background transition group-hover:bg-cap-yellow group-hover:text-cap-dark">
                  <ArrowUp className="size-5" strokeWidth={2} aria-hidden />
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}