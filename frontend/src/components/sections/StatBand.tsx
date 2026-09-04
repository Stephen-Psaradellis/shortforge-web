import type { Stat } from '@/content/websites';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

type StatBandProps = {
  items: Stat[];
  note?: string;
  tone?: 'paper-deep' | 'white';
};

// A deliberate break in the page rhythm: no eyebrow, no heading, no cards.
// Three numbers big enough to read from across the room.
export function StatBand({ items, note, tone = 'paper-deep' }: StatBandProps) {
  return (
    <Section tone={tone} bordered size="tight">
      <Container>
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.value} delay={Math.min(i * 0.08, 0.24)}>
              <dt className="display tnum text-5xl leading-none text-copper sm:text-6xl">
                {s.value}
              </dt>
              <dd className="mt-4 max-w-xs leading-relaxed text-ink-soft">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
        {note && <p className="mt-10 text-sm text-ink-mute">{note}</p>}
      </Container>
    </Section>
  );
}
