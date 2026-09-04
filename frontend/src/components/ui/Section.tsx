import type { ReactNode } from 'react';

export type SectionTone = 'paper' | 'paper-deep' | 'white' | 'iron';

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  bordered?: boolean;
  size?: 'default' | 'tight' | 'hero';
  className?: string;
  children: ReactNode;
};

const tones: Record<SectionTone, string> = {
  paper: 'bg-paper',
  'paper-deep': 'bg-paper-deep',
  white: 'bg-white',
  iron: 'bg-iron text-iron-text',
};

const sizes = {
  default: 'py-16 lg:py-24',
  tight: 'py-12 lg:py-16',
  hero: 'pt-16 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-28',
};

export function Section({
  id,
  tone = 'paper',
  bordered = false,
  size = 'default',
  className = '',
  children,
}: SectionProps) {
  const border = bordered ? (tone === 'iron' ? 'border-y border-white/10' : 'border-y border-line') : '';
  return (
    <section id={id} className={`${tones[tone]} ${border} ${sizes[size]} scroll-mt-16 ${className}`}>
      {children}
    </section>
  );
}
