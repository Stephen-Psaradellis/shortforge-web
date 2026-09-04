import { faqs, packages, proof, steps } from './websites';
import { values } from './about';

export const homeHero = {
  eyebrow: 'Websites and automation for small businesses',
  title: 'A website you own, built by hand.',
  lede: "I'm Stephen Psaradellis, a software engineer in the Chicago suburbs. I build fast, simple websites that live in your own accounts and cost about $12 a year to keep online. When a phone that never stops ringing is the real problem, I build the automation for that too. Only where it pays.",
  primary: { label: 'Book a 20-minute call', href: '/contact' },
  secondary: { label: 'See pricing', href: '/websites#pricing' },
  recent: { label: 'Most recently:', name: 'chicagostreetmarkets.com', href: '/work/chicago-street-markets' },
};

export const homeProof = {
  eyebrow: proof.eyebrow,
  title: proof.title,
  body: proof.body,
  facts: [
    'Nine pages, three markets, a full event calendar',
    'Loads in about a second, even on market wifi',
    "About $12 a year to run, entirely in the owner's accounts",
  ],
  images: proof.images,
  link: { label: 'Read how it was built', href: '/work/chicago-street-markets' },
};

export const offers = {
  eyebrow: 'Two things I do',
  title: 'Websites first. Automation when it earns its keep.',
  items: [
    {
      title: 'Small business websites',
      body: 'A site that does the three things people came for: hours, location, how to reach you. Built by hand, built for phones, and set up in accounts with your name on them.',
      bullets: [
        'One page from $750, up to six pages from $1,875',
        'Ready in two to five weeks',
        'You own the domain, the hosting, and the code',
      ],
      link: { label: 'Packages and pricing', href: '/websites' },
    },
    {
      title: 'AI and automation',
      body: 'For businesses that lose orders to a phone nobody can answer. An agent that picks up, handles the questions you get forty times a week, and puts a booking straight on your calendar.',
      bullets: [
        'AI phone agent: $1,200 setup, $150 a month',
        'Bookings or orders wired into your calendar or POS',
        'I will tell you if you do not need it',
      ],
      link: { label: 'What it does and what it costs', href: '/automation' },
    },
  ],
};

export const homeSteps = {
  eyebrow: 'How it works',
  title: 'Four steps, no pitch deck.',
  steps,
};

export const homePricing = {
  eyebrow: 'What it costs',
  title: 'Fixed prices, agreed before anything starts.',
  lede: 'Half up front, half when it goes live. The domain name is bought on your own card so it stays yours.',
  packages,
  link: { label: 'Full pricing, add-ons, and care plans', href: '/websites#pricing' },
};

export const homeAbout = {
  eyebrow: 'Who you are talking to',
  title: 'ShortForge is one engineer.',
  paragraphs: [
    "My name is Stephen Psaradellis. I've spent seven years building software that banks and large enterprises run in production: payment APIs, compliance systems, customer data platforms where being wrong is expensive.",
    "ShortForge is where I do that work for people who aren't banks. Nothing is handed to a subcontractor, and the person you talk to on the phone is the person who ships it.",
  ],
  values,
  link: { label: 'More about me', href: '/about' },
};

export const homeFaq = {
  eyebrow: 'Questions people ask',
  title: 'The short answers.',
  items: faqs.filter((f) =>
    [
      'What does it cost to keep the site online?',
      'Do I own it?',
      'How long does it really take?',
      'Who actually does the work?',
    ].includes(f.q),
  ),
  link: { label: 'All the questions', href: '/websites#faq' },
};

export const homeCta = {
  title: 'Tell me what you sell.',
  body: "Twenty minutes on the phone and I'll tell you what your site should cost, including if the answer is that you don't need one from me.",
};
