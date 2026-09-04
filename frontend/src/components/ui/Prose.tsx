import type { ReactNode } from 'react';

// Typographic defaults for long-form pages. No typography plugin needed.
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`max-w-2xl text-[17px] leading-relaxed text-ink-soft [&_a]:text-copper [&_a]:underline [&_a]:underline-offset-4 [&_h2]:display-sm [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-ink ${className}`}
    >
      {children}
    </div>
  );
}
