import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

type Offer = {
  title: string;
  body: string;
  bullets: string[];
  link: { label: string; href: string };
};

export function OfferCards({ items, className = '' }: { items: Offer[]; className?: string }) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${className}`}>
      {items.map((offer, i) => (
        <Reveal key={offer.title} delay={i * 0.08}>
          <article className="flex h-full flex-col rounded-xl border border-line bg-white p-7 shadow-card sm:p-9">
            <h3 className="display-sm text-2xl font-semibold sm:text-3xl">{offer.title}</h3>
            <p className="mt-4 leading-relaxed text-ink-soft">{offer.body}</p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {offer.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-ink-soft">
                  <Check size={18} className="mt-0.5 shrink-0 text-copper" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={offer.link.href}
              className="mt-8 inline-flex items-center gap-2 font-semibold text-copper hover:text-copper-hover"
            >
              {offer.link.label} <ArrowRight size={18} aria-hidden />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
