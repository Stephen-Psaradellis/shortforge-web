'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Zap,
  Server,
  CheckCircle,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';
import { ServiceCardProps, TestimonialProps } from '@/types';

const services = [
  {
    title: 'AI Agents',
    description: 'Intelligent voice & chat agents powered by advanced AI models, integrated with your company data and workflows.',
    features: [
      'Natural language processing',
      'Voice & text interfaces',
      'Company data integration',
      '24/7 availability',
      'Multi-language support'
    ],
    pricing: {
      starter: '$2,999',
      professional: '$7,999',
      enterprise: 'Custom'
    },
    icon: Bot,
    ctaText: 'Get Started',
    onCtaClick: () => {
      // Scroll to contact section
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: 'Automation Systems',
    description: 'Streamline your business processes with intelligent workflow automation, API integrations, and RPA solutions.',
    features: [
      'Workflow automation',
      'API integrations',
      'Robotic process automation',
      'Custom scripting',
      'Monitoring & analytics'
    ],
    pricing: {
      starter: '$1,999',
      professional: '$4,999',
      enterprise: 'Custom'
    },
    icon: Zap,
    ctaText: 'Learn More',
    onCtaClick: () => {
      // Scroll to services section
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: 'IT Consulting',
    description: 'Expert cloud migrations, architecture design, and DevOps solutions to modernize your infrastructure.',
    features: [
      'Cloud migrations',
      'Architecture design',
      'DevOps implementation',
      'Security audits',
      'Performance optimization'
    ],
    pricing: {
      starter: '$999',
      professional: '$2,999',
      enterprise: 'Custom'
    },
    icon: Server,
    ctaText: 'Contact Us',
    onCtaClick: () => {
      // Scroll to contact section
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
];

const testimonials: TestimonialProps[] = [
  {
    name: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    role: 'CTO',
    content: 'ShortForge transformed our customer service with their AI agents. Response times improved by 80% and customer satisfaction soared.',
    avatar: '/avatars/sarah.jpg'
  },
  {
    name: 'Michael Chen',
    company: 'InnovateLabs',
    role: 'CEO',
    content: 'The automation systems they built saved us countless hours and eliminated human error. Their expertise is unmatched.',
    avatar: '/avatars/michael.jpg'
  },
  {
    name: 'Emily Rodriguez',
    company: 'DataFlow Systems',
    role: 'Operations Director',
    content: 'Their IT consulting helped us migrate to the cloud seamlessly. The entire process was smooth and our costs actually decreased.',
    avatar: '/avatars/emily.jpg'
  }
];

const stats = [
  { label: 'Projects Completed', value: '150+', icon: CheckCircle },
  { label: 'Client Satisfaction', value: '98%', icon: Star },
  { label: 'Team Members', value: '25+', icon: Users },
  { label: 'Efficiency Increase', value: '300%', icon: TrendingUp }
];

const ServiceCard: React.FC<ServiceCardProps & { icon: any }> = ({
  title,
  description,
  features,
  pricing,
  icon: Icon
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="card-interactive group"
  >
    <div className="flex items-center space-x-4 mb-5">
      <div className="w-14 h-14 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl flex items-center justify-center border border-ember-700/30 group-hover:border-ember-600/50 group-hover:shadow-glow-sm transition-all duration-300">
        <Icon size={28} className="text-ember-400 group-hover:text-ember-300 transition-colors" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>

    <p className="text-secondary-200 mb-6 leading-relaxed">{description}</p>

    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start space-x-3">
          <CheckCircle size={18} className="text-ember-500 flex-shrink-0 mt-0.5 shadow-glow-sm" />
          <span className="text-secondary-200 text-sm">{feature}</span>
        </li>
      ))}
    </ul>

    {pricing && (
      <div className="mb-6">
        <h4 className="text-white font-bold mb-4">Starting from:</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-forge-slate/50 rounded-lg p-3 border border-forge-steel/20 hover:border-ember-700/30 transition-all duration-200">
            <div className="text-xs text-secondary-300 font-medium mb-1">Starter</div>
            <div className="text-lg font-bold text-white">{pricing.starter}</div>
          </div>
          <div className="bg-gradient-to-br from-ember-900/20 to-ember-800/20 rounded-lg p-3 border border-ember-700/30 shadow-glow-sm">
            <div className="text-xs text-ember-400 font-medium mb-1">Pro</div>
            <div className="text-lg font-bold text-white">{pricing.professional}</div>
          </div>
          <div className="bg-forge-slate/50 rounded-lg p-3 border border-forge-steel/20 hover:border-ember-700/30 transition-all duration-200">
            <div className="text-xs text-secondary-300 font-medium mb-1">Enterprise</div>
            <div className="text-sm font-bold text-white">{pricing.enterprise}</div>
          </div>
        </div>
      </div>
    )}

    <Link
      href="/contact"
      className="btn-primary w-full text-center"
    >
      Get Started
    </Link>
  </motion.div>
);

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  company,
  role,
  content
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="card hover-lift"
  >
    <div className="flex items-center space-x-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={18} className="text-ember-500 fill-current" />
      ))}
    </div>
    <p className="text-secondary-100 mb-8 italic text-lg leading-relaxed">"{content}"</p>
    <div className="border-t border-forge-steel/20 pt-4">
      <div className="font-bold text-white text-lg">{name}</div>
      <div className="text-secondary-300 text-sm mt-1">{role}, {company}</div>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-forge-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forge-black via-forge-obsidian to-forge-charcoal">
        {/* Background particles */}
        <div className="particles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
                Forge the Future with
                <span className="block mt-2">
                  <span className="text-gradient-ember">AI & Automation</span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-secondary-100 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Transform your business with intelligent AI agents, streamlined automation systems,
              and cutting-edge IT solutions. Experience efficiency, intelligence, and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="btn-primary text-lg px-10 py-4 shadow-glow">
                  Talk to Forge Assistant
                  <ArrowRight size={22} className="ml-3 inline" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/services" className="btn-secondary text-lg px-10 py-4">
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forge-black to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-forge-charcoal border-y border-forge-steel/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl border border-ember-700/30 group-hover:border-ember-600/50 group-hover:shadow-glow-sm transition-all duration-300">
                  <stat.icon size={32} className="text-ember-400 group-hover:text-ember-300 transition-colors duration-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-secondary-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-28 bg-forge-black">
        {/* Subtle ember glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-ember-700/5 blur-3xl rounded-full"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gradient-ember">Services</span>
            </h2>
            <p className="text-xl text-secondary-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed to accelerate your business transformation
              and drive sustainable growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 bg-forge-charcoal border-y border-forge-steel/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="text-gradient-ember">Clients</span> Say
            </h2>
            <p className="text-xl text-secondary-100 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what industry leaders have to say
              about working with ShortForge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-forge-black overflow-hidden">
        {/* Dramatic ember glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-ember-900/10 via-ember-800/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-ember-700/10 blur-3xl rounded-full"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="text-gradient-ember">Forge Your Future?</span>
            </h2>
            <p className="text-xl md:text-2xl text-secondary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of companies already transforming their business with ShortForge.
              Let's discuss how we can help you achieve your goals.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="btn-primary text-lg px-12 py-5 shadow-glow hover:shadow-glow-lg">
                Start Your Project
                <ArrowRight size={22} className="ml-3 inline" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
