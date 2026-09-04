import type { Metadata } from 'next';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { Scenarios } from '@/components/sections/Scenarios';
import { Steps } from '@/components/sections/Steps';
import { pageMetadata } from '@/lib/metadata';
import {
  automationCta,
  automationFaq,
  automationHero,
  automationOffers,
  howScoped,
  scenarios,
  whoFor,
  whoNot,
} from '@/content/automation';

export const metadata: Metadata = pageMetadata({
  title: 'AI phone agents and automation for small businesses',
  description:
    'AI phone agents, bookings wired into your calendar, and small workflow automations for businesses around Chicago. Honest about who needs it. Phone agent from $1,200 setup, $150 a month.',
  path: '/automation',
});

export default function AutomationPage() {
  return (
    <>
      {/* Hero */}
      <Section size="hero">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={automationHero.eyebrow}
            title={automationHero.title}
            lede={automationHero.lede}
            className="max-w-3xl"
          />
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/contact?need=automation" size="lg" icon={ArrowRight}>
              Book a 20-minute call
            </Button>
            <Button href="#offers" size="lg" variant="secondary">
              What it costs
            </Button>
          </div>
        </Container>
      </Section>

      {/* Who it is for */}
      <Section tone="paper-deep" bordered>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {[whoFor, whoNot].map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.08}>
                <h2 className="display-sm text-2xl font-semibold sm:text-3xl">{group.title}</h2>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                      {gi === 0 ? (
                        <Check size={20} className="mt-0.5 shrink-0 text-copper" aria-hidden />
                      ) : (
                        <X size={20} className="mt-0.5 shrink-0 text-line-strong" aria-hidden />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Offers */}
      <Section id="offers">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What I build"
              title="Four things, priced up front."
              lede="The first two have fixed prices. The other two get a one-page quote after a call, and nothing starts until you sign off."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {automationOffers.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-xl border border-line bg-white p-7 shadow-card sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="display-sm text-2xl font-semibold">{o.title}</h3>
                    <p className="tnum text-sm font-semibold text-copper">{o.pricing}</p>
                  </div>
                  <p className="mt-4 leading-relaxed text-ink-soft">{o.body}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {o.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-ink-soft">
                        <Check size={18} className="mt-0.5 shrink-0 text-copper" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Scenarios */}
      <Section tone="paper-deep" bordered>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What it looks like"
              title="Three businesses this is built for."
              lede="Composite examples, not client names. If one of them sounds like your week, it is worth a call."
            />
          </Reveal>
          <Scenarios items={scenarios} className="mt-12" />
        </Container>
      </Section>

      {/* How scoped */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Process" title={howScoped.title} />
          </Reveal>
          <Steps steps={howScoped.steps} className="mt-12" />
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="white" bordered>
        <Container size="narrow">
          <Reveal>
            <SectionHeading title="Questions people ask" />
          </Reveal>
          <FAQ items={automationFaq} withSchema className="mt-10" />
        </Container>
      </Section>

      <CTA
        title={automationCta.title}
        body={automationCta.body}
        primary={{ label: 'Book a 20-minute call', href: '/contact?need=automation' }}
      />
    </>
  );
}
