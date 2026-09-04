import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PriceList } from '@/components/ui/PriceList';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { PricingCard } from '@/components/sections/PricingCard';
import { ProofBand } from '@/components/sections/ProofBand';
import { Steps } from '@/components/sections/Steps';
import { pageMetadata } from '@/lib/metadata';
import { SITE, mailto } from '@/content/site';
import {
  addons,
  aiAddons,
  aiBox,
  comparison,
  faqs,
  included,
  oneThing,
  ongoing,
  ongoingLede,
  ongoingNote,
  packages,
  paymentNote,
  pricingLede,
  proof,
  steps,
  websitesCta,
  websitesHero,
} from '@/content/websites';

export const metadata: Metadata = pageMetadata({
  title: 'Small business websites in the Chicago area',
  description:
    'Hand-built websites for small businesses around Chicago. You own the domain, the hosting, and the code. Sites from $750, about $12 a year to keep online.',
  path: '/websites',
});

export default function WebsitesPage() {
  return (
    <>
      {/* Hero */}
      <Section size="hero">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={websitesHero.eyebrow}
            title={websitesHero.title}
            lede={websitesHero.lede}
            className="max-w-3xl"
          />
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            No monthly platform bill. No template. About{' '}
            <strong className="font-semibold text-ink">$12 a year</strong> to keep online.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#pricing" size="lg" icon={ArrowRight}>
              See what it costs
            </Button>
            <Button
              href={mailto('Website for my business')}
              size="lg"
              variant="secondary"
              icon={Mail}
              iconSide="left"
            >
              Email me
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink-mute">
            Most recently:{' '}
            <a
              href={SITE.proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-copper underline decoration-copper/30 underline-offset-4 hover:decoration-copper"
            >
              {SITE.proofName}
            </a>
          </p>
        </Container>
      </Section>

      {/* Proof */}
      <ProofBand
        tone="white"
        eyebrow={proof.eyebrow}
        title={proof.title}
        body={proof.body}
        facts={proof.facts}
        images={proof.images}
        link={{ label: 'Have a look at the live site', href: SITE.proofUrl }}
      />

      {/* Included */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading title="What every site comes with" />
          </Reveal>
          <FeatureGrid items={included} className="mt-12" />
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing" tone="white" bordered>
        <Container>
          <Reveal>
            <SectionHeading title="What it costs" lede={pricingLede} />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.06}>
                <PricingCard
                  {...pkg}
                  cta={{
                    label: 'Start here',
                    href: `/contact?need=websites&package=${encodeURIComponent(pkg.name)}`,
                  }}
                />
              </Reveal>
            ))}
          </div>
          <p className="mt-7 max-w-2xl text-ink-mute">{paymentNote}</p>
        </Container>
      </Section>

      {/* After launch */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading title="After it's live" lede={ongoingLede} />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {ongoing.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-line bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold">{o.name}</h3>
                  <p className="display tnum mt-2 text-3xl font-semibold">{o.price}</p>
                  <p className="mt-3 leading-relaxed text-ink-soft">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-7 max-w-2xl text-ink-mute">{ongoingNote}</p>
        </Container>
      </Section>

      {/* Add-ons and AI box */}
      <Section tone="white" bordered>
        <Container>
          <Reveal>
            <SectionHeading title="Add-ons" />
            <PriceList items={addons} className="mt-10" />
          </Reveal>
          <Reveal>
            <div className="mt-14 rounded-xl border border-line bg-paper p-7 sm:p-9">
              <p className="eyebrow">{aiBox.eyebrow}</p>
              <h3 className="display-sm mt-3 text-2xl font-semibold sm:text-3xl">{aiBox.title}</h3>
              {aiBox.body.map((p) => (
                <p key={p} className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              <PriceList items={aiAddons} className="mt-7" />
              <Link
                href={aiBox.link.href}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-copper hover:text-copper-hover"
              >
                {aiBox.link.label} <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading title="How it works" />
          </Reveal>
          <Steps steps={steps} note={oneThing} className="mt-12" />
        </Container>
      </Section>

      {/* Comparison */}
      <Section tone="white" bordered>
        <Container>
          <Reveal>
            <SectionHeading title="Versus a website builder" lede={comparison.lede} />
          </Reveal>
          <ComparisonTable
            headers={comparison.headers}
            rows={comparison.rows}
            footnote={comparison.note}
            className="mt-10"
          />
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container size="narrow">
          <Reveal>
            <SectionHeading title="Questions people ask" />
          </Reveal>
          <FAQ items={faqs} withSchema className="mt-10" />
        </Container>
      </Section>

      <CTA
        title={websitesCta.title}
        body={websitesCta.body}
        fineprint={
          <>
            <a href={SITE.leafletPdf} className="underline underline-offset-4 hover:text-iron-text">
              Download this as a one-page PDF
            </a>{' '}
            · {SITE.areaServed} ·{' '}
            <Link href="/automation" className="underline underline-offset-4 hover:text-iron-text">
              AI and automation work
            </Link>
          </>
        }
      />
    </>
  );
}
