import type { Scenario } from '@/content/automation';
import { Reveal } from '@/components/ui/Reveal';

export function Scenarios({ items, className = '' }: { items: Scenario[]; className?: string }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-3 ${className}`}>
      {items.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.06}>
          <article className="flex h-full flex-col rounded-xl border border-line bg-white p-7 shadow-card">
            <h3 className="display-sm text-xl font-semibold sm:text-2xl">{s.title}</h3>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-mute">The situation</p>
            <p className="mt-2 leading-relaxed text-ink-soft">{s.situation}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-mute">What gets built</p>
            <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{s.solution}</p>
            <p className="tnum mt-6 border-t border-line pt-4 font-semibold">{s.price}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
