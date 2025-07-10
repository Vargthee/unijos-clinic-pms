
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  medicalHistory?: string[];
  allergies?: string[];
  currentMedications?: string[];
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
  patientId: string;
  date: string;
  type: 'consultation' | 'lab-results' | 'follow-up' | 'procedure';
  doctor: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
  prescriptions?: Prescription[];
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface DashboardStats {
  totalPatients: number;
  todaysAppointments: number;
  activeCases: number;
  recordsUpdated: number;
}

export type TabType = 'dashboard' | 'patients' | 'appointments' | 'records';

export type Theme = 'light' | 'dark';
