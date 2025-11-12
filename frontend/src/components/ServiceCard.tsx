'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ServiceCardProps } from '@/types';

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  pricing,
  ctaText,
  onCtaClick,
  icon: Icon
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-secondary-800/50 backdrop-blur-sm border border-secondary-700 rounded-xl p-6 hover:bg-secondary-800/70 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-primary-400 mr-3" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <p className="text-secondary-300 mb-6">{description}</p>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-3">Key Features:</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-secondary-300 flex items-center">
              <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-3">Pricing:</h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-secondary-700/50 rounded p-2">
            <div className="text-xs text-secondary-400">Starter</div>
            <div className="text-sm font-medium text-white">{pricing.starter}</div>
          </div>
          <div className="bg-secondary-700/50 rounded p-2">
            <div className="text-xs text-secondary-400">Professional</div>
            <div className="text-sm font-medium text-white">{pricing.professional}</div>
          </div>
          <div className="bg-secondary-700/50 rounded p-2">
            <div className="text-xs text-secondary-400">Enterprise</div>
            <div className="text-sm font-medium text-white">{pricing.enterprise}</div>
          </div>
        </div>
      </div>

      <button
        onClick={onCtaClick}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        {ctaText}
      </button>
    </motion.div>
  );
};
