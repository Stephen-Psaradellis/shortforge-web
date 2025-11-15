import React from 'react';
import Image from 'next/image';
import shortforgeSvg from '@/assets/shortforge.svg';

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
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: opacity,
            transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1})`,
          }}
        >
          <Image
            src={shortforgeSvg}
            alt=""
            width={size}
            height={size}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default ShortForgePattern;

