#!/usr/bin/env python3
"""
Test script for business intelligence endpoint functionality
"""

import os
import sys
import asyncio
from unittest.mock import Mock

# Add backend to path
sys.path.insert(0, 'backend')

# Set up environment variables for testing
os.environ['OPENAI_API_KEY'] = 'test-key-for-testing'  # Mock key for testing

async def test_business_intelligence():
    """Test the business intelligence functionality"""
    print("🧪 Testing Business Intelligence Endpoint")
    print("=" * 50)

    try:
        # Import the endpoint function
        from app.api.v1.endpoints.business_intelligence import get_business_intelligence_by_domain, business_intelligence_health
        from app.services.pitch import pitch_service

        print("\n1. Testing health endpoint...")
        try:
            health_result = business_intelligence_health()
            print("✅ Health endpoint works!")
            print(f"   Response: {health_result}")
        except Exception as e:
            print(f"❌ Health endpoint failed: {e}")

        print("\n2. Testing pitch service availability...")
        try:
            available = pitch_service.is_available()
            print(f"✅ Pitch service availability check: {available}")
        except Exception as e:
            print(f"❌ Pitch service check failed: {e}")

        print("\n3. Testing domain endpoint with mock data...")
        try:
            # Create a mock database session and result
            mock_db = Mock()

            # Mock the database query result
            mock_row = Mock()
            mock_row.__getitem__ = Mock(side_effect=lambda key: {
                'domain_id': '1',
                'domain': 'test.com',
                'lead_company': 'Test Company',
                'lead_industry': 'Technology',
                'llm_digest': 'A test company description',
                'lead_location': 'Test City',
                'content_summaries': {'services': 'Service 1, Service 2'},
                'keyword_signals': {'top_keywords': ['tech', 'ai']},
                'lead_name': 'John Doe',
                'lead_title': 'CEO',
                'metadata_insights': {'apollo_contact': {'name': 'Jane Smith', 'title': 'CTO'}}
            }.get(key, None))

            mock_result = Mock()
            mock_result.fetchone.return_value = mock_row
            mock_result.keys.return_value = ['domain_id', 'domain', 'lead_company', 'lead_industry', 'llm_digest', 'lead_location', 'content_summaries', 'keyword_signals', 'lead_name', 'lead_title', 'metadata_insights']
            mock_db.execute.return_value = mock_result

            result = await get_business_intelligence_by_domain(db=mock_db, domain_id='1')
            print("✅ Domain endpoint works!")
            print(f"   Company: {result['data']['company_name']}")
            print(f"   Industry: {result['data']['industry']}")
            print(f"   Domain: {result['data']['domain']}")
            print(f"   Key Products: {len(result['data']['key_products'])}")
            print(f"   Marketing Pitch: {'Generated' if result.get('marketing_pitch') else 'None (fallback used)'}")

        except Exception as e:
            print(f"❌ Domain endpoint failed: {e}")
            import traceback
            traceback.print_exc()

        print("\n🎉 Business Intelligence Endpoint Test Completed!")

    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure you're running this from the project root directory")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_business_intelligence())
