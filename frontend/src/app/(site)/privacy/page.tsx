import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageMetadata } from '@/lib/metadata';
import { privacy } from '@/content/privacy';
import { SITE } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description: 'What shortforge.dev collects (almost nothing) and what happens to a contact form message.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <Section size="hero">
      <Container size="narrow">
        <SectionHeading
          as="h1"
          eyebrow={`Last updated ${privacy.updated}`}
          title={privacy.title}
          lede="Short, because there is not much to say."
        />
        <Prose className="mt-8">
          {privacy.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          <h2>Questions</h2>
          <p>
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </Prose>
      </Container>
    </Section>
  );
}
