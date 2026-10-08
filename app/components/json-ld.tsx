import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "CAP Congo SARL",
      url: SITE_URL,
      logo: absoluteUrl("/images/logos/Asset%2011@4x.png"),
      description: SITE_DESCRIPTION,
      email: "info@cap-congo.com",
      telephone: ["+243816448888", "+243826200575"],
      address: {
        "@type": "PostalAddress",
        addressCountry: "CD",
      },
      sameAs: [
        "https://www.facebook.com/share/1Bb7HSMbX5/",
        "https://www.instagram.com/cap.congo.sarl/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "fr-CD",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

type PageJsonLdProps = {
  schema: Record<string, unknown>;
};

export function PageJsonLd({ schema }: PageJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
