import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="pt-16">
        <Section size="hero">
          <Container size="narrow">
            <SectionHeading
              as="h1"
              eyebrow="404"
              title="That page is not here."
              lede="The site was rebuilt in 2026 and a few old addresses did not come along. The pages that exist are in the menu."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/" icon={ArrowRight}>
                Back to the front page
              </Button>
              <Button href="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
