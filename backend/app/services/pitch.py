"""
Marketing pitch generation service

Uses OpenAI GPT-4o mini to generate personalized marketing pitches
based on business intelligence data for agent conversations.
"""

import os
import json
from typing import Dict, Any, Optional
from openai import AsyncOpenAI

from app.core.config import settings


class MarketingPitch:
    """Marketing pitch data structure"""

    def __init__(
        self,
        headline: str,
        subheadline: str,
        key_benefits: list[str],
        call_to_action: str,
        personalized_insights: list[str],
        social_proof: Optional[str] = None
    ):
        self.headline = headline
        self.subheadline = subheadline
        self.key_benefits = key_benefits
        self.call_to_action = call_to_action
        self.personalized_insights = personalized_insights
        self.social_proof = social_proof

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization"""
        return {
            "headline": self.headline,
            "subheadline": self.subheadline,
            "key_benefits": self.key_benefits,
            "call_to_action": self.call_to_action,
            "personalized_insights": self.personalized_insights,
            "social_proof": self.social_proof,
        }


class PitchGenerationService:
    """Service for generating marketing pitches using OpenAI"""

    def __init__(self):
        self.client = None
        self._initialized = False
        self._api_key_missing = False

    def _initialize_client(self):
        """Initialize OpenAI client lazily"""
        if self._initialized:
            return

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            # Don't raise an error - just mark as unavailable
            self._api_key_missing = True
            return

        try:
            self.client = AsyncOpenAI(api_key=api_key)
            self._initialized = True
            self._api_key_missing = False
        except Exception as e:
            # Log the error but don't crash the application
            print(f"Warning: Failed to initialize OpenAI client: {e}")
            self._api_key_missing = True

    def is_available(self) -> bool:
        """Check if the pitch generation service is available"""
        self._initialize_client()
        return not getattr(self, '_api_key_missing', True)

    async def generate_pitch(
        self,
        business_intelligence: Dict[str, Any],
        agent_name: str = "Forge Assistant"
    ) -> MarketingPitch:
        """
        Generate marketing pitch from business intelligence

        Uses GPT-4o mini to create personalized marketing copy that encourages
        visitors to start an agent conversation. Analyzes business intelligence
        to create compelling, targeted messaging.

        Args:
            business_intelligence: Business data to base pitch on
            agent_name: Name of the AI agent for personalization

        Returns:
            Structured marketing pitch

        Raises:
            Exception: If pitch generation fails
        """
        # Initialize client if needed
        self._initialize_client()

        # Check if we can generate pitches
        if getattr(self, '_api_key_missing', False):
            # Fall back to static pitch generation
            return self._generate_fallback_pitch(business_intelligence, agent_name)

        try:
            # Construct comprehensive business context for AI
            business_context = self._build_business_context(business_intelligence)

            # Create detailed prompt for pitch generation
            prompt = f"""You are a marketing copywriter specializing in AI agent introductions. Based on the following business intelligence about a company, create a compelling marketing pitch that encourages visitors to start an AI agent conversation.

Business Context:
{business_context}

Agent Name: {agent_name}

Create a marketing pitch with these elements:
1. A compelling headline (max 10 words)
2. A persuasive subheadline (max 20 words)
3. 3-5 key benefits specifically tailored to this business
4. A clear call-to-action for starting the conversation
5. 2-3 personalized insights showing you understand their business
6. Optional social proof element if relevant

The pitch should:
- Be conversational and approachable
- Show deep understanding of their industry and challenges
- Highlight how AI can specifically help their business
- Create urgency and excitement about starting the conversation
- Use their company name and industry-specific language

Format your response as valid JSON with these exact keys:
{{
  "headline": "string",
  "subheadline": "string",
  "key_benefits": ["string1", "string2", "string3"],
  "call_to_action": "string",
  "personalized_insights": ["string1", "string2"],
  "social_proof": "string (optional)"
}}"""

            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a marketing expert who creates compelling pitches for AI agent conversations. Always respond with valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=1000,
            )

            content = response.choices[0].message.content

            if not content:
                raise Exception("No content received from OpenAI API")

            # Clean the content by removing markdown code block formatting if present
            cleaned_content = content.strip().replace("```json\n", "").replace("\n```", "").replace("```", "")

            # Parse and validate the JSON response
            pitch_data = json.loads(cleaned_content)

            # Validate required fields
            required_fields = ["headline", "subheadline", "key_benefits", "call_to_action", "personalized_insights"]
            for field in required_fields:
                if field not in pitch_data:
                    raise Exception(f"Invalid pitch structure received from OpenAI: missing {field}")

            # Ensure arrays are properly formatted
            marketing_pitch = MarketingPitch(
                headline=pitch_data["headline"],
                subheadline=pitch_data["subheadline"],
                key_benefits=pitch_data["key_benefits"] if isinstance(pitch_data["key_benefits"], list) else [],
                call_to_action=pitch_data["call_to_action"],
                personalized_insights=pitch_data["personalized_insights"] if isinstance(pitch_data["personalized_insights"], list) else [],
                social_proof=pitch_data.get("social_proof"),
            )

            return marketing_pitch

        except Exception as e:
            # Fallback pitch in case of API failure
            return self._generate_fallback_pitch(business_intelligence, agent_name)

    def _build_business_context(self, bi: Dict[str, Any]) -> str:
        """Build comprehensive business context string for AI prompt"""
        context_parts = []

        if bi.get("company_name"):
            context_parts.append(f"Company: {bi['company_name']}")
        if bi.get("industry"):
            context_parts.append(f"Industry: {bi['industry']}")
        if bi.get("description"):
            context_parts.append(f"Description: {bi['description']}")
        if bi.get("location"):
            context_parts.append(f"Location: {bi['location']}")
        if bi.get("employee_count"):
            context_parts.append(f"Employee Count: {bi['employee_count']}")
        if bi.get("revenue_range"):
            context_parts.append(f"Revenue Range: {bi['revenue_range']}")
        if bi.get("website"):
            context_parts.append(f"Website: {bi['website']}")

        if bi.get("key_products") and isinstance(bi["key_products"], list) and bi["key_products"]:
            context_parts.append(f"Key Products/Services: {', '.join(bi['key_products'])}")

        if bi.get("target_audience"):
            context_parts.append(f"Target Audience: {bi['target_audience']}")

        if bi.get("competitors") and isinstance(bi["competitors"], list) and bi["competitors"]:
            context_parts.append(f"Competitors: {', '.join(bi['competitors'])}")

        if bi.get("pain_points") and isinstance(bi["pain_points"], list) and bi["pain_points"]:
            context_parts.append(f"Pain Points: {', '.join(bi['pain_points'])}")

        if bi.get("goals") and isinstance(bi["goals"], list) and bi["goals"]:
            context_parts.append(f"Business Goals: {', '.join(bi['goals'])}")

        if bi.get("budget_range"):
            context_parts.append(f"Budget Range: {bi['budget_range']}")
        if bi.get("timeline"):
            context_parts.append(f"Timeline: {bi['timeline']}")

        if bi.get("decision_makers") and isinstance(bi["decision_makers"], list) and bi["decision_makers"]:
            dm_names = []
            for dm in bi["decision_makers"]:
                if isinstance(dm, dict) and dm.get("name"):
                    role_str = f" ({dm['role']})" if dm.get("role") else ""
                    dm_names.append(f"{dm['name']}{role_str}")
            if dm_names:
                context_parts.append(f"Key Decision Makers: {', '.join(dm_names)}")

        if bi.get("recent_news") and isinstance(bi["recent_news"], list) and bi["recent_news"]:
            recent_news = [news.get("title", "") for news in bi["recent_news"][:3] if isinstance(news, dict)]
            if recent_news:
                context_parts.append(f"Recent News: {'; '.join(recent_news)}")

        return "\n".join(context_parts) if context_parts else "General business seeking AI consultation services"

    def _generate_fallback_pitch(self, bi: Dict[str, Any], agent_name: str) -> MarketingPitch:
        """Generate fallback marketing pitch when OpenAI API fails"""
        company_name = bi.get("company_name", "your company")
        industry = bi.get("industry", "your industry")

        return MarketingPitch(
            headline=f"Transform {company_name} with AI",
            subheadline=f"Personalized AI solutions for {industry} businesses",
            key_benefits=[
                "Streamline operations with intelligent automation",
                "Make data-driven decisions with AI insights",
                "Enhance customer experience with personalized interactions",
                "Reduce costs through efficient AI-powered processes"
            ],
            call_to_action=f"Start a conversation with {agent_name} now",
            personalized_insights=[
                f"Understanding the unique challenges in {industry}",
                f"Tailored solutions for {company_name}'s specific needs",
                "Proven results across similar businesses"
            ],
            social_proof="Trusted by leading companies worldwide"
        )


# Global service instance
pitch_service = PitchGenerationService()
