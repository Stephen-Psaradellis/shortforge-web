import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTA } from '@/components/sections/CTA';
import { pageMetadata } from '@/lib/metadata';
import { aboutCta, aboutHero, stats, timeline, values } from '@/content/about';

export const metadata: Metadata = pageMetadata({
  title: 'About Stephen Psaradellis',
  description:
    'ShortForge is Stephen Psaradellis, a software engineer in the Chicago suburbs. Seven years building production systems for banks and enterprises, now building websites and automation for small businesses.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section size="hero">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <SectionHeading as="h1" eyebrow={aboutHero.eyebrow} title={aboutHero.title} />
              {aboutHero.paragraphs.map((p) => (
                <p key={p} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                  {p}
                </p>
              ))}
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/websites" size="lg" icon={ArrowRight}>
                  Websites for small businesses
                </Button>
                <Button href="/contact" size="lg" variant="secondary">
                  Get in touch
                </Button>
              </div>
            </div>
            <Reveal delay={0.1}>
              <Image
                src="/about/stephen.webp"
                alt="Stephen Psaradellis"
                width={1000}
                height={1250}
                priority
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 100vw"
                className="h-auto w-full max-w-[320px] rounded-xl border border-line object-cover shadow-card lg:max-w-none"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section tone="iron" bordered size="tight">
        <Container>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <dd className="display tnum text-4xl font-semibold text-copper-light sm:text-5xl">{s.value}</dd>
                <dt className="mt-2 text-sm text-iron-soft">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How I work" title="Three things that do not change." />
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-line bg-white p-7 shadow-card">
                  <v.icon size={26} strokeWidth={1.75} className="text-copper" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="paper-deep" bordered>
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow="Where this came from" title="Seven years, in order." />
          </Reveal>
          <ol className="mt-12 space-y-10">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={Math.min(i * 0.04, 0.2)} className="flex gap-6">
                <div className="w-16 shrink-0 pt-0.5 sm:w-20">
                  <span className="display-sm text-xl font-semibold text-copper">{item.year}</span>
                </div>
                <div className="border-l border-line pb-1 pl-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <CTA title={aboutCta.title} body={aboutCta.body} />
    </>
  );
}
