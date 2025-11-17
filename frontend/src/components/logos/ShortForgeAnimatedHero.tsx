import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import shortforgeLogo from '@/assets/shortforge-logo.svg';

interface ShortForgeAnimatedHeroProps {
  size?: number;
  className?: string;
}

/**
 * ShortForge Animated Hero Logo
 * 
 * A large, animated version of the ShortForge logo perfect for hero sections.
 * Features entrance animations and continuous subtle floating effect.
 * 
 * @param size - Size in pixels (default: 120)
 * @param className - Additional classes for the container
 */
export const ShortForgeAnimatedHero: React.FC<ShortForgeAnimatedHeroProps> = ({
  size = 120,
  className = ''
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-ember-600/20 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ width: size * 1.8, height: size * 1.8, left: -size * 0.4, top: -size * 0.4 }}
      />
      
      {/* Logo with floating animation */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-glow"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src={shortforgeLogo}
          alt="ShortForge"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </motion.div>
      
      {/* Particles around logo */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-ember-500/60 rounded-full"
          style={{
            left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
            top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

export default ShortForgeAnimatedHero;

