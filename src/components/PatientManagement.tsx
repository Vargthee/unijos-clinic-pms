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
  User,
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
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Patient Management</h2>
          <p className="text-muted-foreground mt-1">Manage student and staff medical records</p>
        </div>
        <Button 
          onClick={() => setIsAddPatientOpen(true)}
          className="self-start sm:self-auto"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Faculties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Faculties</SelectItem>
              {faculties.map((faculty) => (
                <SelectItem key={faculty} value={faculty}>
                  {faculty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="shrink-0">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Patient Directory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPatients.map((patient) => (
          <Card 
            key={patient.id} 
            className="group hover:shadow-md transition-all duration-200 cursor-pointer border bg-card"
            onClick={() => handleViewRecords(patient)}
          >
            <CardContent className="p-4">
              {/* Header with Avatar and Basic Info */}
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {patient.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
                    {patient.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {patient.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {patient.age}y, {patient.gender}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Information */}
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 p-2 rounded">
                    <div className="text-muted-foreground font-medium">Faculty</div>
                    <div className="text-foreground font-semibold truncate">{patient.faculty}</div>
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <div className="text-muted-foreground font-medium">Level</div>
                    <div className="text-foreground font-semibold">{patient.level}</div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-2 rounded">
                  <div className="text-muted-foreground font-medium">Department</div>
                  <div className="text-foreground font-semibold truncate">{patient.department}</div>
                </div>

                <div className="bg-muted/30 p-2 rounded">
                  <div className="text-muted-foreground font-medium">
                    {patient.type === "Staff" ? "Staff ID" : "Matric No"}
                  </div>
                  <div className="text-foreground font-semibold text-xs">{patient.matricNumber}</div>
                </div>
              </div>

              {/* Footer with Status and Action */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <div className="text-muted-foreground">
                    Last: {patient.lastVisit}
                  </div>
                  <div className="flex items-center gap-1 text-primary group-hover:text-primary/80 transition-colors">
                    <Eye className="h-3 w-3" />
                    <span className="font-medium">View</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No patients found matching your search criteria.</p>
          </div>
        </div>
      )}

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
