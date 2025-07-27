import { 
  Patient, 
  PatientCreate, 
  MedicalRecord, 
  MedicalRecordCreate, 
  AgeBasedRecommendation, 
  MedicalConsistencyCheck,
  AgeDistribution
} from '../types/index';

const API_BASE_URL = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Patient Management
  async createPatient(patientData: PatientCreate): Promise<Patient> {
    return this.request<Patient>('/api/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async getPatients(params?: {
    patient_type?: 'Student' | 'Staff';
    faculty?: string;
    min_age?: number;
    max_age?: number;
    limit?: number;
  }): Promise<Patient[]> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/api/patients${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<Patient[]>(endpoint);
  }

  async getPatient(patientId: string): Promise<Patient> {
    return this.request<Patient>(`/api/patients/${patientId}`);
  }

  async updatePatient(patientId: string, patientData: Partial<PatientCreate>): Promise<Patient> {
    return this.request<Patient>(`/api/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  }

  async deletePatient(patientId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/patients/${patientId}`, {
      method: 'DELETE',
    });
  }

  // Medical Records
  async createMedicalRecord(recordData: MedicalRecordCreate): Promise<MedicalRecord> {
    return this.request<MedicalRecord>('/api/medical-records', {
      method: 'POST',
      body: JSON.stringify(recordData),
    });
  }

  async getPatientMedicalRecords(patientId: string): Promise<MedicalRecord[]> {
    return this.request<MedicalRecord[]>(`/api/medical-records/${patientId}`);
  }

  // Age-based Recommendations
  async getPatientAgeRecommendations(patientId: string): Promise<AgeBasedRecommendation> {
    return this.request<AgeBasedRecommendation>(`/api/patients/${patientId}/age-recommendations`);
  }

  // Medical Consistency Check
  async checkMedicalConsistency(patientId: string): Promise<MedicalConsistencyCheck> {
    return this.request<MedicalConsistencyCheck>(`/api/patients/${patientId}/medical-consistency`);
  }

  // Analytics
  async getAgeDistribution(): Promise<AgeDistribution> {
    return this.request<AgeDistribution>('/api/analytics/age-distribution');
  }

  async getMedicalConditionsByAge(): Promise<any> {
    return this.request<any>('/api/analytics/medical-conditions-by-age');
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; service: string; version: string; timestamp: string }> {
    return this.request<{ status: string; service: string; version: string; timestamp: string }>('/health');
  }

  // Utility Methods
  calculateAge(dateOfBirth: string): number {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  calculateBMI(heightCm: number, weightKg: number): number {
    const heightM = heightCm / 100;
    return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatDateTime(date: string | Date): string {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Validation helpers
  validateNigerianPhone(phone: string): boolean {
    const pattern = /^(\+234|234|0)?[789]\d{9}$/;
    return pattern.test(phone);
  }

  validateMatricNumber(matricNumber: string): boolean {
    const pattern = /^UJ\/\d{4}\/[A-Z]{2,4}\/\d{4}$/;
    return pattern.test(matricNumber);
  }

  validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  // Age-based utility functions
  getAgeGroup(age: number): string {
    if (age < 18) return 'Under 18';
    if (age <= 25) return '18-25';
    if (age <= 35) return '26-35';
    if (age <= 50) return '36-50';
    return '50+';
  }

  getAgeBasedAlerts(age: number, medicalHistory: string[] = []): string[] {
    const alerts: string[] = [];
    
    if (age < 18) {
      alerts.push('Minor patient - requires parental consent for treatments');
    }
    
    if (age >= 40) {
      alerts.push('Recommended for regular cardiovascular screening');
    }
    
    if (age >= 50) {
      alerts.push('Recommended for cancer screening programs');
    }
    
    if (age >= 65) {
      alerts.push('Eligible for senior health programs');
    }
    
    // Medical history based alerts
    if (medicalHistory.includes('diabetes') && age >= 35) {
      alerts.push('Requires regular diabetes monitoring');
    }
    
    if (medicalHistory.includes('hypertension') && age >= 30) {
      alerts.push('Regular blood pressure monitoring required');
    }
    
    return alerts;
  }
}

export const apiService = new ApiService();
export default apiService;