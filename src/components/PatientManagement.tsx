import { memo, useMemo, useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Eye,
  UserPlus,
  Search,
  User,
} from "lucide-react";
import { ViewRecordsDialog } from "./ViewRecordsDialog";
import { AddPatientDialog } from "./AddPatientDialog";

// Consistent patient data across the application
const allPatients = [
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    age: 34,
    gender: "Female",
    faculty: "Engineering",
    department: "Computer Engineering",
    level: "200L",
    matricNumber: "UJ/2022/ENG/0234",
    phone: "08012345678",
    email: "adaora.okonkwo@unijos.edu.ng",
    type: "Student"
  },
  {
    id: "P001236",
    name: "Blessing Eze",
    age: 32,
    gender: "Female",
    faculty: "Social Sciences",
    department: "Psychology",
    level: "100L",
    matricNumber: "UJ/2023/SSC/0123",
    phone: "08034567890",
    email: "blessing.eze@unijos.edu.ng",
    type: "Student"
  },
  {
    id: "P001237",
    name: "Yusuf Abdullahi",
    age: 36,
    gender: "Male",
    faculty: "Natural Sciences",
    department: "Computer Science",
    level: "300L",
    matricNumber: "UJ/2021/NSC/0789",
    phone: "08045678901",
    email: "yusuf.abdullahi@unijos.edu.ng",
    type: "Student"
  }
];

// Optimized patient card component
const PatientCard = memo(({ patient, onViewRecords }: { 
  patient: typeof allPatients[0]; 
  onViewRecords: (patient: typeof allPatients[0]) => void;
}) => {
  const handleClick = useCallback(() => {
    onViewRecords(patient);
  }, [patient, onViewRecords]);

  return (
    <Card 
      className="group hover:shadow-lg transition-shadow duration-150 cursor-pointer border bg-card hover:scale-[1.01]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View medical records for ${patient.name}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
              {patient.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
              {patient.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {patient.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {patient.age}y • {patient.gender}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/30 p-2.5 rounded-lg border">
              <div className="text-muted-foreground font-medium mb-1">Faculty</div>
              <div className="text-foreground font-semibold truncate text-xs">{patient.faculty}</div>
            </div>
            <div className="bg-muted/30 p-2.5 rounded-lg border">
              <div className="text-muted-foreground font-medium mb-1">Level</div>
              <div className="text-foreground font-semibold text-xs">{patient.level}</div>
            </div>
          </div>
          
          <div className="bg-muted/20 p-2.5 rounded-lg border">
            <div className="text-muted-foreground font-medium mb-1">Department</div>
            <div className="text-foreground font-semibold truncate text-xs">{patient.department}</div>
          </div>

          <div className="bg-primary/5 p-2.5 rounded-lg border border-primary/20">
            <div className="text-muted-foreground font-medium mb-1">Matric No</div>
            <div className="text-foreground font-semibold text-xs font-mono">{patient.matricNumber}</div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1 text-primary">
              <Eye className="h-3 w-3" />
              <span className="font-medium text-xs">View</span>
            </div>
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

  // Optimized filtering
  const { types, departments, filteredPatients } = useMemo(() => {
    const types = [...new Set(allPatients.map((patient) => patient.type))];
    const departments = [...new Set(allPatients.map((patient) => patient.department))];
    
    const filtered = allPatients.filter((patient) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        patient.name.toLowerCase().includes(query) || 
        patient.matricNumber.toLowerCase().includes(query) ||
        patient.department.toLowerCase().includes(query) ||
        patient.faculty.toLowerCase().includes(query);
      const matchesType = selectedType === "all" || patient.type === selectedType;
      const matchesDepartment = selectedDepartment === "all" || patient.department === selectedDepartment;
      return matchesSearch && matchesType && matchesDepartment;
    });
    
    return { types, departments, filteredPatients: filtered };
  }, [searchQuery, selectedType, selectedDepartment]);

  const handleViewRecords = useCallback((patient: typeof allPatients[0]) => {
    setSelectedPatient(patient);
    setIsViewRecordsOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Directory</h2>
          <p className="text-muted-foreground mt-1">
            Manage patient records and information
          </p>
        </div>
        <Button 
          onClick={() => setIsAddPatientOpen(true)}
          className="self-start sm:self-auto"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Register Patient
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search patients by name, ID, department, or faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
                aria-label="Search patients"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-11" aria-label="Filter by type">
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
                  <SelectTrigger className="h-11" aria-label="Filter by department">
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {(searchQuery || selectedType !== "all" || selectedDepartment !== "all") && (
        <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg" role="status" aria-live="polite">
          Showing {filteredPatients.length} result{filteredPatients.length !== 1 ? 's' : ''} 
          {searchQuery && ` for "${searchQuery}"`}
          {selectedType !== "all" && ` in ${selectedType}s`}
          {selectedDepartment !== "all" && ` from ${selectedDepartment}`}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="grid" aria-label="Patient directory">
        {filteredPatients.map((patient) => (
          <div key={patient.id} role="gridcell">
            <PatientCard patient={patient} onViewRecords={handleViewRecords} />
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="border-dashed border-2">
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