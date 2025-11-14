/**
 * Test script to check pitch generation with mock business intelligence data
 */

// Simple mock OpenAI client for testing
const mockOpenAI = {
  chat: {
    completions: {
      create: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              headline: "Transform TechCorp with AI-Powered Solutions",
              subheadline: "Custom AI consulting services tailored for technology consulting firms",
              key_benefits: [
                "Streamline legacy system modernization with intelligent automation",
                "Bridge digital skill gaps with AI-powered training solutions",
                "Scale operations efficiently with data-driven insights"
              ],
              call_to_action: "Start your AI transformation journey with Forge Assistant",
              personalized_insights: [
                "Understanding the unique challenges in technology consulting",
                "Tailored solutions for mid-size firms like TechCorp",
                "Proven results in digital transformation projects"
              ],
              social_proof: "Trusted by 500+ technology consulting firms"
            })
          }
        }]
      })
    }
  }
};

// Mock the OpenAI import
jest.mock('openai', () => ({
  OpenAI: jest.fn(() => mockOpenAI)
}));

// Import after mocking
const { generateMarketingPitch } = require('./src/lib/pitch');

// Mock business intelligence data
const mockBusinessIntelligence = {
  domain_id: '1',
  company_name: 'TechCorp Solutions',
  industry: 'Technology Consulting',
  description: 'A leading technology consulting firm specializing in digital transformation',
  website: 'https://techcorp.com',
  location: 'San Francisco, CA',
  employee_count: 150,
  revenue_range: '$10M - $50M',
  key_products: ['Cloud Migration Services', 'AI Implementation', 'Digital Strategy'],
  target_audience: 'Mid-size businesses seeking digital transformation',
  competitors: ['Accenture', 'Deloitte', 'PwC'],
  pain_points: ['Legacy system modernization', 'Digital skill gaps', 'Scalability challenges'],
  goals: ['Expand market share', 'Improve operational efficiency', 'Adopt AI technologies'],
  budget_range: '$500K - $2M',
  timeline: '6-12 months',
  decision_makers: [
    { name: 'John Smith', role: 'CTO' },
    { name: 'Sarah Johnson', role: 'VP of Operations' }
  ],
  recent_news: [
    { title: 'TechCorp Wins AI Innovation Award', date: '2024-01-15', summary: 'Recognized for AI implementation excellence' }
  ],
  social_media: {
    linkedin: 'https://linkedin.com/company/techcorp',
    twitter: 'https://twitter.com/techcorp'
  }
};

async function testPitchGeneration() {
  try {
    console.log('Testing pitch generation with mock data...');
    console.log('Mock business intelligence:', JSON.stringify(mockBusinessIntelligence, null, 2));

    const pitch = await generateMarketingPitch(mockBusinessIntelligence, 'Forge Assistant');

    console.log('\n=== Generated Marketing Pitch ===');
    console.log('Headline:', pitch.headline);
    console.log('Subheadline:', pitch.subheadline);
    console.log('Key Benefits:', pitch.key_benefits);
    console.log('Call to Action:', pitch.call_to_action);
    console.log('Personalized Insights:', pitch.personalized_insights);
    console.log('Social Proof:', pitch.social_proof);

  } catch (error) {
    console.error('Pitch generation test failed:', error);
  }
}

testPitchGeneration();
