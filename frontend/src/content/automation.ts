import type { Step } from './websites';

export const automationHero = {
  eyebrow: 'AI and automation',
  title: 'Most businesses do not need this. Here is who does.',
  lede: 'An AI phone agent, bookings that land on your calendar by themselves, the spreadsheet you retype every Monday done for you. Useful for a specific kind of business and a waste of money for the rest. I will tell you which one you are on the first call.',
};

export const whoFor = {
  title: 'Worth a conversation if',
  items: [
    'You take orders or bookings by phone and miss calls when your hands are full: caterers, bakeries, food trucks, salons, repair shops.',
    'The same ten questions come in forty times a week. Hours, do you deliver, can you do gluten free, is there parking.',
    'Somebody retypes the same information into two or three systems: orders into a spreadsheet, the spreadsheet into an invoice, the invoice into the books.',
    'You run events, markets, or classes and the schedule changes often enough that keeping the website, the mailing list, and the socials in step is a job.',
  ],
};

export const whoNot = {
  title: 'Not worth it if',
  items: [
    'You get a handful of calls a day and someone is generally around to answer them. A voicemail greeting and a good website do the job.',
    'You mainly want an AI because a competitor has one. That is not a reason, and it shows.',
    'The process you want to automate changes every week. Automate things that are boring and stable.',
    'Your budget is under about a thousand dollars. Spend it on the website and photos instead. That is where the return is.',
  ],
};

export type AutomationOffer = {
  title: string;
  body: string;
  bullets: string[];
  pricing: string;
};

export const automationOffers: AutomationOffer[] = [
  {
    title: 'AI phone agent',
    body: 'Picks up when you cannot. Answers the questions you get asked every day in your words, takes an order or a booking, and texts you a summary of what was said. Runs on a phone number you own. For the first month you listen to the recordings and we fix what it gets wrong.',
    bullets: [
      'Setup, your script, and the first month: $1,200',
      'After that, $150 a month. Cancel any time.',
      'Answers around the clock and hands off to you when it should',
    ],
    pricing: '$1,200 setup · $150/mo',
  },
  {
    title: 'Bookings and orders wired in',
    body: 'The booking or order the agent takes, or that comes in from your website, goes straight into what you already use: Google Calendar, Square, Shopify, a Google Sheet. No retyping and nothing missed.',
    bullets: [
      'From $600, quoted on what it connects to',
      'Works with the website, the phone agent, or both',
      'You own every account it plugs into',
    ],
    pricing: 'from $600',
  },
  {
    title: 'Workflow automation',
    body: 'The Monday spreadsheet, the invoice built from an order, the vendor application that has to reach three people. Small, boring automations that remove a chore instead of adding a system to manage.',
    bullets: [
      'Scoped and quoted after a call. Most are a few hundred to a couple of thousand dollars.',
      'Built on tools you already pay for wherever possible',
      'Documented so someone else could maintain it',
    ],
    pricing: 'Scoped and quoted',
  },
  {
    title: 'Small internal tools',
    body: 'When no off-the-shelf tool fits the way you work, a small one built for exactly that: a vendor roster, a stall inventory count, a dispatch board for a crew. The same engineering I do for banks, at a size that fits.',
    bullets: [
      'Fixed-price quote before anything starts',
      'Runs in your own accounts, about $12 a year like the websites',
      'Half up front, half at launch',
    ],
    pricing: 'Scoped and quoted',
  },
];

export type Scenario = {
  title: string;
  situation: string;
  solution: string;
  price: string;
};

export const scenarios: Scenario[] = [
  {
    title: 'A bakery that takes custom cake orders by phone',
    situation:
      'The owner is elbow-deep in dough and the phone rings four times an hour with "do you do gluten free" and "can I get a cake for Saturday".',
    solution:
      'An agent that answers the standing questions, takes the cake order with size, flavor, message, and pickup time, texts the owner a summary, and puts the pickup on the calendar. Hard questions get a callback instead of a guess.',
    price: '$1,200 setup, then $150 a month',
  },
  {
    title: 'A caterer with a two-week booking lead',
    situation:
      'Inquiries come in by phone, Instagram, and the website form. Half of them get answered a day late and some not at all.',
    solution:
      'One form, one phone line, one inbox. Every inquiry lands in a Google Sheet with the date, headcount, and budget, the calendar blocks the date tentatively, and a reply goes out within a minute saying when to expect a real quote.',
    price: 'From $600',
  },
  {
    title: 'A market vendor who counts stock on paper',
    situation:
      "What sold at Saturday's market gets tallied Sunday night, then typed into a spreadsheet, then into the order for next week's produce.",
    solution:
      'A phone-sized page to tap counts into at the stall. The spreadsheet fills itself in and the supplier order drafts itself on Sunday morning.',
    price: 'Scoped, typically under $1,500',
  },
];

export const howScoped: { title: string; steps: Step[] } = {
  title: 'How it gets scoped',
  steps: [
    {
      n: '1',
      title: 'A twenty-minute call',
      body: 'You describe the chore. I tell you whether automating it is worth the money and roughly what it costs. Often the answer is a cheaper fix.',
    },
    {
      n: '2',
      title: 'A one-page quote',
      body: 'What it does, what it does not do, what it costs, and what you need to give me. Fixed price. Nothing starts until you sign off.',
    },
    {
      n: '3',
      title: 'A trial month',
      body: 'For phone agents especially: it runs, you review the calls, we fix the script. You are not locked in.',
    },
    {
      n: '4',
      title: 'Handover in your name',
      body: 'Phone numbers, accounts, and API keys are yours. If you stop working with me, it keeps running.',
    },
  ],
};

export const automationFaq = [
  {
    q: 'Will customers know it is an AI?',
    a: 'Yes. It says so up front, and I will not build one that pretends otherwise. In practice people want an answer and a booking, and they get one instead of a voicemail.',
  },
  {
    q: 'What happens when it cannot answer?',
    a: 'It says someone will call back, texts you the question, and logs it. Every unanswered question in the first month becomes part of the script.',
  },
  {
    q: 'What does it run on?',
    a: 'Voice agents run on ElevenLabs. Integrations use the APIs of the tools you already have: Google, Square, Shopify, Mailchimp. Nothing custom that only I understand.',
  },
  {
    q: 'Do I need a website from you first?',
    a: 'No. It works with whatever you have. If you need both, doing them together is cheaper and cleaner.',
  },
];

export const automationCta = {
  title: 'Tell me what keeps ringing.',
  body: 'Describe the chore and I will tell you if it is worth automating. If the honest answer is a voicemail greeting and a better website, that is what you will hear.',
};
