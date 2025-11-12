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
    className="card group hover:border-primary-600 transition-all duration-300"
  >
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>

    <p className="text-secondary-300 mb-6">{description}</p>

    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-2">
          <CheckCircle size={16} className="text-primary-500 flex-shrink-0" />
          <span className="text-secondary-300 text-sm">{feature}</span>
        </li>
      ))}
    </ul>

    {pricing && (
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Starting from:</h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-secondary-700 rounded-lg p-2">
            <div className="text-xs text-secondary-400">Starter</div>
            <div className="text-lg font-bold text-white">{pricing.starter}</div>
          </div>
          <div className="bg-secondary-700 rounded-lg p-2">
            <div className="text-xs text-secondary-400">Professional</div>
            <div className="text-lg font-bold text-white">{pricing.professional}</div>
          </div>
          <div className="bg-secondary-700 rounded-lg p-2">
            <div className="text-xs text-secondary-400">Enterprise</div>
            <div className="text-sm font-bold text-white">{pricing.enterprise}</div>
          </div>
        </div>
      </div>
    )}

    <Link
      href="/contact"
      className="btn-primary w-full text-center group-hover:bg-primary-500 transition-colors"
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
    className="card"
  >
    <div className="flex items-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-500 fill-current" />
      ))}
    </div>
    <p className="text-secondary-300 mb-6 italic">"{content}"</p>
    <div>
      <div className="font-semibold text-white">{name}</div>
      <div className="text-secondary-400 text-sm">{role}, {company}</div>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900/20">
        {/* Background particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Forge the Future with
              <span className="block text-primary-400">AI & Automation</span>
            </h1>

            <p className="text-xl md:text-2xl text-secondary-300 mb-8 max-w-3xl mx-auto">
              Transform your business with intelligent AI agents, streamlined automation systems,
              and cutting-edge IT solutions. Experience efficiency, intelligence, and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Talk to Forge Assistant
                  <ArrowRight size={20} className="ml-2 inline" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon size={32} className="text-primary-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-secondary-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
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
      <section className="py-24 bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
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
      <section className="py-24 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Forge Your Future?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join hundreds of companies already transforming their business with ShortForge.
              Let's discuss how we can help you achieve your goals.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="btn-primary text-lg px-8 py-4 bg-white text-primary-900 hover:bg-primary-50">
                Start Your Project
                <ArrowRight size={20} className="ml-2 inline" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
