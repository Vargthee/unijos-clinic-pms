import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Plus, 
  Search,
  Users, 
  UserCheck,
  Calendar,
  Stethoscope,
  Shield,
  Brain,
  PillBottle,
  Clock,
  User,
  Eye,
  Download,
  Heart,
  Thermometer,
  Activity
} from "lucide-react";
import { AddMedicalEntryDialog } from "./AddMedicalEntryDialog";
import { ScheduleAppointmentDialog } from "./ScheduleAppointmentDialog";

// Expanded University staff data with realistic Nigerian names and departments
const universityStaffRecords = [
  {
    id: "USR001",
    staffId: "UNIJOS/REG/001",
    name: "Dr. Hauwa Abdullahi",
    role: "Registrar",
    department: "Academic Registry",
    unit: "Student Records",
    faculty: "Administration",
    email: "hauwa.abdullahi@unijos.edu.ng",
    phone: "08012345678",
    dateOfBirth: "1975-03-15",
    age: 49,
    bloodType: "O+",
    address: "GRA, Jos",
    emergencyContact: "08098765432",
    lastCheckup: "2024-05-20",
    nextCheckup: "2024-11-20",
    healthStatus: "Good",
    initials: "HA",
    medicalHistory: [
      {
        date: "2024-05-20",
        type: "Annual Checkup",
        diagnosis: "Hypertension (mild)",
        treatment: "Lifestyle modification, blood pressure monitoring",
        doctor: "Dr. Fatima Aliyu"
      }
    ],
    prescriptions: [
      {
        medication: "Amlodipine 5mg",
        dosage: "Once daily",
        duration: "Ongoing",
        prescribedBy: "Dr. Fatima Aliyu",
        date: "2024-05-20"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-03-15", nextDue: "2025-03-15" },
      { vaccine: "Hepatitis B", date: "2023-01-10", nextDue: "2028-01-10" }
    ],
    mentalHealth: {
      lastAssessment: "2024-05-20",
      status: "Good",
      recommendations: "Regular stress management, work-life balance"
    },
    vitals: {
      age: "49 years",
      temperature: "36.8°C",
      bloodPressure: "135/85 mmHg",
      pulse: "78 bpm",
      weight: "68 kg",
      height: "165 cm",
      bmi: "25.0",
      respiratoryRate: "16 breaths/min",
      oxygenSaturation: "98%"
    }
  },
  {
    id: "USR002",
    staffId: "UNIJOS/LIB/002",
    name: "Mr. James Dung",
    role: "Chief Librarian",
    department: "Library Services",
    unit: "Main Library",
    faculty: "Administration",
    email: "james.dung@unijos.edu.ng",
    phone: "08023456789",
    dateOfBirth: "1980-07-22",
    bloodType: "A+",
    address: "Rayfield, Jos",
    emergencyContact: "08087654321",
    lastCheckup: "2024-04-15",
    nextCheckup: "2024-10-15",
    healthStatus: "Excellent",
    initials: "JD",
    medicalHistory: [
      {
        date: "2024-04-15",
        type: "Routine Checkup",
        diagnosis: "Excellent health",
        treatment: "Continue current lifestyle",
        doctor: "Dr. Ruth Laven"
      }
    ],
    prescriptions: [
      {
        medication: "Multivitamin",
        dosage: "Once daily",
        duration: "Ongoing",
        prescribedBy: "Dr. Ruth Laven",
        date: "2024-04-15"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-01-20", nextDue: "2025-01-20" },
      { vaccine: "Annual Flu Shot", date: "2024-03-01", nextDue: "2025-03-01" }
    ],
    mentalHealth: {
      lastAssessment: "2024-04-15",
      status: "Excellent",
      recommendations: "Maintain current mental wellness practices"
    },
    vitals: {
      age: "44 years",
      temperature: "36.7°C",
      bloodPressure: "120/75 mmHg",
      pulse: "72 bpm",
      weight: "75 kg",
      height: "178 cm",
      bmi: "23.7",
      respiratoryRate: "15 breaths/min",
      oxygenSaturation: "99%"
    }
  },
  {
    id: "USR003",
    staffId: "UNIJOS/SEC/003",
    name: "Mrs. Grace Yakubu",
    role: "Security Coordinator",
    department: "Security Services",
    unit: "Campus Security",
    faculty: "Administration",
    email: "grace.yakubu@unijos.edu.ng",
    phone: "08034567890",
    dateOfBirth: "1978-11-05",
    bloodType: "B+",
    address: "Bukuru, Jos",
    emergencyContact: "08076543210",
    lastCheckup: "2024-06-01",
    nextCheckup: "2024-12-01",
    healthStatus: "Good",
    initials: "GY",
    medicalHistory: [
      {
        date: "2024-06-01",
        type: "Occupational Health Check",
        diagnosis: "Lower back strain",
        treatment: "Physiotherapy, ergonomic training",
        doctor: "Dr. Peter Nnamdi"
      }
    ],
    prescriptions: [
      {
        medication: "Ibuprofen 400mg",
        dosage: "As needed for pain",
        duration: "2 weeks",
        prescribedBy: "Dr. Peter Nnamdi",
        date: "2024-06-01"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-02-28", nextDue: "2025-02-28" },
      { vaccine: "Hepatitis B", date: "2023-05-15", nextDue: "2028-05-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-01",
      status: "Good",
      recommendations: "Stress management for high-pressure work environment"
    },
    vitals: {
      age: "46 years",
      temperature: "36.9°C",
      bloodPressure: "128/82 mmHg",
      pulse: "75 bpm",
      weight: "65 kg",
      height: "162 cm",
      bmi: "24.8",
      respiratoryRate: "16 breaths/min",
      oxygenSaturation: "98%"
    }
  },
  {
    id: "USR004",
    staffId: "UNIJOS/ICT/004",
    name: "Engr. Emmanuel Bulus",
    role: "ICT Director",
    department: "Information Technology",
    unit: "ICT Center",
    faculty: "Administration",
    email: "emmanuel.bulus@unijos.edu.ng",
    phone: "08045678901",
    dateOfBirth: "1982-01-18",
    bloodType: "AB+",
    address: "Anglo Jos, Jos",
    emergencyContact: "08065432109",
    lastCheckup: "2024-03-25",
    nextCheckup: "2024-09-25",
    healthStatus: "Good",
    initials: "EB",
    medicalHistory: [
      {
        date: "2024-03-25",
        type: "Consultation",
        diagnosis: "Computer Vision Syndrome",
        treatment: "Blue light glasses, regular eye breaks",
        doctor: "Dr. Samuel Dung"
      }
    ],
    prescriptions: [
      {
        medication: "Artificial tears",
        dosage: "As needed",
        duration: "Ongoing",
        prescribedBy: "Dr. Samuel Dung",
        date: "2024-03-25"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-04-10", nextDue: "2025-04-10" },
      { vaccine: "Annual Flu Shot", date: "2024-02-15", nextDue: "2025-02-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-03-25",
      status: "Good",
      recommendations: "Work-life balance, regular digital detox"
    },
    vitals: {
      age: "42 years",
      temperature: "36.6°C",
      bloodPressure: "125/80 mmHg",
      pulse: "74 bpm",
      weight: "80 kg",
      height: "175 cm",
      bmi: "26.1",
      respiratoryRate: "16 breaths/min",
      oxygenSaturation: "97%"
    }
  },
  {
    id: "USR005",
    staffId: "UNIJOS/BUR/005",
    name: "Mrs. Rebecca Gyang",
    role: "Bursary Officer",
    department: "Bursary",
    unit: "Financial Services",
    faculty: "Administration",
    email: "rebecca.gyang@unijos.edu.ng",
    phone: "08056789012",
    dateOfBirth: "1985-09-12",
    bloodType: "O-",
    address: "Lamingo, Jos",
    emergencyContact: "08054321098",
    lastCheckup: "2024-05-05",
    nextCheckup: "2024-11-05",
    healthStatus: "Good",
    initials: "RG",
    medicalHistory: [
      {
        date: "2024-05-05",
        type: "Routine Checkup",
        diagnosis: "Anemia (mild)",
        treatment: "Iron supplements, dietary counseling",
        doctor: "Dr. Aisha Mohammed"
      }
    ],
    prescriptions: [
      {
        medication: "Ferrous sulfate 325mg",
        dosage: "Twice daily",
        duration: "3 months",
        prescribedBy: "Dr. Aisha Mohammed",
        date: "2024-05-05"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-01-15", nextDue: "2025-01-15" },
      { vaccine: "Hepatitis B", date: "2023-08-20", nextDue: "2028-08-20" }
    ],
    mentalHealth: {
      lastAssessment: "2024-05-05",
      status: "Good",
      recommendations: "Continue stress management techniques"
    },
    vitals: {
      age: "39 years",
      temperature: "36.5°C",
      bloodPressure: "118/72 mmHg",
      pulse: "70 bpm",
      weight: "60 kg",
      height: "160 cm",
      bmi: "23.4",
      respiratoryRate: "15 breaths/min",
      oxygenSaturation: "99%"
    }
  },
  {
    id: "USR006",
    staffId: "UNIJOS/EST/006",
    name: "Mr. Daniel Kwaghe",
    role: "Estate Officer",
    department: "Estate Management",
    unit: "Facilities",
    faculty: "Administration",
    email: "daniel.kwaghe@unijos.edu.ng",
    phone: "08067890123",
    dateOfBirth: "1979-06-30",
    bloodType: "A-",
    address: "Dogon Dutse, Jos",
    emergencyContact: "08043210987",
    lastCheckup: "2024-04-20",
    nextCheckup: "2024-10-20",
    healthStatus: "Good",
    initials: "DK",
    medicalHistory: [
      {
        date: "2024-04-20",
        type: "Treatment",
        diagnosis: "Allergic rhinitis",
        treatment: "Antihistamines, avoid allergens",
        doctor: "Dr. Mary Gyang"
      }
    ],
    prescriptions: [
      {
        medication: "Loratadine 10mg",
        dosage: "Once daily",
        duration: "As needed",
        prescribedBy: "Dr. Mary Gyang",
        date: "2024-04-20"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-02-10", nextDue: "2025-02-10" },
      { vaccine: "Tetanus", date: "2022-08-15", nextDue: "2032-08-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-04-20",
      status: "Good",
      recommendations: "Regular exercise, outdoor activities"
    },
    vitals: {
      age: "45 years",
      temperature: "36.7°C",
      bloodPressure: "122/76 mmHg",
      pulse: "73 bpm",
      weight: "70 kg",
      height: "172 cm",
      bmi: "23.7",
      respiratoryRate: "16 breaths/min",
      oxygenSaturation: "98%"
    }
  },
  {
    id: "USR007",
    staffId: "UNIJOS/HR/007",
    name: "Mrs. Maryam Umar",
    role: "HR Director",
    department: "Human Resources",
    unit: "Staff Development",
    faculty: "Administration",
    email: "maryam.umar@unijos.edu.ng",
    phone: "08078901234",
    dateOfBirth: "1976-12-08",
    bloodType: "B-",
    address: "Plateau State University Road, Jos",
    emergencyContact: "08032109876",
    lastCheckup: "2024-05-30",
    nextCheckup: "2024-11-30",
    healthStatus: "Excellent",
    initials: "MU",
    medicalHistory: [
      {
        date: "2024-05-30",
        type: "Annual Checkup",
        diagnosis: "Perfect health",
        treatment: "Continue healthy lifestyle",
        doctor: "Dr. Emmanuel Yakubu"
      }
    ],
    prescriptions: [],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-03-20", nextDue: "2025-03-20" },
      { vaccine: "Annual Flu Shot", date: "2024-04-05", nextDue: "2025-04-05" }
    ],
    mentalHealth: {
      lastAssessment: "2024-05-30",
      status: "Excellent",
      recommendations: "Continue wellness programs"
    },
    vitals: {
      age: "48 years",
      temperature: "36.4°C",
      bloodPressure: "115/70 mmHg",
      pulse: "68 bpm",
      weight: "62 kg",
      height: "168 cm",
      bmi: "22.0",
      respiratoryRate: "15 breaths/min",
      oxygenSaturation: "99%"
    }
  },
  {
    id: "USR008",
    staffId: "UNIJOS/MED/008",
    name: "Dr. Samuel Gyang",
    role: "Emergency Medicine Doctor",
    department: "Emergency Medicine",
    unit: "Emergency Room",
    faculty: "Medical Staff",
    email: "samuel.gyang@unijos.edu.ng",
    phone: "08012345008",
    dateOfBirth: "1985-04-15",
    bloodType: "AB+",
    address: "Medical Staff Quarters, Jos",
    emergencyContact: "08098765008",
    lastCheckup: "2024-05-28",
    nextCheckup: "2024-08-28",
    healthStatus: "Good",
    initials: "SG",
    medicalHistory: [
      {
        date: "2024-05-28",
        type: "Routine Checkup",
        diagnosis: "Excellent health",
        treatment: "Continue current lifestyle",
        doctor: "Dr. Fatima Aliyu"
      }
    ],
    prescriptions: [],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-03-15", nextDue: "2025-03-15" },
      { vaccine: "Hepatitis B", date: "2023-01-10", nextDue: "2028-01-10" }
    ],
    mentalHealth: {
      lastAssessment: "2024-05-28",
      status: "Good",
      recommendations: "Stress management for emergency work"
    },
    vitals: {
      age: "39 years",
      temperature: "36.6°C",
      bloodPressure: "125/80 mmHg",
      pulse: "74 bpm",
      weight: "80 kg",
      height: "175 cm",
      bmi: "26.1",
      respiratoryRate: "16 breaths/min",
      oxygenSaturation: "98%"
    }
  },
  {
    id: "USR009",
    staffId: "UNIJOS/MED/009",
    name: "Dr. Grace Musa",
    role: "Maternity Unit Doctor",
    department: "Obstetrics & Gynaecology",
    unit: "Maternity Ward",
    faculty: "Medical Staff",
    email: "grace.musa@unijos.edu.ng",
    phone: "08012345009",
    dateOfBirth: "1987-08-22",
    bloodType: "B-",
    address: "Medical Staff Quarters, Jos",
    emergencyContact: "08098765009",
    lastCheckup: "2024-06-05",
    nextCheckup: "2024-12-05",
    healthStatus: "Excellent",
    initials: "GM",
    medicalHistory: [
      {
        date: "2024-06-05",
        type: "Annual Checkup",
        diagnosis: "Perfect health",
        treatment: "Continue wellness routine",
        doctor: "Dr. Amina Hassan"
      }
    ],
    prescriptions: [],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-02-20", nextDue: "2025-02-20" },
      { vaccine: "Rubella", date: "2020-01-15", nextDue: "2030-01-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-05",
      status: "Excellent",
      recommendations: "Continue work-life balance"
    },
    vitals: {
      age: "37 years",
      temperature: "36.5°C",
      bloodPressure: "115/70 mmHg",
      pulse: "68 bpm",
      weight: "62 kg",
      height: "168 cm",
      bmi: "22.0",
      respiratoryRate: "15 breaths/min",
      oxygenSaturation: "99%"
    }
  },
  {
    id: "USR010",
    staffId: "UNIJOS/AMB/010",
    name: "Dr. Emmanuel Yakubu",
    role: "Ambulance Services Director",
    department: "Emergency Services",
    unit: "Ambulance Unit",
    faculty: "Medical Staff",
    email: "emmanuel.yakubu@unijos.edu.ng",
    phone: "08012345010",
    dateOfBirth: "1983-11-30",
    bloodType: "O-",
    address: "Medical Staff Quarters, Jos",
    emergencyContact: "08098765010",
    lastCheckup: "2024-05-18",
    nextCheckup: "2024-08-18",
    healthStatus: "Good",
    initials: "EY",
    medicalHistory: [
      {
        date: "2024-05-18",
        type: "Occupational Health",
        diagnosis: "Work-related stress",
        treatment: "Counseling, stress management",
        doctor: "Dr. Mary Gyang"
      }
    ],
    prescriptions: [],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-01-25", nextDue: "2025-01-25" },
      { vaccine: "Hepatitis B", date: "2022-06-10", nextDue: "2027-06-10" }
    ],
    mentalHealth: {
      lastAssessment: "2024-05-18",
      status: "Fair",
      recommendations: "Regular counseling sessions, workload management"
    },
    vitals: {
      age: "41 years",
      temperature: "36.8°C",
      bloodPressure: "130/85 mmHg",
      pulse: "76 bpm",
      weight: "75 kg",
      height: "172 cm",
      bmi: "25.3",
      respiratoryRate: "16 breaths/min",
      oxygenSaturation: "98%"
    }
  }
];

// Expanded Student records with more realistic Nigerian names and additional health records
const studentRecords = [
  {
    id: "STU001",
    patientId: "P001234",
    name: "Adaora Okonkwo",
    matricNumber: "UJ/2022/ENG/0234",
    faculty: "Engineering",
    department: "Computer Engineering",
    level: "200L",
    email: "adaora.okonkwo@unijos.edu.ng",
    phone: "08012345678",
    bloodType: "O+",
    lastVisit: "2024-06-05",
    healthStatus: "Good",
    initials: "AO",
    medicalHistory: [
      {
        date: "2024-06-05",
        type: "Consultation",
        diagnosis: "Stress-related headaches",
        treatment: "Stress management, adequate sleep",
        doctor: "Dr. Fatima Aliyu"
      },
      {
        date: "2024-04-12",
        type: "Follow-up",
        diagnosis: "Academic stress",
        treatment: "Counseling sessions",
        doctor: "Dr. Mary Gyang"
      }
    ],
    prescriptions: [
      {
        medication: "Paracetamol 500mg",
        dosage: "As needed",
        duration: "1 week",
        prescribedBy: "Dr. Fatima Aliyu",
        date: "2024-06-05"
      }
    ],
    vaccinations: [
      { vaccine: "Meningitis", date: "2022-09-01", nextDue: "2027-09-01" },
      { vaccine: "COVID-19", date: "2023-01-15", nextDue: "2024-01-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-05",
      status: "Mild stress",
      recommendations: "Regular counseling, stress management workshops"
    },
    vitals: {
      age: "20 years",
      temperature: "36.8°C",
      bloodPressure: "115/75 mmHg",
      pulse: "78 bpm",
      weight: "58 kg",
      height: "165 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      bmi: "21.3"
    },
    previousVisits: [
      { date: "2024-06-05", reason: "Stress headaches", doctor: "Dr. Fatima Aliyu" },
      { date: "2024-04-12", reason: "Academic stress follow-up", doctor: "Dr. Mary Gyang" },
      { date: "2024-02-20", reason: "Routine check-up", doctor: "Dr. Samuel Dung" }
    ]
  },
  {
    id: "STU003",
    patientId: "P001236",
    name: "Blessing Eze",
    matricNumber: "UJ/2023/SSC/0123",
    faculty: "Social Sciences",
    department: "Psychology",
    level: "100L",
    email: "blessing.eze@unijos.edu.ng",
    phone: "08034567890",
    bloodType: "B+",
    lastVisit: "2024-06-08",
    healthStatus: "Good",
    initials: "BE",
    medicalHistory: [
      {
        date: "2024-06-08",
        type: "Treatment",
        diagnosis: "Upper respiratory tract infection",
        treatment: "Antibiotics, rest, fluids",
        doctor: "Dr. Aisha Mohammed"
      }
    ],
    prescriptions: [
      {
        medication: "Amoxicillin 500mg",
        dosage: "Three times daily",
        duration: "5 days",
        prescribedBy: "Dr. Aisha Mohammed",
        date: "2024-06-08"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19", date: "2023-02-20", nextDue: "2024-02-20" },
      { vaccine: "Meningitis", date: "2023-09-01", nextDue: "2028-09-01" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-08",
      status: "Good",
      recommendations: "Academic support, peer counseling"
    },
    vitals: {
      age: "18 years",
      temperature: "38.2°C",
      bloodPressure: "110/70 mmHg",
      pulse: "88 bpm",
      weight: "55 kg",
      height: "162 cm",
      respiratoryRate: "20/min",
      oxygenSaturation: "97%",
      bmi: "20.9"
    },
    previousVisits: [
      { date: "2024-06-08", reason: "URTI", doctor: "Dr. Aisha Mohammed" },
      { date: "2024-04-15", reason: "Orientation health check", doctor: "Dr. Grace Musa" }
    ]
  },
  {
    id: "STU004",
    patientId: "P001237",
    name: "Yusuf Abdullahi",
    matricNumber: "UJ/2021/NSC/0789",
    faculty: "Natural Sciences",
    department: "Computer Science",
    level: "300L",
    email: "yusuf.abdullahi@unijos.edu.ng",
    phone: "08045678901",
    bloodType: "AB+",
    lastVisit: "2024-06-09",
    healthStatus: "Good",
    initials: "YA",
    medicalHistory: [
      {
        date: "2024-06-09",
        type: "Follow-up",
        diagnosis: "Computer vision syndrome",
        treatment: "Eye exercises, blue light glasses",
        doctor: "Dr. Grace Musa"
      },
      {
        date: "2024-05-15",
        type: "Consultation",
        diagnosis: "Dry eyes from excessive screen time",
        treatment: "Artificial tears, screen breaks",
        doctor: "Dr. Grace Musa"
      }
    ],
    prescriptions: [
      {
        medication: "Artificial tears",
        dosage: "As needed",
        duration: "Ongoing",
        prescribedBy: "Dr. Grace Musa",
        date: "2024-06-09"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-03-15", nextDue: "2025-03-15" },
      { vaccine: "Annual Flu Shot", date: "2024-02-20", nextDue: "2025-02-20" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-09",
      status: "Good",
      recommendations: "Digital wellness, study-life balance"
    },
    vitals: {
      age: "21 years",
      temperature: "36.5°C",
      bloodPressure: "118/78 mmHg",
      pulse: "72 bmp",
      weight: "68 kg",
      height: "170 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      bmi: "23.5"
    },
    previousVisits: [
      { date: "2024-06-09", reason: "CVS follow-up", doctor: "Dr. Grace Musa" },
      { date: "2024-05-15", reason: "Eye strain", doctor: "Dr. Grace Musa" },
      { date: "2024-03-15", reason: "Vaccination", doctor: "Dr. Samuel Dung" }
    ]
  },
  {
    id: "STU005",
    patientId: "P001238",
    name: "Fatima Aliyu",
    matricNumber: "UJ/2019/LAW/0345",
    faculty: "Law",
    department: "Law",
    level: "500L",
    email: "fatima.aliyu.student@unijos.edu.ng",
    phone: "08056789012",
    bloodType: "O-",
    lastVisit: "2024-06-06",
    healthStatus: "Good",
    initials: "FA",
    medicalHistory: [
      {
        date: "2024-06-06",
        type: "Consultation",
        diagnosis: "Dysmenorrhea",
        treatment: "Pain management, hormonal evaluation",
        doctor: "Dr. Hauwa Ibrahim"
      },
      {
        date: "2024-04-20",
        type: "Counseling",
        diagnosis: "Final year academic pressure",
        treatment: "Stress management counseling",
        doctor: "Dr. Mary Gyang"
      }
    ],
    prescriptions: [
      {
        medication: "Mefenamic acid 500mg",
        dosage: "Three times daily during menstruation",
        duration: "As needed",
        prescribedBy: "Dr. Hauwa Ibrahim",
        date: "2024-06-06"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-01-05", nextDue: "2025-01-05" },
      { vaccine: "HPV", date: "2019-10-15", nextDue: "2024-10-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-06",
      status: "Good",
      recommendations: "Final year support, career counseling"
    },
    vitals: {
      age: "24 years",
      temperature: "36.9°C",
      bloodPressure: "108/68 mmHg",
      pulse: "76 bpm",
      weight: "62 kg",
      height: "168 cm",
      respiratoryRate: "15/min",
      oxygenSaturation: "99%",
      bmi: "22.0"
    },
    previousVisits: [
      { date: "2024-06-06", reason: "Dysmenorrhea", doctor: "Dr. Hauwa Ibrahim" },
      { date: "2024-04-20", reason: "Academic stress counseling", doctor: "Dr. Mary Gyang" },
      { date: "2024-02-10", reason: "Routine check-up", doctor: "Dr. Peter Bulus" },
      { date: "2024-01-05", reason: "Vaccination", doctor: "Dr. Ruth Laven" }
    ]
  },
  {
    id: "STU006",
    patientId: "P001239",
    name: "Chidi Okafor",
    matricNumber: "UJ/2022/PHM/0567",
    faculty: "Pharmacy",
    department: "Pharmacy",
    level: "200L",
    email: "chidi.okafor@unijos.edu.ng",
    phone: "08067890123",
    bloodType: "A-",
    lastVisit: "2024-06-04",
    healthStatus: "Good",
    initials: "CO",
    medicalHistory: [
      {
        date: "2024-06-04",
        type: "Emergency",
        diagnosis: "Acute gastroenteritis",
        treatment: "Rehydration therapy, dietary modification",
        doctor: "Dr. Samuel Dung"
      }
    ],
    prescriptions: [
      {
        medication: "ORS sachets",
        dosage: "As directed",
        duration: "3 days",
        prescribedBy: "Dr. Samuel Dung",
        date: "2024-06-04"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19", date: "2022-11-20", nextDue: "2023-11-20" },
      { vaccine: "Hepatitis B", date: "2022-09-01", nextDue: "2027-09-01" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-04",
      status: "Good",
      recommendations: "Stress management, healthy eating habits"
    },
    vitals: {
      age: "20 years",
      temperature: "37.8°C",
      bloodPressure: "100/65 mmHg",
      pulse: "95 bpm",
      weight: "66 kg",
      height: "173 cm",
      respiratoryRate: "18/min",
      oxygenSaturation: "97%",
      bmi: "22.1"
    },
    previousVisits: [
      { date: "2024-06-04", reason: "Gastroenteritis", doctor: "Dr. Samuel Dung" },
      { date: "2024-03-10", reason: "Routine check-up", doctor: "Dr. Emmanuel Yakubu" }
    ]
  },
  {
    id: "STU007",
    patientId: "P001250",
    name: "Amina Bello",
    matricNumber: "UJ/2023/EDU/0890",
    faculty: "Education",
    department: "Educational Psychology",
    level: "100L",
    email: "amina.bello@unijos.edu.ng",
    phone: "08078901234",
    bloodType: "B-",
    lastVisit: "2024-06-10",
    healthStatus: "Good",
    initials: "AB",
    medicalHistory: [
      {
        date: "2024-06-10",
        type: "Consultation",
        diagnosis: "Adjustment disorder",
        treatment: "Counseling, stress management",
        doctor: "Dr. Mary Gyang"
      }
    ],
    prescriptions: [],
    vaccinations: [
      { vaccine: "COVID-19", date: "2023-03-15", nextDue: "2024-03-15" },
      { vaccine: "Meningitis", date: "2023-09-01", nextDue: "2028-09-01" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-10",
      status: "Mild adjustment issues",
      recommendations: "Regular counseling sessions, peer support groups"
    },
    vitals: {
      age: "18 years",
      temperature: "36.7°C",
      bloodPressure: "112/72 mmHg",
      pulse: "74 bpm",
      weight: "59 kg",
      height: "164 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      bmi: "21.9"
    },
    previousVisits: [
      { date: "2024-06-10", reason: "Adjustment counseling", doctor: "Dr. Mary Gyang" },
      { date: "2024-04-25", reason: "Orientation health screening", doctor: "Dr. Aisha Mohammed" }
    ]
  },
  {
    id: "STU008",
    patientId: "P001251",
    name: "David Pam",
    matricNumber: "UJ/2021/AGR/0456",
    faculty: "Agriculture",
    department: "Animal Science",
    level: "300L",
    email: "david.pam@unijos.edu.ng",
    phone: "08089012345",
    bloodType: "A+",
    lastVisit: "2024-06-11",
    healthStatus: "Good",
    initials: "DP",
    medicalHistory: [
      {
        date: "2024-06-11",
        type: "Treatment",
        diagnosis: "Allergic reaction to animal dander",
        treatment: "Antihistamines, allergen avoidance",
        doctor: "Dr. Peter Bulus"
      },
      {
        date: "2024-05-05",
        type: "Emergency",
        diagnosis: "Minor laceration from farm equipment",
        treatment: "Wound suturing, tetanus shot",
        doctor: "Dr. John Okafor"
      }
    ],
    prescriptions: [
      {
        medication: "Cetirizine 10mg",
        dosage: "Once daily",
        duration: "2 weeks",
        prescribedBy: "Dr. Peter Bulus",
        date: "2024-06-11"
      }
    ],
    vaccinations: [
      { vaccine: "Tetanus", date: "2024-05-05", nextDue: "2034-05-05" },
      { vaccine: "COVID-19 Booster", date: "2024-02-15", nextDue: "2025-02-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-11",
      status: "Good",
      recommendations: "Stress management for practical work"
    },
    vitals: {
      age: "22 years",
      temperature: "36.8°C",
      bloodPressure: "125/80 mmHg",
      pulse: "80 bpm",
      weight: "75 kg",
      height: "178 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      bmi: "23.7"
    },
    previousVisits: [
      { date: "2024-06-11", reason: "Allergic reaction", doctor: "Dr. Peter Bulus" },
      { date: "2024-05-05", reason: "Laceration treatment", doctor: "Dr. John Okafor" },
      { date: "2024-02-15", reason: "Vaccination", doctor: "Dr. Ruth Laven" }
    ]
  },
  {
    id: "STU009",
    patientId: "P001244",
    name: "Khadijah Usman",
    matricNumber: "UJ/2022/NUR/0345",
    faculty: "Nursing Sciences",
    department: "Nursing",
    level: "200L",
    email: "khadijah.usman@unijos.edu.ng",
    phone: "08012347890",
    bloodType: "A+",
    lastVisit: "2024-06-14",
    healthStatus: "Pregnant - 2nd Trimester",
    initials: "KU",
    medicalHistory: [
      {
        date: "2024-06-14",
        type: "Prenatal Care",
        diagnosis: "Normal pregnancy progression",
        treatment: "Prenatal vitamins, regular checkups",
        doctor: "Dr. Grace Musa"
      }
    ],
    prescriptions: [
      {
        medication: "Prenatal vitamins",
        dosage: "Once daily",
        duration: "Throughout pregnancy",
        prescribedBy: "Dr. Grace Musa",
        date: "2024-06-14"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-01-15", nextDue: "2025-01-15" },
      { vaccine: "Tetanus", date: "2024-03-20", nextDue: "2034-03-20" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-14",
      status: "Good",
      recommendations: "Pregnancy counseling, stress management"
    },
    vitals: {
      age: "21 years",
      temperature: "36.6°C",
      bloodPressure: "110/70 mmHg",
      pulse: "85 bpm",
      weight: "68 kg",
      height: "165 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "99%",
      bmi: "25.0"
    },
    previousVisits: [
      { date: "2024-06-14", reason: "Prenatal checkup", doctor: "Dr. Grace Musa" },
      { date: "2024-05-14", reason: "First prenatal visit", doctor: "Dr. Grace Musa" },
      { date: "2024-03-20", reason: "Vaccination", doctor: "Dr. Ruth Laven" }
    ]
  },
  {
    id: "STU010",
    patientId: "P001245",
    name: "Joseph Danladi",
    matricNumber: "UJ/2020/ART/0123",
    faculty: "Arts",
    department: "History",
    level: "400L",
    email: "joseph.danladi@unijos.edu.ng",
    phone: "08012348901",
    bloodType: "O-",
    lastVisit: "2024-06-15",
    healthStatus: "Recovering",
    initials: "JD",
    medicalHistory: [
      {
        date: "2024-06-15",
        type: "Emergency",
        diagnosis: "Motorcycle accident - minor injuries",
        treatment: "Wound care, pain management",
        doctor: "Dr. Emmanuel Yakubu"
      }
    ],
    prescriptions: [
      {
        medication: "Paracetamol 500mg",
        dosage: "As needed for pain",
        duration: "1 week",
        prescribedBy: "Dr. Emmanuel Yakubu",
        date: "2024-06-15"
      }
    ],
    vaccinations: [
      { vaccine: "Tetanus", date: "2024-06-15", nextDue: "2034-06-15" },
      { vaccine: "COVID-19", date: "2023-12-10", nextDue: "2024-12-10" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-15",
      status: "Mild anxiety",
      recommendations: "Post-accident counseling, stress management"
    },
    vitals: {
      age: "23 years",
      temperature: "36.9°C",
      bloodPressure: "125/80 mmHg",
      pulse: "82 bpm",
      weight: "70 kg",
      height: "175 cm",
      respiratoryRate: "17/min",
      oxygenSaturation: "98%",
      bmi: "22.9"
    },
    previousVisits: [
      { date: "2024-06-15", reason: "Accident injuries", doctor: "Dr. Emmanuel Yakubu" },
      { date: "2024-03-10", reason: "Routine checkup", doctor: "Dr. Samuel Dung" }
    ]
  },
  {
    id: "STU011",
    patientId: "P001246",
    name: "Zainab Abdullahi",
    matricNumber: "UJ/2022/VET/0456",
    faculty: "Veterinary Medicine",
    department: "Veterinary Medicine",
    level: "200L",
    email: "zainab.abdullahi@unijos.edu.ng",
    phone: "08012349012",
    bloodType: "B+",
    lastVisit: "2024-06-16",
    healthStatus: "Good",
    initials: "ZA",
    medicalHistory: [
      {
        date: "2024-06-16",
        type: "Consultation",
        diagnosis: "Allergic rhinitis from animal exposure",
        treatment: "Antihistamines, allergen avoidance",
        doctor: "Dr. Mary Gyang"
      }
    ],
    prescriptions: [
      {
        medication: "Loratadine 10mg",
        dosage: "Once daily",
        duration: "As needed",
        prescribedBy: "Dr. Mary Gyang",
        date: "2024-06-16"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-02-20", nextDue: "2025-02-20" },
      { vaccine: "Rabies", date: "2022-10-01", nextDue: "2025-10-01" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-16",
      status: "Good",
      recommendations: "Stress management for academic demands"
    },
    vitals: {
      age: "20 years",
      temperature: "36.8°C",
      bloodPressure: "115/75 mmHg",
      pulse: "76 bpm",
      weight: "60 kg",
      height: "163 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      bmi: "22.6"
    },
    previousVisits: [
      { date: "2024-06-16", reason: "Allergic rhinitis", doctor: "Dr. Mary Gyang" },
      { date: "2024-04-10", reason: "Routine checkup", doctor: "Dr. Peter Bulus" },
      { date: "2024-02-20", reason: "Vaccination", doctor: "Dr. Ruth Laven" }
    ]
  },
  {
    id: "STU012",
    patientId: "P001247",
    name: "Michael Pam",
    matricNumber: "UJ/2021/ENG/0890",
    faculty: "Engineering",
    department: "Electrical Engineering",
    level: "300L",
    email: "michael.pam@unijos.edu.ng",
    phone: "08012350123",
    bloodType: "AB-",
    lastVisit: "2024-06-17",
    healthStatus: "Good",
    initials: "MP",
    medicalHistory: [
      {
        date: "2024-06-17",
        type: "Treatment",
        diagnosis: "Minor electrical burn from lab work",
        treatment: "Wound care, burn management",
        doctor: "Dr. Samuel Gyang"
      }
    ],
    prescriptions: [
      {
        medication: "Silver sulfadiazine cream",
        dosage: "Apply twice daily",
        duration: "1 week",
        prescribedBy: "Dr. Samuel Gyang",
        date: "2024-06-17"
      }
    ],
    vaccinations: [
      { vaccine: "Tetanus", date: "2024-06-17", nextDue: "2034-06-17" },
      { vaccine: "COVID-19", date: "2024-01-05", nextDue: "2025-01-05" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-17",
      status: "Good",
      recommendations: "Safety awareness, stress management"
    },
    vitals: {
      age: "22 years",
      temperature: "36.7°C",
      bloodPressure: "120/78 mmHg",
      pulse: "74 bpm",
      weight: "72 kg",
      height: "176 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      bmi: "23.2"
    },
    previousVisits: [
      { date: "2024-06-17", reason: "Electrical burn", doctor: "Dr. Samuel Gyang" },
      { date: "2024-04-05", reason: "Routine checkup", doctor: "Dr. Emmanuel Yakubu" },
      { date: "2024-01-05", reason: "Vaccination", doctor: "Dr. Grace Musa" }
    ]
  }
];

const getHealthStatusColor = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
    case "Good":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "Fair":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "Poor":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
  }
};

// Enhanced UI Components for better design
const PatientProfileCard = ({ record }: { record: any }) => (
  <Card className="border border-border/30 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm shadow-lg">
    <CardContent className="p-6">
      <div className="text-center space-y-4">
        {/* Avatar */}
        <div className="relative mx-auto w-20 h-20">
          <Avatar className="w-20 h-20 border-4 border-primary/20 shadow-lg">
            <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary/30 to-primary/10 text-primary">
              {record.initials}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${
            record.healthStatus === 'Excellent' ? 'bg-green-500' :
            record.healthStatus === 'Good' ? 'bg-blue-500' :
            record.healthStatus === 'Stable' ? 'bg-yellow-500' :
            'bg-orange-500'
          }`} />
        </div>
        
        {/* Patient Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">{record.name}</h3>
          <div className="flex items-center justify-center gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {record.matricNumber || record.staffId}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="text-muted-foreground font-medium">Faculty</div>
              <div className="font-semibold">{record.faculty}</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="text-muted-foreground font-medium">Level</div>
              <div className="font-semibold">{record.level}</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="text-muted-foreground font-medium">Blood Type</div>
              <div className="font-semibold text-red-600 dark:text-red-400">{record.bloodType}</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="text-muted-foreground font-medium">Status</div>
              <div className={`font-semibold ${
                record.healthStatus === 'Excellent' ? 'text-green-600 dark:text-green-400' :
                record.healthStatus === 'Good' ? 'text-blue-600 dark:text-blue-400' :
                record.healthStatus === 'Stable' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-orange-600 dark:text-orange-400'
              }`}>
                {record.healthStatus}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ComprehensiveMedicalRecords = () => {
  const [selectedRecord, setSelectedRecord] = useState(studentRecords[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Medical Records</h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive patient medical information and history
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddEntryOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
          <Button onClick={() => setIsScheduleOpen(true)} variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border border-border/30 bg-card/60 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, ID, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 lg:w-auto">
                <TabsTrigger value="students" className="gap-2">
                  <Users className="h-4 w-4" />
                  Students
                </TabsTrigger>
                <TabsTrigger value="staff" className="gap-2">
                  <UserCheck className="h-4 w-4" />
                  Staff
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Records Grid */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Records List */}
        <div className="lg:col-span-1">
          <Card className="border border-border/30 bg-card/80">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Patient Records
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 p-4">
                {studentRecords.map((record) => (
                  <div
                    key={record.id}
                    onClick={() => setSelectedRecord(record)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                      selectedRecord.id === record.id ? 'bg-primary/10 border border-primary/20' : 'bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm">{record.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{record.name}</p>
                        <p className="text-xs text-muted-foreground">{record.matricNumber}</p>
                        <p className="text-xs text-muted-foreground">{record.faculty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Record View */}
        <div className="lg:col-span-3">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6 space-y-6 lg:space-y-0">
            {/* Patient Profile */}
            <div className="lg:col-span-1 space-y-6">
              <PatientProfileCard record={selectedRecord} />
              
              {/* Contact Information */}
              <Card className="border border-border/30 bg-card/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-muted-foreground font-medium">Email</span>
                      <span className="font-mono text-sm">{selectedRecord.email}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-muted-foreground font-medium">Phone</span>
                      <span className="font-mono text-sm">{selectedRecord.phone}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-muted-foreground font-medium">Last Visit</span>
                      <span className="text-sm">{selectedRecord.lastVisit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vital Signs */}
            <div className="lg:col-span-1">
              <Card className="border border-border/30 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm shadow-lg h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Current Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedRecord.vitals && (
                    <div className="grid gap-4">
                      {/* Age - Special highlight */}
                      <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Age</div>
                            <div className="text-2xl font-bold text-primary">{selectedRecord.vitals.age}</div>
                          </div>
                        </div>
                      </Card>
                      
                      {/* Other vitals in a grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <Card className="p-3 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Thermometer className="h-4 w-4 text-red-500" />
                            <span className="text-xs font-medium text-muted-foreground">Temperature</span>
                          </div>
                          <p className="text-sm font-bold">{selectedRecord.vitals.temperature}</p>
                        </Card>
                        
                        <Card className="p-3 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span className="text-xs font-medium text-muted-foreground">BP</span>
                          </div>
                          <p className="text-sm font-bold">{selectedRecord.vitals.bloodPressure}</p>
                        </Card>
                        
                        <Card className="p-3 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="text-xs font-medium text-muted-foreground">Pulse</span>
                          </div>
                          <p className="text-sm font-bold">{selectedRecord.vitals.pulse}</p>
                        </Card>
                        
                        <Card className="p-3 hover:shadow-md transition-shadow duration-200">
                          <div className="text-xs font-medium text-muted-foreground mb-1">O2 Sat</div>
                          <p className="text-sm font-bold">{selectedRecord.vitals.oxygenSaturation}</p>
                        </Card>
                        
                        <Card className="p-3 hover:shadow-md transition-shadow duration-200">
                          <div className="text-xs font-medium text-muted-foreground mb-1">Weight</div>
                          <p className="text-sm font-bold">{selectedRecord.vitals.weight}</p>
                        </Card>
                        
                        <Card className="p-3 hover:shadow-md transition-shadow duration-200">
                          <div className="text-xs font-medium text-muted-foreground mb-1">Height</div>
                          <p className="text-sm font-bold">{selectedRecord.vitals.height}</p>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Medical History */}
            <div className="lg:col-span-1">
              <Card className="border border-border/30 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Medical History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {selectedRecord.medicalHistory?.map((entry, index) => (
                      <Card key={index} className="p-4 border border-border/30 hover:shadow-md transition-all duration-200">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <Badge 
                              variant={entry.type === 'Emergency' ? 'destructive' : 'outline'} 
                              className="text-xs"
                            >
                              {entry.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-medium">{entry.date}</span>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm text-foreground mb-1">{entry.diagnosis}</h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">{entry.treatment}</p>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                            <Stethoscope className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium text-primary">{entry.doctor}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {selectedRecord.previousVisits && (
                    <>
                      <div className="border-t border-border/30 pt-4">
                        <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          Previous Visits
                        </h5>
                        <div className="space-y-3">
                          {selectedRecord.previousVisits.map((visit, index) => (
                            <Card key={index} className="p-3 bg-muted/20 border-border/20">
                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium">{visit.date}</span>
                                  <Badge variant="secondary" className="text-xs">{visit.reason}</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Stethoscope className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{visit.doctor}</span>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AddMedicalEntryDialog 
        open={isAddEntryOpen} 
        onOpenChange={setIsAddEntryOpen}
        patientName={selectedRecord.name}
      />
      <ScheduleAppointmentDialog 
        open={isScheduleOpen} 
        onOpenChange={setIsScheduleOpen}
        patientName={selectedRecord.name}
      />
    </div>
  );
};

export default ComprehensiveMedicalRecords;
