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
  Building,
  BookOpen,
  User
} from "lucide-react";

// University staff data (realistic UNIJOS staff)
const universityStaffRecords = [
  {
    id: "USR001",
    staffId: "UNIJOS/REG/001",
    name: "Dr. Sarah Mallo",
    role: "Director of Student Affairs",
    department: "Student Affairs",
    unit: "Academic Registry",
    faculty: "Administration",
    email: "sarah.mallo@unijos.edu.ng",
    phone: "08012345678",
    dateOfBirth: "1975-03-15",
    bloodType: "O+",
    address: "GRA, Jos",
    emergencyContact: "08098765432",
    lastCheckup: "2024-05-20",
    nextCheckup: "2024-11-20",
    healthStatus: "Good",
    initials: "SM",
    medicalHistory: [
      {
        date: "2024-05-20",
        type: "Annual Checkup",
        diagnosis: "Hypertension (mild)",
        treatment: "Lifestyle modification, blood pressure monitoring",
        doctor: "Dr. Fatima Aliyu"
      },
      {
        date: "2024-02-10",
        type: "Consultation",
        diagnosis: "Work-related stress",
        treatment: "Stress management counseling",
        doctor: "Dr. Mary Gyang"
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
      { vaccine: "Hepatitis B", date: "2023-01-10", nextDue: "2028-01-10" },
      { vaccine: "Tetanus", date: "2022-08-05", nextDue: "2032-08-05" }
    ],
    mentalHealth: {
      lastAssessment: "2024-02-10",
      status: "Mild stress",
      recommendations: "Regular counseling sessions, work-life balance"
    }
  },
  {
    id: "USR002",
    staffId: "UNIJOS/LIB/002",
    name: "Mr. James Dung",
    role: "Head Librarian",
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
  }
];

// Student records (keeping existing data)
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
  }
  // Add more student records as needed
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

  const RecordCard = ({ record, isStaff = false }) => (
    <Card 
      key={record.id} 
      className="hover-lift cursor-pointer transition-all duration-300"
      onClick={() => setSelectedRecord(record)}
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
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{isStaff ? record.lastCheckup : record.lastVisit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{record.bloodType}</span>
          </div>
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
            Comprehensive Medical Record - {record.name}
          </CardTitle>
          <Button variant="outline" onClick={() => setSelectedRecord(null)}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">History</TabsTrigger>
            <TabsTrigger value="prescriptions" className="text-xs sm:text-sm">Medications</TabsTrigger>
            <TabsTrigger value="vaccinations" className="text-xs sm:text-sm">Vaccines</TabsTrigger>
            <TabsTrigger value="mental" className="text-xs sm:text-sm">Mental Health</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium text-muted-foreground">Blood Type</label>
                    <p className="text-foreground">{record.bloodType}</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Health Status</label>
                    <Badge className={getHealthStatusColor(record.healthStatus)}>
                      {record.healthStatus}
                    </Badge>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground">{record.email}</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Phone</label>
                    <p className="text-foreground">{record.phone}</p>
                  </div>
                  {isStaff && (
                    <>
                      <div>
                        <label className="font-medium text-muted-foreground">Department</label>
                        <p className="text-foreground">{record.department}</p>
                      </div>
                      <div>
                        <label className="font-medium text-muted-foreground">Unit</label>
                        <p className="text-foreground">{record.unit}</p>
                      </div>
                    </>
                  )}
                  {!isStaff && (
                    <>
                      <div>
                        <label className="font-medium text-muted-foreground">Faculty</label>
                        <p className="text-foreground">{record.faculty}</p>
                      </div>
                      <div>
                        <label className="font-medium text-muted-foreground">Level</label>
                        <p className="text-foreground">{record.level}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Health Timeline
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">Last Visit</p>
                    <p className="text-sm text-muted-foreground">
                      {isStaff ? record.lastCheckup : record.lastVisit}
                    </p>
                  </div>
                  {isStaff && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Next Checkup</p>
                      <p className="text-sm text-muted-foreground">{record.nextCheckup}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Medical History
            </h4>
            <div className="space-y-4">
              {record.medicalHistory?.map((entry, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{entry.diagnosis}</h5>
                      <Badge variant="outline">{entry.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Treatment:</strong> {entry.treatment}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>📅 {entry.date}</span>
                      <span>👨‍⚕️ {entry.doctor}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <PillBottle className="h-5 w-5 text-primary" />
              Current Medications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {record.prescriptions?.map((prescription, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h5 className="font-medium text-lg mb-2">{prescription.medication}</h5>
                    <div className="space-y-1 text-sm">
                      <p><strong>Dosage:</strong> {prescription.dosage}</p>
                      <p><strong>Duration:</strong> {prescription.duration}</p>
                      <p><strong>Prescribed by:</strong> {prescription.prescribedBy}</p>
                      <p><strong>Date:</strong> {prescription.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vaccinations" className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Vaccination Records
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {record.vaccinations?.map((vaccination, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h5 className="font-medium text-lg mb-2">{vaccination.vaccine}</h5>
                    <div className="space-y-1 text-sm">
                      <p><strong>Date Given:</strong> {vaccination.date}</p>
                      <p><strong>Next Due:</strong> {vaccination.nextDue}</p>
                      <Badge 
                        className={new Date(vaccination.nextDue) > new Date() 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }
                      >
                        {new Date(vaccination.nextDue) > new Date() ? "Current" : "Due"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mental" className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Mental Health Assessment
            </h4>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="font-medium text-muted-foreground">Last Assessment</label>
                    <p className="text-foreground">{record.mentalHealth?.lastAssessment}</p>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Status</label>
                    <Badge className={getHealthStatusColor(record.mentalHealth?.status || "Good")}>
                      {record.mentalHealth?.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Recommendations</label>
                    <p className="text-foreground bg-muted p-3 rounded-lg">
                      {record.mentalHealth?.recommendations}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
