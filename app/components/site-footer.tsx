import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-cap-green/20 bg-cap-green/10 text-foreground pt-16 pb-8 px-8 flex flex-col items-center text-center"
    >
      <h2 className="font-unbounded text-xl md:text-2xl font-semibold tracking-wide uppercase mb-4 text-cap-dark">
        Contact
      </h2>
      <div className="mb-10 space-y-2 font-sora text-cap-grey">
        <p>
          <span className="text-cap-dark-green/90 text-sm uppercase tracking-wider">
            Téléphone
          </span>
          <br />
          <a
            href="tel:+243895532443"
            className="text-lg text-cap-dark hover:text-cap-green transition-colors"
          >
            0895 532 443
          </a>
        </p>
        <p>
          <span className="text-cap-dark-green/90 text-sm uppercase tracking-wider">
            E-mail
          </span>
          <br />
          <a
            href="mailto:marketing.capcongo2022@gmail.com"
            className="text-lg break-all text-cap-dark hover:text-cap-green transition-colors"
          >
            marketing.capcongo2022@gmail.com
          </a>
        </p>
      </div>

      <h3 className="text-sm font-unbounded uppercase tracking-widest text-cap-dark-green mb-6">
        Réseaux sociaux
      </h3>

      <div className="flex space-x-6 mb-12">
        <a
          href="#"
          className="p-3 border border-cap-dark/15 rounded-full text-cap-dark hover:bg-cap-yellow hover:border-cap-yellow hover:text-cap-dark transition"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a
          href="#"
          className="p-3 border border-cap-dark/15 rounded-full text-cap-dark hover:bg-cap-yellow hover:border-cap-yellow hover:text-cap-dark transition"
          aria-label="Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" />
          </svg>
        </a>
        <a
          href="#"
          className="p-3 border border-cap-dark/15 rounded-full text-cap-dark hover:bg-cap-yellow hover:border-cap-yellow hover:text-cap-dark transition"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-sm uppercase tracking-widest text-cap-grey mb-12">
        <Link href="#hero" className="hover:text-cap-dark-green transition">
          Accueil
        </Link>
        <Link href="#about" className="hover:text-cap-dark-green transition">
          À propos
        </Link>
        <Link href="#sustainability" className="hover:text-cap-dark-green transition">
          Durabilité
        </Link>
        <Link href="#careers" className="hover:text-cap-dark-green transition">
          Carrières
        </Link>
        <Link href="#contact" className="hover:text-cap-dark-green transition">
          Contact
        </Link>
      </div>

      <p className="text-xs tracking-widest text-cap-grey uppercase">
        © {new Date().getFullYear()} CAP Congo ·{" "}
        <Link href="/privacy" className="underline hover:text-cap-dark-green">
          Confidentialité
        </Link>
      </p>
    </footer>
  );
}
