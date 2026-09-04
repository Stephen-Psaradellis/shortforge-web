import { SITE } from '@/content/site';
import { aiAddons, packages } from '@/content/websites';

const dollars = (s: string) => Number(s.replace(/[^0-9]/g, ''));

export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: '+1-224-715-3678',
    description: SITE.description,
    image: `${SITE.url}/opengraph-image`,
    founder: { '@type': 'Person', name: SITE.owner },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Arlington Heights',
      addressRegion: 'IL',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'Place', name: 'Chicago metropolitan area' },
      { '@type': 'Country', name: 'United States' },
    ],
    priceRange: '$750 - $4,000',
    makesOffer: [
      ...packages.map((p) => ({
        '@type': 'Offer',
        name: `${p.name} website`,
        description: p.tagline,
        price: dollars(p.standard),
        priceCurrency: 'USD',
        url: `${SITE.url}/websites#pricing`,
      })),
      {
        '@type': 'Offer',
        name: 'AI phone agent',
        description: 'Setup, script, and first month',
        price: dollars(aiAddons[0][1]),
        priceCurrency: 'USD',
        url: `${SITE.url}/automation`,
      },
    ],
  };
}
