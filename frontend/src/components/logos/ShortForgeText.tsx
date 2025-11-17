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
          }
          .text-sm { font-size: 220px; }
          .text-md { font-size: 220px; }
          .text-lg { font-size: 220px; }
          .text-xl { font-size: 220px; }
        `}
      </style>

      {/* "Short" text with white stroke outline */}
      <text 
        x="520" 
        y="180" 
        textAnchor="middle" 
        className={`codefont text-${size}`} 
        fill="#1A1A1A"
        stroke="#FFF"
        strokeWidth="2"
        strokeLinejoin="round"
        paintOrder="stroke fill"
      >
        Short
      </text>
      
      {/* "Forge" text with white stroke outline */}
      <text 
        x="1130" 
        y="180" 
        textAnchor="middle" 
        className={`codefont text-${size}`} 
        fill="#E91A40"
        stroke="#FFF"
        strokeWidth="2"
        strokeLinejoin="round"
        paintOrder="stroke fill"
      >
        Forge
      </text>
    </svg>
  );
};

export default ShortForgeText;
