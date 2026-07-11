import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact social",
  description:
    "Engagement communautaire de CAP Congo : hôpital à Babama, distributions alimentaires et soutien aux populations locales en RDC.",
  alternates: {
    canonical: "/social",
  },
  openGraph: {
    title: "Impact social | CAP Congo",
    description:
      "Développement communautaire : santé, alimentation et soutien matériel aux populations locales.",
    url: "/social",
  },
};

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
