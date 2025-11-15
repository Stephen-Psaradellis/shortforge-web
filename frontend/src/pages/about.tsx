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
import { ShortForgeIcon, ShortForgePattern } from '@/components/logos';

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
    className="card-interactive text-center group"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl mb-6 border border-ember-700/30 group-hover:border-ember-600/50 group-hover:shadow-glow-sm transition-all duration-300">
      <value.icon size={32} className="text-ember-400 group-hover:text-ember-300 transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
    <p className="text-secondary-200 leading-relaxed">{value.description}</p>
  </motion.div>
);

const TeamMember: React.FC<{ member: typeof team[0] }> = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="card hover-lift text-center"
  >
    <div className="w-28 h-28 bg-gradient-to-br from-ember-700 to-ember-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-glow border-4 border-forge-charcoal">
      <span className="text-3xl font-bold text-white">
        {member.name.split(' ').map(n => n[0]).join('')}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
    <p className="text-ember-400 font-semibold mb-4">{member.role}</p>
    <p className="text-secondary-200 text-sm leading-relaxed">{member.bio}</p>
  </motion.div>
);

const Milestone: React.FC<{ milestone: typeof milestones[0] }> = ({ milestone }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="flex items-start space-x-5">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-gradient-to-br from-ember-700 to-ember-800 rounded-xl flex items-center justify-center border border-ember-700/30 group-hover:shadow-glow-sm transition-all duration-300">
          <span className="text-white font-bold text-lg">{milestone.year.slice(-2)}</span>
        </div>
      </div>
      <div className="flex-1 pt-1">
        <div className="text-ember-400 font-bold mb-2">{milestone.year}</div>
        <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
        <p className="text-secondary-200 leading-relaxed">{milestone.description}</p>
      </div>
    </div>
  </motion.div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-forge-black relative">
      {/* Background logo pattern */}
      <ShortForgePattern count={10} opacity={0.02} size={120} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <ShortForgeIcon size={80} glow={true} />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            About <span className="text-gradient-ember">ShortForge</span>
          </h1>
          <p className="text-xl text-secondary-100 max-w-4xl mx-auto leading-relaxed">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-28"
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
              <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl border border-ember-700/30 group-hover:border-ember-600/50 group-hover:shadow-glow-sm transition-all duration-300">
                <stat.icon size={32} className="text-ember-400 group-hover:text-ember-300 transition-colors" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-secondary-200 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-28"
        >
          <div className="card-glow hover-lift">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl flex items-center justify-center border border-ember-700/30 shadow-glow-sm">
                <Target size={28} className="text-ember-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-secondary-100 text-lg leading-relaxed">
              To empower businesses of all sizes with intelligent automation and AI solutions
              that drive efficiency, innovation, and sustainable growth. We believe technology
              should work for you, not the other way around.
            </p>
          </div>

          <div className="card-glow hover-lift">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl flex items-center justify-center border border-ember-700/30 shadow-glow-sm">
                <Globe size={28} className="text-ember-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-secondary-100 text-lg leading-relaxed">
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
          className="mb-28"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gradient-ember">Values</span>
            </h2>
            <p className="text-xl text-secondary-100 max-w-3xl mx-auto leading-relaxed">
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
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-28"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gradient-ember">Journey</span>
            </h2>
            <p className="text-xl text-secondary-100 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to industry leaders, here's how we've grown and evolved.
            </p>
          </div>

          <div className="space-y-10">
            {milestones.map((milestone, index) => (
              <Milestone key={index} milestone={milestone} />
            ))}
          </div>
        </motion.div> */}

        {/* Team */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-28"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="text-gradient-ember">Team</span>
            </h2>
            <p className="text-xl text-secondary-100 max-w-3xl mx-auto leading-relaxed">
              The brilliant minds behind ShortForge, combining decades of experience
              in AI, engineering, and business strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </motion.div> */}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative card-glow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ember-900/20 to-ember-800/10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-ember-700/10 blur-3xl rounded-full"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to <span className="text-gradient-ember">Work With Us?</span>
              </h2>
              <p className="text-secondary-100 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
                Join hundreds of companies already transforming their business with ShortForge.
                Let's discuss how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a href="/contact" className="btn-primary shadow-glow">
                  Start Your Project
                </a>
                <a href="/services" className="btn-secondary">
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
