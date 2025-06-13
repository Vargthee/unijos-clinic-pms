import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  User,
  Mail,
  Phone,
  Edit,
  Trash2,
  Search,
  Download,
  Eye,
  Calendar,
  Stethoscope,
  Plus,
  UserPlus,
  Users,
  UserCheck,
} from "lucide-react";
import { ViewRecordsDialog } from "./ViewRecordsDialog";

const patients = [
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    age: 20,
    gender: "Female",
    faculty: "Engineering",
    department: "Computer Engineering",
    level: "200L",
    matricNumber: "UJ/2022/ENG/0234",
    condition: "Malaria fever with complications",
    status: "Stable",
    lastVisit: "2024-06-05",
    nextAppointment: "2024-06-20",
    doctor: "Dr. Fatima Aliyu",
    bloodType: "O+",
    allergies: ["None known"],
    phone: "08012345678",
    email: "adaora.okonkwo@unijos.edu.ng",
    emergencyContact: "08098765432",
    address: "No. 45 Zaria Road, Jos",
    medicalHistory: [
      "Typhoid fever (2023)",
      "Recurrent malaria episodes"
    ]
  },
  {
    id: "P001235",
    name: "Ibrahim Musa",
    age: 22,
    gender: "Male",
    faculty: "Medicine",
    department: "Medicine & Surgery",
    level: "400L",
    matricNumber: "UJ/2020/MED/0456",
    condition: "Sickle cell crisis management",
    status: "Under Treatment",
    lastVisit: "2024-06-07",
    nextAppointment: "2024-06-15",
    doctor: "Dr. John Okafor",
    bloodType: "SS",
    allergies: ["Codeine", "Sulfa drugs"],
    phone: "08023456789",
    email: "ibrahim.musa@unijos.edu.ng",
    emergencyContact: "08087654321",
    address: "No. 12 Bauchi Road, Jos",
    medicalHistory: [
      "Sickle cell disease (chronic)",
      "Multiple pain crises",
      "Leg ulcers (healed)"
    ]
  },
  {
    id: "P001236",
    name: "Blessing Eze",
    age: 18,
    gender: "Female",
    faculty: "Social Sciences",
    department: "Psychology",
    level: "100L",
    matricNumber: "UJ/2023/SSC/0123",
    condition: "Peptic ulcer disease",
    status: "Recovering",
    lastVisit: "2024-06-08",
    nextAppointment: "2024-06-25",
    doctor: "Dr. Aisha Mohammed",
    bloodType: "B+",
    allergies: ["NSAIDs"],
    phone: "08034567890",
    email: "blessing.eze@unijos.edu.ng",
    emergencyContact: "08076543210",
    address: "No. 78 Tudun Wada, Jos",
    medicalHistory: [
      "H. pylori infection",
      "Gastritis"
    ]
  },
  {
    id: "P001237",
    name: "Yusuf Abdullahi",
    age: 21,
    gender: "Male",
    faculty: "Natural Sciences",
    department: "Computer Science",
    level: "300L",
    matricNumber: "UJ/2021/NSC/0789",
    condition: "Bronchial asthma exacerbation",
    status: "Stable",
    lastVisit: "2024-06-09",
    nextAppointment: "2024-06-22",
    doctor: "Dr. Grace Musa",
    bloodType: "AB+",
    allergies: ["Dust mites", "Pollen"],
    phone: "08045678901",
    email: "yusuf.abdullahi@unijos.edu.ng",
    emergencyContact: "08065432109",
    address: "No. 23 Lamingo, Jos",
    medicalHistory: [
      "Childhood asthma",
      "Allergic rhinitis"
    ]
  },
  {
    id: "P001238",
    name: "Fatima Aliyu",
    age: 23,
    gender: "Female",
    faculty: "Law",
    department: "Law",
    level: "500L",
    matricNumber: "UJ/2019/LAW/0345",
    condition: "Iron deficiency anemia",
    status: "Under Treatment",
    lastVisit: "2024-06-06",
    nextAppointment: "2024-06-18",
    doctor: "Dr. Hauwa Ibrahim",
    bloodType: "O-",
    allergies: ["None known"],
    phone: "08056789012",
    email: "fatima.aliyu.student@unijos.edu.ng",
    emergencyContact: "08054321098",
    address: "No. 67 Rayfield, Jos",
    medicalHistory: [
      "Heavy menstrual bleeding",
      "Previous iron deficiency"
    ]
  },
  {
    id: "P001239",
    name: "Chidi Okafor",
    age: 20,
    gender: "Male",
    faculty: "Pharmacy",
    department: "Pharmacy",
    level: "200L",
    matricNumber: "UJ/2022/PHM/0567",
    condition: "Hepatitis B infection",
    status: "Stable",
    lastVisit: "2024-06-04",
    nextAppointment: "2024-07-04",
    doctor: "Dr. Samuel Dung",
    bloodType: "A-",
    allergies: ["Penicillin"],
    phone: "08067890123",
    email: "chidi.okafor@unijos.edu.ng",
    emergencyContact: "08043210987",
    address: "No. 34 Bukuru, Jos",
    medicalHistory: [
      "Acute hepatitis B",
      "Previous jaundice episode"
    ]
  },
  {
    id: "P001240",
    name: "Amina Bello",
    age: 19,
    gender: "Female",
    faculty: "Education",
    department: "Educational Psychology",
    level: "100L",
    matricNumber: "UJ/2023/EDU/0890",
    condition: "Urinary tract infection (UTI)",
    status: "Recovering",
    lastVisit: "2024-06-10",
    nextAppointment: "2024-06-17",
    doctor: "Dr. Mary Gyang",
    bloodType: "B-",
    allergies: ["None known"],
    phone: "08078901234",
    email: "amina.bello@unijos.edu.ng",
    emergencyContact: "08032109876",
    address: "No. 89 Anglo Jos, Jos",
    medicalHistory: [
      "Recurrent UTIs",
      "Kidney stones (small)"
    ]
  },
  {
    id: "P001241",
    name: "David Pam",
    age: 21,
    gender: "Male",
    faculty: "Agriculture",
    department: "Animal Science",
    level: "300L",
    matricNumber: "UJ/2021/AGR/0456",
    condition: "Meningitis (recovering)",
    status: "Stable",
    lastVisit: "2024-06-11",
    nextAppointment: "2024-06-19",
    doctor: "Dr. Peter Bulus",
    bloodType: "A+",
    allergies: ["None known"],
    phone: "08089012345",
    email: "david.pam@unijos.edu.ng",
    emergencyContact: "08021098765",
    address: "No. 56 Plateau State University Road, Jos",
    medicalHistory: [
      "Bacterial meningitis",
      "Previous headache episodes"
    ]
  },
  {
    id: "P001242",
    name: "Hauwa Mohammed",
    age: 22,
    gender: "Female",
    faculty: "Environmental Sciences",
    department: "Geography",
    level: "400L",
    matricNumber: "UJ/2020/ENV/0123",
    condition: "Rheumatic heart disease",
    status: "Stable",
    lastVisit: "2024-06-12",
    nextAppointment: "2024-07-12",
    doctor: "Dr. Emmanuel Yakubu",
    bloodType: "AB-",
    allergies: ["Aspirin"],
    phone: "08090123456",
    email: "hauwa.mohammed@unijos.edu.ng",
    emergencyContact: "08010987654",
    address: "No. 45 Jenta Adamu, Jos",
    medicalHistory: [
      "Rheumatic fever (childhood)",
      "Heart murmur"
    ]
  },
  {
    id: "P001243",
    name: "Samuel Gyang",
    age: 18,
    gender: "Male",
    faculty: "Management Sciences",
    department: "Business Administration",
    level: "100L",
    matricNumber: "UJ/2023/MSC/0789",
    condition: "Tuberculosis (on treatment)",
    status: "Under Treatment",
    lastVisit: "2024-06-13",
    nextAppointment: "2024-06-20",
    doctor: "Dr. Ruth Laven",
    bloodType: "O+",
    allergies: ["None known"],
    phone: "08012346789",
    email: "samuel.gyang@unijos.edu.ng",
    emergencyContact: "08098767890",
    address: "No. 23 Dogon Dutse, Jos",
    medicalHistory: [
      "Pulmonary tuberculosis",
      "Contact with TB patient"
    ]
  },
  {
    id: "P001244",
    name: "Ruth Laven",
    age: 20,
    gender: "Female",
    faculty: "Veterinary Medicine",
    department: "Veterinary Medicine",
    level: "200L",
    matricNumber: "UJ/2022/VET/0456",
    condition: "Thyroid disorder (hyperthyroidism)",
    status: "Stable",
    lastVisit: "2024-06-14",
    nextAppointment: "2024-07-14",
    doctor: "Dr. Fatima Aliyu",
    bloodType: "A+",
    allergies: ["Iodine"],
    phone: "08023457890",
    email: "ruth.laven@unijos.edu.ng",
    emergencyContact: "08087657891",
    address: "No. 67 Vom Road, Jos",
    medicalHistory: [
      "Goiter",
      "Weight loss episodes"
    ]
  },
  {
    id: "P001245",
    name: "Emmanuel Yakubu",
    age: 21,
    gender: "Male",
    faculty: "Arts",
    department: "English Language",
    level: "300L",
    matricNumber: "UJ/2021/ART/0234",
    condition: "Chronic kidney disease (early stage)",
    status: "Under Treatment",
    lastVisit: "2024-06-15",
    nextAppointment: "2024-06-25",
    doctor: "Dr. John Okafor",
    bloodType: "B+",
    allergies: ["None known"],
    phone: "08034568901",
    email: "emmanuel.yakubu.student@unijos.edu.ng",
    emergencyContact: "08076548902",
    address: "No. 12 Hwolshe, Jos",
    medicalHistory: [
      "Hypertension",
      "Proteinuria"
    ]
  }
];

const staff = [
  {
    id: "S001",
    name: "Dr. Hauwa Abdullahi",
    role: "Registrar",
    department: "Academic Registry",
    patients: 0,
    initials: "HA",
  },
  {
    id: "S002",
    name: "Mr. James Dung",
    role: "Chief Librarian",
    department: "Library Services",
    patients: 0,
    initials: "JD",
  },
  {
    id: "S003",
    name: "Mrs. Grace Yakubu",
    role: "Security Coordinator",
    department: "Security Services",
    patients: 0,
    initials: "GY",
  },
  {
    id: "S004",
    name: "Engr. Emmanuel Bulus",
    role: "ICT Director",
    department: "Information Technology",
    patients: 0,
    initials: "EB",
  },
  {
    id: "S005",
    name: "Mrs. Rebecca Gyang",
    role: "Bursary Officer",
    department: "Bursary",
    patients: 0,
    initials: "RG",
  },
  {
    id: "S006",
    name: "Mr. Daniel Kwaghe",
    role: "Estate Officer",
    department: "Estate Management",
    patients: 0,
    initials: "DK",
  },
  {
    id: "S007",
    name: "Mrs. Maryam Umar",
    role: "HR Director",
    department: "Human Resources",
    patients: 0,
    initials: "MU",
  },
  {
    id: "S008",
    name: "Dr. Samuel Dung",
    role: "Chief Medical Officer",
    department: "Medical Center",
    patients: 45,
    initials: "SD",
  }
];

const getConditionColor = (condition: string) => {
  if (condition.includes("Stable")) return "bg-green-100 text-green-800";
  if (condition.includes("Treatment")) return "bg-orange-100 text-orange-800";
  if (condition.includes("Recovering")) return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-800";
};

export const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const faculties = [...new Set(patients.map((patient) => patient.faculty))];

  const filteredPatients = patients.filter((patient) => {
    const searchRegex = new RegExp(searchQuery, "i");
    const matchesSearch = searchRegex.test(patient.name) || searchRegex.test(patient.matricNumber);
    const matchesFaculty = selectedFaculty ? patient.faculty === selectedFaculty : true;
    return matchesSearch && matchesFaculty;
  });

  const handleViewRecords = (patient) => {
    setSelectedPatient(patient);
    setIsViewRecordsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600">Manage student medical records and appointments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Patient Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stable Condition</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.status.includes("Stable")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Treatment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.status.includes("Treatment")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by name or matric number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-80"
          />
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Faculty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Faculties</SelectItem>
              {faculties.map((faculty) => (
                <SelectItem key={faculty} value={faculty}>
                  {faculty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Patient Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {patient.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(patient.status)}`}>
                        {patient.condition}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Faculty:</span> {patient.faculty}</p>
                    <p><span className="font-medium">Department:</span> {patient.department}</p>
                    <p><span className="font-medium">Level:</span> {patient.level}</p>
                    <p><span className="font-medium">Matric No:</span> {patient.matricNumber}</p>
                    <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                    <p><span className="font-medium">Next Appointment:</span> {patient.nextAppointment}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewRecords(patient)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Records
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <ViewRecordsDialog
        open={isViewRecordsOpen}
        onOpenChange={(open) => setIsViewRecordsOpen(open)}
        patientName={selectedPatient?.name}
        patientId={selectedPatient?.id}
      />
    </div>
  );
};
