import { Check, X } from 'lucide-react';
import type { PriceRow } from '@/content/websites';

type ComparisonTableProps = {
  headers: [string, string];
  rows: ReadonlyArray<PriceRow>;
  footnote?: string;
  className?: string;
};

export function ComparisonTable({ headers, rows, footnote, className = '' }: ComparisonTableProps) {
  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="py-3 pr-6 font-semibold">
                {headers[0]}
              </th>
              <th scope="col" className="py-3 font-semibold text-ink-mute">
                {headers[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([mine, theirs]) => (
              <tr key={mine} className="border-b border-line">
                <td className="py-3.5 pr-6 align-top">
                  <span className="flex gap-2.5">
                    <Check size={18} className="mt-0.5 shrink-0 text-copper" aria-hidden />
                    <span>{mine}</span>
                  </span>
                </td>
                <td className="py-3.5 align-top text-ink-mute">
                  <span className="flex gap-2.5">
                    <X size={18} className="mt-0.5 shrink-0 text-line-strong" aria-hidden />
                    <span>{theirs}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && <p className="mt-7 max-w-2xl text-ink-mute">{footnote}</p>}
    </div>
  );
}
