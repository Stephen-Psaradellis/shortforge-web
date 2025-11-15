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
      className="card-interactive group"
    >
      {/* Icon and Title */}
      <div className="flex items-center mb-5">
        <div className="w-12 h-12 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl flex items-center justify-center mr-4 border border-ember-700/30 group-hover:border-ember-600/50 group-hover:shadow-glow-sm transition-all duration-300">
          <Icon className="w-6 h-6 text-ember-400 group-hover:text-ember-300 transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-gradient-ember transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-secondary-200 mb-6 leading-relaxed">{description}</p>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-white mb-4">Key Features:</h4>
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-secondary-200 flex items-start">
              <div className="w-1.5 h-1.5 bg-ember-500 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-glow-sm" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-white mb-4">Pricing:</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-forge-slate/50 rounded-lg p-3 border border-forge-steel/20 hover:border-ember-700/30 transition-all duration-200">
            <div className="text-xs text-secondary-300 mb-1 font-medium">Starter</div>
            <div className="text-sm font-bold text-white">{pricing.starter}</div>
          </div>
          <div className="bg-gradient-to-br from-ember-900/20 to-ember-800/20 rounded-lg p-3 border border-ember-700/30 shadow-glow-sm">
            <div className="text-xs text-ember-400 mb-1 font-medium">Pro</div>
            <div className="text-sm font-bold text-white">{pricing.professional}</div>
          </div>
          <div className="bg-forge-slate/50 rounded-lg p-3 border border-forge-steel/20 hover:border-ember-700/30 transition-all duration-200">
            <div className="text-xs text-secondary-300 mb-1 font-medium">Enterprise</div>
            <div className="text-sm font-bold text-white">{pricing.enterprise}</div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onCtaClick}
        className="btn-primary w-full"
      >
        {ctaText}
      </button>
    </motion.div>
  );
};
