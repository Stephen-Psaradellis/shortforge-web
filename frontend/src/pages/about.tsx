'use client';

import { motion } from 'framer-motion';
import {
  Target,
  Users,
  Award,
  TrendingUp,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  Globe,
  Code,
  Zap
} from 'lucide-react';

const team = [
  {
    name: 'Alex Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former AI researcher at Google with 10+ years in machine learning and enterprise software.',
    image: '/team/alex.jpg',
    linkedin: '#'
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Microsoft engineer specializing in scalable systems and DevOps automation.',
    image: '/team/sarah.jpg',
    linkedin: '#'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of AI',
    bio: 'PhD in Computer Science, expert in conversational AI and natural language processing.',
    image: '/team/marcus.jpg',
    linkedin: '#'
  },
  {
    name: 'Emily Zhang',
    role: 'VP of Engineering',
    bio: 'Former Tech Lead at Amazon, passionate about building reliable and efficient systems.',
    image: '/team/emily.jpg',
    linkedin: '#'
  }
];

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for perfection in every solution we deliver, ensuring the highest quality standards.'
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Your success is our success. We build long-term partnerships based on trust and results.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay at the forefront of technology, continuously exploring new ways to solve problems.'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Data protection and privacy are paramount in everything we do.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, both within our company and with our clients.'
  },
  {
    icon: Rocket,
    title: 'Impact',
    description: 'We measure our success by the positive impact we create for our clients and society.'
  }
];

const milestones = [
  {
    year: '2019',
    title: 'Company Founded',
    description: 'ShortForge was established with a vision to democratize AI and automation technologies.'
  },
  {
    year: '2020',
    title: 'First AI Agent Deployment',
    description: 'Successfully deployed our first enterprise-grade AI agent for a Fortune 500 company.'
  },
  {
    year: '2021',
    title: 'Series A Funding',
    description: 'Raised $5M to accelerate development of our automation platform.'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Opened offices in London and Singapore, serving clients worldwide.'
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Named one of the top 10 AI companies by TechCrunch and Gartner.'
  },
  {
    year: '2024',
    title: '1,000+ Projects Completed',
    description: 'Reached a milestone of over 1,000 successful project deliveries.'
  }
];

const stats = [
  { label: 'Years of Experience', value: '5+', icon: Award },
  { label: 'Team Members', value: '25+', icon: Users },
  { label: 'Projects Delivered', value: '1,000+', icon: TrendingUp },
  { label: 'Client Satisfaction', value: '98%', icon: Heart }
];

const ValueCard: React.FC<{ value: typeof values[0] }> = ({ value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="card text-center group hover:border-primary-600 transition-all duration-300"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600/20 rounded-xl mb-4 group-hover:bg-primary-600/30 transition-colors">
      <value.icon size={32} className="text-primary-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
    <p className="text-secondary-300">{value.description}</p>
  </motion.div>
);

const TeamMember: React.FC<{ member: typeof team[0] }> = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="card text-center"
  >
    <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-2xl font-bold text-white">
        {member.name.split(' ').map(n => n[0]).join('')}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
    <p className="text-primary-400 font-medium mb-3">{member.role}</p>
    <p className="text-secondary-300 text-sm">{member.bio}</p>
  </motion.div>
);

const Milestone: React.FC<{ milestone: typeof milestones[0] }> = ({ milestone }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">{milestone.year.slice(-2)}</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-primary-400 font-semibold mb-1">{milestone.year}</div>
        <h3 className="text-lg font-bold text-white mb-2">{milestone.title}</h3>
        <p className="text-secondary-300">{milestone.description}</p>
      </div>
    </div>
  </motion.div>
);

export default function About() {
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
            About ShortForge
          </h1>
          <p className="text-xl text-secondary-300 max-w-4xl mx-auto">
            We're a team of AI researchers, engineers, and business strategists
            passionate about democratizing cutting-edge technology. Our mission is
            to help businesses harness the power of AI and automation to achieve
            unprecedented efficiency and growth.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon size={32} className="text-primary-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-secondary-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <Target size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-secondary-300 text-lg leading-relaxed">
              To empower businesses of all sizes with intelligent automation and AI solutions
              that drive efficiency, innovation, and sustainable growth. We believe technology
              should work for you, not the other way around.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center">
                <Globe size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-secondary-300 text-lg leading-relaxed">
              A world where every business, regardless of size or industry, can leverage
              the power of AI and automation to solve complex problems, create new opportunities,
              and achieve their full potential.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our culture as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} />
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              From humble beginnings to industry leaders, here's how we've grown and evolved.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Milestone key={index} milestone={milestone} />
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              The brilliant minds behind ShortForge, combining decades of experience
              in AI, engineering, and business strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card bg-gradient-to-r from-primary-900 to-primary-800 border-primary-600">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-secondary-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already transforming their business with ShortForge.
              Let's discuss how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Start Your Project
              </a>
              <a href="/services" className="btn-secondary">
                Explore Services
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
