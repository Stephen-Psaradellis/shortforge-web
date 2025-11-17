import React from 'react';
import Image from 'next/image';
import shortforgeLogo from '@/assets/shortforge-logo.svg';

interface ShortForgeIconProps {
  size?: number;
  className?: string;
  rounded?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

/**
 * ShortForge Icon Component
 * 
 * A simple icon-only component for the ShortForge logo.
 * Perfect for use in tight spaces or as decorative elements.
 * 
 * Note: The logo has a tall aspect ratio (roughly 2:3 width:height).
 * The size parameter controls the width, and height is calculated automatically.
 * 
 * @param size - Width in pixels (default: 40)
 * @param className - Additional classes for styling
 * @param rounded - Whether to apply rounded corners (default: true)
 * @param glow - Whether to apply glow effect on hover (default: true)
 * @param onClick - Optional click handler
 */
export const ShortForgeIcon: React.FC<ShortForgeIconProps> = ({
  size = 40,
  className = '',
  rounded = true,
  glow = true,
  onClick
}) => {
  // Logo aspect ratio from viewBox: 770x1185 ≈ 0.65 (width/height)
  const aspectRatio = 0.65;
  const width = size;
  const height = size / aspectRatio;
  
  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 ${
        rounded ? 'rounded-lg' : ''
      } ${glow ? 'group' : ''} ${className}`}
      style={{ width: width, height: height }}
      onClick={onClick}
    >
      <div className="w-full h-full p-1.5">
        <Image
          src={shortforgeLogo}
          alt="ShortForge Icon"
          width={width}
          height={height}
          className={`object-contain w-full h-full ${
            glow ? 'group-hover:shadow-glow transition-all duration-300' : ''
          }`}
          priority
        />
      </div>
    </div>
  );
};

export default ShortForgeIcon;

