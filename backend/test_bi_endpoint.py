#!/usr/bin/env python3
"""
Test script for business intelligence endpoint functionality
"""

import sys
import os

# Set up environment
os.environ['POSTGRES_PASSWORD'] = 'dummy'
os.environ['DATABASE_URL'] = 'sqlite:///./test.db'

try:
    # Import the endpoint function
    from app.api.v1.endpoints.business_intelligence import get_business_intelligence_by_domain, business_intelligence_health

    print("🧪 Testing Business Intelligence Endpoint")
    print("=" * 50)

    # Test health endpoint
    print("1. Testing health endpoint...")
    try:
        health_result = business_intelligence_health()
        print("✅ Health endpoint works!")
        print(f"   Response: {health_result}")
    except Exception as e:
        print(f"❌ Health endpoint failed: {e}")

    # Test domain endpoint with mock data
    print("\n2. Testing domain endpoint for domain_id='1'...")
    try:
        # Create a mock database session
        from unittest.mock import Mock
        mock_db = Mock()

        result = get_business_intelligence_by_domain(db=mock_db, domain_id='1')
        print("✅ Domain endpoint works!")
        print(f"   Company: {result['data']['company_name']}")
        print(f"   Industry: {result['data']['industry']}")
        print(f"   Domain: {result['data']['domain']}")
        print(f"   Key Products: {len(result['data']['key_products'])} products")
    except Exception as e:
        print(f"❌ Domain endpoint failed: {e}")

    # Test domain endpoint with non-existent domain
    print("\n3. Testing domain endpoint for non-existent domain...")
    try:
        result = get_business_intelligence_by_domain(db=mock_db, domain_id='999')
        print("❌ Should have failed for non-existent domain")
    except Exception as e:
        print(f"✅ Correctly failed for non-existent domain: {type(e).__name__}")

    print("\n🎉 Business Intelligence Endpoint Test Completed!")

except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure you're running this from the backend directory")
except Exception as e:
    print(f"❌ Unexpected error: {e}")
    import traceback
    traceback.print_exc()
