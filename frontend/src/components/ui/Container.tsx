import type { ReactNode } from 'react';

type ContainerProps = {
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
  children: ReactNode;
};

const widths = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-7xl',
};

export function Container({ size = 'default', className = '', children }: ContainerProps) {
  return <div className={`mx-auto w-full ${widths[size]} px-5 sm:px-8 ${className}`}>{children}</div>;
}
