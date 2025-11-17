/**
 * Agent Page - Dynamic Route
 *
 * Personalized agent experience page that accepts agent_id as route parameter
 * and domain_id as optional query parameter. Integrates voice widget with
 * business intelligence-driven marketing pitch.
 */

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { MessageCircle, TrendingUp, Users, Target, ArrowRight, AlertCircle } from 'lucide-react';

import { AgentPageProps, BusinessIntelligence, AgentMetadata, MarketingPitch } from '../../types';
import { businessIntelligenceApi } from '../../lib/api';

// Type declaration for ElevenLabs Convai widget
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'agent-id'?: string;
      };
    }
  }
}

/**
 * Agent Page Component
 *
 * Displays personalized marketing content and integrates voice widget
 * for AI agent conversations based on business intelligence.
 */
const AgentPage: NextPage<AgentPageProps> = ({
  businessIntelligence,
  agentMetadata,
  marketingPitch,
  error,
  apiError
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const elevenLabsLoaded = useRef(false);

  // Handle loading state for client-side navigation
  useEffect(() => {
    setIsLoading(router.isFallback);
  }, [router.isFallback]);

  // Load ElevenLabs widget script for agent pages
  useEffect(() => {
    if (!elevenLabsLoaded.current && agentMetadata?.elevenlabs_agent_id) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
      elevenLabsLoaded.current = true;
    }
  }, [agentMetadata?.elevenlabs_agent_id]);

  // Error state handling
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">Something went wrong</h1>
          <p className="text-secondary-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (isLoading || router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      {/* Development-only API error indicator */}
      {process.env.NODE_ENV === 'development' && apiError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 text-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="font-medium">API Error Detected</p>
              <p>Business intelligence API failed. Showing fallback data for development.</p>
            </div>
          </div>
        </div>
      )}

      <Head>
        <title>{marketingPitch?.headline || 'AI Agent Consultation'} | ShortForge</title>
        <meta
          name="description"
          content={marketingPitch?.subheadline || 'Transform your business with personalized AI agent solutions'}
        />
        <meta name="robots" content="noindex, nofollow" /> {/* Prevent indexing of dynamic agent pages */}
      </Head>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >

                {/* Personalized Marketing Pitch */}
                {marketingPitch && (
                  <div className="space-y-6">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight"
                    >
                      {marketingPitch.headline}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl md:text-2xl text-secondary-600 leading-relaxed"
                    >
                      {marketingPitch.subheadline}
                    </motion.p>

                    {/* Key Benefits */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4"
                    >
                      {marketingPitch.key_benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-primary-600 rounded-full" />
                          </div>
                          <p className="text-secondary-700 leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Business Intelligence Insights */}
                {businessIntelligence && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-secondary-200"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-primary-600" />
                      <h3 className="font-semibold text-secondary-900">Business Insights</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {businessIntelligence.industry && (
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-secondary-400" />
                          <span className="text-secondary-600">{businessIntelligence.industry}</span>
                        </div>
                      )}

                      {businessIntelligence.employee_count && (
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-secondary-400" />
                          <span className="text-secondary-600">{businessIntelligence.employee_count} employees</span>
                        </div>
                      )}

                      {businessIntelligence.location && (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-secondary-200" />
                          <span className="text-secondary-600">{businessIntelligence.location}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Call to Action */}
                {marketingPitch && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <button className="group bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      <span className="flex items-center justify-center space-x-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>{marketingPitch.call_to_action}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>

                    {marketingPitch.social_proof && (
                      <div className="flex items-center space-x-2 text-secondary-600">
                        <div className="w-1 h-1 bg-secondary-400 rounded-full" />
                        <span className="text-sm">{marketingPitch.social_proof}</span>
                      </div>
                    )}
                  </motion.div>
                )}

              </motion.div>

              {/* Voice Widget Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-secondary-200">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                      Meet Your AI Agent
                    </h2>
                    <p className="text-secondary-600">
                      {agentMetadata?.description || 'An intelligent assistant ready to help transform your business'}
                    </p>
                  </div>

                  {/* Agent Avatar/Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Agent Capabilities */}
                  {agentMetadata?.capabilities && (
                    <div className="space-y-3 mb-6">
                      {agentMetadata.capabilities.slice(0, 3).map((capability, index) => (
                        <div key={index} className="flex items-center space-x-3 text-sm">
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                          <span className="text-secondary-700">{capability}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Voice Widget Trigger */}
                  <div className="text-center">
                    <p className="text-secondary-500 text-sm mb-4">
                      Click the floating button to start your conversation
                    </p>
                    <div className="inline-flex items-center space-x-2 text-primary-600 font-medium">
                      <MessageCircle className="w-4 h-4" />
                      <span>Voice-Enabled AI Assistant</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Personalized Insights Section */}
        {marketingPitch?.personalized_insights && marketingPitch.personalized_insights.length > 0 && (
          <section className="py-16 bg-secondary-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                  Why Choose <span className="font-bold"><span className="text-forge-charcoal">Short</span><span className="text-ember-600">Forge</span></span>?
                </h2>
                <p className="text-lg text-secondary-600">
                  Personalized insights tailored to your business
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {marketingPitch.personalized_insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200 text-center"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                    <p className="text-secondary-700">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* ElevenLabs Voice Widget */}
      {agentMetadata?.elevenlabs_agent_id && (
        <elevenlabs-convai agent-id={agentMetadata.elevenlabs_agent_id}></elevenlabs-convai>
      )}
    </>
  );
};

/**
 * Server-Side Data Loading
 *
 * Fetches business intelligence and generates personalized marketing pitch
 * for the agent page based on agent_id route parameter and domain_id query parameter.
 */
export const getServerSideProps: GetServerSideProps<AgentPageProps> = async (context) => {
  try {
    const { agent_id } = context.params as { agent_id: string };
    const { domain_id } = context.query;

    // Validate agent_id parameter
    if (!agent_id || typeof agent_id !== 'string') {
      return {
        notFound: true,
      };
    }

    // Validate domain_id query parameter (required for business intelligence)
    if (!domain_id || typeof domain_id !== 'string') {
      return {
        props: {
          domainId: '',
          agentId: agent_id,
          businessIntelligence: null,
          agentMetadata: null,
          marketingPitch: null,
          error: 'Domain ID is required. Please provide ?domain_id=your-domain in the URL.',
        },
      };
    }

    // SupaGent API expects domain identifiers as strings (e.g., '1', '2')
    // Keep domain_id as-is since SupaGent uses these as primary keys
    const actualDomain = domain_id;

    // Fetch business intelligence from backend API using domain_id
    let businessIntelligence: BusinessIntelligence | null = null;
    let marketingPitch: MarketingPitch | null = null;
    let hasApiError = false;

    try {
      // Direct fetch to backend API for server-side rendering
      const baseUrl = process.env.NEXT_PUBLIC_SHORTFORGE_WEB_URL || 'http://localhost:8000';
      // Ensure the base URL has a protocol
      const apiUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
      const response = await fetch(`${apiUrl}/api/v1/business-intelligence/domain/${actualDomain}`);

      if (!response.ok) {
        // Try to get error details from response body
        let errorDetails = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetails = errorData.message || errorData.detail || errorDetails;
        } catch {
          // If we can't parse the error response, use the status text
          errorDetails = response.statusText || errorDetails;
        }
        throw new Error(`API request failed: ${errorDetails}`);
      }

      const data = await response.json();
      businessIntelligence = data.data;
      marketingPitch = data.marketing_pitch;  // Pitch is now returned directly from backend
      console.log('Business intelligence data:', businessIntelligence);
      console.log('Marketing pitch:', marketingPitch);
    } catch (apiError: any) {
      hasApiError = true;
      console.error('Backend business intelligence API error:', apiError);
      console.error('Error details:', apiError.message);

      // For debugging/development, you might want to re-throw to see errors
      // But for production, we gracefully fall back to mock data
      if (process.env.NODE_ENV === 'development') {
        console.warn('API error occurred, falling back to mock data. In production, this would show fallback data.');
      }
    }

    // Fallback to mock data for domain '1' (ShortForge) if no data available
    if (!businessIntelligence && actualDomain === '1') {
      businessIntelligence = {
        domain_id: '1',
        domain: 'shortforge.dev',
        company_name: 'ShortForge',
        industry: 'AI & Automation Consultancy',
        description: 'Empowering businesses with AI, automation, and innovative IT solutions. Building the future of intelligent systems through cutting-edge technology and strategic consulting.',
        website: 'https://shortforge.dev',
        location: 'Remote / Global',
        employee_count: 10,
        revenue_range: '$100K - $500K',
        key_products: ['AI Agent Development', 'Business Process Automation', 'IT Consulting', 'Voice-Enabled Solutions'],
        target_audience: 'Mid-size businesses seeking digital transformation',
        competitors: ['Traditional IT consultancies', 'Generic AI platforms'],
        pain_points: ['Slow digital transformation', 'High IT costs', 'Lack of AI expertise', 'Inefficient processes'],
        goals: ['Accelerate client digital transformation', 'Become leading AI consultancy', 'Expand global reach', 'Innovate with cutting-edge AI solutions'],
        budget_range: '$50K - $250K',
        timeline: '3-6 months',
        decision_makers: [
          { name: 'Stephen Psaradellis', role: 'Founder & CEO' },
          { name: 'AI Development Team', role: 'Technical Leadership' }
        ],
        recent_news: [
          { title: 'ShortForge Launches Revolutionary AI Agent Platform', date: '2024-11-15', summary: 'New platform enables businesses to deploy custom AI agents in minutes' }
        ],
        social_media: {
          linkedin: 'https://linkedin.com/company/shortforge',
          twitter: 'https://twitter.com/shortforge',
          website: 'https://shortforge.dev'
        }
      };
      console.log('Using fallback mock data for ShortForge');
    }

    // Agent metadata based on agent_id
    const agentMetadata: AgentMetadata = {
      agent_id: agent_id,
      name: 'Forge Assistant',
      description: 'Your intelligent business transformation partner',
      capabilities: [
        'Business process automation',
        'Data-driven insights',
        'Customer experience optimization',
        'Strategic consulting',
        'Technical implementation'
      ],
      voice_enabled: true,
      elevenlabs_agent_id: agent_id, // Use the agent_id from route params for ElevenLabs
      elevenlabs_api_key: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
    };

    // Marketing pitch is now generated by the backend and included in the API response

    return {
      props: {
        domainId: domain_id,
        agentId: agent_id,
        businessIntelligence,
        agentMetadata,
        marketingPitch,
        apiError: hasApiError,
      },
    };

  } catch (error) {
    console.error('getServerSideProps error:', error);

    return {
      props: {
        domainId: '',
        agentId: '',
        businessIntelligence: null,
        agentMetadata: null,
        marketingPitch: null,
        error: 'Failed to load agent page. Please try again later.',
      },
    };
  }
};

export default AgentPage;
