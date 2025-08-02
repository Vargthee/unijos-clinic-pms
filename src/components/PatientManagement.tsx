import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  UserPlus,
  Download,
  User,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { ViewRecordsDialog } from "./ViewRecordsDialog";
import { AddPatientDialog } from "./AddPatientDialog";

// Combined patients and staff data with improved medical accuracy
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
    type: "Student",
    condition: "Uncomplicated malaria"
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
    type: "Student",
    condition: "Sickle cell disease"
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
    type: "Student",
    condition: "Acute gastroenteritis"
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
    type: "Student",
    condition: "Bronchial asthma"
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
    type: "Student",
    condition: "Iron deficiency anemia"
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
    type: "Student",
    condition: "Upper respiratory infection"
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
    type: "Staff",
    condition: "Annual health screening"
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
    type: "Staff",
    condition: "Essential hypertension"
  },
];

export const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<typeof allPatients[0] | null>(null);

  const faculties = [...new Set(allPatients.map((patient) => patient.faculty))];

  const filteredPatients = allPatients.filter((patient) => {
    const searchRegex = new RegExp(searchQuery, "i");
    const matchesSearch = 
      searchRegex.test(patient.name) || 
      searchRegex.test(patient.matricNumber) ||
      searchRegex.test(patient.id);
    const matchesFaculty = selectedFaculty === "all" ? true : patient.faculty === selectedFaculty;
    const matchesType = selectedType === "all" ? true : patient.type === selectedType;
    return matchesSearch && matchesFaculty && matchesType;
  });

  const handleViewRecords = (patient: typeof allPatients[0]) => {
    setSelectedPatient(patient);
    setIsViewRecordsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
      case "Stable":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800";
      case "Under Treatment":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
      case "Recovering":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Student" ? GraduationCap : Briefcase;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Patient Directory</h1>
          <p className="text-muted-foreground">Manage student and staff medical records</p>
        </div>
        <Button 
          className="btn-primary shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => setIsAddPatientOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, ID, or matric number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px] h-11 bg-background/50 border-border/50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Student">Students</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger className="w-[180px] h-11 bg-background/50 border-border/50">
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
              <Button variant="outline" className="h-11 px-4 border-border/50 hover:bg-accent/50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredPatients.length} of {allPatients.length} patients</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            Healthy
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            Under Treatment
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Stable
          </span>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient, index) => {
          const TypeIcon = getTypeIcon(patient.type);
          
          return (
            <Card 
              key={patient.id} 
              className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status Indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-primary/30"></div>
              
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                          {getInitials(patient.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                        {patient.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-border/50">
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {patient.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Age {patient.age}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-xs px-2 py-1 border ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </Badge>
                </div>

                {/* Patient Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground truncate">{patient.matricNumber}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground truncate">{patient.faculty}</span>
                    {patient.level && (
                      <Badge variant="secondary" className="text-xs ml-auto">
                        {patient.level}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Stethoscope className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground truncate">{patient.condition}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground truncate">{patient.phone}</span>
                  </div>
                </div>

                {/* Medical Info */}
                <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Last Visit</span>
                    <span className="font-medium text-foreground">{patient.lastVisit}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Next Appointment</span>
                    <span className="font-medium text-foreground">{patient.nextAppointment}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Physician</span>
                    <span className="font-medium text-foreground truncate ml-2">{patient.attendingPhysician}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewRecords(patient)}
                    className="flex-1 h-9 border-border/50 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Records
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Card className="border-dashed border-2 border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <User className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No patients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search criteria" : "Get started by adding your first patient"}
            </p>
            <Button onClick={() => setIsAddPatientOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </CardContent>
        </Card>
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