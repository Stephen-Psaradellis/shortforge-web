import { Plus } from 'lucide-react';
import type { Faq } from '@/content/websites';
import { JsonLd } from '@/components/ui/JsonLd';

type FAQProps = {
  items: Faq[];
  withSchema?: boolean;
  className?: string;
};

export function FAQ({ items, withSchema = false, className = '' }: FAQProps) {
  return (
    <div className={className}>
      {withSchema && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }}
        />
      )}
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-semibold">
              <span>{f.q}</span>
              <Plus
                size={20}
                aria-hidden
                className="shrink-0 text-copper transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
