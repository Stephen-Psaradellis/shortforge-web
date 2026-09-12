import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/metadata';
import { contactPage } from '@/content/contact';
import { SITE } from '@/content/site';

// The contact form lands here after a successful send. It is a real route, not an
// in-place message, so each view is a counted conversion in Vercel Analytics.
export const metadata: Metadata = pageMetadata({
  title: 'Message sent',
  description: contactPage.success.body,
  path: '/contact/sent',
  noindex: true,
});

export default function ContactSentPage() {
  return (
    <Section size="hero">
      <Container>
        <div
          role="status"
          className="max-w-2xl rounded-xl border border-line bg-white p-8 shadow-card sm:p-10"
        >
          <CheckCircle2 size={32} className="text-ok" aria-hidden />
          <h1 className="display-sm mt-4 text-3xl font-semibold">{contactPage.success.title}</h1>
          <p className="mt-3 leading-relaxed text-ink-soft">{contactPage.success.body}</p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Call or text:{' '}
            <a href={SITE.phoneHref} className="font-semibold text-ink hover:text-copper">
              {SITE.phone}
            </a>
          </p>
          <div className="mt-8">
            <Button href="/websites" variant="secondary" icon={ArrowRight}>
              Back to prices and packages
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
