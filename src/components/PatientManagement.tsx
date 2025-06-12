import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Plus, 
  Calendar, 
  Phone, 
  Mail,
  UserCheck,
  Stethoscope,
  Building2,
  Eye,
  Edit,
  AlertCircle
} from "lucide-react";
import { AddPatientDialog } from "./AddPatientDialog";
import { ScheduleAppointmentDialog } from "./ScheduleAppointmentDialog";
import { EditProfileDialog } from "./EditProfileDialog";
import { ViewRecordsDialog } from "./ViewRecordsDialog";
import { useToast } from "@/hooks/use-toast";

// Updated students data without addresses
const students = [
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    matricNumber: "UJ/2022/ENG/0234",
    email: "adaora.okonkwo@unijos.edu.ng",
    phone: "+234 801 234 5678",
    faculty: "Engineering",
    department: "Computer Engineering",
    level: "200L",
    dateOfBirth: "2003-05-15",
    bloodType: "O+",
    emergencyContact: "+234 809 876 5432",
    status: "Active",
    lastVisit: "2024-06-05",
    initials: "AO",
    healthStatus: "Good"
  },
  {
    id: "P001235",
    name: "Ibrahim Musa",
    matricNumber: "UJ/2020/MED/0456",
    email: "ibrahim.musa@unijos.edu.ng",
    phone: "+234 802 345 6789",
    faculty: "Medicine",
    department: "Medicine & Surgery",
    level: "400L",
    dateOfBirth: "2001-08-22",
    bloodType: "A+",
    emergencyContact: "+234 808 765 4321",
    status: "Active",
    lastVisit: "2024-06-07",
    initials: "IM",
    healthStatus: "Good"
  },
  {
    id: "P001236",
    name: "Blessing Eze",
    matricNumber: "UJ/2023/SSC/0123",
    email: "blessing.eze@unijos.edu.ng",
    phone: "+234 803 456 7890",
    faculty: "Social Sciences",
    department: "Psychology",
    level: "100L",
    dateOfBirth: "2004-12-10",
    bloodType: "B+",
    emergencyContact: "+234 808 765 4321",
    status: "Active",
    lastVisit: "2024-06-08",
    initials: "BE",
    healthStatus: "Good"
  },
  {
    id: "P001237",
    name: "Yusuf Abdullahi",
    matricNumber: "UJ/2021/NSC/0789",
    email: "yusuf.abdullahi@unijos.edu.ng",
    phone: "+234 804 567 8901",
    faculty: "Natural Sciences",
    department: "Computer Science",
    level: "300L",
    dateOfBirth: "2002-03-18",
    bloodType: "AB+",
    emergencyContact: "+234 806 543 2109",
    status: "Active",
    lastVisit: "2024-06-09",
    initials: "YA",
    healthStatus: "Good"
  },
  {
    id: "P001238",
    name: "Fatima Aliyu",
    matricNumber: "UJ/2019/LAW/0345",
    email: "fatima.aliyu.student@unijos.edu.ng",
    phone: "+234 805 678 9012",
    faculty: "Law",
    department: "Law",
    level: "500L",
    dateOfBirth: "2000-01-25",
    bloodType: "O-",
    emergencyContact: "+234 805 432 1098",
    status: "Active",
    lastVisit: "2024-06-06",
    initials: "FA",
    healthStatus: "Good"
  },
  {
    id: "P001239",
    name: "Chidi Okafor",
    matricNumber: "UJ/2022/PHM/0567",
    email: "chidi.okafor@unijos.edu.ng",
    phone: "+234 806 789 0123",
    faculty: "Pharmacy",
    department: "Pharmacy",
    level: "200L",
    dateOfBirth: "2003-07-12",
    bloodType: "A-",
    emergencyContact: "+234 805 432 1098",
    status: "Active",
    lastVisit: "2024-06-04",
    initials: "CO",
    healthStatus: "Good"
  },
  {
    id: "P001250",
    name: "Amina Bello",
    matricNumber: "UJ/2023/EDU/0890",
    email: "amina.bello@unijos.edu.ng",
    phone: "+234 807 890 1234",
    faculty: "Education",
    department: "Educational Psychology",
    level: "100L",
    dateOfBirth: "2004-09-08",
    bloodType: "B-",
    emergencyContact: "+234 803 210 9876",
    status: "Active",
    lastVisit: "2024-06-10",
    initials: "AB",
    healthStatus: "Good"
  },
  {
    id: "P001251",
    name: "David Pam",
    matricNumber: "UJ/2021/AGR/0456",
    email: "david.pam@unijos.edu.ng",
    phone: "+234 808 901 2345",
    faculty: "Agriculture",
    department: "Animal Science",
    level: "300L",
    dateOfBirth: "2002-11-30",
    bloodType: "A+",
    emergencyContact: "+234 804 321 0987",
    status: "Active",
    lastVisit: "2024-06-11",
    initials: "DP",
    healthStatus: "Good"
  }
];

// Updated staff data without addresses
const staff = [
  {
    id: "S001",
    name: "Dr. Hauwa Abdullahi",
    staffId: "UNIJOS/REG/001",
    email: "hauwa.abdullahi@unijos.edu.ng",
    phone: "+234 801 234 5678",
    department: "Academic Registry",
    unit: "Student Records",
    position: "Registrar",
    dateOfBirth: "1975-03-15",
    bloodType: "O+",
    emergencyContact: "+234 809 876 5432",
    status: "Active",
    lastVisit: "2024-05-20",
    initials: "HA",
    yearsOfService: "12 years",
    healthStatus: "Good"
  },
  {
    id: "S002",
    name: "Mr. James Dung",
    staffId: "UNIJOS/LIB/002",
    email: "james.dung@unijos.edu.ng",
    phone: "+234 802 345 6789",
    department: "Library Services",
    unit: "Main Library",
    position: "Chief Librarian",
    dateOfBirth: "1980-07-22",
    bloodType: "A+",
    emergencyContact: "+234 808 765 4321",
    status: "Active",
    lastVisit: "2024-04-15",
    initials: "JD",
    yearsOfService: "10 years",
    healthStatus: "Excellent"
  },
  {
    id: "S003",
    name: "Mrs. Grace Yakubu",
    staffId: "UNIJOS/SEC/003",
    email: "grace.yakubu@unijos.edu.ng",
    phone: "+234 803 456 7890",
    department: "Security Services",
    unit: "Campus Security",
    position: "Security Coordinator",
    dateOfBirth: "1978-11-05",
    bloodType: "B+",
    emergencyContact: "+234 808 765 4321",
    status: "Active",
    lastVisit: "2024-06-01",
    initials: "GY",
    yearsOfService: "8 years",
    healthStatus: "Good"
  },
  {
    id: "S004",
    name: "Engr. Emmanuel Bulus",
    staffId: "UNIJOS/ICT/004",
    email: "emmanuel.bulus@unijos.edu.ng",
    phone: "+234 804 567 8901",
    department: "Information Technology",
    unit: "ICT Center",
    position: "ICT Director",
    dateOfBirth: "1982-01-18",
    bloodType: "AB+",
    emergencyContact: "+234 806 543 2109",
    status: "Active",
    lastVisit: "2024-03-25",
    initials: "EB",
    yearsOfService: "6 years",
    healthStatus: "Good"
  },
  {
    id: "S005",
    name: "Mrs. Rebecca Gyang",
    staffId: "UNIJOS/BUR/005",
    email: "rebecca.gyang@unijos.edu.ng",
    phone: "+234 805 678 9012",
    department: "Bursary",
    unit: "Financial Services",
    position: "Bursary Officer",
    dateOfBirth: "1985-09-12",
    bloodType: "O-",
    emergencyContact: "+234 805 432 1098",
    status: "Active",
    lastVisit: "2024-05-05",
    initials: "RG",
    yearsOfService: "5 years",
    healthStatus: "Good"
  },
  {
    id: "S006",
    name: "Mr. Daniel Kwaghe",
    staffId: "UNIJOS/EST/006",
    email: "daniel.kwaghe@unijos.edu.ng",
    phone: "+234 806 789 0123",
    department: "Estate Management",
    unit: "Facilities",
    position: "Estate Officer",
    dateOfBirth: "1979-06-30",
    bloodType: "A-",
    emergencyContact: "+234 804 321 0987",
    status: "Active",
    lastVisit: "2024-04-20",
    initials: "DK",
    yearsOfService: "7 years",
    healthStatus: "Good"
  },
  {
    id: "S007",
    name: "Mrs. Maryam Umar",
    staffId: "UNIJOS/HR/007",
    email: "maryam.umar@unijos.edu.ng",
    phone: "+234 807 890 1234",
    department: "Human Resources",
    unit: "Staff Development",
    position: "HR Director",
    dateOfBirth: "1976-12-08",
    bloodType: "B-",
    emergencyContact: "+234 803 210 9876",
    status: "Active",
    lastVisit: "2024-05-30",
    initials: "MU",
    yearsOfService: "9 years",
    healthStatus: "Excellent"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "Inactive":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

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

export const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const { toast } = useToast();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRecords = (person: any) => {
    setSelectedPerson(person);
    setIsViewRecordsOpen(true);
  };

  const handleScheduleAppointment = (person: any) => {
    setSelectedPerson(person);
    setIsScheduleOpen(true);
  };

  const handleEditProfile = (person: any) => {
    setSelectedPerson(person);
    setIsEditOpen(true);
  };

  const PatientCard = ({ person, isStaff = false }) => (
    <Card key={person.id} className="hover-lift transition-all duration-300">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm sm:text-lg">
              {person.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="font-semibold text-foreground text-lg truncate">{person.name}</h3>
              <div className="flex gap-2">
                <Badge className={getStatusColor(person.status)}>
                  {person.status}
                </Badge>
                <Badge className={getHealthStatusColor(person.healthStatus)}>
                  {person.healthStatus}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {isStaff ? person.staffId : person.matricNumber}
            </p>
            <p className="text-sm text-muted-foreground">
              {isStaff ? `${person.position} - ${person.department}` : `${person.faculty} - ${person.level}`}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{person.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{person.phone}</span>
          </div>
          {isStaff && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{person.unit}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Last visit: {person.lastVisit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Blood type: {person.bloodType}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => handleViewRecords(person)}
          >
            <Eye className="h-3 w-3 mr-1" />
            Records
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => handleScheduleAppointment(person)}
          >
            <Calendar className="h-3 w-3 mr-1" />
            Schedule
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => handleEditProfile(person)}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Patient Management</h2>
            <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Manage students and staff health records</p>
          </div>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
          onClick={() => setIsAddPatientOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
          <TabsTrigger value="students" className="text-xs sm:text-sm flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students ({filteredStudents.length})
          </TabsTrigger>
          <TabsTrigger value="staff" className="text-xs sm:text-sm flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Staff ({filteredStaff.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <PatientCard key={student.id} person={student} isStaff={false} />
            ))}
          </div>
          {filteredStudents.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No students found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredStaff.map((member) => (
              <PatientCard key={member.id} person={member} isStaff={true} />
            ))}
          </div>
          {filteredStaff.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No staff members found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <AddPatientDialog 
        open={isAddPatientOpen} 
        onOpenChange={setIsAddPatientOpen} 
      />

      <ViewRecordsDialog 
        open={isViewRecordsOpen} 
        onOpenChange={setIsViewRecordsOpen}
        patientName={selectedPerson?.name || "Patient"}
        patientId={selectedPerson?.id || selectedPerson?.matricNumber || selectedPerson?.staffId || ""}
      />

      <ScheduleAppointmentDialog 
        open={isScheduleOpen} 
        onOpenChange={setIsScheduleOpen}
        patientName={selectedPerson?.name || "Patient"}
      />

      <EditProfileDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen}
        person={selectedPerson}
        isStaff={selectedPerson?.staffId ? true : false}
      />
    </div>
  );
};
