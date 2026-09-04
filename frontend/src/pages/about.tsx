'use client';

import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Code,
  Shield,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { ShortForgeIcon, ShortForgePattern } from '@/components/logos';

const stats = [
  { label: 'Customers served by systems I\'ve built', value: '20M+', icon: Users },
  { label: 'Annual transactions on platforms I\'ve worked on', value: '$15B+', icon: TrendingUp },
  { label: 'Global banks delivered for', value: '4', icon: CheckCircle },
  { label: 'Years building production software', value: '7', icon: Award },
];

const values = [
  {
    icon: Code,
    title: 'One person writes the code',
    description:
      'ShortForge is me. Nothing is handed to a subcontractor, and the person you talk to on the phone is the person who ships it. That is a real limit on how much work I take, and it is also the whole point.',
  },
  {
    icon: Shield,
    title: 'You own what you pay for',
    description:
      'Domains, hosting, code, and data go in accounts with your name on them. If you stop working with me, nothing breaks and nothing is held hostage.',
  },
  {
    icon: MessageSquare,
    title: 'I will tell you not to buy it',
    description:
      'Most businesses do not need an AI agent. Some do not even need a new website. Saying so costs me one project and earns the next three.',
  },
];

const timeline = [
  {
    year: '2019',
    title: 'University of Miami',
    description:
      'B.S. in Computer Science, minor in Mathematics. Straight into energy trading — Java, Scala, and PL/SQL on a commodity trading and risk platform.',
  },
  {
    year: '2021',
    title: 'Consulting for financial institutions',
    description:
      'Joined a global financial technology consultancy as a senior engineer, delivering across AWS, GCP, and Azure for banks with compliance obligations measured in millions of customers.',
  },
  {
    year: '2022',
    title: 'Payments, KYC, and customer data at scale',
    description:
      'GraphQL platforms connecting founders with venture investors. Real-time identity verification for 20M+ retail banking customers. Tokenization of sensitive customer records. Spring Boot APIs handling 10K+ card activations a month.',
  },
  {
    year: '2024',
    title: 'Treasury systems and internal tooling',
    description:
      'Microservices for a secure treasury portal serving 50,000+ commercial banking clients, and a code generation tool that cut new API development time by roughly 40%.',
  },
  {
    year: '2025',
    title: 'ShortForge',
    description:
      'Started building on my own — a distributed content generation pipeline on FastAPI and Redis Queue, then voice agents on ElevenLabs wired into real scheduling workflows. The assistant on this site is one of them.',
  },
  {
    year: '2026',
    title: 'Small businesses around Chicago',
    description:
      'Websites and automation for businesses near home, starting with chicagostreetmarkets.com — three farmers markets, nine pages, and a hosting bill of about twelve dollars a year.',
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About — ShortForge</title>
        <meta
          name="description"
          content="ShortForge is Stephen Psaradellis, a software engineer in Chicago. Seven years building production systems for banks and enterprises, now building websites and AI automation for small businesses."
        />
      </Head>

      <div className="min-h-screen bg-forge-black">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-forge-black via-forge-obsidian to-forge-charcoal">
          <ShortForgePattern count={12} opacity={0.03} size={100} />
          <div className="absolute inset-0 grid-bg opacity-20" />

          <div className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-8">
                <ShortForgeIcon size={72} />
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                ShortForge is{' '}
                <span className="text-gradient-ember">one engineer</span>
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-secondary-100">
                My name is Stephen Psaradellis. I&apos;ve spent seven years building
                software that banks and large enterprises run in production — payment
                APIs, compliance systems, and customer data platforms where being wrong
                is expensive.
              </p>
              <p className="mt-5 max-w-3xl text-xl leading-relaxed text-secondary-100">
                ShortForge is where I do that work for people who aren&apos;t banks: AI
                agents, automation, and websites for businesses that would never get a
                call back from an agency.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/websites" className="btn-primary">
                  Websites for small businesses
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-forge-steel/10 bg-forge-charcoal py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl border border-ember-700/30 bg-gradient-to-br from-ember-700/20 to-ember-800/20 transition-all duration-300 group-hover:border-ember-600/50 group-hover:shadow-glow-sm">
                    <stat.icon size={32} className="text-ember-400" />
                  </div>
                  <div className="mb-2 text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-secondary-200">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How I work */}
        <section className="bg-forge-black py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                How I <span className="text-gradient-ember">work</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-interactive group text-center"
                >
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl border border-ember-700/30 bg-gradient-to-br from-ember-700/20 to-ember-800/20 transition-all duration-300 group-hover:border-ember-600/50 group-hover:shadow-glow-sm">
                    <value.icon size={32} className="text-ember-400" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-white">{value.title}</h3>
                  <p className="leading-relaxed text-secondary-200">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-y border-forge-steel/10 bg-forge-charcoal py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Where this <span className="text-gradient-ember">came from</span>
              </h2>
            </motion.div>

            <div className="space-y-10">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="flex w-20 shrink-0 justify-end pt-1">
                    <span className="font-bold text-ember-500">{item.year}</span>
                  </div>
                  <div className="border-l border-forge-steel/30 pb-2 pl-6">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-secondary-200">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-forge-black py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-ember-900/10 via-ember-800/5 to-transparent" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Want to talk?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-secondary-100">
              Tell me what the problem is and I&apos;ll tell you whether I&apos;m the
              right person to solve it.
            </p>
            <Link href="/contact" className="btn-primary px-10 py-4 text-lg">
              Get in touch
              <ArrowRight size={20} className="ml-3 inline" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
