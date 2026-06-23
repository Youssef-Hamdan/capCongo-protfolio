"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  type CSSProperties,
} from "react";
import { LenisContext } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { scrollToHashId } from "@/lib/hash-scroll";

const COMPANY_ITEMS: { label: string; href: string; tagline: string }[] = [
  {
    label: "AGRO PALM",
    href: "/agro-palm",
    tagline: "Palme & chaîne de valeur",
  },
  {
    label: "AGRICOLE BUNDUNDU",
    href: "/agricole-bundundu",
    tagline: "Grandes cultures & démonstration",
  },
  {
    label: "AGRO-PASTORAL",
    href: "/agro-pastoral",
    tagline: "Élevage & productions mixtes",
  },
  {
    label: "PISCICULTURE",
    href: "/pisciculture",
    tagline: "Aquaculture durable",
  },
];

const PAGE_NAV_ITEMS: { label: string; href: string }[] = [
  { label: "DURABILITÉ", href: "/durabilite" },
  { label: "SOCIAL", href: "/social" },
];



const mobileLinkClass =
  "text-cap-green text-3xl sm:text-4xl font-bold font-unbounded tracking-tight hover:text-cap-dark-green transition-colors";

const mobileContactLinkClass =
  "text-cap-grey text-3xl sm:text-4xl font-bold font-unbounded tracking-tight hover:text-cap-dark transition-colors";

/** Scroll distance (px) over which the bar background goes from transparent to full opacity. */
const SCROLL_BG_OPACITY_RANGE = 110;

function headerSurfaceStyle(t: number): CSSProperties {
  // t in [0,1]: solid white bar (light opacity at top of hero → full white when scrolled)
  const bgAlpha = 0.78 + t * 0.22;
  return {
    backgroundColor: `rgba(255, 255, 255, ${bgAlpha})`,
    borderColor: `rgba(29, 29, 27, ${0.05 + t * 0.06})`,
    boxShadow:
      t > 0.06
        ? "0 10px 40px -12px rgba(29, 29, 27, 0.12), 0 1px 0 rgba(255,255,255,0.8) inset"
        : "0 8px 32px -14px rgba(29, 29, 27, 0.08)",
    ...(t > 0.02
      ? {
          backdropFilter: `saturate(1.15) blur(${6 + t * 14}px)`,
          WebkitBackdropFilter: `saturate(1.15) blur(${6 + t * 14}px)`,
        }
      : {}),
  };
}

function getDocumentScrollY(): number {
  if (typeof document === "undefined") return 0;
  const sentinel = document.getElementById("nav-scroll-sentinel");
  if (sentinel) {
    return Math.max(0, -sentinel.getBoundingClientRect().top);
  }
  return window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
}

const SCROLL_HIDE_THRESHOLD_Y = 56;

/**
 * Horizontal wordmark (`public/images/logos/Logo Cap Congo Horizontale.png`).
 * Bump `HEADER_LOGO_REVISION` when you replace that file (cache bust).
 */
const HEADER_LOGO_REVISION = 3;
const HEADER_LOGO_SRC = `/images/logos/Logo%20Cap%20Congo%20Horizontale.png?v=${HEADER_LOGO_REVISION}`;

const DESKTOP_NAV_LINK_CLASS =
  "relative z-10 whitespace-nowrap rounded-lg px-1.5 py-1.5 font-sans text-[11px] font-medium leading-none tracking-normal text-cap-dark transition-colors sm:px-2 sm:py-1.5 lg:px-2.5 lg:text-sm hover:text-cap-green";

export default function CapHeader() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerRevealed, setHeaderRevealed] = useState(true);
  const [hoveredNavSlot, setHoveredNavSlot] = useState<number | null>(null);
  const [companiesMenuPinned, setCompaniesMenuPinned] = useState(false);
  const [companiesMenuHover, setCompaniesMenuHover] = useState(false);
  const [mobileCompaniesOpen, setMobileCompaniesOpen] = useState(false);
  const pathname = usePathname();
  const scrollRaf = useRef<number | null>(null);
  const mobileMenuOpenRef = useRef(false);
  const companiesDropdownRef = useRef<HTMLDivElement>(null);
  mobileMenuOpenRef.current = mobileMenuOpen;

  const companiesDropdownVisible = companiesMenuPinned || companiesMenuHover;

  const lenis = useContext(LenisContext)?.lenis;

  useEffect(() => {
    if (!lenis) return;
    const updateHeaderFromLenis = () => {
      if (mobileMenuOpenRef.current) {
        setHeaderRevealed(true);
        return;
      }
      const y = lenis.scroll;
      if (y < SCROLL_HIDE_THRESHOLD_Y) {
        setHeaderRevealed(true);
        return;
      }
      if (lenis.direction === 1) {
        setHeaderRevealed(false);
      } else if (lenis.direction === -1) {
        setHeaderRevealed(true);
      }
    };
    lenis.on("scroll", updateHeaderFromLenis);
    updateHeaderFromLenis();
    return () => {
      lenis.off("scroll", updateHeaderFromLenis);
    };
  }, [lenis]);

  const scrollT = Math.min(1, Math.max(0, scrollY / SCROLL_BG_OPACITY_RANGE));

  const handleHashNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    setMobileMenuOpen(false);
    if (pathname !== "/") return;
    e.preventDefault();
    const id = href.slice(1);
    scrollToHashId(id);
    window.history.replaceState(null, "", href);
  };

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      const y = getDocumentScrollY();
      setScrollY(y);
      setHeaderRevealed(true);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const scheduleRead = () => {
      if (scrollRaf.current != null) return;
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = null;
        setScrollY(getDocumentScrollY());
      });
    };
    const vv = window.visualViewport;
    scheduleRead();
    window.addEventListener("scroll", scheduleRead, { passive: true, capture: true });
    document.addEventListener("scroll", scheduleRead, { passive: true, capture: true });
    vv?.addEventListener("scroll", scheduleRead, { passive: true });
    vv?.addEventListener("resize", scheduleRead, { passive: true });
    return () => {
      window.removeEventListener("scroll", scheduleRead, { capture: true });
      document.removeEventListener("scroll", scheduleRead, { capture: true });
      vv?.removeEventListener("scroll", scheduleRead);
      vv?.removeEventListener("resize", scheduleRead);
      if (scrollRaf.current != null) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToHashId(id));
    });
  }, [pathname]);

  useEffect(() => {
    setCompaniesMenuPinned(false);
    setCompaniesMenuHover(false);
    setMobileCompaniesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!companiesMenuPinned) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = companiesDropdownRef.current;
      if (el && !el.contains(e.target as Node)) setCompaniesMenuPinned(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCompaniesMenuPinned(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [companiesMenuPinned]);

  const headerTransformStyle: CSSProperties = {
    transform: headerRevealed ? "translateY(0)" : "translateY(-120%)",
    transition:
      "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease-out, border-color 0.4s ease-out, box-shadow 0.4s ease-out",
  };

  return (
    <header
      data-sticky-header
      className="fixed left-0 right-0 z-50 flex justify-center px-2 sm:px-3  md:px-4 pointer-events-none"
    >
      <div
        style={{ ...headerSurfaceStyle(scrollT), ...headerTransformStyle }}
        className="pointer-events-auto flex w-full mt-4 max-w-[min(100%,90rem)] flex-nowrap items-center  rounded-[1.25rem] border sm:rounded-[1.5rem] md:rounded-[2rem] px-2.5  sm:px-4  md:px-5 lg:px-6  will-change-transform"
      >
        {/* Left: menu + logo — flex-1 balances the right side so nav stays centered in the bar */}
        <div className="relative z-[60] flex min-w-0 flex-1 items-center justify-start gap-2 sm:gap-2.5">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cap-dark/[0.06] text-cap-dark outline-none transition-colors hover:bg-cap-dark/10 focus-visible:ring-2 focus-visible:ring-cap-yellow md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X className="size-5" strokeWidth={2} aria-hidden />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Menu className="size-5" strokeWidth={2} aria-hidden />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          
          <Link
            href="/"
            aria-label="CAP Congo — accueil"
            className="relative -ml-1 shrink-0 outline-none transition-opacity hover:opacity-90 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-cap-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", "/");
              }
            }}
          >
            <span className="relative block h-14 w-[16rem] overflow-visible sm:h-16 sm:w-[19rem] md:h-16 md:w-[20rem] lg:h-[4.75rem] lg:w-[24rem] xl:h-[5rem] xl:w-[26rem]">
              <Image
                src={HEADER_LOGO_SRC}
                alt=""
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 304px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 416px"
                priority
                unoptimized
              />
            </span>
          </Link>
        </div>

        {/* Desktop Navigation — center cluster */}
        <nav className="pointer-events-auto relative z-[70] hidden shrink-0 items-center justify-center md:flex" aria-label="Principal">
          <div className="flex flex-nowrap items-center justify-center gap-0.5 lg:gap-1">
            {/* Home */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredNavSlot(0)}
              onMouseLeave={() => setHoveredNavSlot(null)}
            >
              {hoveredNavSlot === 0 && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 z-0 rounded-lg bg-cap-dark/[0.05]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Link
                href="/"
                className={DESKTOP_NAV_LINK_CLASS}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setCompaniesMenuPinned(false);
                  if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    window.history.replaceState(null, "", "/");
                  }
                }}
              >
                HOME
              </Link>
            </div>

            {/* Companies dropdown */}
            <div
              ref={companiesDropdownRef}
              className="relative"
              onMouseEnter={() => {
                setCompaniesMenuHover(true);
                setHoveredNavSlot(1);
              }}
              onMouseLeave={() => {
                setCompaniesMenuHover(false);
                setHoveredNavSlot(null);
              }}
            >
              <div className="relative inline-flex">
                {(hoveredNavSlot === 1 ||
                  (companiesMenuPinned && hoveredNavSlot === null)) && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 z-0 rounded-lg bg-cap-dark/[0.05]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <button
                  type="button"
                  id="header-companies-trigger"
                  aria-expanded={companiesDropdownVisible}
                  aria-haspopup="menu"
                  aria-controls="header-companies-menu"
                  className={`${DESKTOP_NAV_LINK_CLASS} relative z-10 inline-flex items-center gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-cap-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  onClick={() => setCompaniesMenuPinned((p) => !p)}
                >
                  COMPANIES
                  <ChevronDown
                    strokeWidth={2}
                    className={`size-3.5 shrink-0 transition-transform duration-200 ${companiesDropdownVisible ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
              </div>

              <AnimatePresence>
                {companiesDropdownVisible && (
                  <motion.div
                    id="header-companies-menu"
                    role="menu"
                    aria-labelledby="header-companies-trigger"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full z-[80] mt-1.5 w-[min(15.5rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-cap-dark/[0.08] bg-white/[0.98] shadow-[0_16px_40px_-16px_rgba(29,29,27,0.14)] backdrop-blur-md"
                    style={{ transformOrigin: "top center" }}
                  >
                    <div
                      className="pointer-events-none absolute left-[0.875rem] top-3 bottom-3 w-px bg-cap-dark/[0.08]"
                      aria-hidden
                    />
                    <ul className="relative py-1">
                      {COMPANY_ITEMS.map((co, i) => (
                        <li key={co.href}>
                          <Link
                            href={co.href}
                            role="menuitem"
                            className="group relative flex gap-2.5 py-2 pl-6 pr-3 outline-none transition-[background-color,color] hover:bg-cap-dark/[0.03] focus-visible:bg-cap-dark/[0.04] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cap-yellow"
                            onClick={() => setCompaniesMenuPinned(false)}
                          >
                            <span
                              className="absolute left-[0.8125rem] top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cap-dark/15 ring-2 ring-white transition-[background-color,transform] group-hover:scale-125 group-hover:bg-cap-green"
                              aria-hidden
                            />
                            <span className="w-4 shrink-0 pt-0.5 text-right font-mono text-[9px] font-medium tabular-nums text-cap-grey/70">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[11px] font-semibold tracking-[0.06em] text-cap-dark transition-colors group-hover:text-cap-green">
                                {co.label}
                              </span>
                              <span className="grid transition-[grid-template-rows,opacity] duration-200 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] grid-rows-[0fr] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                                <span className="overflow-hidden">
                                  <span className="block pt-0.5 font-sans text-[10px] leading-snug text-cap-grey">
                                    {co.tagline}
                                  </span>
                                </span>
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {PAGE_NAV_ITEMS.map((item, i) => {
              const slotIndex = 2 + i;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredNavSlot(slotIndex)}
                  onMouseLeave={() => setHoveredNavSlot(null)}
                >
                  {hoveredNavSlot === slotIndex && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 z-0 rounded-lg bg-cap-dark/[0.05]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Link
                    href={item.href}
                    className={DESKTOP_NAV_LINK_CLASS}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCompaniesMenuPinned(false);
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Desktop Socials / Utility */}
        {/* <div className={`hidden md:flex items-center ${isScrolled ? "text-cap-dark" : "text-white/90"}`}>
          <SocialLinks className={isScrolled ? "flex space-x-4 text-sm text-cap-dark/70" : "flex space-x-4 text-sm text-white/70"} />
        </div> */}

        {/* Right: utility (grey) + icons — balances logo for centered nav */}
        <div className="relative z-[60] flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-1.5 md:gap-2">
          <a
            href={pathname === "/" ? "#contact" : "/#contact"}
            onClick={(e) => handleHashNavClick(e, "#contact")}
            className="pointer-events-auto hidden shrink-0 rounded-lg px-1.5 py-1.5 font-sans text-[11px] font-normal text-cap-grey transition-colors hover:text-cap-dark sm:px-2 lg:text-sm md:inline-flex md:items-center"
          >
            Contact us
          </a>
          <div className="w-10 shrink-0 md:w-0" aria-hidden />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex h-[100svh] w-full flex-col items-center justify-center gap-4 overflow-y-auto bg-background/95 py-24 backdrop-blur-xl pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/"
                className={mobileLinkClass}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    window.history.replaceState(null, "", "/");
                  }
                }}
              >
                HOME
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <button
                type="button"
                aria-expanded={mobileCompaniesOpen}
                className="flex items-center gap-2 text-cap-green text-3xl sm:text-4xl font-bold font-unbounded tracking-tight outline-none transition-colors hover:text-cap-dark-green focus-visible:text-cap-dark-green focus-visible:ring-2 focus-visible:ring-cap-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
                onClick={() => setMobileCompaniesOpen((o) => !o)}
              >
                COMPANIES
                <ChevronDown
                  strokeWidth={2.5}
                  className={`size-8 shrink-0 transition-transform duration-300 ${mobileCompaniesOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>

              <AnimatePresence initial={false}>
                {mobileCompaniesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex w-full max-w-xs flex-col items-stretch overflow-hidden"
                  >
                    <ul className="relative mx-auto w-full border-t border-cap-dark/10 pt-1 before:absolute before:left-[0.6875rem] before:top-2 before:bottom-2 before:z-0 before:w-px before:bg-cap-dark/10 sm:before:left-[0.9375rem]">
                      {COMPANY_ITEMS.map((co, i) => (
                        <motion.li
                          key={co.href}
                          className="border-b border-cap-dark/[0.06] last:border-b-0"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.04 + i * 0.05,
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Link
                            href={co.href}
                            className="group relative flex gap-3 py-3 pl-8 pr-2 text-left transition-colors sm:pl-10 sm:pr-3"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span
                              className="absolute left-[0.6875rem] top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cap-dark/20 ring-2 ring-background transition-colors group-active:bg-cap-green sm:left-[0.9375rem]"
                              aria-hidden
                            />
                            <span className="w-5 shrink-0 text-right font-mono text-xs font-medium tabular-nums text-cap-grey">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0">
                              <span className="block font-unbounded text-lg font-bold tracking-tight text-cap-dark transition-colors group-hover:text-cap-green sm:text-xl">
                                {co.label}
                              </span>
                              <span className="mt-0.5 block font-sans text-xs leading-snug text-cap-grey sm:text-sm">
                                {co.tagline}
                              </span>
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {PAGE_NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.16 + i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  className={mobileLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.16 + PAGE_NAV_ITEMS.length * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href={pathname === "/" ? "#contact" : "/#contact"}
                className={mobileContactLinkClass}
                onClick={(e) => handleHashNavClick(e, "#contact")}
              >
                Contact us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}