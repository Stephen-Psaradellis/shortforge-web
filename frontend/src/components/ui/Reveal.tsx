'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
};

// One subtle entrance for everything. MotionConfig at the root honors the
// OS reduce-motion setting, so this never needs its own check.
export function Reveal({ children, delay = 0, y = 12, className, as = 'div' }: RevealProps) {
  const M = as === 'li' ? motion.li : as === 'section' ? motion.section : motion.div;
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </M>
  );
}
