import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { pageMetadata } from '@/lib/metadata';
import { NEEDS, type Need } from '@/lib/contact-schema';
import { contactPage } from '@/content/contact';
import { SITE } from '@/content/site';
import { packages } from '@/content/websites';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Tell me what you sell and what you need. I reply within a business day, and the first twenty-minute call is free.',
  path: '/contact',
});

type SearchParams = Promise<{ need?: string; package?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const { need, package: pkg } = await searchParams;
  const defaultNeed: Need = (NEEDS as readonly string[]).includes(need ?? '') ? (need as Need) : 'websites';
  const knownPackage = packages.find((p) => p.name.toLowerCase() === (pkg ?? '').toLowerCase());
  const defaultMessage = knownPackage ? `I'm interested in the ${knownPackage.name} package. ` : '';

  const details = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: 'Call or text', value: SITE.phone, href: SITE.phoneHref },
    { icon: MapPin, label: 'Based in', value: `${SITE.location}. ${SITE.areaServed}` },
    { icon: Clock, label: 'Replies', value: 'Within a business day, usually faster' },
  ];

  return (
    <Section size="hero">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={contactPage.eyebrow}
          title={contactPage.title}
          lede={contactPage.lede}
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative">
            <ContactForm defaultNeed={defaultNeed} defaultMessage={defaultMessage} />
          </div>

          <aside className="space-y-8 lg:pl-8 lg:border-l lg:border-line">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-mute">
                {contactPage.aside.title}
              </h2>
              <ul className="mt-5 space-y-5">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-3.5">
                    <d.icon size={20} className="mt-0.5 shrink-0 text-copper" aria-hidden />
                    <div>
                      <p className="text-sm text-ink-mute">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="font-medium text-ink hover:text-copper">
                          {d.value}
                        </a>
                      ) : (
                        <p className="font-medium">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-mute">
                {contactPage.aside.next.title}
              </h2>
              <ol className="mt-5 space-y-3">
                {contactPage.aside.next.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-ink-soft">
                    <span className="tnum flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
