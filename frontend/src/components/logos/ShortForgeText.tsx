import React from 'react';

/**
 * ShortForge Text Component
 *
 * A styled text component using the ShortForge brand typography.
 * Displays "ShortForge" with "Short" in dark gray and "Forge" in ember red.
 */
interface ShortForgeTextProps {
  /** Size of the text (default: 'md') */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

export const ShortForgeText: React.FC<ShortForgeTextProps> = ({
  size = 'md',
  className = ''
}) => {
const sizeClasses = {
  sm: 'w-24 h-auto',
  md: 'w-32 h-auto',
  lg: 'w-40 h-auto',
  xl: 'w-48 h-auto'
};

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 250"
      className={`${sizeClasses[size]} ${className}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="ShortForge"
    >
      {/* TEXT STYLES */}
      <style>
        {`
          .codefont {
            font-family: "JetBrains Mono", monospace;
            font-weight: 700;
            text-shadow:
              0.25px  0.25px 0 #FFF,
             -0.25px  0.25px 0 #FFF,
              0.25px -0.25px 0 #FFF,
             -0.25px -0.25px 0 #FFF,
              0.25px  0px 0 #FFF,
             -0.25px  0px 0 #FFF,
              0px  0.25px 0 #FFF,
              0px -0.25px 0 #FFF;
          }
          .text-sm { font-size: 220px; }
          .text-md { font-size: 220px; }
          .text-lg { font-size: 220px; }
          .text-xl { font-size: 220px; }
        `}
      </style>

      <text x="520" y="180" text-anchor="middle" className={`codefont text-${size}`} fill="#1A1A1A">
        Short
      </text>
      <text x="1130" y="180" text-anchor="middle" className={`codefont text-${size}`} fill="#E91A40">
        Forge
      </text>
    </svg>
  );
};

export default ShortForgeText;
