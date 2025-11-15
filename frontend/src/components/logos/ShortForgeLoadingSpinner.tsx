import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import shortforgeSvg from '@/assets/shortforge.svg';

interface ShortForgeLoadingSpinnerProps {
  size?: number;
  showText?: boolean;
  text?: string;
  className?: string;
}

/**
 * ShortForge Loading Spinner Component
 * 
 * An animated loading spinner using the ShortForge logo.
 * The logo pulses and glows to indicate loading state.
 * 
 * @param size - Size of the logo in pixels (default: 64)
 * @param showText - Whether to show loading text (default: true)
 * @param text - Custom loading text (default: "Loading...")
 * @param className - Additional classes for the container
 */
export const ShortForgeLoadingSpinner: React.FC<ShortForgeLoadingSpinnerProps> = ({
  size = 64,
  showText = true,
  text = 'Loading...',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="absolute inset-0 bg-ember-600/30 blur-xl rounded-full"
          animate={{
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ width: size * 1.5, height: size * 1.5, left: -size * 0.25, top: -size * 0.25 }}
        />
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={shortforgeSvg}
            alt="Loading"
            width={size}
            height={size}
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
      {showText && (
        <motion.p
          className="text-secondary-200 font-medium text-lg"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default ShortForgeLoadingSpinner;

