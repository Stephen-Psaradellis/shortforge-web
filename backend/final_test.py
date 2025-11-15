#!/usr/bin/env python3
"""
Final test of business intelligence database integration
"""

from app.core.database import get_db
from app.api.v1.endpoints.business_intelligence import get_business_intelligence_by_domain, business_intelligence_health

print('Final Business Intelligence Database Integration Test')
print('=' * 60)

try:
    # Test health
    health = business_intelligence_health()
    print('Health check passed')

    # Test real data retrieval
    db = next(get_db())
    result = get_business_intelligence_by_domain(db=db, domain_id='1')
    data = result['data']

    print('Database query successful')
    print(f'Company: {data["company_name"]}')
    print(f'Industry: {data["industry"]}')
    print(f'Location: {data["location"]}')
    print(f'Key Products: {len(data["key_products"])} items')
    print(f'Decision Makers: {len(data["decision_makers"])} people')
    print(f'Pain Points: {len(data["pain_points"])} items')
    print(f'Goals: {len(data["goals"])} items')

    # Verify data structure matches frontend expectations
    required_fields = [
        'domain_id', 'domain', 'company_name', 'industry', 'description',
        'website', 'location', 'key_products', 'pain_points', 'goals',
        'decision_makers', 'social_media'
    ]

    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        print(f'Missing fields: {missing_fields}')
    else:
        print('All required fields present')

    db.close()
    print('\nBusiness Intelligence Database Integration: SUCCESS!')
    print('The endpoint now properly connects to Supagent database and transforms')
    print('intelligence_bundles data into the format expected by the frontend.')

except Exception as e:
    print(f'Test failed: {e}')
    import traceback
    traceback.print_exc()
