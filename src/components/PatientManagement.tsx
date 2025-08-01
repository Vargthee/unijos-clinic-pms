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
    status: "Stable",
    lastVisit: "2024-06-05",
    nextAppointment: "2024-06-20",
    attendingPhysician: "Dr. Fatima Aliyu",
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
    status: "Under Treatment",
    lastVisit: "2024-06-07",
    nextAppointment: "2024-06-15",
    attendingPhysician: "Dr. John Okafor",
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
    status: "Recovering",
    lastVisit: "2024-06-08",
    nextAppointment: "2024-06-25",
    attendingPhysician: "Dr. Aisha Mohammed",
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
    status: "Healthy",
    lastVisit: "2024-06-01",
    nextAppointment: "2024-12-01",
    attendingPhysician: "Dr. John Okafor",
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
    status: "Stable",
    lastVisit: "2024-05-15",
    nextAppointment: "2024-07-15",
    attendingPhysician: "Dr. Aisha Mohammed",
    bloodType: "O-",
    allergies: ["None known"],
    phone: "08012345002",
    email: "john.okafor@unijos.edu.ng",
    emergencyContact: "08098765002",
    address: "Senior Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "S003",
    name: "Dr. Amina Hassan",
    age: 42,
    gender: "Female",
    faculty: "Medical Staff",
    department: "Obstetrics & Gynaecology",
    level: "Senior Consultant",
    matricNumber: "STAFF/2015/MED/003",
    status: "Healthy",
    lastVisit: "2024-06-03",
    nextAppointment: "2024-09-03",
    attendingPhysician: "Prof. John Okafor",
    bloodType: "B+",
    allergies: ["None known"],
    phone: "08012345003",
    email: "amina.hassan@unijos.edu.ng",
    emergencyContact: "08098765003",
    address: "Medical Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "S004",
    name: "Dr. Samuel Gyang",
    age: 39,
    gender: "Male",
    faculty: "Medical Staff",
    department: "Emergency Medicine",
    level: "Consultant",
    matricNumber: "STAFF/2018/MED/004",
    status: "Good",
    lastVisit: "2024-05-28",
    nextAppointment: "2024-08-28",
    attendingPhysician: "Dr. Fatima Aliyu",
    bloodType: "AB+",
    allergies: ["Peanuts"],
    phone: "08012345004",
    email: "samuel.gyang@unijos.edu.ng",
    emergencyContact: "08098765004",
    address: "Staff Quarters Block C, Jos",
    type: "Staff"
  },
  {
    id: "S005",
    name: "Dr. Ruth Laven",
    age: 44,
    gender: "Female",
    faculty: "Medical Staff",
    department: "Pediatrics",
    level: "Senior Consultant",
    matricNumber: "STAFF/2012/MED/005",
    status: "Excellent",
    lastVisit: "2024-06-10",
    nextAppointment: "2024-10-10",
    attendingPhysician: "Dr. Amina Hassan",
    bloodType: "O+",
    allergies: ["None known"],
    phone: "08012345005",
    email: "ruth.laven@unijos.edu.ng",
    emergencyContact: "08098765005",
    address: "Senior Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "S006",
    name: "Dr. Peter Nnamdi",
    age: 36,
    gender: "Male",
    faculty: "Medical Staff",
    department: "Anesthesiology",
    level: "Consultant",
    matricNumber: "STAFF/2019/MED/006",
    status: "Good",
    lastVisit: "2024-05-20",
    nextAppointment: "2024-11-20",
    attendingPhysician: "Dr. Samuel Gyang",
    bloodType: "A-",
    allergies: ["Latex"],
    phone: "08012345006",
    email: "peter.nnamdi@unijos.edu.ng",
    emergencyContact: "08098765006",
    address: "Medical Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "S007",
    name: "Dr. Grace Musa",
    age: 33,
    gender: "Female",
    faculty: "Medical Staff",
    department: "Maternity Unit",
    level: "Medical Officer",
    matricNumber: "STAFF/2020/MED/007",
    status: "Healthy",
    lastVisit: "2024-06-05",
    nextAppointment: "2024-12-05",
    attendingPhysician: "Dr. Amina Hassan",
    bloodType: "B-",
    allergies: ["None known"],
    phone: "08012345007",
    email: "grace.musa@unijos.edu.ng",
    emergencyContact: "08098765007",
    address: "Junior Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "S008",
    name: "Dr. Emmanuel Yakubu",
    age: 41,
    gender: "Male",
    faculty: "Medical Staff",
    department: "Ambulance Services",
    level: "Senior Medical Officer",
    matricNumber: "STAFF/2016/MED/008",
    status: "Good",
    lastVisit: "2024-05-18",
    nextAppointment: "2024-08-18",
    attendingPhysician: "Dr. Samuel Gyang",
    bloodType: "O-",
    allergies: ["Shellfish"],
    phone: "08012345008",
    email: "emmanuel.yakubu@unijos.edu.ng",
    emergencyContact: "08098765008",
    address: "Staff Quarters Block A, Jos",
    type: "Staff"
  },
  {
    id: "S009",
    name: "Dr. Mary Gyang",
    age: 38,
    gender: "Female",
    faculty: "Medical Staff",
    department: "Internal Medicine",
    level: "Consultant",
    matricNumber: "STAFF/2017/MED/009",
    status: "Excellent",
    lastVisit: "2024-06-01",
    nextAppointment: "2024-09-01",
    attendingPhysician: "Prof. John Okafor",
    bloodType: "A+",
    allergies: ["Sulfa drugs"],
    phone: "08012345009",
    email: "mary.gyang@unijos.edu.ng",
    emergencyContact: "08098765009",
    address: "Medical Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "S010",
    name: "Dr. Daniel Kwaghe",
    age: 35,
    gender: "Male",
    faculty: "Medical Staff",
    department: "Surgery",
    level: "Medical Officer",
    matricNumber: "STAFF/2021/MED/010",
    status: "Good",
    lastVisit: "2024-05-25",
    nextAppointment: "2024-11-25",
    attendingPhysician: "Dr. Peter Nnamdi",
    bloodType: "AB-",
    allergies: ["None known"],
    phone: "08012345010",
    email: "daniel.kwaghe@unijos.edu.ng",
    emergencyContact: "08098765010",
    address: "Junior Staff Quarters, Jos",
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
    status: "Stable",
    lastVisit: "2024-06-09",
    nextAppointment: "2024-06-22",
    attendingPhysician: "Dr. Grace Musa",
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
    status: "Under Treatment",
    lastVisit: "2024-06-06",
    nextAppointment: "2024-06-18",
    attendingPhysician: "Dr. Hauwa Ibrahim",
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
    status: "Stable",
    lastVisit: "2024-06-04",
    nextAppointment: "2024-07-04",
    attendingPhysician: "Dr. Samuel Dung",
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
    status: "Recovering",
    lastVisit: "2024-06-10",
    nextAppointment: "2024-06-17",
    attendingPhysician: "Dr. Mary Gyang",
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
    status: "Stable",
    lastVisit: "2024-06-11",
    nextAppointment: "2024-06-19",
    attendingPhysician: "Dr. Peter Bulus",
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
    status: "Stable",
    lastVisit: "2024-06-12",
    nextAppointment: "2024-07-12",
    attendingPhysician: "Dr. Emmanuel Yakubu",
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
    status: "Under Treatment",
    lastVisit: "2024-06-13",
    nextAppointment: "2024-06-20",
    attendingPhysician: "Dr. Ruth Laven",
    bloodType: "O+",
    allergies: ["None known"],
    phone: "08012346789",
    email: "samuel.gyang@unijos.edu.ng",
    emergencyContact: "08098767890",
    address: "No. 23 Dogon Dutse, Jos",
    type: "Student"
  },
  {
    id: "P001244",
    name: "Khadijah Usman",
    age: 20,
    gender: "Female",
    faculty: "Nursing Sciences",
    department: "Nursing",
    level: "200L",
    matricNumber: "UJ/2022/NUR/0345",
    status: "Pregnant - 2nd Trimester",
    lastVisit: "2024-06-14",
    nextAppointment: "2024-06-21",
    attendingPhysician: "Dr. Grace Musa",
    bloodType: "A+",
    allergies: ["None known"],
    phone: "08012347890",
    email: "khadijah.usman@unijos.edu.ng",
    emergencyContact: "08098768901",
    address: "No. 67 Gangare, Jos",
    type: "Student"
  },
  {
    id: "P001245",
    name: "Joseph Danladi",
    age: 22,
    gender: "Male",
    faculty: "Arts",
    department: "History",
    level: "400L",
    matricNumber: "UJ/2020/ART/0123",
    status: "Recovering",
    lastVisit: "2024-06-15",
    nextAppointment: "2024-06-22",
    attendingPhysician: "Dr. Emmanuel Yakubu",
    bloodType: "O-",
    allergies: ["Dust"],
    phone: "08012348901",
    email: "joseph.danladi@unijos.edu.ng",
    emergencyContact: "08098769012",
    address: "No. 34 Rayfield Extension, Jos",
    type: "Student"
  },
  {
    id: "P001246",
    name: "Zainab Abdullahi",
    age: 19,
    gender: "Female",
    faculty: "Veterinary Medicine",
    department: "Veterinary Medicine",
    level: "200L",
    matricNumber: "UJ/2022/VET/0456",
    status: "Stable",
    lastVisit: "2024-06-16",
    nextAppointment: "2024-07-16",
    attendingPhysician: "Dr. Mary Gyang",
    bloodType: "B+",
    allergies: ["Animal dander"],
    phone: "08012349012",
    email: "zainab.abdullahi@unijos.edu.ng",
    emergencyContact: "08098770123",
    address: "No. 78 Terminus, Jos",
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
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage student and staff medical records and appointments</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
            className="md:w-80 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue placeholder="Filter by Faculty" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
              <SelectItem value="all">All Faculties</SelectItem>
              {faculties.map((faculty) => (
                <SelectItem key={faculty} value={faculty} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                  {faculty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Patient Directory */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Patient Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card 
                key={patient.id} 
                className="hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer bg-card border-border hover:shadow-primary/20"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {patient.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {patient.type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                      <span className="font-medium text-blue-700 dark:text-blue-300">Age:</span> 
                      <span className="font-bold text-blue-800 dark:text-blue-200">{patient.age} years</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Faculty:</span> {patient.faculty}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Department:</span> {patient.department}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Level:</span> {patient.level}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">{patient.type === "Staff" ? "Staff ID" : "Matric No"}:</span> {patient.matricNumber}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Next Appointment:</span> {patient.nextAppointment}</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Attending Physician:</span> {patient.attendingPhysician}</p>
                  </div>

                  <div className="flex justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewRecords(patient)} 
                      className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
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
