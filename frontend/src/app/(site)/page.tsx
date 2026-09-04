import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { OfferCards } from '@/components/sections/OfferCards';
import { PricingCard } from '@/components/sections/PricingCard';
import { ProofBand } from '@/components/sections/ProofBand';
import { Steps } from '@/components/sections/Steps';
import { LogoMark } from '@/components/brand/LogoMark';
import {
  homeAbout,
  homeCta,
  homeFaq,
  homeHero,
  homePricing,
  homeProof,
  homeSteps,
  offers,
} from '@/content/home';
import { SITE } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...pageMetadata({ title: SITE.tagline, description: SITE.description, path: '/' }),
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section size="hero">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow mb-5">{homeHero.eyebrow}</p>
              <h1 className="display max-w-3xl text-balance text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl">
                {homeHero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                {homeHero.lede}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={homeHero.primary.href} size="lg" icon={ArrowRight}>
                  {homeHero.primary.label}
                </Button>
                <Button href={homeHero.secondary.href} size="lg" variant="secondary">
                  {homeHero.secondary.label}
                </Button>
              </div>
              <p className="mt-6 text-sm text-ink-mute">
                {homeHero.recent.label}{' '}
                <Link
                  href={homeHero.recent.href}
                  className="font-medium text-copper underline decoration-copper/30 underline-offset-4 hover:decoration-copper"
                >
                  {homeHero.recent.name}
                </Link>
              </p>
            </div>
            <div className="hidden justify-end lg:flex" aria-hidden>
              <LogoMark size={260} className="text-copper-tint" title="" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Proof */}
      <ProofBand {...homeProof} />

      {/* Offers */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow={offers.eyebrow} title={offers.title} />
          </Reveal>
          <OfferCards items={offers.items} className="mt-12" />
        </Container>
      </Section>

      {/* Steps */}
      <Section tone="paper-deep" bordered>
        <Container>
          <Reveal>
            <SectionHeading eyebrow={homeSteps.eyebrow} title={homeSteps.title} />
          </Reveal>
          <Steps steps={homeSteps.steps} className="mt-12" />
        </Container>
      </Section>

      {/* Pricing teaser */}
      <Section id="pricing">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={homePricing.eyebrow} title={homePricing.title} lede={homePricing.lede} />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {homePricing.packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.06}>
                <PricingCard
                  name={pkg.name}
                  price={pkg.standard}
                  tagline={pkg.tagline}
                  turnaround={pkg.turnaround}
                  features={pkg.features}
                  featured={pkg.featured}
                  cta={{ label: 'Start here', href: `/contact?need=websites&package=${pkg.name}` }}
                />
              </Reveal>
            ))}
          </div>
          <Link
            href={homePricing.link.href}
            className="mt-8 inline-flex items-center gap-2 font-semibold text-copper hover:text-copper-hover"
          >
            {homePricing.link.label} <ArrowRight size={18} aria-hidden />
          </Link>
        </Container>
      </Section>

      {/* About */}
      <Section tone="paper-deep" bordered>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <SectionHeading eyebrow={homeAbout.eyebrow} title={homeAbout.title} />
              {homeAbout.paragraphs.map((p) => (
                <p key={p} className="mt-5 max-w-xl leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              <Link
                href={homeAbout.link.href}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-copper hover:text-copper-hover"
              >
                {homeAbout.link.label} <ArrowRight size={18} aria-hidden />
              </Link>
            </Reveal>
            <ul className="space-y-5">
              {homeAbout.values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.06}>
                  <div className="flex gap-4 rounded-xl border border-line bg-white p-6 shadow-card">
                    <v.icon size={24} strokeWidth={1.75} className="mt-0.5 shrink-0 text-copper" aria-hidden />
                    <div>
                      <h3 className="font-semibold">{v.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ink-soft">{v.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow={homeFaq.eyebrow} title={homeFaq.title} />
          </Reveal>
          <FAQ items={homeFaq.items} className="mt-10" />
          <Link
            href={homeFaq.link.href}
            className="mt-8 inline-flex items-center gap-2 font-semibold text-copper hover:text-copper-hover"
          >
            {homeFaq.link.label} <ArrowRight size={18} aria-hidden />
          </Link>
        </Container>
      </Section>

      <CTA
        title={homeCta.title}
        body={homeCta.body}
        fineprint={
          <>
            Or email{' '}
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-iron-text">
              {SITE.email}
            </a>
            . {SITE.areaServed}
          </>
        }
      />
    </>
  );
}
