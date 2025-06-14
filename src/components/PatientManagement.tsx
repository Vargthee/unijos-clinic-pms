import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Eye,
  UserPlus,
  Download,
} from "lucide-react";
import { ViewRecordsDialog } from "./ViewRecordsDialog";
import { AddPatientDialog } from "./AddPatientDialog";

// Combined patients and staff data
const allPatients = [
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
    type: "Student"
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
    condition: "Sickle cell vaso-occlusive crisis",
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
    type: "Student"
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
    condition: "Typhoid fever (severe)",
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
    type: "Student"
  },
  {
    id: "S001",
    name: "Dr. Fatima Aliyu",
    age: 35,
    gender: "Female",
    faculty: "Medical Staff",
    department: "General Medicine",
    level: "Senior Consultant",
    matricNumber: "STAFF/2018/MED/001",
    condition: "Routine health check",
    status: "Healthy",
    lastVisit: "2024-06-01",
    nextAppointment: "2024-12-01",
    doctor: "Dr. John Okafor",
    bloodType: "A+",
    allergies: ["None known"],
    phone: "08012345001",
    email: "fatima.aliyu@unijos.edu.ng",
    emergencyContact: "08098765001",
    address: "Medical Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "S002",
    name: "Prof. John Okafor",
    age: 48,
    gender: "Male",
    faculty: "Medical Staff",
    department: "Cardiology",
    level: "Chief Medical Officer",
    matricNumber: "STAFF/2010/MED/002",
    condition: "Hypertension management",
    status: "Stable",
    lastVisit: "2024-05-15",
    nextAppointment: "2024-07-15",
    doctor: "Dr. Aisha Mohammed",
    bloodType: "O-",
    allergies: ["None known"],
    phone: "08012345002",
    email: "john.okafor@unijos.edu.ng",
    emergencyContact: "08098765002",
    address: "Senior Staff Quarters, Jos",
    type: "Staff"
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
    type: "Student"
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
    type: "Student"
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
    type: "Student"
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
    type: "Student"
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
    condition: "Bacterial meningitis (recovering)",
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
    type: "Student"
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
    type: "Student"
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
    condition: "Pulmonary tuberculosis (on treatment)",
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
    type: "Student"
  }
];

export const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<typeof allPatients[0] | null>(null);

  const faculties = [...new Set(allPatients.map((patient) => patient.faculty))];

  const filteredPatients = allPatients.filter((patient) => {
    const searchRegex = new RegExp(searchQuery, "i");
    const matchesSearch = searchRegex.test(patient.name) || searchRegex.test(patient.matricNumber);
    const matchesFaculty = selectedFaculty === "all" ? true : patient.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  const handleViewRecords = (patient: typeof allPatients[0]) => {
    setSelectedPatient(patient);
    setIsViewRecordsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Patient Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage student and staff medical records and appointments</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => setIsAddPatientOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by name or matric number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-80 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Filter by Faculty" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all">All Faculties</SelectItem>
              {faculties.map((faculty) => (
                <SelectItem key={faculty} value={faculty}>
                  {faculty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Patient Directory */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">Patient Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer dark:bg-gray-900 dark:border-gray-600 dark:hover:shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-300">
                        {patient.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{patient.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {patient.type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="dark:text-gray-300"><span className="font-medium">Faculty:</span> {patient.faculty}</p>
                    <p className="dark:text-gray-300"><span className="font-medium">Department:</span> {patient.department}</p>
                    <p className="dark:text-gray-300"><span className="font-medium">Level:</span> {patient.level}</p>
                    <p className="dark:text-gray-300"><span className="font-medium">{patient.type === "Staff" ? "Staff ID" : "Matric No"}:</span> {patient.matricNumber}</p>
                    <p className="dark:text-gray-300"><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                    <p className="dark:text-gray-300"><span className="font-medium">Next Appointment:</span> {patient.nextAppointment}</p>
                  </div>

                  <div className="flex justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" size="sm" onClick={() => handleViewRecords(patient)} className="w-full dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800">
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
        patientName={selectedPatient?.name || ""}
        patientId={selectedPatient?.id || ""}
      />

      <AddPatientDialog
        open={isAddPatientOpen}
        onOpenChange={setIsAddPatientOpen}
      />
    </div>
  );
};
