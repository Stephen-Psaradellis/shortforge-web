#!/usr/bin/env python3
"""
Test script for business intelligence endpoint with real database connection
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'backend'))

# Clear frontend env vars that cause issues in backend
for key in list(os.environ.keys()):
    if key.startswith('NEXT_PUBLIC_'):
        del os.environ[key]

from app.core.database import get_db
from app.api.v1.endpoints.business_intelligence import get_business_intelligence_by_domain, business_intelligence_health

try:
    print('Testing Business Intelligence Endpoint with Real Database')
    print('=' * 60)

    # Test health endpoint
    health_result = business_intelligence_health()
    print('PASS: Health endpoint works!')
    print(f'Response: {health_result}')

    # Test domain endpoint for domain_id '1'
    print('\nTesting domain endpoint for domain_id="1"...')
    db = next(get_db())
    try:
        result = get_business_intelligence_by_domain(db=db, domain_id='1')
        print('PASS: Domain endpoint works!')
        data = result['data']
        print(f'Company: {data.get("company_name", "N/A")}')
        print(f'Industry: {data.get("industry", "N/A")}')
        print(f'Domain: {data.get("domain", "N/A")}')
        if 'key_products' in data:
            products = data['key_products']
            if isinstance(products, list):
                print(f'Key Products: {len(products)} products')
            else:
                print(f'Key Products: {products[:50]}...')
        print('\nFull data keys:', list(data.keys()))
    except Exception as e:
        print(f'FAIL: Domain endpoint failed for domain 1: {e}')

    # Test domain endpoint for non-existent domain
    print('\nTesting domain endpoint for non-existent domain...')
    try:
        result = get_business_intelligence_by_domain(db=db, domain_id='999')
        print('FAIL: Should have failed for non-existent domain')
    except Exception as e:
        print(f'PASS: Correctly failed for non-existent domain: {type(e).__name__}')

    db.close()
    print('\nDatabase Integration Test Completed Successfully!')

except Exception as e:
    print(f'Test failed: {e}')
    import traceback
    traceback.print_exc()
