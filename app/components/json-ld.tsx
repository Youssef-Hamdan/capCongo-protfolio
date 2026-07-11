import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
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
    "https://www.facebook.com/agricole.bandundu/",
    "https://www.facebook.com/PiscicultureCapCongo/",
    "https://www.facebook.com/AGROPALM.RDC",
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}
