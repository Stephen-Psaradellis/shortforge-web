#!/usr/bin/env python3
"""
Test script for business intelligence endpoint with real database connection
"""

from app.core.database import get_db
from app.api.v1.endpoints.business_intelligence import get_business_intelligence_by_domain, business_intelligence_health

try:
    print('Testing Business Intelligence Endpoint with Real Database')
    print('=' * 60)

    # Test health endpoint
    health_result = business_intelligence_health()
    print('Health endpoint works!')
    print(f'Response: {health_result}')

    # Test domain endpoint for domain_id '1'
    print('\nTesting domain endpoint for domain_id="1"...')
    db = next(get_db())
    try:
        result = get_business_intelligence_by_domain(db=db, domain_id='1')
        print('Domain endpoint works!')
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
        print(f'Domain endpoint failed for domain 1: {e}')

    # Test domain endpoint for non-existent domain
    print('\nTesting domain endpoint for non-existent domain...')
    try:
        result = get_business_intelligence_by_domain(db=db, domain_id='999')
        print('Should have failed for non-existent domain')
    except Exception as e:
        print(f'Correctly failed for non-existent domain: {type(e).__name__}')

    db.close()
    print('\nDatabase Integration Test Completed Successfully!')

except Exception as e:
    print(f'Test failed: {e}')
    import traceback
    traceback.print_exc()
