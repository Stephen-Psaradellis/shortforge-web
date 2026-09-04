import type { ReactNode } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SITE } from '@/content/site';

type CTAProps = {
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
  fineprint?: ReactNode;
  tone?: 'iron' | 'paper-deep';
};

export function CTA({
  title,
  body,
  primary = SITE.cta,
  secondary = { label: SITE.phone, href: SITE.phoneHref },
  fineprint,
  tone = 'iron',
}: CTAProps) {
  const inverse = tone === 'iron';
  return (
    <Section tone={tone} bordered className="py-20 lg:py-28">
      <Container size="narrow" className="text-center">
        <Reveal>
          <h2 className="display text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">{title}</h2>
          <p
            className={`mx-auto mt-5 max-w-xl text-lg leading-relaxed ${
              inverse ? 'text-iron-soft' : 'text-ink-soft'
            }`}
          >
            {body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={primary.href} size="lg" icon={ArrowRight}>
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                size="lg"
                variant={inverse ? 'inverse' : 'secondary'}
                icon={Phone}
                iconSide="left"
              >
                {secondary.label}
              </Button>
            )}
          </div>
          {fineprint && (
            <p className={`mt-8 text-sm ${inverse ? 'text-iron-soft' : 'text-ink-mute'}`}>{fineprint}</p>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
