'use client';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  X,
  Mail,
  Phone,
  ExternalLink,
  Smartphone,
  Search,
  MapPin,
  Send,
  Image as ImageIcon,
  Gauge,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Edit these three values and the whole page follows.
// ---------------------------------------------------------------------------
const EMAIL = 's.n.psaradellis@gmail.com';
const PHONE = '224-715-3678';
const PHONE_HREF = '+12247153678';

const BODY_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const included = [
  {
    icon: Smartphone,
    title: 'Works on a phone',
    body: 'Most of your customers will find you on a phone. The site is built for that first, not shrunk down to fit.',
  },
  {
    icon: Gauge,
    title: 'Loads fast',
    body: 'Hand-written code, no page builder underneath. Pages open in about a second, even on market wifi.',
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

const packages = [
  {
    name: 'Stall',
    price: '$750',
    standard: '$875',
    tagline: 'One page, everything on it.',
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
    price: '$1,875',
    standard: '$2,200',
    tagline: 'A real site with room to grow.',
    turnaround: 'Ready in 4–5 weeks',
    features: [
      'Everything in Stall',
      'Up to 6 pages',
      'Product, menu, or service pages',
      'Email list signup (Mailchimp)',
      'Event or market schedule',
      'Visitor analytics',
      'Full search-engine setup per page',
      '3 rounds of changes',
    ],
    featured: true,
  },
  {
    name: 'Full Market',
    price: 'from $3,400',
    standard: 'from $4,000',
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

const ongoing = [
  {
    name: 'On your own',
    price: '$0',
    body: 'I hand you every login and you never hear from me again unless you want to. Your site, your accounts, no strings. This option exists on purpose.',
  },
  {
    name: 'Season change',
    price: '$250',
    body: 'Twice a year I swap your hours, dates, menu, and photos for the new season. For most market businesses this is the only thing you actually need.',
  },
  {
    name: 'Care plan',
    price: '$45/mo',
    body: 'Hosting, domain, and certificate watched. Up to 30 minutes of edits a month, rolling up to 90. Backups. You go to the front of the line.',
  },
];

const addons = [
  ['Extra page', '$250'],
  ['Move off Squarespace / Wix / Etsy, with redirects', '$400'],
  ['Email list setup + first newsletter template', '$300'],
  ['Online ordering (Square or Shopify) added', '$450'],
  ['Flyer / poster set, three web-ready sizes', '$150'],
  ['Cleaning up and optimizing photos you send', '$150'],
  ['Rush — finished in under two weeks', '+30%'],
];

const aiAddons = [
  ['AI phone agent — setup and first month', '$1,200'],
  ['AI phone agent — ongoing', '$150/mo'],
  ['Bookings or orders wired into your calendar or POS', 'from $600'],
];

const steps = [
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

const faqs = [
  {
    q: 'What does it cost to keep the site online?',
    a: 'About $12 a year for the domain name. That is the whole bill. The hosting I use is free at the size a small business needs, and I set it up on your own account so it stays free whether or not you keep working with me.',
  },
  {
    q: 'Do I own it?',
    a: 'Yes, all of it — the domain, the hosting account, the code, the photos. Everything is registered in your name with your email on it. If you ever want to hire someone else, you hand them the logins and nothing breaks.',
  },
  {
    q: 'I already have a Squarespace or Wix site.',
    a: 'Then you are paying somewhere around $200 to $300 a year for something you cannot take with you. Moving it over is $400 on top of the package, and that includes pointing your old links at the new pages so you do not lose your place on Google.',
  },
  {
    q: 'How long does it really take?',
    a: 'Two weeks for a one-page site, four to five for a bigger one — counting from when you send me your photos and copy, not from when we first talk. Almost every project that runs late runs late because the pictures never showed up.',
  },
  {
    q: 'What if I need something changed later?',
    a: 'Small edits are $110 an hour with a half-hour minimum, or free within the care plan. Most people find the $250 season change is all they need.',
  },
  {
    q: 'Who actually does the work?',
    a: 'I do. There is no agency behind this and nothing gets handed to a subcontractor. You have my cell number.',
  },
];

const comparison = [
  ['About $12 a year', 'Roughly $200–$300 a year, forever'],
  ['You own the domain and the hosting', 'You rent a page inside their system'],
  ['Built by hand for your business', 'A template a thousand others also use'],
  ['Loads in about a second', 'Slower — a lot of code you did not ask for'],
  ['You can hand it to anyone', 'Hard to move without rebuilding'],
  ['A person who answers his phone', 'A support queue'],
];

const PRINT_CSS = `
  #leaflet { display: none; }
  @media print {
    /* Hide by visibility rather than chasing which ancestor paints the app
       background: visibility:hidden drops backgrounds too. */
    body * { visibility: hidden !important; }
    nav, footer, elevenlabs-convai, #websites-root { display: none !important; }
    html, body { background: #fff !important; }
    #leaflet, #leaflet * { visibility: visible !important; }
    #leaflet {
      display: block !important;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    @page { size: Letter; margin: 0.45in 0.5in 0.4in; }
  }
`;

// ---------------------------------------------------------------------------
// Print-only leaflet. Same data as the page above, laid out to fit one sheet.
// Sizes are in pt because this is only ever rendered onto paper.
// ---------------------------------------------------------------------------
function Leaflet() {
  const H = ({ children }: { children: React.ReactNode }) => (
    <h2
      style={{
        fontSize: '9pt',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#C50000',
        margin: '0 0 5pt',
      }}
    >
      {children}
    </h2>
  );

  return (
    <div
      id="leaflet"
      style={{
        fontFamily: BODY_FONT,
        color: '#1A1A1A',
        fontSize: '8.4pt',
        lineHeight: 1.4,
      }}
    >
      {/* Masthead */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '2pt solid #1A1A1A',
          paddingBottom: '6pt',
        }}
      >
        <div>
          <div style={{ fontSize: '19pt', fontWeight: 700, lineHeight: 1.05 }}>
            A website you own, built by hand.
          </div>
          <div style={{ fontSize: '9.5pt', marginTop: '3pt', color: '#3D3A36' }}>
            Stephen Psaradellis · Websites for small businesses · Chicago
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '8pt', color: '#3D3A36' }}>
          <div style={{ fontWeight: 600, color: '#1A1A1A' }}>{EMAIL}</div>
          <div>{PHONE}</div>
          <div style={{ color: '#C50000', fontWeight: 600 }}>shortforge.dev/websites</div>
        </div>
      </div>

      <p style={{ margin: '8pt 0 10pt', fontSize: '9pt', lineHeight: 1.5 }}>
        I&apos;m a software engineer in Chicago. For seven years I&apos;ve built systems
        for global banks and, right now, one of the largest food and beverage companies
        in the country. On the side I build websites for small businesses — fast, simple,
        and yours outright. No monthly platform bill, and{' '}
        <strong>about $12 a year</strong> to keep online.
      </p>

      {/* Two columns */}
      <div style={{ display: 'flex', gap: '18pt', alignItems: 'flex-start' }}>
        {/* Left */}
        <div style={{ flex: '1.15 1 0', minWidth: 0 }}>
          <H>What every site comes with</H>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '12pt',
              rowGap: '5pt',
              marginBottom: '11pt',
            }}
          >
            {included.map((i) => (
              <div key={i.title}>
                <div style={{ fontWeight: 700 }}>{i.title}</div>
                <div style={{ color: '#3D3A36', fontSize: '7.8pt' }}>{i.body}</div>
              </div>
            ))}
          </div>

          <H>How it works</H>
          <ol style={{ margin: '0 0 11pt', paddingLeft: '13pt' }}>
            {steps.map((s) => (
              <li key={s.n} style={{ marginBottom: '3pt' }}>
                <strong>{s.title}.</strong>{' '}
                <span style={{ color: '#3D3A36' }}>{s.body}</span>
              </li>
            ))}
          </ol>

          <H>Recent work</H>
          <div style={{ display: 'flex', gap: '9pt', alignItems: 'flex-start' }}>
            <img
              src="/proof/csm-desktop.webp"
              alt="Chicago Street Markets homepage"
              style={{
                width: '150pt',
                border: '0.75pt solid #D6CFC4',
                borderRadius: '3pt',
              }}
            />
            <div style={{ color: '#3D3A36' }}>
              <strong style={{ color: '#1A1A1A' }}>chicagostreetmarkets.com</strong> —
              three weekly farmers markets in Joliet, New Lenox and Lockport. Nine pages,
              a full event calendar, vendor applications and a mailing list. Moved off a
              one-page Squarespace site; now runs for about $12 a year, entirely in the
              owner&apos;s own accounts.
            </div>
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            flex: '0.85 1 0',
            minWidth: 0,
            borderLeft: '0.75pt solid #D6CFC4',
            paddingLeft: '14pt',
          }}
        >
          <H>What it costs</H>
          {packages.map((p) => (
            <div key={p.name} style={{ marginBottom: '7pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6pt' }}>
                <span style={{ fontWeight: 700 }}>{p.name}</span>
                <span style={{ fontWeight: 700, fontSize: '10pt' }}>{p.price}</span>
              </div>
              <div style={{ color: '#3D3A36', fontSize: '7.8pt' }}>
                {p.tagline} {p.turnaround}.
              </div>
            </div>
          ))}
          <p style={{ margin: '0 0 11pt', fontSize: '7.6pt', color: '#6B655D' }}>
            Vendor rate — 15% off — for anyone selling at Chicago Street Markets. Half up
            front, half at launch.
          </p>

          <H>After it&apos;s live</H>
          <div style={{ marginBottom: '11pt' }}>
            {ongoing.map((o) => (
              <div
                key={o.name}
                style={{ display: 'flex', justifyContent: 'space-between', gap: '6pt' }}
              >
                <span>{o.name}</span>
                <span style={{ fontWeight: 700 }}>{o.price}</span>
              </div>
            ))}
            <div style={{ fontSize: '7.6pt', color: '#6B655D', marginTop: '2pt' }}>
              Anything else is $110/hr. Nothing renews on its own.
            </div>
          </div>

          <H>Add-ons</H>
          <div style={{ marginBottom: '11pt' }}>
            {[...addons.slice(0, 5), aiAddons[0]].map(([label, price]) => (
              <div
                key={label}
                style={{ display: 'flex', justifyContent: 'space-between', gap: '6pt' }}
              >
                <span style={{ color: '#3D3A36' }}>{label}</span>
                <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{price}</span>
              </div>
            ))}
          </div>

          <H>Worth knowing up front</H>
          <p style={{ margin: 0, color: '#3D3A36' }}>
            Photos and copy are due within two weeks of starting. If a project goes quiet
            for a month it gets paused, and restarting is $250 — it is the one thing that
            decides whether a site takes three weeks or three months.
          </p>
          <p style={{ margin: '5pt 0 0', color: '#3D3A36' }}>
            If a website builder is genuinely the better fit for you, I will say so on the
            first call.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '0.75pt solid #D6CFC4',
          marginTop: '10pt',
          paddingTop: '6pt',
          fontSize: '7.8pt',
          color: '#6B655D',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12pt',
        }}
      >
        <span>
          <strong style={{ color: '#1A1A1A' }}>You own all of it</strong> — the domain,
          the hosting account, the code. Registered in your name, handed over at launch.
        </span>
        <span style={{ whiteSpace: 'nowrap', fontWeight: 600, color: '#1A1A1A' }}>
          {EMAIL} · {PHONE}
        </span>
      </div>
    </div>
  );
}

export default function Websites() {
  return (
    <>
      <Head>
        <title>Small business websites in Chicagoland — Stephen Psaradellis</title>
        <meta
          name="description"
          content="Hand-built websites for small businesses in the Chicago area. You own the domain, the hosting and the code. Sites from $750, about $12 a year to keep online."
        />
        <meta property="og:title" content="Small business websites in Chicagoland" />
        <meta
          property="og:description"
          content="Hand-built websites you actually own. From $750, about $12 a year to run."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* The screen page is long on purpose; a printed leaflet has to be one
          sheet. So print swaps the whole page for #leaflet below, which is
          built from the same constants and therefore cannot drift from it.
          dangerouslySetInnerHTML, not a JSX child: React escapes entities in a
          <style> child on the server only, which trips a hydration mismatch. */}
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <Leaflet />

      <div
        id="websites-root"
        className="bg-[#FBF8F3] text-[#1A1A1A]"
        style={{ fontFamily: BODY_FONT }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-5 pt-28 pb-16 sm:px-8 lg:pt-32 lg:pb-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-ember-700">
              For small businesses
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              A website you own,
              <br />
              built by hand.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#3D3A36] sm:text-xl">
              I&apos;m Stephen — a software engineer in Chicago. For seven years I&apos;ve
              built systems for global banks and, right now, one of the largest food and
              beverage companies in the country. On the side I build websites for small
              businesses: fast, simple, and yours outright.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3D3A36]">
              No monthly platform bill. No template. About{' '}
              <strong className="font-semibold text-[#1A1A1A]">$12 a year</strong> to keep
              online.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-ember-700 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-ember-600"
              >
                See what it costs
                <ArrowRight size={18} />
              </a>
              <a
                href={`mailto:${EMAIL}?subject=Website%20for%20my%20business`}
                className="inline-flex items-center gap-2 rounded-lg border border-[#D6CFC4] bg-white px-6 py-3.5 font-semibold text-[#1A1A1A] transition-colors hover:border-[#B8AE9F] hover:bg-[#F5F0E8]"
              >
                <Mail size={18} />
                Email me
              </a>
            </div>

            <p className="mt-6 text-sm text-[#6B655D]">
              Most recently:{' '}
              <a
                href="https://www.chicagostreetmarkets.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ember-700 underline decoration-ember-700/30 underline-offset-4 hover:decoration-ember-700"
              >
                chicagostreetmarkets.com
              </a>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Proof                                                            */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-y border-[#E5DED2] bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ember-700">
              Recent work
            </p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Chicago Street Markets
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3D3A36]">
              Three weekly farmers markets across Joliet, New Lenox, and Lockport, plus a
              full calendar of seasonal events. The old site was a single page on
              Squarespace. The new one is nine pages, loads in about a second, and lives
              entirely in the owner&apos;s own accounts.
            </p>

            <div className="mt-10 grid items-center gap-8 sm:grid-cols-[2.4fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-[#E5DED2] shadow-lg">
                <Image
                  src="/proof/csm-desktop.webp"
                  alt="The Chicago Street Markets homepage on a laptop"
                  width={1600}
                  height={1000}
                  className="h-auto w-full"
                />
              </div>
              <div className="mx-auto w-full max-w-[210px] overflow-hidden rounded-[1.75rem] border-[6px] border-[#1A1A1A] shadow-xl">
                <Image
                  src="/proof/csm-mobile.webp"
                  alt="The same site on a phone"
                  width={600}
                  height={1298}
                  className="h-auto w-full"
                />
              </div>
            </div>

            <ul className="mt-10 grid gap-x-8 gap-y-3 text-[#3D3A36] sm:grid-cols-2">
              {[
                'Nine pages, three market sites, a full event calendar',
                'Around 19 MB of photos cut to under 1 MB per page',
                'Vendor applications, contact form, and email signup',
                'Maps, hours, and season dates on every market page',
                'Domain, hosting, forms, and mailing list all in her accounts',
                'Roughly $12 a year to run, down from a Squarespace plan',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check size={19} className="mt-0.5 shrink-0 text-ember-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://www.chicagostreetmarkets.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 font-semibold text-ember-700 hover:text-ember-600"
            >
              Have a look at the live site
              <ExternalLink size={17} />
            </a>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* What's included                                                  */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              What every site comes with
            </h2>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <div key={item.title}>
                  <item.icon size={24} className="text-ember-700" strokeWidth={1.75} />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#3D3A36]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Pricing                                                          */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="pricing"
          className="scroll-mt-20 border-y border-[#E5DED2] bg-white px-5 py-16 sm:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              What it costs
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3D3A36]">
              Fixed prices, agreed before anything starts. The prices in bold are the
              vendor rate — 15% off — for anyone selling at Chicago Street Markets.
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`print-keep flex flex-col rounded-2xl border p-7 ${
                    pkg.featured
                      ? 'border-ember-700 bg-[#FFFBFA] shadow-xl ring-1 ring-ember-700/20'
                      : 'border-[#E5DED2] bg-[#FBF8F3]'
                  }`}
                >
                  {pkg.featured && (
                    <span className="mb-4 inline-flex w-fit rounded-full bg-ember-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      Most pick this
                    </span>
                  )}
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <p className="mt-1.5 text-[#6B655D]">{pkg.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-2.5">
                    <span className="text-4xl font-bold tracking-tight">{pkg.price}</span>
                    <span className="text-sm text-[#8A8378] line-through">
                      {pkg.standard}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#6B655D]">{pkg.turnaround}</p>

                  <ul className="mt-7 flex-1 space-y-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[#3D3A36]">
                        <Check size={18} className="mt-0.5 shrink-0 text-ember-700" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                      `${pkg.name} website`
                    )}`}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors ${
                      pkg.featured
                        ? 'bg-ember-700 text-white hover:bg-ember-600'
                        : 'border border-[#D6CFC4] bg-white text-[#1A1A1A] hover:border-[#B8AE9F] hover:bg-[#F5F0E8]'
                    }`}
                  >
                    Start here
                    <ArrowRight size={17} />
                  </a>
                </div>
              ))}
            </div>

            <p className="mt-7 text-[#6B655D]">
              Half up front, half when it goes live. Anything under $1,000 is paid up
              front. The domain name (about $12 a year) is bought on your own card so it
              stays yours.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* After launch                                                     */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              After it&apos;s live
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3D3A36]">
              Three ways to go. Nothing renews on its own, and nothing is required.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {ongoing.map((o) => (
                <div
                  key={o.name}
                  className="rounded-2xl border border-[#E5DED2] bg-white p-6"
                >
                  <h3 className="text-lg font-semibold">{o.name}</h3>
                  <p className="mt-2 text-3xl font-bold tracking-tight">{o.price}</p>
                  <p className="mt-3 leading-relaxed text-[#3D3A36]">{o.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-7 text-[#6B655D]">
              Anything outside those is $110 an hour, half-hour minimum, quoted before I
              start.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Add-ons                                                          */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-y border-[#E5DED2] bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Add-ons
            </h2>

            <dl className="mt-10 divide-y divide-[#E5DED2] border-y border-[#E5DED2]">
              {addons.map(([label, price]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 py-3.5"
                >
                  <dt className="text-[#3D3A36]">{label}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums">{price}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-14 rounded-2xl border border-[#E5DED2] bg-[#FBF8F3] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-700">
                If you take orders by phone
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">
                An AI agent that answers for you
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-[#3D3A36]">
                This is the other half of what I do. A voice agent picks up when you
                can&apos;t, answers the questions you get asked forty times a week, takes
                an order or a booking, and puts it straight on your calendar. It is the
                same technology behind the assistant on this site — you can talk to it on
                the contact page.
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-[#3D3A36]">
                Worth it if you cater, take custom orders, or lose calls while your hands
                are full. Not worth it otherwise, and I&apos;ll say so.
              </p>

              <dl className="mt-7 divide-y divide-[#E5DED2] border-y border-[#E5DED2]">
                {aiAddons.map(([label, price]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-6 py-3.5"
                  >
                    <dt className="text-[#3D3A36]">{label}</dt>
                    <dd className="shrink-0 font-semibold tabular-nums">{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* How it works                                                     */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              How it works
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-700 font-bold text-white">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-[#3D3A36]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 max-w-2xl rounded-xl border border-[#E5DED2] bg-white p-6 leading-relaxed text-[#3D3A36]">
              <strong className="font-semibold text-[#1A1A1A]">One thing I ask.</strong>{' '}
              Photos and copy are due within two weeks of starting. If a project goes
              quiet for a month it gets paused, and restarting is $250. It is the single
              thing that decides whether a site takes three weeks or three months.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Comparison                                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-y border-[#E5DED2] bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Versus a website builder
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3D3A36]">
              Squarespace and Wix are fine tools and plenty of good businesses run on
              them. Here is the honest difference.
            </p>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-[#1A1A1A]">
                    <th className="py-3 pr-6 font-semibold">A site I build</th>
                    <th className="py-3 font-semibold text-[#6B655D]">
                      Squarespace / Wix
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([mine, theirs]) => (
                    <tr key={mine} className="border-b border-[#E5DED2]">
                      <td className="py-3.5 pr-6 align-top">
                        <span className="flex gap-2.5">
                          <Check size={18} className="mt-0.5 shrink-0 text-ember-700" />
                          <span>{mine}</span>
                        </span>
                      </td>
                      <td className="py-3.5 align-top text-[#6B655D]">
                        <span className="flex gap-2.5">
                          <X size={18} className="mt-0.5 shrink-0 text-[#B8AE9F]" />
                          <span>{theirs}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-7 max-w-2xl text-[#6B655D]">
              If you need to redesign your own pages every week without calling anyone, a
              builder is genuinely the better choice. Most small businesses change their
              site twice a year.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Questions people ask
            </h2>
            <dl className="mt-12 space-y-9">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="text-lg font-semibold">{f.q}</dt>
                  <dd className="mt-2.5 leading-relaxed text-[#3D3A36]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CTA                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="print-invert bg-forge-black px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Tell me what you sell
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-secondary-100">
              Twenty minutes on the phone and I&apos;ll tell you what your site should
              cost — including if the answer is that you don&apos;t need one from me.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${EMAIL}?subject=Website%20for%20my%20business`}
                className="inline-flex items-center gap-2 rounded-lg bg-ember-700 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-ember-600"
              >
                <Mail size={18} />
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_HREF}`}
                className="inline-flex items-center gap-2 rounded-lg border border-forge-steel px-6 py-3.5 font-semibold text-white transition-colors hover:bg-forge-smoke"
              >
                <Phone size={18} />
                {PHONE}
              </a>
            </div>

            <p className="mt-8 text-sm text-secondary-200">
              <a
                href="/shortforge-websites.pdf"
                className="underline underline-offset-4 hover:text-white"
              >
                Download this as a one-page PDF
              </a>{' '}
              · Chicago area ·{' '}
              <Link href="/" className="underline underline-offset-4 hover:text-white">
                AI and automation work
              </Link>{' '}
              ·{' '}
              <Link
                href="/contact"
                className="underline underline-offset-4 hover:text-white"
              >
                Contact form
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
