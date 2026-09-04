import { proof } from './websites';

export const caseStudy = {
  slug: 'chicago-street-markets',
  eyebrow: 'Case study',
  client: 'Chicago Street Markets',
  url: 'https://www.chicagostreetmarkets.com/',
  summary:
    "Three weekly farmers markets across Joliet, New Lenox, and Lockport, plus a season of special events. A one-page Squarespace site became a nine-page site that loads in about a second and runs for about $12 a year in the owner's own accounts.",
  meta: [
    { label: 'Package', value: 'Storefront, plus a move off Squarespace' },
    { label: 'Pages', value: 'Nine' },
    { label: 'Running cost', value: 'About $12 a year' },
    { label: 'Built', value: '2026' },
  ],
  images: proof.images,
  before: {
    title: 'What was there before',
    items: [
      'One page on Squarespace at a couple of hundred dollars a year',
      'Hours and locations for three markets buried in a paragraph',
      'Around 19 MB of photos on a single page, slow on a phone at the market',
      'Vendor applications handled over email and paper',
      'No mailing list, no event calendar, and no way for one market to show up on its own on Google',
    ],
  },
  built: {
    title: 'What was built',
    items: [
      'A page per market with hours, location, map, and season dates above the fold',
      'A full event calendar for the season',
      "A vendor application form that lands in the owner's inbox",
      'Email signup wired to the mailing list',
      'Photos resized and compressed to under 1 MB per page',
      'Page titles, descriptions, and structured data so each market is findable on its own',
      'Old Squarespace links redirected so nothing already shared breaks',
    ],
  },
  facts: [
    ['9', 'pages, three of them market pages'],
    ['~1s', 'to load, even on market wifi'],
    ['<1 MB', 'of photos per page, down from 19'],
    ['$12/yr', 'to keep online'],
  ] as const,
  running: {
    title: 'What it costs to run',
    body: "The domain is about $12 a year. Hosting is free at this size. The forms, the mailing list, and the calendar sit on free tiers. All of it is registered in the owner's name, so if the owner ever wants someone else to work on it, the logins get handed over and nothing breaks.",
  },
  cta: {
    title: 'Want one like it?',
    body: 'Twenty minutes on the phone and I will tell you which package fits and what it costs.',
  },
};
