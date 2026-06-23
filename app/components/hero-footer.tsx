"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Mail,
  Phone,
} from "lucide-react";

const PHONE_DISPLAY = "0895 532 443";
const PHONE_HREF = "tel:+243895532443";
const EMAIL = "marketing.capcongo2022@gmail.com";

/** Circular emblem (`public/images/logos/Asset 11@4x.png`). */
const FOOTER_MARK_SRC = "/images/logos/Asset%2011@4x.png";

export function HeroFooter() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  };

  return (
    <section className="bg-background pt-24 font-sans md:pt-32">
      <div className="mx-auto w-[min(100%,80rem)] px-6">
        <div className="relative z-10 -mb-20 md:-mb-24">
          <div className="group relative h-[min(22rem,70vw)] overflow-hidden rounded-2xl shadow-[0_24px_60px_-12px_rgba(29,29,27,0.25)] md:h-96">
            <Image
              src="/images/mais.webp"
              alt="Champs — CAP Congo"
              fill
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1280px) 100vw, 80rem"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cap-forest/85 via-cap-dark-green/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24">
              <h2 className="mb-6 max-w-2xl font-unbounded text-3xl font-bold leading-tight tracking-tight text-background md:text-5xl lg:text-6xl">
                Produire local, nourrir durablement.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6">
        <div className="rounded-t-3xl bg-cap-ink pb-16 pt-36 text-background md:px-12 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-14">
              <div className="space-y-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <Link
                    href="/"
                    className="group relative shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cap-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-cap-ink rounded-full"
                    aria-label="CAP Congo — accueil"
                  >
                    <span className="block rounded-full bg-background p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-2 ring-cap-green/35 transition group-hover:ring-cap-yellow/60">
                      <span className="relative block size-[6.5rem] sm:size-28 md:size-32">
                        <Image
                          src={FOOTER_MARK_SRC}
                          alt="CAP CONGO SARL"
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </span>
                    </span>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="font-unbounded text-xs font-semibold uppercase tracking-[0.2em] text-cap-green">
                      CAP Congo
                    </p>
                    <p className="mt-2 font-unbounded text-2xl font-bold uppercase tracking-tight text-background md:text-3xl">
                      CAP CONGO <span className="text-cap-yellow">SARL</span>
                    </p>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-background/65">
                      Qualité, traçabilité et performance sur toute la chaîne de valeur agricole.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 font-unbounded text-[11px] font-semibold uppercase tracking-[0.25em] text-cap-green/90">
                    Réseaux sociaux
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#"
                      className="flex size-11 items-center justify-center rounded-full border border-background/20 text-background transition hover:border-cap-yellow hover:bg-cap-yellow hover:text-cap-dark"
                      aria-label="Instagram"
                    >
                      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="flex size-11 items-center justify-center rounded-full border border-background/20 text-background transition hover:border-cap-yellow hover:bg-cap-yellow hover:text-cap-dark"
                      aria-label="Facebook"
                    >
                      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="flex size-11 items-center justify-center rounded-full border border-background/20 text-background transition hover:border-cap-yellow hover:bg-cap-yellow hover:text-cap-dark"
                      aria-label="LinkedIn"
                    >
                      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:pl-8 lg:text-right" id="contact">
                <h3 className="font-unbounded text-lg font-semibold text-background md:text-xl">
                  Contact
                </h3>
                <div className="space-y-6 text-background/80">
                  <p>
                    <span className="block font-unbounded text-[10px] font-semibold uppercase tracking-wider text-cap-green">
                      Téléphone
                    </span>
                    <a
                      href={PHONE_HREF}
                      className="mt-1 inline-flex items-center gap-2 text-lg font-medium text-background transition hover:text-cap-yellow"
                    >
                      <Phone className="size-4 shrink-0 opacity-80" aria-hidden />
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                  <p>
                    <span className="block font-unbounded text-[10px] font-semibold uppercase tracking-wider text-cap-green">
                      E-mail
                    </span>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 inline-flex items-start gap-2 break-all text-left text-lg font-medium text-background transition hover:text-cap-yellow lg:text-right"
                    >
                      <Mail className="mt-1 size-4 shrink-0 opacity-80" aria-hidden />
                      {EMAIL}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <nav className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-background/15 py-10 text-sm font-medium text-background/70 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-10 lg:gap-y-2">
              <Link href="#hero" className="hover:text-cap-yellow">
                Accueil
              </Link>
              <Link href="#about" className="hover:text-cap-yellow">
                À propos
              </Link>
              <Link href="/durabilite" className="hover:text-cap-yellow">
                Durabilité
              </Link>
              <Link href="/social" className="hover:text-cap-yellow">
                Social
              </Link>
              <Link href="#partnerships" className="hover:text-cap-yellow">
                Partenariats
              </Link>
              <Link href="#careers" className="hover:text-cap-yellow">
                Carrières
              </Link>
              <Link href="#contact" className="hover:text-cap-yellow">
                Contact
              </Link>
            </nav>

            <div className="flex flex-col items-center justify-between gap-6 border-t border-background/15 py-8 md:flex-row">
              <span className="text-center font-unbounded text-sm font-semibold text-background/90 md:text-left">
                © {new Date().getFullYear()} CAP Congo SARL
              </span>
              <button
                type="button"
                onClick={scrollTop}
                className="flex items-center gap-2 text-sm text-background/55 transition hover:text-background"
              >
                Haut de page
                <span className="flex size-10 items-center justify-center rounded-full bg-cap-green text-background transition hover:bg-cap-yellow hover:text-cap-dark">
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
