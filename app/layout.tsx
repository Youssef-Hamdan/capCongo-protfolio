import type { Metadata } from "next";
import { Sora, Unbounded, Geist } from "next/font/google";
import "./globals.css";
import CapHeader from "./components/cap-header";
import { JsonLd } from "./components/json-ld";
import { LenisRoot } from "./components/lenis-root";
import { cn } from "@/lib/utils";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/seo";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700"],
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "CAP Congo",
    "agriculture RDC",
    "agro-industrie Congo",
    "huile de palme RDC",
    "pisciculture Congo",
    "sécurité alimentaire",
    "développement durable",
    "Bandundu",
    "Kisangani",
  ],
  authors: [{ name: "CAP Congo SARL" }],
  creator: "CAP Congo SARL",
  publisher: "CAP Congo SARL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_CD",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        alt: "CAP Congo — logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  category: "agriculture",
  other: {
    google: "notranslate",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      translate="no"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        sora.variable,
        unbounded.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://vod-adaptive-ak.vimeocdn.com" />
      </head>
      <body className="min-h-dvh flex min-w-0 flex-col font-sans text-foreground bg-background">
        <JsonLd />
        <LenisRoot>
          <div
            id="nav-scroll-sentinel"
            className="pointer-events-none absolute top-0 left-0 h-px w-full invisible"
            aria-hidden
          />
          <CapHeader />
          {children}
        </LenisRoot>
      </body>
    </html>
  );
}