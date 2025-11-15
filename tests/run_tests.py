#!/usr/bin/env python3
"""
Consolidated test runner for ShortForge
"""

import sys
import os
import subprocess
import argparse

def run_backend_tests():
    """Run all backend tests"""
    print("Running Backend Tests")
    print("=" * 50)

    # Test 1: Business Intelligence endpoint with mock data
    print("\n1. Testing BI endpoint with mock data...")
    try:
        result = subprocess.run([sys.executable, "tests/backend/test_bi_endpoint.py"],
                              capture_output=True, text=True, cwd=os.getcwd())
        if result.returncode == 0:
            print("PASS: Backend mock tests passed")
        else:
            print("FAIL: Backend mock tests failed")
            print(result.stderr)
    except Exception as e:
        print(f"Error running backend mock tests: {e}")

    # Test 2: Business Intelligence endpoint with real database
    print("\n2. Testing BI endpoint with real database...")
    try:
        result = subprocess.run([sys.executable, "tests/backend/test_real_db.py"],
                              capture_output=True, text=True, cwd=os.getcwd())
        if result.returncode == 0:
            print("PASS: Backend database tests passed")
        else:
            print("FAIL: Backend database tests failed")
            print(result.stderr)
    except Exception as e:
        print(f"Error running backend database tests: {e}")

def run_frontend_tests():
    """Run all frontend tests"""
    print("\nRunning Frontend Tests")
    print("=" * 50)

    # Test 1: Pitch generation test
    print("\n1. Testing pitch generation...")
    try:
        result = subprocess.run(["node", "tests/frontend/test-pitch.js"],
                              capture_output=True, text=True, cwd=os.getcwd())
        if result.returncode == 0:
            print("PASS: Frontend pitch tests passed")
        else:
            print("FAIL: Frontend pitch tests failed")
            print(result.stderr)
    except Exception as e:
        print(f"Error running frontend tests: {e}")

def run_e2e_tests():
    """Run end-to-end tests"""
    print("\nRunning E2E Tests")
    print("=" * 50)

    print("\n1. Testing complete agent page flow...")
    try:
        # This would test the full flow with production API
        print("E2E tests would run here (needs backend running)")
        print("   - Test agent page with real business intelligence data")
        print("   - Verify personalized content generation")
        print("   - Check API integration with production backend")
    except Exception as e:
        print(f"Error running E2E tests: {e}")

def main():
    parser = argparse.ArgumentParser(description="Run ShortForge tests")
    parser.add_argument("--backend", action="store_true", help="Run only backend tests")
    parser.add_argument("--frontend", action="store_true", help="Run only frontend tests")
    parser.add_argument("--e2e", action="store_true", help="Run only E2E tests")

    args = parser.parse_args()

    if args.backend:
        run_backend_tests()
    elif args.frontend:
        run_frontend_tests()
    elif args.e2e:
        run_e2e_tests()
    else:
        # Run all tests
        run_backend_tests()
        run_frontend_tests()
        run_e2e_tests()

    print("\nTest Suite Complete!")

if __name__ == "__main__":
    main()
