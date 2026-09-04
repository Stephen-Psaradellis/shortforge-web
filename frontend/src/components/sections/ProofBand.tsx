import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Img = { src: string; alt: string; width: number; height: number };

type ProofBandProps = {
  eyebrow?: string;
  title: string;
  body: string;
  facts: string[];
  images: { desktop: Img; mobile: Img };
  link: { label: string; href: string };
  tone?: 'iron' | 'white';
};

export function ProofBand({
  eyebrow,
  title,
  body,
  facts,
  images,
  link,
  tone = 'iron',
}: ProofBandProps) {
  const inverse = tone === 'iron';
  const external = link.href.startsWith('http');
  const linkCls = `mt-8 inline-flex items-center gap-2 font-semibold ${
    inverse ? 'text-copper-light hover:text-iron-text' : 'text-copper hover:text-copper-hover'
  }`;

  return (
    <Section tone={tone} bordered>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} title={title} lede={body} inverse={inverse} />
            <ul className={`mt-8 space-y-3 ${inverse ? 'text-iron-text' : 'text-ink-soft'}`}>
              {facts.map((fact) => (
                <li key={fact} className="flex gap-3">
                  <Check
                    size={20}
                    className={`mt-0.5 shrink-0 ${inverse ? 'text-copper-light' : 'text-copper'}`}
                    aria-hidden
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            {external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {link.label} <ArrowRight size={18} aria-hidden />
              </a>
            ) : (
              <Link href={link.href} className={linkCls}>
                {link.label} <ArrowRight size={18} aria-hidden />
              </Link>
            )}
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div
              className={`overflow-hidden rounded-xl border ${
                inverse ? 'border-white/15' : 'border-line'
              } shadow-lift`}
            >
              <Image
                src={images.desktop.src}
                alt={images.desktop.alt}
                width={images.desktop.width}
                height={images.desktop.height}
                sizes="(min-width: 1024px) 640px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -bottom-6 right-4 w-[26%] max-w-[150px] overflow-hidden rounded-[1.25rem] border-[5px] border-ink bg-ink shadow-lift sm:right-6">
              <Image
                src={images.mobile.src}
                alt={images.mobile.alt}
                width={images.mobile.width}
                height={images.mobile.height}
                sizes="150px"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
