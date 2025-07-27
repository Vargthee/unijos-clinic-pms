#!/usr/bin/env python3
"""
Backend API Testing Suite for UNIJOS Health Management System
Tests all backend endpoints to ensure they're working properly after reverting changes.
"""

import requests
import json
import uuid
from datetime import datetime, date
import sys
import time

# Backend URL - using localhost since we're testing internally
BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.created_patient_id = None
        self.created_record_id = None
        
    def log_test(self, test_name, success, message="", details=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })
        
    def test_health_check(self):
        """Test the health check endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("Health Check", True, "Backend is healthy")
                    return True
                else:
                    self.log_test("Health Check", False, f"Unexpected status: {data.get('status')}")
                    return False
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_api_root(self):
        """Test the API root endpoint"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "UNIJOS Health Management System" in data.get("message", ""):
                    self.log_test("API Root", True, "API root endpoint working")
                    return True
                else:
                    self.log_test("API Root", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("API Root", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Root", False, f"Connection error: {str(e)}")
            return False
    
    def test_create_patient(self):
        """Test creating a new patient"""
        try:
            # Create realistic test data for a Nigerian university student
            patient_data = {
                "name": "Adaora Okafor",
                "email": "adaora.okafor@unijos.edu.ng",
                "phone": "08123456789",
                "date_of_birth": "2002-03-15",
                "gender": "female",
                "patient_type": "Student",
                "address": "Jos University Campus, Plateau State, Nigeria",
                "emergency_contact": {
                    "name": "Mrs. Chioma Okafor",
                    "phone": "08098765432",
                    "relationship": "Mother"
                },
                "faculty": "Natural Sciences",
                "department": "Computer Science",
                "level": "300",
                "matric_number": "UJ/2021/NSC/1234",
                "blood_type": "O+",
                "genotype": "AA",
                "height_cm": 165.0,
                "weight_kg": 60.0,
                "allergies": ["Penicillin"],
                "vaccination_status": "Up to date",
                "covid_vaccination": "Fully vaccinated"
            }
            
            response = requests.post(
                f"{API_BASE}/patients",
                json=patient_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("id") and data.get("name") == patient_data["name"]:
                    self.created_patient_id = data["id"]
                    # Check if age was calculated correctly
                    expected_age = 2025 - 2002  # Approximate age
                    if abs(data.get("age", 0) - expected_age) <= 1:
                        self.log_test("Create Patient", True, f"Patient created with ID: {data['id']}")
                        return True
                    else:
                        self.log_test("Create Patient", False, f"Age calculation incorrect: {data.get('age')}")
                        return False
                else:
                    self.log_test("Create Patient", False, f"Invalid response data: {data}")
                    return False
            else:
                error_msg = response.text
                self.log_test("Create Patient", False, f"HTTP {response.status_code}: {error_msg}")
                return False
        except Exception as e:
            self.log_test("Create Patient", False, f"Error: {str(e)}")
            return False
    
    def test_get_patients(self):
        """Test retrieving patients list"""
        try:
            response = requests.get(f"{API_BASE}/patients", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    patient_count = len(data)
                    self.log_test("Get Patients", True, f"Retrieved {patient_count} patients")
                    return True
                else:
                    self.log_test("Get Patients", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Get Patients", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Patients", False, f"Error: {str(e)}")
            return False
    
    def test_get_patient_by_id(self):
        """Test retrieving a specific patient by ID"""
        if not self.created_patient_id:
            self.log_test("Get Patient by ID", False, "No patient ID available for testing")
            return False
            
        try:
            response = requests.get(f"{API_BASE}/patients/{self.created_patient_id}", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("id") == self.created_patient_id:
                    self.log_test("Get Patient by ID", True, f"Retrieved patient: {data.get('name')}")
                    return True
                else:
                    self.log_test("Get Patient by ID", False, f"ID mismatch: {data.get('id')}")
                    return False
            elif response.status_code == 404:
                self.log_test("Get Patient by ID", False, "Patient not found")
                return False
            else:
                self.log_test("Get Patient by ID", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Patient by ID", False, f"Error: {str(e)}")
            return False
    
    def test_create_medical_record(self):
        """Test creating a medical record"""
        if not self.created_patient_id:
            self.log_test("Create Medical Record", False, "No patient ID available for testing")
            return False
            
        try:
            record_data = {
                "patient_id": self.created_patient_id,
                "date": "2025-01-27",
                "record_type": "consultation",
                "doctor": "Dr. Ibrahim Musa",
                "diagnosis": "Routine health checkup",
                "treatment": "General health counseling and preventive care advice",
                "medications": ["Multivitamin tablets"],
                "vitals": {
                    "temperature": "36.5°C",
                    "blood_pressure": "120/80 mmHg",
                    "pulse": "72 bpm",
                    "weight": "60 kg",
                    "height": "165 cm"
                },
                "notes": "Student appears healthy. Recommended regular exercise and balanced diet."
            }
            
            response = requests.post(
                f"{API_BASE}/medical-records",
                json=record_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("id") and data.get("patient_id") == self.created_patient_id:
                    self.created_record_id = data["id"]
                    self.log_test("Create Medical Record", True, f"Medical record created with ID: {data['id']}")
                    return True
                else:
                    self.log_test("Create Medical Record", False, f"Invalid response: {data}")
                    return False
            else:
                error_msg = response.text
                self.log_test("Create Medical Record", False, f"HTTP {response.status_code}: {error_msg}")
                return False
        except Exception as e:
            self.log_test("Create Medical Record", False, f"Error: {str(e)}")
            return False
    
    def test_get_patient_medical_records(self):
        """Test retrieving medical records for a patient"""
        if not self.created_patient_id:
            self.log_test("Get Patient Medical Records", False, "No patient ID available for testing")
            return False
            
        try:
            response = requests.get(f"{API_BASE}/medical-records/{self.created_patient_id}", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    record_count = len(data)
                    self.log_test("Get Patient Medical Records", True, f"Retrieved {record_count} medical records")
                    return True
                else:
                    self.log_test("Get Patient Medical Records", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Get Patient Medical Records", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Patient Medical Records", False, f"Error: {str(e)}")
            return False
    
    def test_age_recommendations(self):
        """Test age-based recommendations endpoint"""
        if not self.created_patient_id:
            self.log_test("Age Recommendations", False, "No patient ID available for testing")
            return False
            
        try:
            response = requests.get(f"{API_BASE}/patients/{self.created_patient_id}/age-recommendations", timeout=10)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["age_range", "recommendations", "required_screenings", "vaccination_schedule"]
                if all(field in data for field in required_fields):
                    self.log_test("Age Recommendations", True, f"Age range: {data.get('age_range')}")
                    return True
                else:
                    self.log_test("Age Recommendations", False, f"Missing required fields: {data}")
                    return False
            else:
                self.log_test("Age Recommendations", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Age Recommendations", False, f"Error: {str(e)}")
            return False
    
    def test_medical_consistency(self):
        """Test medical consistency check endpoint"""
        if not self.created_patient_id:
            self.log_test("Medical Consistency Check", False, "No patient ID available for testing")
            return False
            
        try:
            response = requests.get(f"{API_BASE}/patients/{self.created_patient_id}/medical-consistency", timeout=10)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["patient_id", "consistency_warnings", "status"]
                if all(field in data for field in required_fields):
                    self.log_test("Medical Consistency Check", True, f"Status: {data.get('status')}")
                    return True
                else:
                    self.log_test("Medical Consistency Check", False, f"Missing required fields: {data}")
                    return False
            else:
                self.log_test("Medical Consistency Check", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Medical Consistency Check", False, f"Error: {str(e)}")
            return False
    
    def test_analytics_endpoints(self):
        """Test analytics endpoints"""
        try:
            # Test age distribution
            response = requests.get(f"{API_BASE}/analytics/age-distribution", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "age_distribution" in data:
                    self.log_test("Analytics - Age Distribution", True, "Age distribution data retrieved")
                else:
                    self.log_test("Analytics - Age Distribution", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Analytics - Age Distribution", False, f"HTTP {response.status_code}")
                return False
            
            # Test medical conditions by age
            response = requests.get(f"{API_BASE}/analytics/medical-conditions-by-age", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "medical_conditions_by_age" in data:
                    self.log_test("Analytics - Medical Conditions by Age", True, "Medical conditions data retrieved")
                    return True
                else:
                    self.log_test("Analytics - Medical Conditions by Age", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Analytics - Medical Conditions by Age", False, f"HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Analytics Endpoints", False, f"Error: {str(e)}")
            return False
    
    def test_status_endpoints(self):
        """Test status check endpoints"""
        try:
            # Test creating a status check
            status_data = {
                "client_name": "Backend Test Suite"
            }
            
            response = requests.post(
                f"{API_BASE}/status",
                json=status_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("client_name") == status_data["client_name"]:
                    self.log_test("Create Status Check", True, f"Status check created with ID: {data.get('id')}")
                else:
                    self.log_test("Create Status Check", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Create Status Check", False, f"HTTP {response.status_code}")
                return False
            
            # Test getting status checks
            response = requests.get(f"{API_BASE}/status", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Status Checks", True, f"Retrieved {len(data)} status checks")
                    return True
                else:
                    self.log_test("Get Status Checks", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Get Status Checks", False, f"HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Status Endpoints", False, f"Error: {str(e)}")
            return False
    
    def cleanup_test_data(self):
        """Clean up test data created during testing"""
        if self.created_patient_id:
            try:
                response = requests.delete(f"{API_BASE}/patients/{self.created_patient_id}", timeout=10)
                if response.status_code == 200:
                    self.log_test("Cleanup", True, "Test patient deleted successfully")
                else:
                    self.log_test("Cleanup", False, f"Failed to delete test patient: HTTP {response.status_code}")
            except Exception as e:
                self.log_test("Cleanup", False, f"Error during cleanup: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests for UNIJOS Health Management System")
        print("=" * 70)
        
        # Basic connectivity tests
        if not self.test_health_check():
            print("❌ Health check failed - aborting further tests")
            return False
            
        if not self.test_api_root():
            print("❌ API root failed - aborting further tests")
            return False
        
        # Core functionality tests
        self.test_create_patient()
        self.test_get_patients()
        self.test_get_patient_by_id()
        self.test_create_medical_record()
        self.test_get_patient_medical_records()
        self.test_age_recommendations()
        self.test_medical_consistency()
        self.test_analytics_endpoints()
        self.test_status_endpoints()
        
        # Cleanup
        self.cleanup_test_data()
        
        # Summary
        print("\n" + "=" * 70)
        print("📊 TEST SUMMARY")
        print("=" * 70)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        failed = total - passed
        
        print(f"Total Tests: {total}")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['message']}")
        
        return failed == 0

def main():
    """Main function to run the tests"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()