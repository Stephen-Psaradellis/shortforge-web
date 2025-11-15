'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Bot,
  Zap,
  Server,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Shield,
  BarChart3,
  Globe,
  Cpu,
  Database,
  Cloud,
  Code,
  Settings
} from 'lucide-react';

const services = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    subtitle: 'Voice & Chat Agents',
    description: 'Intelligent conversational agents that understand context, learn from interactions, and provide human-like responses while being integrated with your company data.',
    icon: Bot,
    features: [
      {
        icon: Users,
        title: 'Natural Conversations',
        description: 'Advanced NLP for human-like interactions'
      },
      {
        icon: Globe,
        title: 'Multi-Language Support',
        description: 'Support for 50+ languages and dialects'
      },
      {
        icon: Database,
        title: 'Company Data Integration',
        description: 'Trained on your specific business knowledge'
      },
      {
        icon: Clock,
        title: '24/7 Availability',
        description: 'Always-on support without human limitations'
      },
      {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-grade security and data protection'
      },
      {
        icon: BarChart3,
        title: 'Analytics & Insights',
        description: 'Detailed interaction analytics and reporting'
      }
    ],
    pricing: {
      starter: { price: '$2,999', features: ['1 AI Agent', 'Basic Integration', '5,000 interactions/month', 'Email Support'] },
      professional: { price: '$7,999', features: ['3 AI Agents', 'Advanced Integration', '25,000 interactions/month', 'Priority Support', 'Custom Training'] },
      enterprise: { price: 'Custom', features: ['Unlimited Agents', 'Full Integration', 'Unlimited interactions', 'Dedicated Support', 'Custom Development', 'SLA Guarantee'] }
    },
    useCases: [
      'Customer Support Automation',
      'Sales Lead Qualification',
      'Technical Support',
      'HR Assistant',
      'Appointment Scheduling',
      'Knowledge Base Queries'
    ]
  },
  {
    id: 'automation',
    title: 'Automation Systems',
    subtitle: 'Workflow Automation & RPA',
    description: 'Streamline your business processes with intelligent automation that eliminates repetitive tasks, reduces errors, and increases efficiency.',
    icon: Zap,
    features: [
      {
        icon: Settings,
        title: 'Workflow Automation',
        description: 'Design and deploy complex business workflows'
      },
      {
        icon: Code,
        title: 'API Integrations',
        description: 'Connect with 200+ popular business applications'
      },
      {
        icon: Cpu,
        title: 'Robotic Process Automation',
        description: 'Automate desktop and web-based processes'
      },
      {
        icon: Database,
        title: 'Data Processing',
        description: 'Intelligent data extraction and transformation'
      },
      {
        icon: Shield,
        title: 'Error Handling',
        description: 'Robust error detection and recovery mechanisms'
      },
      {
        icon: BarChart3,
        title: 'Performance Monitoring',
        description: 'Real-time monitoring and optimization insights'
      }
    ],
    pricing: {
      starter: { price: '$1,999', features: ['5 Workflows', 'Basic Integrations', '1,000 executions/month', 'Email Support'] },
      professional: { price: '$4,999', features: ['25 Workflows', 'Advanced Integrations', '10,000 executions/month', 'Priority Support', 'Custom Scripts'] },
      enterprise: { price: 'Custom', features: ['Unlimited Workflows', 'Full API Access', 'Unlimited executions', 'Dedicated Support', 'Custom Development', 'SLA Guarantee'] }
    },
    useCases: [
      'Invoice Processing',
      'Customer Onboarding',
      'Report Generation',
      'Data Synchronization',
      'Quality Assurance',
      'Compliance Monitoring'
    ]
  },
  {
    id: 'consulting',
    title: 'IT Consulting',
    subtitle: 'Cloud & Infrastructure Solutions',
    description: 'Expert guidance for modernizing your IT infrastructure with cloud migrations, architecture design, and DevOps best practices.',
    icon: Server,
    features: [
      {
        icon: Cloud,
        title: 'Cloud Migrations',
        description: 'Seamless migration to AWS, Azure, or GCP'
      },
      {
        icon: Settings,
        title: 'Architecture Design',
        description: 'Scalable and secure system architectures'
      },
      {
        icon: Code,
        title: 'DevOps Implementation',
        description: 'CI/CD pipelines and infrastructure as code'
      },
      {
        icon: Shield,
        title: 'Security Audits',
        description: 'Comprehensive security assessments and recommendations'
      },
      {
        icon: BarChart3,
        title: 'Performance Optimization',
        description: 'System performance analysis and optimization'
      },
      {
        icon: Users,
        title: 'Team Training',
        description: 'Knowledge transfer and team enablement'
      }
    ],
    pricing: {
      starter: { price: '$999', features: ['Architecture Review', 'Basic Recommendations', 'Implementation Guide', 'Email Support'] },
      professional: { price: '$2,999', features: ['Full Assessment', 'Detailed Roadmap', 'Implementation Support', 'Priority Support', 'Team Training'] },
      enterprise: { price: 'Custom', features: ['Complete Transformation', 'Full Implementation', 'Ongoing Support', 'Dedicated Team', 'Custom Development', 'SLA Guarantee'] }
    },
    useCases: [
      'Cloud Migration Planning',
      'System Architecture Review',
      'DevOps Transformation',
      'Security Compliance',
      'Performance Optimization',
      'Digital Transformation'
    ]
  }
];

const ServiceDetail: React.FC<{ service: typeof services[0] }> = ({ service }) => {
  const Icon = service.icon;

  return (
    <div id={service.id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-2xl mb-8 border border-ember-700/30 shadow-glow-sm">
            <Icon size={40} className="text-ember-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {service.title}
          </h2>
          <p className="text-2xl font-semibold mb-6">
            <span className="text-gradient-ember">{service.subtitle}</span>
          </p>
          <p className="text-lg text-secondary-100 max-w-4xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {service.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-interactive group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl flex items-center justify-center border border-ember-700/30 group-hover:border-ember-600/50 group-hover:shadow-glow-sm transition-all duration-300">
                  <feature.icon size={22} className="text-ember-400 group-hover:text-ember-300 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-secondary-200 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="card mb-20">
          <h3 className="text-2xl font-bold text-white mb-8">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.useCases.map((useCase, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-ember-500 flex-shrink-0 mt-0.5 shadow-glow-sm" />
                <span className="text-secondary-200 font-medium">{useCase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-white text-center mb-16">Pricing Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(service.pricing).map(([tier, details], index) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`card-interactive ${tier === 'professional' ? 'border-ember-600/50 shadow-glow' : ''}`}
              >
                {tier === 'professional' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-ember-700 to-ember-600 text-white text-sm font-bold rounded-full shadow-glow">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-white capitalize mb-4">{tier}</h4>
                  <div className="text-4xl font-bold text-ember-400 mb-2">{details.price}</div>
                  {tier !== 'enterprise' && <div className="text-secondary-300 font-medium">per month</div>}
                </div>

                <ul className="space-y-4 mb-10">
                  {details.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-ember-500 flex-shrink-0 mt-0.5 shadow-glow-sm" />
                      <span className="text-secondary-200 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`btn-primary w-full text-center ${
                    tier === 'professional' ? '' : 'btn-secondary'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative card-glow overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ember-900/20 to-ember-800/10 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-5">
                Ready to Transform Your Business?
              </h3>
              <p className="text-secondary-100 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Let's discuss how {service.title} can help you achieve your goals.
                Schedule a free consultation with our experts.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center shadow-glow">
                Schedule Consultation
                <ArrowRight size={22} className="ml-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Services() {
  return (
    <div className="min-h-screen bg-forge-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Our <span className="text-gradient-ember">Services</span>
          </h1>
          <p className="text-xl text-secondary-100 max-w-4xl mx-auto mb-10 leading-relaxed">
            Comprehensive AI, automation, and IT solutions designed to accelerate
            your digital transformation and drive sustainable business growth.
          </p>
          <Link href="#ai-agents" className="btn-primary shadow-glow inline-flex items-center">
            Explore Services
            <ArrowRight size={22} className="ml-3" />
          </Link>
        </motion.div>

        {/* Services Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="px-6 py-3 bg-forge-charcoal hover:bg-forge-smoke text-secondary-200 hover:text-white rounded-lg transition-all duration-200 border border-forge-steel/30 hover:border-ember-600/50 font-medium"
            >
              {service.title}
            </a>
          ))}
        </motion.div>

        {/* Service Details */}
        {services.map((service, index) => (
          <ServiceDetail key={service.id} service={service} />
        ))}

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="relative card-glow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ember-900/20 to-ember-800/10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-ember-700/10 blur-3xl rounded-full"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-6">
                Not Sure Which Service is <span className="text-gradient-ember">Right for You?</span>
              </h2>
              <p className="text-secondary-100 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
                Our team of experts will assess your needs and recommend the perfect solution
                for your business. Get a free consultation and discover how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link href="/contact" className="btn-primary shadow-glow">
                  Get Free Consultation
                </Link>
                <Link href="tel:+1234567890" className="btn-secondary">
                  Call Us: (123) 456-7890
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
