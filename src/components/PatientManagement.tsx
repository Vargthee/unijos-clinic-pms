
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
  MapPin,
  UserCheck,
  Stethoscope,
  Building2
} from "lucide-react";
import { AddPatientDialog } from "./AddPatientDialog";

const students = [
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    matricNumber: "UJ/2022/ENG/0234",
    email: "adaora.okonkwo@unijos.edu.ng",
    phone: "+234 803 123 4567",
    faculty: "Engineering",
    department: "Computer Engineering",
    level: "200L",
    dateOfBirth: "2003-05-15",
    bloodType: "O+",
    address: "Rayfield, Jos",
    emergencyContact: "+234 806 987 6543",
    status: "Active",
    lastVisit: "2024-06-05",
    initials: "AO"
  },
  {
    id: "P001235",
    name: "Ibrahim Musa",
    matricNumber: "UJ/2020/MED/0456",
    email: "ibrahim.musa@unijos.edu.ng",
    phone: "+234 805 234 5678",
    faculty: "Medicine",
    department: "Medicine & Surgery",
    level: "400L",
    dateOfBirth: "2001-08-22",
    bloodType: "A+",
    address: "Gangare, Jos",
    emergencyContact: "+234 807 876 5432",
    status: "Active",
    lastVisit: "2024-06-07",
    initials: "IM"
  },
  {
    id: "P001236",
    name: "Blessing Eze",
    matricNumber: "UJ/2023/SSC/0123",
    email: "blessing.eze@unijos.edu.ng",
    phone: "+234 809 345 6789",
    faculty: "Social Sciences",
    department: "Psychology",
    level: "100L",
    dateOfBirth: "2004-12-10",
    bloodType: "B+",
    address: "Bukuru, Jos",
    emergencyContact: "+234 808 765 4321",
    status: "Active",
    lastVisit: "2024-06-08",
    initials: "BE"
  }
];

const staff = [
  {
    id: "S001",
    name: "Dr. Fatima Aliyu",
    staffId: "UNIJOS/MED/001",
    email: "fatima.aliyu@unijos.edu.ng",
    phone: "+234 803 111 2222",
    department: "Internal Medicine",
    unit: "General Practice",
    position: "Senior Physician",
    dateOfBirth: "1980-03-15",
    bloodType: "O+",
    address: "GRA, Jos",
    emergencyContact: "+234 806 333 4444",
    status: "Active",
    lastVisit: "2024-05-15",
    initials: "FA",
    yearsOfService: "12 years"
  },
  {
    id: "S002",
    name: "Dr. John Okafor",
    staffId: "UNIJOS/PSY/002",
    email: "john.okafor@unijos.edu.ng",
    phone: "+234 805 222 3333",
    department: "Mental Health",
    unit: "Psychiatry",
    position: "Psychiatrist",
    dateOfBirth: "1975-07-20",
    bloodType: "A+",
    address: "Rayfield, Jos",
    emergencyContact: "+234 807 444 5555",
    status: "Active",
    lastVisit: "2024-04-20",
    initials: "JO",
    yearsOfService: "15 years"
  },
  {
    id: "S003",
    name: "Nurse Grace Danladi",
    staffId: "UNIJOS/NUR/003",
    email: "grace.danladi@unijos.edu.ng",
    phone: "+234 809 333 4444",
    department: "Nursing Services",
    unit: "General Ward",
    position: "Head Nurse",
    dateOfBirth: "1985-11-05",
    bloodType: "B+",
    address: "Lamingo, Jos",
    emergencyContact: "+234 808 555 6666",
    status: "Active",
    lastVisit: "2024-06-01",
    initials: "GD",
    yearsOfService: "8 years"
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

export const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

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

  const PatientCard = ({ person, isStaff = false }) => (
    <Card key={person.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-sm sm:text-lg dark:bg-blue-900/30 dark:text-blue-300">
              {person.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="font-semibold text-foreground text-lg truncate">{person.name}</h3>
              <Badge className={getStatusColor(person.status)}>
                {person.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {isStaff ? person.staffId : person.matricNumber}
            </p>
            <p className="text-sm text-muted-foreground">
              {isStaff ? `${person.position} - ${person.department}` : `${person.faculty} - ${person.level}`}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{person.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{person.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{person.address}</span>
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

        <div className="flex flex-wrap gap-2 mt-4">
          <Button variant="outline" size="sm" className="text-xs">
            View Records
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Schedule Appointment
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
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
          {filteredStudents.map((student) => (
            <PatientCard key={student.id} person={student} isStaff={false} />
          ))}
          {filteredStudents.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No students found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-3 sm:space-y-4">
          {filteredStaff.map((member) => (
            <PatientCard key={member.id} person={member} isStaff={true} />
          ))}
          {filteredStaff.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
    </div>
  );
};
