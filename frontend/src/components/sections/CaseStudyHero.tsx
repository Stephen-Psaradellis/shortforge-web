import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type CaseStudyHeroProps = {
  eyebrow: string;
  client: string;
  url: string;
  summary: string;
  meta: { label: string; value: string }[];
  image: { src: string; alt: string; width: number; height: number };
};

export function CaseStudyHero({ eyebrow, client, url, summary, meta, image }: CaseStudyHeroProps) {
  return (
    <Section size="hero" className="pb-0 sm:pb-0 lg:pb-0">
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={client} lede={summary} className="max-w-3xl" />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-copper hover:text-copper-hover"
        >
          {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
          <ExternalLink size={17} aria-hidden />
        </a>

        <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-mute">{m.label}</dt>
              <dd className="mt-1.5 font-medium">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 overflow-hidden rounded-t-xl border border-b-0 border-line shadow-lift">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </Container>
    </Section>
  );
}
