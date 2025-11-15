#!/usr/bin/env python3
"""
Simple test for pitch service functionality
"""

import asyncio
import os
import sys
sys.path.insert(0, 'backend')

# Load environment variables from backend/.env
try:
    from dotenv import load_dotenv
    load_dotenv('backend/.env')
    print('✅ Loaded environment variables from backend/.env')
except ImportError:
    print('⚠️  python-dotenv not available')

async def test_pitch_service():
    print('🧪 Testing Pitch Service')
    print('=' * 30)

    try:
        from app.services.pitch import pitch_service

        print('1. Checking service availability...')
        available = pitch_service.is_available()
        print(f'   Pitch service available: {available}')

        if available:
            print('2. Testing pitch generation...')
            test_bi = {
                'company_name': 'Test Company',
                'industry': 'Technology',
                'description': 'A test technology company',
                'domain': 'test.com'
            }

            pitch = await pitch_service.generate_pitch(test_bi, 'Test Agent')
            print('   ✅ Pitch generated successfully!')
            print(f'   Headline: {pitch.headline}')
            print(f'   Subheadline: {pitch.subheadline}')
            print(f'   Key benefits: {len(pitch.key_benefits)} items')
        else:
            print('   ⚠️  Pitch service not available - using fallback')

        print('✅ Pitch service test completed!')

    except Exception as e:
        print(f'❌ Pitch service test failed: {e}')
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_pitch_service())
