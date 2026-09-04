import type { LucideIcon } from 'lucide-react';
import { Gauge, Image as ImageIcon, MapPin, Search, Send, Smartphone } from 'lucide-react';

export type Feature = { icon: LucideIcon; title: string; body: string };
export type Package = {
  name: string;
  price: string;
  vendorPrice: string;
  tagline: string;
  turnaround: string;
  features: string[];
  featured: boolean;
};
export type Faq = { q: string; a: string };
export type PriceRow = readonly [label: string, price: string];
export type Step = { n: string; title: string; body: string };
export type Stat = { value: string; label: string };

export const websitesHero = {
  eyebrow: 'Small business websites',
  title: 'Three packages. Fixed prices. You own all of it.',
  lede: 'Hand-built, fast, and set up in accounts with your name on them. Pick the size that fits, know the price before anything starts, and keep the whole thing if we ever stop working together.',
  note: 'No monthly platform bill. About $12 a year for the domain, and that is the whole running cost.',
};

// The contrast the whole business rests on. Rendered as a stat band, not prose.
export const costStats: Stat[] = [
  { value: '$12', label: 'A year to keep your site online. That is the entire bill.' },
  { value: '$200–300', label: 'A year for Squarespace or Wix, for as long as you stay.' },
  { value: '100%', label: 'Of the domain, hosting, and code registered in your name.' },
];

export const proof = {
  eyebrow: 'Recent work',
  title: 'Chicago Street Markets',
  body: "Three weekly farmers markets across Joliet, New Lenox, and Lockport, plus a full calendar of seasonal events. The old site was a single page on Squarespace. The new one is nine pages, loads in about a second, and lives entirely in the owner's own accounts.",
  facts: [
    'Nine pages, three market sites, a full event calendar',
    'Around 19 MB of photos cut to under 1 MB per page',
    'Vendor applications, contact form, and email signup',
    'Maps, hours, and season dates on every market page',
    "Domain, hosting, forms, and mailing list all in the owner's accounts",
    'Roughly $12 a year to run, down from a Squarespace plan',
  ],
  images: {
    desktop: {
      src: '/proof/csm-desktop.webp',
      alt: 'The Chicago Street Markets homepage on a laptop',
      width: 1600,
      height: 1000,
    },
    mobile: {
      src: '/proof/csm-mobile.webp',
      alt: 'The same site on a phone',
      width: 600,
      height: 1298,
    },
  },
};

// A real quote from a real client goes here, in their words, with permission.
// Left null on purpose: PullQuote renders nothing until there is one.
export const testimonial: { quote: string; name: string; role: string } | null = null;

export const included: Feature[] = [
  {
    icon: Smartphone,
    title: 'Works on a phone',
    body: 'Most of your customers will find you on a phone. The site is built for that first, not shrunk down to fit.',
  },
  {
    icon: Gauge,
    title: 'Loads fast',
    body: 'Hand-written code, no page builder underneath. Pages open in about a second, even on a weak connection.',
  },
  {
    icon: MapPin,
    title: 'Hours, location, map',
    body: 'The three things people actually came looking for, above the fold, on every device.',
  },
  {
    icon: Send,
    title: 'A contact form that works',
    body: 'Messages land in your inbox. No plugin to maintain, nothing to log into.',
  },
  {
    icon: ImageIcon,
    title: 'Your photos, done right',
    body: 'Resized and compressed so a gallery of twenty pictures does not take thirty seconds to load.',
  },
  {
    icon: Search,
    title: 'Findable on Google',
    body: 'Real page titles, descriptions, and structured data so search engines can read what you sell and when you are open.',
  },
];

export const packages: Package[] = [
  {
    name: 'One Page',
    price: '$1,200',
    vendorPrice: '$1,020',
    tagline: 'Everything on a single page.',
    turnaround: 'Ready in 2 weeks',
    features: [
      'Single page, built for phones',
      'Photo gallery',
      'Hours, location, embedded map',
      'Contact form to your inbox',
      'Links to your Instagram / Facebook',
      'Domain + hosting set up in your name',
      'Basic search-engine setup',
      '2 rounds of changes',
    ],
    featured: false,
  },
  {
    name: 'Storefront',
    price: '$2,800',
    vendorPrice: '$2,380',
    tagline: 'A real site with room to grow.',
    turnaround: 'Ready in 4–5 weeks',
    features: [
      'Everything in One Page',
      'Up to 6 pages',
      'Product, menu, or service pages',
      'Email list signup (Mailchimp)',
      'Event or seasonal schedule',
      'Visitor analytics',
      'Full search-engine setup per page',
      '3 rounds of changes',
    ],
    featured: true,
  },
  {
    name: 'Custom Build',
    price: 'from $5,000',
    vendorPrice: 'from $4,250',
    tagline: 'Selling online, or moving off something else.',
    turnaround: 'Timeline set with the scope',
    features: [
      'Everything in Storefront',
      'Online ordering (Square or Shopify)',
      'Move from Squarespace, Wix, or Etsy',
      'Old links redirected so you keep your Google ranking',
      'Custom forms and applications',
      'Help writing the words',
      'Scoped and quoted before we start',
    ],
    featured: false,
  },
];

export const pricingLede =
  'Fixed prices, agreed before anything starts. Every build includes the first year of the care plan.';

export const vendorNote =
  'Selling at Chicago Street Markets? The vendor rate is 15% off every package.';

export const paymentNote =
  'Half up front, half when it goes live. The domain name (about $12 a year) is bought on your own card so it stays yours.';

export const ongoing = [
  {
    name: 'Care plan',
    price: '$45/mo',
    body: 'Hosting, domain, and certificate watched. Up to 30 minutes of edits a month, rolling up to 90. Backups, and you go to the front of the line when something breaks.',
    featured: true,
  },
  {
    name: 'Season change',
    price: '$250',
    body: 'Twice a year I swap your hours, dates, menu, and photos for the new season. If the site only changes when the season does, this is all you need.',
    featured: false,
  },
  {
    name: 'On your own',
    price: '$0',
    body: 'I hand you every login and you never hear from me again. Your site, your accounts, no strings.',
    featured: false,
  },
];

export const ongoingLede =
  'The first year of the care plan comes with every build. After that, three ways to go, and nothing renews on its own.';
export const ongoingNote =
  'Anything outside those is $110 an hour, half-hour minimum, quoted before I start.';

export const addons: PriceRow[] = [
  ['Extra page', '$250'],
  ['Move off Squarespace / Wix / Etsy, with redirects', '$400'],
  ['Email list setup + first newsletter template', '$300'],
  ['Online ordering (Square or Shopify) added', '$450'],
  ['Flyer / poster set, three web-ready sizes', '$150'],
  ['Cleaning up and optimizing photos you send', '$150'],
  ['Rush: finished in under two weeks', '+30%'],
];

export const aiAddons: PriceRow[] = [
  ['AI phone agent: setup and first month', '$1,200'],
  ['AI phone agent: ongoing', '$150/mo'],
  ['Bookings or orders wired into your calendar or POS', 'from $600'],
];

export const aiBox = {
  eyebrow: 'If you take orders by phone',
  title: 'An AI agent that answers for you',
  body: [
    "This is the other half of what I do. A voice agent picks up when you can't, answers the questions you get asked forty times a week, takes an order or a booking, and puts it straight on your calendar.",
    'Worth it if you cater, take custom orders, or lose calls while your hands are full.',
  ],
  link: { label: 'How the automation work is scoped', href: '/automation' },
};

export const steps: Step[] = [
  {
    n: '1',
    title: 'We talk for twenty minutes',
    body: 'Usually a phone call. What you sell, who buys it, what you want the site to do. I tell you which package fits and what it costs. No charge, no pitch deck.',
  },
  {
    n: '2',
    title: 'You send me your stuff',
    body: 'Logo, photos, hours, addresses, social links. One form, one time. If you do not have good photos I will tell you honestly.',
  },
  {
    n: '3',
    title: 'I build it and you look at it',
    body: 'You get a private link before anything is public. You tell me what to change. That is what the rounds of changes are for.',
  },
  {
    n: '4',
    title: 'It goes live in your name',
    body: 'The domain and the hosting get set up in accounts that belong to you, with your email and your credit card. I walk you through it and then hand over the keys.',
  },
];

export const oneThing = {
  title: 'One thing I ask.',
  body: 'Photos and copy are due within two weeks of starting. If a project goes quiet for a month it gets paused, and restarting is $250. It is the single thing that decides whether a site takes three weeks or three months.',
};

export const faqs: Faq[] = [
  {
    q: 'What does it cost to keep the site online?',
    a: 'About $12 a year for the domain name. That is the whole bill. The hosting I use is free at the size a small business needs, and I set it up on your own account so it stays free whether or not you keep working with me.',
  },
  {
    q: 'Do I own it?',
    a: 'Yes, all of it: the domain, the hosting account, the code, the photos. Everything is registered in your name with your email on it. If you ever want to hire someone else, you hand them the logins and nothing breaks.',
  },
  {
    q: 'I already have a Squarespace or Wix site.',
    a: 'Then you are paying somewhere around $200 to $300 a year for something you cannot take with you. Moving it over is $400 on top of the package, and that includes pointing your old links at the new pages so you do not lose your place on Google.',
  },
  {
    q: 'How long does it really take?',
    a: 'Two weeks for a one-page site, four to five for a bigger one, counting from when you send me your photos and copy, not from when we first talk. Almost every project that runs late runs late because the pictures never showed up.',
  },
  {
    q: 'What if I need something changed later?',
    a: 'The first year of the care plan is included, so small edits are covered from the start. After that it is $45 a month to keep it, or $110 an hour with a half-hour minimum if you would rather pay as you go.',
  },
  {
    q: 'Who actually does the work?',
    a: 'I do. There is no agency behind this and nothing gets handed to a subcontractor. You have my cell number.',
  },
];

export const comparison = {
  lede: 'Squarespace and Wix are fine tools and plenty of good businesses run on them. Here is the honest difference.',
  headers: ['A site I build', 'Squarespace / Wix'] as [string, string],
  rows: [
    ['About $12 a year', 'Roughly $200–$300 a year, forever'],
    ['You own the domain and the hosting', 'You rent a page inside their system'],
    ['Built by hand for your business', 'A template a thousand others also use'],
    ['Loads in about a second', 'Slower, with a lot of code you did not ask for'],
    ['You can hand it to anyone', 'Hard to move without rebuilding'],
    ['A person who answers the phone', 'A support queue'],
  ] as PriceRow[],
  note: 'If you need to redesign your own pages every week without calling anyone, a builder is genuinely the better choice. Most small businesses change their site twice a year.',
};

export const websitesCta = {
  title: 'Ready when you are.',
  body: "Tell me what you sell and I'll tell you which package fits and what it costs. Fixed price, agreed before anything starts.",
};
