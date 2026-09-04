export const SITE = {
  name: 'ShortForge',
  tagline: 'Websites and automation for small businesses',
  description:
    'Hand-built websites you own outright, and automation only where it pays. Stephen Psaradellis, a software engineer in the Chicago area. Sites from $750, about $12 a year to keep online.',
  url: 'https://shortforge.dev',
  owner: 'Stephen Psaradellis',
  email: 's.n.psaradellis@gmail.com',
  phone: '224-715-3678',
  phoneHref: 'tel:+12247153678',
  location: 'Arlington Heights, IL',
  areaServed: 'Chicago area. Remote is fine.',
  proofUrl: 'https://www.chicagostreetmarkets.com/',
  proofName: 'chicagostreetmarkets.com',
  leafletPdf: '/shortforge-websites.pdf',
  nav: [
    { label: 'Websites', href: '/websites' },
    { label: 'Automation', href: '/automation' },
    { label: 'Work', href: '/work/chicago-street-markets' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Book a 20-minute call', href: '/contact' },
} as const;

export type NavItem = (typeof SITE.nav)[number];

export const mailto = (subject: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
