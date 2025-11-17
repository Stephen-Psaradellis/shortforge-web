import React from 'react';
import Image from 'next/image';
import shortforgeLogo from '@/assets/shortforge-logo.svg';

interface ShortForgeLogoProps {
  showText?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  textClassName?: string;
  onClick?: () => void;
}

const sizeMap = {
  xs: { img: 24, text: 'text-base' },
  sm: { img: 32, text: 'text-lg' },
  md: { img: 40, text: 'text-xl' },
  lg: { img: 48, text: 'text-2xl' },
  xl: { img: 64, text: 'text-3xl' }
};

/**
 * ShortForge Logo Component
 * 
 * A flexible logo component that can display the ShortForge icon with or without text.
 * Supports multiple sizes and custom styling.
 * 
 * Note: The logo has a tall aspect ratio (roughly 2:3 width:height).
 * 
 * @param showText - Whether to show "ShortForge" text next to the logo (default: true)
 * @param size - Size preset: 'xs', 'sm', 'md', 'lg', 'xl' (default: 'md')
 * @param className - Additional classes for the logo container
 * @param textClassName - Additional classes for the text
 * @param onClick - Optional click handler
 */
export const ShortForgeLogo: React.FC<ShortForgeLogoProps> = ({
  showText = true,
  size = 'md',
  className = '',
  textClassName = '',
  onClick
}) => {
  const { img, text } = sizeMap[size];
  
  // Logo aspect ratio from viewBox: 770x1185 ≈ 0.65 (width/height)
  const aspectRatio = 0.65;
  const width = img;
  const height = img / aspectRatio;

  return (
    <div
      className={`inline-flex items-center space-x-3 group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg shadow-glow-sm group-hover:shadow-glow transition-all duration-300 flex-shrink-0 p-1.5">
        <Image
          src={shortforgeLogo}
          alt="ShortForge Logo"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`${text} font-bold text-white tracking-tight ${textClassName}`}>
          ShortForge
        </span>
      )}
    </div>
  );
};

export default ShortForgeLogo;

