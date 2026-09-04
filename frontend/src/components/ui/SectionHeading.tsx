import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  inverse?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: Tag = 'h2',
  inverse = false,
  className = '',
}: SectionHeadingProps) {
  const isH1 = Tag === 'h1';
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${inverse ? 'text-copper-light' : ''}`}>{eyebrow}</p>
      )}
      <Tag
        className={`display text-balance ${
          isH1 ? 'text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-6xl' : 'text-3xl leading-[1.1] sm:text-4xl'
        }`}
      >
        {title}
      </Tag>
      {lede && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            inverse ? 'text-iron-soft' : 'text-ink-soft'
          } ${isH1 ? 'sm:text-xl' : ''}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
