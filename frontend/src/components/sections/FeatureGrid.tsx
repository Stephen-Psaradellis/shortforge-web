import type { Feature } from '@/content/websites';
import { Reveal } from '@/components/ui/Reveal';

type FeatureGridProps = {
  items: Feature[];
  columns?: 2 | 3;
  className?: string;
};

export function FeatureGrid({ items, columns = 3, className = '' }: FeatureGridProps) {
  const cols = columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <ul className={`grid gap-x-10 gap-y-10 ${cols} ${className}`}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={Math.min(i * 0.05, 0.25)}>
          <item.icon size={26} strokeWidth={1.75} className="text-copper" aria-hidden />
          <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
