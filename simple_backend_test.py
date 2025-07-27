#!/usr/bin/env python3
"""
Simple Backend API Test - Focus on basic endpoints that should work
"""

import requests
import json

BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

def test_basic_endpoints():
    """Test basic endpoints that don't require complex data"""
    results = []
    
    # Test 1: Health Check
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=5)
        if response.status_code == 200 and response.json().get("status") == "healthy":
            results.append(("Health Check", True, "✅ Backend is healthy"))
        else:
            results.append(("Health Check", False, f"❌ HTTP {response.status_code}"))
    except Exception as e:
        results.append(("Health Check", False, f"❌ Error: {str(e)}"))
    
    # Test 2: API Root
    try:
        response = requests.get(f"{API_BASE}/", timeout=5)
        if response.status_code == 200:
            results.append(("API Root", True, "✅ API root accessible"))
        else:
            results.append(("API Root", False, f"❌ HTTP {response.status_code}"))
    except Exception as e:
        results.append(("API Root", False, f"❌ Error: {str(e)}"))
    
    # Test 3: Get Patients (should return empty list initially)
    try:
        response = requests.get(f"{API_BASE}/patients", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                results.append(("Get Patients", True, f"✅ Retrieved {len(data)} patients"))
            else:
                results.append(("Get Patients", False, f"❌ Expected list, got {type(data)}"))
        else:
            results.append(("Get Patients", False, f"❌ HTTP {response.status_code}"))
    except Exception as e:
        results.append(("Get Patients", False, f"❌ Error: {str(e)}"))
    
    # Test 4: Analytics - Age Distribution
    try:
        response = requests.get(f"{API_BASE}/analytics/age-distribution", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if "age_distribution" in data:
                results.append(("Age Distribution Analytics", True, "✅ Analytics endpoint working"))
            else:
                results.append(("Age Distribution Analytics", False, f"❌ Invalid response structure"))
        else:
            results.append(("Age Distribution Analytics", False, f"❌ HTTP {response.status_code}"))
    except Exception as e:
        results.append(("Age Distribution Analytics", False, f"❌ Error: {str(e)}"))
    
    # Test 5: Status Check Creation
    try:
        status_data = {"client_name": "Simple Test"}
        response = requests.post(
            f"{API_BASE}/status",
            json=status_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        if response.status_code == 200:
            data = response.json()
            if data.get("client_name") == "Simple Test":
                results.append(("Create Status Check", True, "✅ Status check created"))
            else:
                results.append(("Create Status Check", False, f"❌ Invalid response"))
        else:
            results.append(("Create Status Check", False, f"❌ HTTP {response.status_code}"))
    except Exception as e:
        results.append(("Create Status Check", False, f"❌ Error: {str(e)}"))
    
    # Test 6: Get Status Checks
    try:
        response = requests.get(f"{API_BASE}/status", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                results.append(("Get Status Checks", True, f"✅ Retrieved {len(data)} status checks"))
            else:
                results.append(("Get Status Checks", False, f"❌ Expected list"))
        else:
            results.append(("Get Status Checks", False, f"❌ HTTP {response.status_code}"))
    except Exception as e:
        results.append(("Get Status Checks", False, f"❌ Error: {str(e)}"))
    
    return results

def main():
    print("🔍 Simple Backend API Test")
    print("=" * 50)
    
    results = test_basic_endpoints()
    
    passed = sum(1 for _, success, _ in results if success)
    total = len(results)
    
    print("\n📊 Results:")
    for test_name, success, message in results:
        print(f"{message}")
    
    print(f"\n✅ Passed: {passed}/{total}")
    print(f"❌ Failed: {total - passed}/{total}")
    
    if passed == total:
        print("\n🎉 All basic endpoints are working!")
        return True
    else:
        print(f"\n⚠️  Some endpoints have issues")
        return False

if __name__ == "__main__":
    main()