import React, { useMemo } from 'react';
import Image from 'next/image';
import shortforgeLogo from '@/assets/shortforge-logo.svg';

interface ShortForgePatternProps {
  count?: number;
  opacity?: number;
  size?: number;
  className?: string;
}

/**
 * ShortForge Pattern Component
 * 
 * Creates a decorative background pattern using multiple ShortForge logos.
 * Perfect for hero sections, background decorations, or creative layouts.
 * 
 * @param count - Number of logo instances to display (default: 12)
 * @param opacity - Opacity level 0-1 (default: 0.05)
 * @param size - Size of each logo instance in pixels (default: 80)
 * @param className - Additional classes for the container
 */
export const ShortForgePattern: React.FC<ShortForgePatternProps> = ({
  count = 12,
  opacity = 0.05,
  size = 80,
  className = ''
}) => {
  /**
   * Deterministic pseudo-random generator so the pattern renders
   * identically during SSR and CSR, avoiding hydration mismatches.
   */
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const patternDots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = i + 1;
        return {
          left: `${pseudoRandom(seed) * 100}%`,
          top: `${pseudoRandom(seed + 1) * 100}%`,
          rotation: pseudoRandom(seed + 2) * 360,
          scale: 0.5 + pseudoRandom(seed + 3),
        };
      }),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {patternDots.map((dot, index) => (
        <div
          key={`shortforge-pattern-${index}`}
          className="absolute"
          style={{
            left: dot.left,
            top: dot.top,
            opacity,
            transform: `rotate(${dot.rotation}deg) scale(${dot.scale})`,
          }}
        >
          <Image
            src={shortforgeLogo}
            alt=""
            width={size}
            height={size}
            className="object-contain"
            priority={index < 5}
          />
        </div>
      ))}
    </div>
  );
};

export default ShortForgePattern;

