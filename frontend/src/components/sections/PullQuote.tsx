import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

type Testimonial = { quote: string; name: string; role: string };

// Renders nothing when there is no real quote to show, which is the point:
// this slot stays empty until a client has actually said something.
export function PullQuote({ testimonial }: { testimonial: Testimonial | null }) {
  if (!testimonial) return null;

  return (
    <Section tone="white" bordered>
      <Container size="narrow">
        <Reveal>
          <figure>
            <blockquote className="display text-balance text-2xl leading-[1.3] sm:text-3xl lg:text-4xl">
              <span className="text-copper">&ldquo;</span>
              {testimonial.quote}
              <span className="text-copper">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-ink-soft">
              <span className="h-px w-8 shrink-0 bg-copper" aria-hidden />
              <span>
                <span className="font-semibold text-ink">{testimonial.name}</span>
                {', '}
                {testimonial.role}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
