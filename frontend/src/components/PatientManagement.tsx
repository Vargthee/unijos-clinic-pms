import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Eye,
  UserPlus,
  Download,
  AlertTriangle,
  Heart,
  Activity,
  Users,
  Clock,
} from "lucide-react";
import { ViewRecordsDialog } from "./ViewRecordsDialog";
import { AddPatientDialog } from "./AddPatientDialog";
import { Patient, AgeBasedRecommendation, MedicalConsistencyCheck } from "../types";
import apiService from "../services/api";

export const PatientManagement = () => {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [selectedPatientType, setSelectedPatientType] = useState("all");
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [ageRecommendations, setAgeRecommendations] = useState<AgeBasedRecommendation | null>(null);
  const [consistencyCheck, setConsistencyCheck] = useState<MedicalConsistencyCheck | null>(null);

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const fetchedPatients = await apiService.getPatients();
      setPatients(fetchedPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast({
        title: "Error",
        description: "Failed to fetch patients. Using sample data.",
        variant: "destructive",
      });
      // Fallback to sample data if API fails
      setPatients(getSamplePatients());
    } finally {
      setLoading(false);
    }
  };

  // Sample patients for fallback
  const getSamplePatients = (): Patient[] => [
    {
      id: "P001234",
      name: "Adaora Okonkwo",
      age: 20,
      gender: "female",
      patient_type: "Student",
      faculty: "Engineering",
      department: "Computer Engineering",
      level: "200L",
      matric_number: "UJ/2022/ENG/0234",
      blood_type: "O+",
      allergies: ["None known"],
      phone: "08012345678",
      email: "adaora.okonkwo@unijos.edu.ng",
      emergency_contact: {
        name: "Mrs. Okonkwo",
        phone: "08098765432",
        relationship: "Mother"
      },
      address: "No. 45 Zaria Road, Jos",
      date_of_birth: "2004-01-15",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "P001235",
      name: "Ibrahim Musa",
      age: 22,
      gender: "male",
      patient_type: "Student",
      faculty: "Medicine",
      department: "Medicine & Surgery",
      level: "400L",
      matric_number: "UJ/2020/MED/0456",
      blood_type: "A+",
      allergies: ["Codeine", "Sulfa drugs"],
      phone: "08023456789",
      email: "ibrahim.musa@unijos.edu.ng",
      emergency_contact: {
        name: "Mr. Musa",
        phone: "08087654321",
        relationship: "Father"
      },
      address: "No. 12 Bauchi Road, Jos",
      date_of_birth: "2002-03-10",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "S001",
      name: "Dr. Fatima Aliyu",
      age: 35,
      gender: "female",
      patient_type: "Staff",
      faculty: "Medical Staff",
      department: "General Medicine",
      level: "Senior Consultant",
      staff_id: "STAFF/2018/MED/001",
      blood_type: "A+",
      allergies: ["None known"],
      phone: "08012345001",
      email: "fatima.aliyu@unijos.edu.ng",
      emergency_contact: {
        name: "Dr. Aliyu",
        phone: "08098765001",
        relationship: "Spouse"
      },
      address: "Medical Staff Quarters, Jos",
      date_of_birth: "1989-07-20",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    }
  ];

  const faculties = [...new Set(patients.map((patient) => patient.faculty).filter(Boolean))];
  
  const filteredPatients = patients.filter((patient) => {
    const searchRegex = new RegExp(searchQuery, "i");
    const matchesSearch = searchRegex.test(patient.name) || 
                         searchRegex.test(patient.matric_number || '') || 
                         searchRegex.test(patient.staff_id || '');
    
    const matchesFaculty = selectedFaculty === "all" || patient.faculty === selectedFaculty;
    const matchesPatientType = selectedPatientType === "all" || patient.patient_type === selectedPatientType;
    
    let matchesAgeRange = true;
    if (selectedAgeRange !== "all") {
      const age = patient.age;
      switch (selectedAgeRange) {
        case "under-18":
          matchesAgeRange = age < 18;
          break;
        case "18-25":
          matchesAgeRange = age >= 18 && age <= 25;
          break;
        case "26-35":
          matchesAgeRange = age >= 26 && age <= 35;
          break;
        case "36-50":
          matchesAgeRange = age >= 36 && age <= 50;
          break;
        case "over-50":
          matchesAgeRange = age > 50;
          break;
      }
    }
    
    return matchesSearch && matchesFaculty && matchesPatientType && matchesAgeRange;
  });

  const handleViewRecords = async (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewRecordsOpen(true);
    
    // Fetch age recommendations and consistency check
    try {
      const [recommendations, consistency] = await Promise.all([
        apiService.getPatientAgeRecommendations(patient.id),
        apiService.checkMedicalConsistency(patient.id)
      ]);
      setAgeRecommendations(recommendations);
      setConsistencyCheck(consistency);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleAddPatientSuccess = () => {
    fetchPatients();
    toast({
      title: "Success",
      description: "Patient added successfully",
    });
  };

  const getAgeGroupColor = (age: number) => {
    if (age < 18) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    if (age <= 25) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (age <= 35) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    if (age <= 50) return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  const getHealthStatusColor = (patient: Patient) => {
    if (patient.warnings && patient.warnings.length > 0) {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    }
    if (patient.chronic_conditions && patient.chronic_conditions.length > 0) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    }
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  };

  const getHealthStatusText = (patient: Patient) => {
    if (patient.warnings && patient.warnings.length > 0) {
      return "Needs Attention";
    }
    if (patient.chronic_conditions && patient.chronic_conditions.length > 0) {
      return "Monitoring";
    }
    return "Healthy";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage student and staff medical records with age-based recommendations</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Patients: {patients.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Average Age: {patients.length > 0 ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length) : 0}
              </span>
            </div>
          </div>
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
            placeholder="Search by name, matric number, or staff ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-80 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          />
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Filter by Faculty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Faculties</SelectItem>
              {faculties.map((faculty) => (
                <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPatientType} onValueChange={setSelectedPatientType}>
            <SelectTrigger className="w-[140px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Student">Students</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAgeRange} onValueChange={setSelectedAgeRange}>
            <SelectTrigger className="w-[140px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Age Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="under-18">Under 18</SelectItem>
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="26-35">26-35</SelectItem>
              <SelectItem value="36-50">36-50</SelectItem>
              <SelectItem value="over-50">Over 50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-gray-300 dark:border-gray-600">
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
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getAgeGroupColor(patient.age)}>
                          Age {patient.age}
                        </Badge>
                        <Badge variant="outline" className={getHealthStatusColor(patient)}>
                          {getHealthStatusText(patient)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Type:</span> {patient.patient_type}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Faculty:</span> {patient.faculty}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Department:</span> {patient.department}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">
                        {patient.patient_type === "Staff" ? "Staff ID" : "Matric No"}:
                      </span> {patient.matric_number || patient.staff_id}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Blood Type:</span> {patient.blood_type || "Not specified"}
                    </p>
                    
                    {patient.warnings && patient.warnings.length > 0 && (
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs">{patient.warnings.length} warning(s)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewRecords(patient)} 
                      className="w-full border-gray-300 dark:border-gray-600"
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
        ageRecommendations={ageRecommendations}
        consistencyCheck={consistencyCheck}
      />

      <AddPatientDialog
        open={isAddPatientOpen}
        onOpenChange={setIsAddPatientOpen}
        onSuccess={handleAddPatientSuccess}
      />
    </div>
  );
};
