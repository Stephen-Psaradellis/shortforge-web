import Link from 'next/link';
import { LogoMark } from './LogoMark';

type LogoProps = {
  variant?: 'default' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  wordmark?: boolean;
  href?: string | null;
  className?: string;
};

const sizes = {
  sm: { mark: 22, text: 'text-lg' },
  md: { mark: 28, text: 'text-[1.35rem]' },
  lg: { mark: 40, text: 'text-3xl' },
};

export function Logo({
  variant = 'default',
  size = 'md',
  wordmark = true,
  href = '/',
  className = '',
}: LogoProps) {
  const s = sizes[size];
  const content = (
    <span
      className={`inline-flex items-center gap-2.5 ${
        variant === 'inverse' ? 'text-iron-text' : 'text-ink'
      } ${className}`}
    >
      <LogoMark size={s.mark} className="shrink-0 text-copper" />
      {wordmark && (
        <span className={`display-sm font-semibold leading-none ${s.text}`}>ShortForge</span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="ShortForge home" className="rounded-md">
      {content}
    </Link>
  );
}
