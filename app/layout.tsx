import type { Metadata } from "next";
import { Sora, Unbounded, Geist } from "next/font/google";
import "./globals.css";
import CapHeader from "./components/cap-header";
import { LenisRoot } from "./components/lenis-root";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500"],
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["600", "800"],
});

export const metadata: Metadata = {
  title: "CAP Congo",
  description:
    "Produire local, nourrir durablement. Engageons-nous pour nourrir le Congo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("antialiased", sora.variable, unbounded.variable, "font-sans", geist.variable)}>
      <body className="min-h-dvh flex min-w-0 flex-col overflow-x-clip font-sans text-foreground bg-background">
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