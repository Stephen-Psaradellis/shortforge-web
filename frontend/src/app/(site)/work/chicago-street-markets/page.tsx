import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, Minus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CaseStudyHero } from '@/components/sections/CaseStudyHero';
import { CTA } from '@/components/sections/CTA';
import { pageMetadata } from '@/lib/metadata';
import { caseStudy } from '@/content/work';

export const metadata: Metadata = pageMetadata({
  title: 'Chicago Street Markets: a farmers market website that costs $12 a year',
  description:
    'How a one-page Squarespace site for three Chicago-area farmers markets became a nine-page site that loads in about a second and runs in the owner’s own accounts.',
  path: `/work/${caseStudy.slug}`,
});

export default function CaseStudyPage() {
  const cs = caseStudy;
  return (
    <>
      <CaseStudyHero
        eyebrow={cs.eyebrow}
        client={cs.client}
        url={cs.url}
        summary={cs.summary}
        meta={cs.meta}
        image={cs.images.desktop}
      />

      {/* Before / built */}
      <Section tone="iron" bordered>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="display-sm text-2xl font-semibold sm:text-3xl">{cs.before.title}</h2>
              <ul className="mt-6 space-y-3.5">
                {cs.before.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-iron-soft">
                    <Minus size={20} className="mt-0.5 shrink-0 text-iron-soft/60" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-sm text-2xl font-semibold sm:text-3xl">{cs.built.title}</h2>
              <ul className="mt-6 space-y-3.5">
                {cs.built.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-iron-text">
                    <Check size={20} className="mt-0.5 shrink-0 text-copper-light" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Facts */}
      <Section>
        <Container>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cs.facts.map(([value, label], i) => (
              <Reveal key={label} delay={i * 0.05}>
                <dd className="display tnum text-5xl font-semibold text-copper">{value}</dd>
                <dt className="mt-2 text-ink-soft">{label}</dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Screens */}
      <Section tone="paper-deep" bordered>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <div className="overflow-hidden rounded-xl border border-line shadow-lift">
                <Image
                  src={cs.images.desktop.src}
                  alt={cs.images.desktop.alt}
                  width={cs.images.desktop.width}
                  height={cs.images.desktop.height}
                  sizes="(min-width: 1024px) 680px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-[1.75rem] border-[6px] border-ink bg-ink shadow-lift">
                <Image
                  src={cs.images.mobile.src}
                  alt={cs.images.mobile.alt}
                  width={cs.images.mobile.width}
                  height={cs.images.mobile.height}
                  sizes="240px"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Running cost */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <SectionHeading title={cs.running.title} lede={cs.running.body} />
          </Reveal>
        </Container>
      </Section>

      <CTA title={cs.cta.title} body={cs.cta.body} />
    </>
  );
}
