
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface VitalSigns {
  temperature?: string;
  blood_pressure?: string;
  pulse?: string;
  weight?: string;
  height?: string;
  respiratory_rate?: string;
  oxygen_saturation?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  patient_type: 'Student' | 'Staff';
  address: string;
  emergency_contact: EmergencyContact;
  
  // Medical Information
  blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  genotype?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  current_medications?: string[];
  medical_history?: string[];
  family_medical_history?: string;
  
  // University specific fields
  faculty?: string;
  department?: string;
  level?: string;
  matric_number?: string;
  staff_id?: string;
  
  // Health Assessment
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  smoking_status?: string;
  alcohol_consumption?: string;
  exercise_frequency?: string;
  
  // Vaccination Information
  vaccination_status?: string;
  last_tetanus_shot?: string;
  covid_vaccination?: string;
  
  // System fields
  created_at: string;
  updated_at: string;
  
  // Warnings from medical consistency check
  warnings?: string[];
}

export interface PatientCreate {
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  patient_type: 'Student' | 'Staff';
  address: string;
  emergency_contact: EmergencyContact;
  
  // Optional fields
  blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  genotype?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  current_medications?: string[];
  medical_history?: string[];
  family_medical_history?: string;
  
  faculty?: string;
  department?: string;
  level?: string;
  matric_number?: string;
  staff_id?: string;
  
  height_cm?: number;
  weight_kg?: number;
  smoking_status?: string;
  alcohol_consumption?: string;
  exercise_frequency?: string;
  
  vaccination_status?: string;
  last_tetanus_shot?: string;
  covid_vaccination?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  department: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  date: string;
  record_type: 'consultation' | 'lab-results' | 'follow-up' | 'procedure' | 'emergency' | 'treatment';
  doctor: string;
  diagnosis: string;
  treatment: string;
  medications?: string[];
  vitals?: VitalSigns;
  notes?: string;
  age_at_visit?: number;
  created_at: string;
  updated_at: string;
}

export interface MedicalRecordCreate {
  patient_id: string;
  date: string;
  record_type: 'consultation' | 'lab-results' | 'follow-up' | 'procedure' | 'emergency' | 'treatment';
  doctor: string;
  diagnosis: string;
  treatment: string;
  medications?: string[];
  vitals?: VitalSigns;
  notes?: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface AgeBasedRecommendation {
  age_range: string;
  recommendations: string[];
  required_screenings: string[];
  vaccination_schedule: string[];
}

export interface MedicalConsistencyCheck {
  patient_id: string;
  consistency_warnings: string[];
  status: 'healthy' | 'needs_attention';
}

export interface AgeDistribution {
  age_distribution: Array<{
    _id: string;
    count: number;
    patients: Array<{
      name: string;
      age: number;
      patient_type: string;
    }>;
  }>;
}

export interface DashboardStats {
  totalPatients: number;
  todaysAppointments: number;
  activeCases: number;
  recordsUpdated: number;
  averageAge: number;
  ageDistribution: AgeDistribution;
}

export type TabType = 'dashboard' | 'patients' | 'appointments' | 'records';

export type Theme = 'light' | 'dark';

// Age-related utility types
export interface AgeGroup {
  range: string;
  count: number;
  percentage: number;
}

export interface AgeBasedAlert {
  type: 'warning' | 'info' | 'success';
  message: string;
  age: number;
  recommendation: string;
}
