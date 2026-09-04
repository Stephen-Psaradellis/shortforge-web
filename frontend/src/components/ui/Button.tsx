import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'md' | 'lg';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  href?: string;
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconSide?: 'left' | 'right';
  className?: string;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary: 'bg-copper text-white hover:bg-copper-hover',
  secondary: 'border border-line bg-white text-ink hover:border-line-strong hover:bg-paper-deep',
  ghost: 'text-ink hover:bg-paper-deep',
  inverse: 'border border-white/25 text-iron-text hover:bg-white/10',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[15px]',
  lg: 'px-6 py-3.5 text-base',
};

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconSide = 'right',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      {Icon && iconSide === 'left' && <Icon size={18} aria-hidden />}
      {children}
      {Icon && iconSide === 'right' && <Icon size={18} aria-hidden />}
    </>
  );

  if (href) {
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      const external = href.startsWith('http');
      return (
        <a
          href={href}
          className={cls}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
