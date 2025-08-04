import { memo, useMemo, useCallback } from "react";
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

// Combined patients and staff data - matching the Medical Records section
const allPatients = [
  // Students matching the Medical Records section
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    age: 20,
    gender: "Female",
    faculty: "Engineering",
    department: "Computer Engineering",
    level: "200L",
    matricNumber: "UJ/2022/ENG/0234",
    status: "Good",
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
    status: "Good",
    lastVisit: "2024-06-07",
    nextAppointment: "2024-06-15",
    attendingPhysician: "Dr. John Okafor",
    bloodType: "A+",
    allergies: ["None known"],
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
    status: "Good",
    lastVisit: "2024-06-08",
    nextAppointment: "2024-06-25",
    attendingPhysician: "Dr. Aisha Mohammed",
    bloodType: "B+",
    allergies: ["None known"],
    phone: "08034567890",
    email: "blessing.eze@unijos.edu.ng",
    emergencyContact: "08076543210",
    address: "No. 78 Tudun Wada, Jos",
    type: "Student"
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
    status: "Good",
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
    age: 24,
    gender: "Female",
    faculty: "Law",
    department: "Law",
    level: "500L",
    matricNumber: "UJ/2019/LAW/0345",
    status: "Good",
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
    status: "Good",
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
  // Medical Staff matching the Medical Records section
  {
    id: "USR001",
    name: "Dr. Hauwa Abdullahi",
    age: 49,
    gender: "Female",
    faculty: "Administration",
    department: "Academic Registry",
    level: "Registrar",
    matricNumber: "UNIJOS/REG/001",
    status: "Good",
    lastVisit: "2024-05-20",
    nextAppointment: "2024-11-20",
    attendingPhysician: "Dr. Fatima Aliyu",
    bloodType: "O+",
    allergies: ["None known"],
    phone: "08012345678",
    email: "hauwa.abdullahi@unijos.edu.ng",
    emergencyContact: "08098765432",
    address: "GRA, Jos",
    type: "Staff"
  },
  {
    id: "USR002",
    name: "Mr. James Dung",
    age: 44,
    gender: "Male",
    faculty: "Administration",
    department: "Library Services",
    level: "Chief Librarian",
    matricNumber: "UNIJOS/LIB/002",
    status: "Excellent",
    lastVisit: "2024-04-15",
    nextAppointment: "2024-10-15",
    attendingPhysician: "Dr. Ruth Laven",
    bloodType: "A+",
    allergies: ["None known"],
    phone: "08023456789",
    email: "james.dung@unijos.edu.ng",
    emergencyContact: "08087654321",
    address: "Rayfield, Jos",
    type: "Staff"
  },
  {
    id: "USR003",
    name: "Mrs. Grace Yakubu",
    age: 46,
    gender: "Female",
    faculty: "Administration",
    department: "Security Services",
    level: "Security Coordinator",
    matricNumber: "UNIJOS/SEC/003",
    status: "Good",
    lastVisit: "2024-06-01",
    nextAppointment: "2024-12-01",
    attendingPhysician: "Dr. Peter Nnamdi",
    bloodType: "B+",
    allergies: ["None known"],
    phone: "08034567890",
    email: "grace.yakubu@unijos.edu.ng",
    emergencyContact: "08076543210",
    address: "Bukuru, Jos",
    type: "Staff"
  },
  {
    id: "USR008",
    name: "Dr. Samuel Gyang",
    age: 39,
    gender: "Male",
    faculty: "Medical Staff",
    department: "Emergency Medicine",
    level: "Emergency Medicine Doctor",
    matricNumber: "UNIJOS/MED/008",
    status: "Good",
    lastVisit: "2024-05-28",
    nextAppointment: "2024-08-28",
    attendingPhysician: "Dr. Fatima Aliyu",
    bloodType: "AB+",
    allergies: ["None known"],
    phone: "08012345008",
    email: "samuel.gyang@unijos.edu.ng",
    emergencyContact: "08098765008",
    address: "Medical Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "USR009",
    name: "Dr. Grace Musa",
    age: 37,
    gender: "Female",
    faculty: "Medical Staff",
    department: "Obstetrics & Gynaecology",
    level: "Maternity Unit Doctor",
    matricNumber: "UNIJOS/MED/009",
    status: "Excellent",
    lastVisit: "2024-06-05",
    nextAppointment: "2024-12-05",
    attendingPhysician: "Dr. Amina Hassan",
    bloodType: "B-",
    allergies: ["None known"],
    phone: "08012345009",
    email: "grace.musa@unijos.edu.ng",
    emergencyContact: "08098765009",
    address: "Medical Staff Quarters, Jos",
    type: "Staff"
  },
  {
    id: "USR010",
    name: "Dr. Emmanuel Yakubu",
    age: 41,
    gender: "Male",
    faculty: "Medical Staff",
    department: "Emergency Services",
    level: "Ambulance Services Director",
    matricNumber: "UNIJOS/AMB/010",
    status: "Good",
    lastVisit: "2024-05-18",
    nextAppointment: "2024-08-18",
    attendingPhysician: "Dr. Mary Gyang",
    bloodType: "O-",
    allergies: ["Shellfish"],
    phone: "08012345010",
    email: "emmanuel.yakubu@unijos.edu.ng",
    emergencyContact: "08098765010",
    address: "Medical Staff Quarters, Jos",
    type: "Staff"
  },
  // Additional Students matching the Medical Records section
  {
    id: "P001250",
    name: "Amina Bello",
    age: 18,
    gender: "Female",
    faculty: "Education",
    department: "Educational Psychology",
    level: "100L",
    matricNumber: "UJ/2023/EDU/0890",
    status: "Good",
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

// Memoized patient card component for better performance
const PatientCard = memo(({ patient, onViewRecords }: { 
  patient: typeof allPatients[0]; 
  onViewRecords: (patient: typeof allPatients[0]) => void;
}) => {
  const handleClick = useCallback(() => {
    onViewRecords(patient);
  }, [patient, onViewRecords]);

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer border bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:scale-[1.02] will-change-transform"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-12 w-12 shrink-0 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
              {patient.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground text-sm leading-tight truncate group-hover:text-primary transition-colors duration-200">
              {patient.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                patient.type === 'Student' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
              }`}>
                {patient.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {patient.age}y • {patient.gender}
              </span>
            </div>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/30 dark:bg-muted/20 p-2.5 rounded-lg border border-border/30 hover:border-border/50 transition-colors duration-200">
              <div className="text-muted-foreground font-medium mb-1">Faculty</div>
              <div className="text-foreground font-semibold truncate text-xs">{patient.faculty}</div>
            </div>
            <div className="bg-muted/30 dark:bg-muted/20 p-2.5 rounded-lg border border-border/30 hover:border-border/50 transition-colors duration-200">
              <div className="text-muted-foreground font-medium mb-1">Level</div>
              <div className="text-foreground font-semibold text-xs">{patient.level}</div>
            </div>
          </div>
          
          <div className="bg-muted/20 dark:bg-muted/15 p-2.5 rounded-lg border border-border/20">
            <div className="text-muted-foreground font-medium mb-1">Department</div>
            <div className="text-foreground font-semibold truncate text-xs">{patient.department}</div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-2.5 rounded-lg border border-primary/20">
            <div className="text-muted-foreground font-medium mb-1">
              {patient.type === "Staff" ? "Staff ID" : "Matric No"}
            </div>
            <div className="text-foreground font-semibold text-xs font-mono">{patient.matricNumber}</div>
          </div>
        </div>

        {/* Status and Last Visit */}
        <div className="mt-4 pt-3 border-t border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                patient.status === 'Excellent' ? 'bg-green-500' :
                patient.status === 'Good' ? 'bg-blue-500' :
                patient.status === 'Stable' ? 'bg-yellow-500' :
                patient.status === 'Under Treatment' ? 'bg-orange-500' :
                'bg-red-500'
              }`} />
              <span className="text-xs text-muted-foreground">{patient.status}</span>
            </div>
            <div className="flex items-center gap-1 text-primary group-hover:text-primary/80 transition-colors duration-200">
              <Eye className="h-3 w-3" />
              <span className="font-medium text-xs">View</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Last visit: {patient.lastVisit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PatientCard.displayName = "PatientCard";

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<typeof allPatients[0] | null>(null);

  // Memoize expensive calculations
  const { types, departments, filteredPatients } = useMemo(() => {
    const types = [...new Set(allPatients.map((patient) => patient.type))];
    const departments = [...new Set(allPatients.map((patient) => patient.department))];
    
    const filtered = allPatients.filter((patient) => {
      const searchRegex = new RegExp(searchQuery.trim(), "i");
      const matchesSearch = !searchQuery.trim() || 
        searchRegex.test(patient.name) || 
        searchRegex.test(patient.matricNumber) ||
        searchRegex.test(patient.department) ||
        searchRegex.test(patient.faculty);
      const matchesType = selectedType === "all" || patient.type === selectedType;
      const matchesDepartment = selectedDepartment === "all" || patient.department === selectedDepartment;
      return matchesSearch && matchesType && matchesDepartment;
    });
    
    return { types, departments, filteredPatients: filtered };
  }, [searchQuery, selectedType, selectedDepartment]);

  // Memoized callback for better performance
  const handleViewRecords = useCallback((patient: typeof allPatients[0]) => {
    setSelectedPatient(patient);
    setIsViewRecordsOpen(true);
  }, []);

  // Performance stats
  const stats = useMemo(() => ({
    total: allPatients.length,
    students: allPatients.filter(p => p.type === 'Student').length,
    staff: allPatients.filter(p => p.type === 'Staff').length,
    filtered: filteredPatients.length
  }), [filteredPatients.length]);

  return (
    <div className="space-y-4 sm:space-y-6 will-change-scroll">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Patient Directory</h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {stats.filtered} of {stats.total} patients • {stats.students} students • {stats.staff} staff
          </p>
        </div>
        <Button 
          onClick={() => setIsAddPatientOpen(true)}
          className="self-start sm:self-auto hover:scale-105 transition-transform duration-200"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Register Patient
        </Button>
      </div>

      {/* Enhanced Search and Filter */}
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, ID, department, or faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-[140px] h-10">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}s
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-[180px] h-10">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="shrink-0 h-10 w-10 hover:scale-105 transition-transform duration-200">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {(searchQuery || selectedType !== "all" || selectedDepartment !== "all") && (
        <div className="text-sm text-muted-foreground bg-muted/20 dark:bg-muted/10 p-3 rounded-lg border border-border/30">
          Showing {filteredPatients.length} result{filteredPatients.length !== 1 ? 's' : ''} 
          {searchQuery && ` for "${searchQuery}"`}
          {selectedType !== "all" && ` in ${selectedType}s`}
          {selectedDepartment !== "all" && ` from ${selectedDepartment}`}
        </div>
      )}

      {/* Patient Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {filteredPatients.map((patient, index) => (
          <div 
            key={patient.id}
            style={{ 
              animationDelay: `${Math.min(index * 50, 500)}ms`,
              animationFillMode: 'both'
            }}
            className="animate-fade-in"
          >
            <PatientCard patient={patient} onViewRecords={handleViewRecords} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Card className="border-dashed border-2 border-border/50">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No patients found</h3>
              <p className="text-sm">
                {searchQuery || selectedType !== "all" || selectedDepartment !== "all"
                  ? "Try adjusting your search criteria or filters."
                  : "No patients have been registered yet."}
              </p>
              {(!searchQuery && selectedType === "all" && selectedDepartment === "all") && (
                <Button 
                  onClick={() => setIsAddPatientOpen(true)}
                  className="mt-4"
                  variant="outline"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register First Patient
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {filteredPatients.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Patients</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.students}</div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">Students</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.staff}</div>
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Staff</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{filteredPatients.length}</div>
              <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">Showing</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialogs */}
      <ViewRecordsDialog
        open={isViewRecordsOpen}
        onOpenChange={setIsViewRecordsOpen}
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

export default memo(PatientManagement);
