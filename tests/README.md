# ShortForge Test Suite

This directory contains all tests for the ShortForge application, organized by component.

## Structure

```
tests/
├── run_tests.py          # Main test runner script
├── backend/              # Backend API tests
│   ├── test_bi_endpoint.py    # Business Intelligence endpoint tests (mock)
│   └── test_real_db.py        # Business Intelligence endpoint tests (real DB)
└── frontend/             # Frontend tests
    └── test-pitch.js          # Marketing pitch generation tests
```

## Running Tests

### All Tests
```bash
python tests/run_tests.py
```

### Specific Test Suites
```bash
# Backend tests only
python tests/run_tests.py --backend

# Frontend tests only
python tests/run_tests.py --frontend

# E2E tests only (placeholder)
python tests/run_tests.py --e2e
```

### Individual Tests

#### Backend Tests
```bash
# Test BI endpoint with mock data
python tests/backend/test_bi_endpoint.py

# Test BI endpoint with real database
python tests/backend/test_real_db.py
```

#### Frontend Tests
```bash
# Test pitch generation
node tests/frontend/test-pitch.js
```

## Test Descriptions

### Backend Tests

1. **test_bi_endpoint.py**: Tests the Business Intelligence API endpoints with mock data
   - Health endpoint functionality
   - Domain lookup with mock database
   - Error handling for non-existent domains

2. **test_real_db.py**: Tests the Business Intelligence API with real database connection
   - Health endpoint
   - Domain lookup with actual database data
   - Error handling

### Frontend Tests

1. **test-pitch.js**: Tests the marketing pitch generation functionality
   - OpenAI API integration (mocked)
   - Pitch generation with business intelligence data
   - Structured output validation

### E2E Tests

End-to-end tests are currently placeholders and would include:
- Full agent page flow with real business intelligence data
- API integration verification
- Frontend rendering validation

## Environment Setup

Make sure you have the required environment variables set:

- `NEXT_PUBLIC_API_URL`: Production API URL (set in root .env)
- Database connection settings for backend tests

## Adding New Tests

When adding new tests:

1. Place backend tests in `tests/backend/`
2. Place frontend tests in `tests/frontend/`
3. Update `tests/run_tests.py` to include new test categories
4. Update this README with test descriptions
