import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';
import { professionalServiceJsonLd } from '@/lib/jsonld';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={professionalServiceJsonLd()} />
      <Header />
      <main id="main" className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
