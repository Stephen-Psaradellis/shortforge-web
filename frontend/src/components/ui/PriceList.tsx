import type { PriceRow } from '@/content/websites';

type PriceListProps = {
  items: ReadonlyArray<PriceRow>;
  caption?: string;
  className?: string;
};

export function PriceList({ items, caption, className = '' }: PriceListProps) {
  return (
    <div className={className}>
      <dl className="divide-y divide-line border-y border-line">
        {items.map(([label, price]) => (
          <div key={label} className="flex items-baseline justify-between gap-6 py-3.5">
            <dt className="text-ink-soft">{label}</dt>
            <dd className="tnum shrink-0 font-semibold">{price}</dd>
          </div>
        ))}
      </dl>
      {caption && <p className="mt-4 text-sm text-ink-mute">{caption}</p>}
    </div>
  );
}
