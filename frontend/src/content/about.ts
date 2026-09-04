import type { LucideIcon } from 'lucide-react';
import { Award, CheckCircle, Code, MessageSquare, Shield, TrendingUp, Users } from 'lucide-react';

export type Value = { icon: LucideIcon; title: string; body: string };

export const aboutHero = {
  eyebrow: 'About',
  title: 'ShortForge is one engineer.',
  paragraphs: [
    "My name is Stephen Psaradellis. I've spent seven years building software that banks and large enterprises run in production, and I'm currently a contract developer at PepsiCo. Payment APIs, compliance systems, and customer data platforms where being wrong is expensive.",
    "ShortForge is where I do that work for people who aren't banks. Websites and automation for businesses that would never get a call back from an agency, built the same careful way.",
  ],
};

export const values: Value[] = [
  {
    icon: Code,
    title: 'One person writes the code',
    body: 'ShortForge is me. Nothing is handed to a subcontractor, and the person you talk to on the phone is the person who ships it. That is a real limit on how much work I take, and it is also the whole point.',
  },
  {
    icon: Shield,
    title: 'You own what you pay for',
    body: 'Domains, hosting, code, and data go in accounts with your name on them. If you stop working with me, nothing breaks and nothing is held hostage.',
  },
  {
    icon: MessageSquare,
    title: 'I will tell you not to buy it',
    body: 'Most businesses do not need an AI agent. Some do not even need a new website. Saying so costs me one project and earns the next three.',
  },
];

export const stats = [
  { label: "Customers served by systems I've built", value: '20M+', icon: Users },
  { label: "Annual transactions on platforms I've worked on", value: '$15B+', icon: TrendingUp },
  { label: 'Global banks delivered for', value: '4', icon: CheckCircle },
  { label: 'Years building production software', value: '7', icon: Award },
];

export const timeline = [
  {
    year: '2019',
    title: 'University of Miami',
    body: 'B.S. in Computer Science, minor in Mathematics. Straight into energy trading: Java, Scala, and PL/SQL on a commodity trading and risk platform.',
  },
  {
    year: '2021',
    title: 'Consulting for financial institutions',
    body: 'Joined a global financial technology consultancy as a senior engineer, delivering across AWS, GCP, and Azure for banks with compliance obligations measured in millions of customers.',
  },
  {
    year: '2022',
    title: 'Payments, KYC, and customer data at scale',
    body: 'GraphQL platforms connecting founders with venture investors. Real-time identity verification for 20M+ retail banking customers. Tokenization of sensitive customer records. Spring Boot APIs handling 10K+ card activations a month.',
  },
  {
    year: '2024',
    title: 'Treasury systems and internal tooling',
    body: 'Microservices for a secure treasury portal serving 50,000+ commercial banking clients, and a code generation tool that cut new API development time by roughly 40%.',
  },
  {
    year: '2025',
    title: 'ShortForge',
    body: 'Started building on my own: a distributed content generation pipeline on FastAPI and Redis Queue, then voice agents on ElevenLabs wired into real scheduling workflows for businesses that take bookings by phone.',
  },
  {
    year: '2026',
    title: 'Small businesses around Chicago',
    body: 'Websites and automation for businesses near home, starting with chicagostreetmarkets.com: three farmers markets, nine pages, and a hosting bill of about twelve dollars a year.',
  },
];

export const aboutCta = {
  title: 'Want to talk?',
  body: "Tell me what the problem is and I'll tell you whether I'm the right person to solve it.",
};
