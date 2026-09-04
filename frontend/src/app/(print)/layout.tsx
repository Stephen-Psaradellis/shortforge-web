import type { ReactNode } from 'react';

// Print routes get no header or footer. The root layout still supplies fonts.
export default function PrintLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
