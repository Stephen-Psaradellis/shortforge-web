import React from 'react';
import Image from 'next/image';
import shortforgeSvg from '@/assets/shortforge.svg';

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
 * @param size - Size in pixels (default: 40)
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
  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 ${
        rounded ? 'rounded-lg' : ''
      } ${glow ? 'group' : ''} ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Image
        src={shortforgeSvg}
        alt="ShortForge Icon"
        width={size}
        height={size}
        className={`object-contain ${rounded ? 'rounded-lg' : ''} ${
          glow ? 'group-hover:shadow-glow transition-all duration-300' : ''
        }`}
        priority
      />
    </div>
  );
};

export default ShortForgeIcon;

