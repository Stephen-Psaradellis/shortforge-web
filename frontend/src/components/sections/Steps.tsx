import type { Step } from '@/content/websites';
import { Reveal } from '@/components/ui/Reveal';

type StepsProps = {
  steps: Step[];
  note?: { title: string; body: string };
  className?: string;
};

export function Steps({ steps, note, className = '' }: StepsProps) {
  return (
    <div className={className}>
      <ol className="grid gap-10 sm:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={Math.min(i * 0.06, 0.25)} className="flex gap-5">
            <span className="display-sm flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-copper text-lg font-semibold text-white">
              {s.n}
            </span>
            <div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      {note && (
        <Reveal>
          <p className="mt-12 max-w-2xl rounded-lg border border-line bg-white p-6 leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">{note.title}</strong> {note.body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
