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
        className="mb-16"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-6">
            <Icon size={32} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {service.title}
          </h2>
          <p className="text-xl text-primary-400 font-medium mb-4">
            {service.subtitle}
          </p>
          <p className="text-lg text-secondary-300 max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {service.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:border-primary-600 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center group-hover:bg-primary-600/30 transition-colors">
                  <feature.icon size={20} className="text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-secondary-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="card mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.useCases.map((useCase, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-secondary-300">{useCase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Pricing Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(service.pricing).map(([tier, details], index) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`card ${tier === 'professional' ? 'border-primary-600 bg-primary-600/5' : ''}`}
              >
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-white capitalize mb-2">{tier}</h4>
                  <div className="text-3xl font-bold text-primary-400 mb-1">{details.price}</div>
                  {tier !== 'enterprise' && <div className="text-secondary-400">per month</div>}
                </div>

                <ul className="space-y-3 mb-8">
                  {details.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle size={16} className="text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`btn-primary w-full text-center ${
                    tier === 'professional'
                      ? 'bg-primary-600 hover:bg-primary-500'
                      : 'bg-secondary-700 hover:bg-secondary-600'
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
            className="card bg-gradient-to-r from-primary-900 to-primary-800 border-primary-600"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-primary-100 mb-6">
              Let's discuss how {service.title} can help you achieve your goals.
              Schedule a free consultation with our experts.
            </p>
            <Link href="/contact" className="btn-primary bg-white text-primary-900 hover:bg-primary-50">
              Schedule Consultation
              <ArrowRight size={20} className="ml-2 inline" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Services() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto mb-8">
            Comprehensive AI, automation, and IT solutions designed to accelerate
            your digital transformation and drive sustainable business growth.
          </p>
          <Link href="#ai-agents" className="btn-primary">
            Explore Services
            <ArrowRight size={20} className="ml-2 inline" />
          </Link>
        </motion.div>

        {/* Services Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="px-6 py-3 bg-secondary-800 hover:bg-secondary-700 text-secondary-300 hover:text-white rounded-lg transition-colors border border-secondary-700 hover:border-primary-600"
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
          className="text-center py-16"
        >
          <div className="card bg-gradient-to-r from-primary-900 via-primary-800 to-accent-900 border-primary-600">
            <h2 className="text-3xl font-bold text-white mb-4">
              Not Sure Which Service is Right for You?
            </h2>
            <p className="text-secondary-300 mb-8 max-w-2xl mx-auto">
              Our team of experts will assess your needs and recommend the perfect solution
              for your business. Get a free consultation and discover how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get Free Consultation
              </Link>
              <Link href="tel:+1234567890" className="btn-secondary">
                Call Us: (123) 456-7890
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
