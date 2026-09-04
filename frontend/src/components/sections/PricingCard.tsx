import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type PricingCardProps = {
  name: string;
  price: string;
  standard?: string;
  tagline: string;
  turnaround: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  cta: { label: string; href: string };
};

export function PricingCard({
  name,
  price,
  standard,
  tagline,
  turnaround,
  features,
  featured = false,
  badge = 'Most pick this',
  cta,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border p-7 ${
        featured
          ? 'border-copper bg-white shadow-lift ring-1 ring-copper/20'
          : 'border-line bg-white shadow-card'
      }`}
    >
      {featured && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-copper px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {badge}
        </span>
      )}
      <h3 className="display-sm text-2xl font-semibold">{name}</h3>
      <p className="mt-1.5 text-ink-mute">{tagline}</p>
      <div className="mt-6 flex items-baseline gap-2.5">
        <span className="display tnum text-4xl font-semibold">{price}</span>
        {standard && <span className="tnum text-sm text-ink-mute line-through">{standard}</span>}
      </div>
      <p className="mt-1.5 text-sm text-ink-mute">{turnaround}</p>
      <ul className="mt-7 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex gap-2.5 text-ink-soft">
            <Check size={18} className="mt-0.5 shrink-0 text-copper" aria-hidden />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        href={cta.href}
        variant={featured ? 'primary' : 'secondary'}
        icon={ArrowRight}
        className="mt-8 w-full"
      >
        {cta.label}
      </Button>
    </div>
  );
}
