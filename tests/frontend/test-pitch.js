/**
 * Test script to check pitch generation with mock business intelligence data
 */

// Simple mock for testing pitch generation
const generateMarketingPitch = async (businessIntelligence, agentName) => {
  // Mock implementation for testing
  return {
    headline: `Transform ${businessIntelligence.company_name} with AI-Powered Solutions`,
    subheadline: `Custom AI consulting services tailored for ${businessIntelligence.industry} firms`,
    key_benefits: [
      "Streamline operations with intelligent automation",
      "Make data-driven decisions with AI insights",
      "Enhance customer experience with personalized interactions",
      "Reduce costs through efficient AI-powered processes"
    ],
    call_to_action: `Start a conversation with ${agentName} now`,
    personalized_insights: [
      `Understanding the unique challenges in ${businessIntelligence.industry}`,
      `Tailored solutions for ${businessIntelligence.company_name}'s specific needs`,
      "Proven results across similar businesses"
    ],
    social_proof: "Trusted by leading companies worldwide"
  };
};

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
