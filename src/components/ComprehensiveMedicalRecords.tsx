
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
  Download
} from "lucide-react";

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
    }
  }
];

// Expanded Student records with realistic Nigerian names
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
    }
  },
  {
    id: "STU002",
    patientId: "P001235",
    name: "Ibrahim Musa",
    matricNumber: "UJ/2020/MED/0456",
    faculty: "Medicine",
    department: "Medicine & Surgery",
    level: "400L",
    email: "ibrahim.musa@unijos.edu.ng",
    phone: "08023456789",
    bloodType: "A+",
    lastVisit: "2024-06-07",
    healthStatus: "Good",
    initials: "IM",
    medicalHistory: [
      {
        date: "2024-06-07",
        type: "Emergency",
        diagnosis: "Ankle sprain (sports injury)",
        treatment: "RICE protocol, physiotherapy",
        doctor: "Dr. John Okafor"
      }
    ],
    prescriptions: [
      {
        medication: "Ibuprofen 400mg",
        dosage: "Three times daily",
        duration: "1 week",
        prescribedBy: "Dr. John Okafor",
        date: "2024-06-07"
      }
    ],
    vaccinations: [
      { vaccine: "COVID-19 Booster", date: "2024-01-10", nextDue: "2025-01-10" },
      { vaccine: "Hepatitis B", date: "2020-09-15", nextDue: "2025-09-15" }
    ],
    mentalHealth: {
      lastAssessment: "2024-06-07",
      status: "Good",
      recommendations: "Continue sports activities, stress relief"
    }
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
    }
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
    }
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
    }
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
    }
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

export const ComprehensiveMedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredStaff = universityStaffRecords.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.staffId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = studentRecords.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setActiveTab("overview");
  };

  const RecordCard = ({ record, isStaff = false }) => (
    <Card 
      key={record.id} 
      className="hover-lift cursor-pointer transition-all duration-300"
      onClick={() => handleViewRecord(record)}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {record.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground truncate">{record.name}</h3>
              <Badge className={getHealthStatusColor(record.healthStatus)}>
                {record.healthStatus}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {isStaff ? record.staffId : record.matricNumber}
            </p>
            <p className="text-sm text-muted-foreground">
              {isStaff ? `${record.role} - ${record.department}` : `${record.faculty} - ${record.level}`}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{isStaff ? record.lastCheckup : record.lastVisit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{record.bloodType}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            View Full Record
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const DetailedView = ({ record, isStaff }) => (
    <Card className="mt-6 border-2 border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-6 w-6 text-primary" />
            Medical Record - {record.name}
          </CardTitle>
          <Button variant="outline" onClick={() => setSelectedRecord(null)}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                    {record.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{record.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {isStaff ? record.staffId : record.matricNumber}
                </p>
                <Badge className={getHealthStatusColor(record.healthStatus)}>
                  {record.healthStatus}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Blood Type</label>
                  <p className="text-sm font-medium">{record.bloodType}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{record.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{record.phone}</p>
                </div>
                {isStaff && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Department</label>
                      <p className="text-sm">{record.department}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Unit</label>
                      <p className="text-sm">{record.unit}</p>
                    </div>
                  </>
                )}
                {!isStaff && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Faculty</label>
                      <p className="text-sm">{record.faculty}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Level</label>
                      <p className="text-sm">{record.level}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              Medical History
            </h4>
            <div className="space-y-3">
              {record.medicalHistory?.map((entry, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-xs">{entry.type}</Badge>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <h5 className="font-medium text-sm">{entry.diagnosis}</h5>
                    <p className="text-xs text-muted-foreground">{entry.treatment}</p>
                    <p className="text-xs text-muted-foreground">👨‍⚕️ {entry.doctor}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Prescriptions */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <PillBottle className="h-5 w-5 text-primary" />
              Medications
            </h4>
            <div className="space-y-3">
              {record.prescriptions?.length > 0 ? record.prescriptions.map((prescription, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">{prescription.medication}</h5>
                    <div className="text-xs space-y-1">
                      <p><strong>Dosage:</strong> {prescription.dosage}</p>
                      <p><strong>Duration:</strong> {prescription.duration}</p>
                      <p><strong>Date:</strong> {prescription.date}</p>
                    </div>
                  </div>
                </Card>
              )) : (
                <p className="text-sm text-muted-foreground">No current medications</p>
              )}
            </div>
          </div>

          {/* Vaccinations & Mental Health */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Vaccinations */}
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  Vaccines
                </h4>
                <div className="space-y-3">
                  {record.vaccinations?.map((vaccination, index) => (
                    <Card key={index} className="p-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium text-sm">{vaccination.vaccine}</h5>
                          <Badge 
                            className={new Date(vaccination.nextDue) > new Date() 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }
                          >
                            {new Date(vaccination.nextDue) > new Date() ? "Current" : "Due"}
                          </Badge>
                        </div>
                        <div className="text-xs space-y-1">
                          <p><strong>Given:</strong> {vaccination.date}</p>
                          <p><strong>Next:</strong> {vaccination.nextDue}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Mental Health */}
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-primary" />
                  Mental Health
                </h4>
                <Card className="p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Last Assessment</label>
                      <p className="text-sm">{record.mentalHealth?.lastAssessment}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Status</label>
                      <Badge className={getHealthStatusColor(record.mentalHealth?.status || "Good")}>
                        {record.mentalHealth?.status}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Recommendations</label>
                      <p className="text-xs bg-muted p-2 rounded mt-1">
                        {record.mentalHealth?.recommendations}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Record
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Medical Records</h2>
            <p className="text-muted-foreground">Comprehensive health management system</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="staff" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            University Staff ({filteredStaff.length})
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students ({filteredStudents.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="staff" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map((staff) => (
              <RecordCard key={staff.id} record={staff} isStaff={true} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <RecordCard key={student.id} record={student} isStaff={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedRecord && (
        <DetailedView 
          record={selectedRecord} 
          isStaff={selectedRecord.staffId ? true : false} 
        />
      )}
    </div>
  );
};
