import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Calendar, 
  Stethoscope, 
  AlertTriangle, 
  Plus, 
  FileText, 
  Heart, 
  Activity, 
  Thermometer,
  UserCheck,
  Eye,
  Download,
  Search,
  Building,
  Shield
} from "lucide-react";
import { ViewRecordsDialog } from "./ViewRecordsDialog";
import { NewRecordDialog } from "./NewRecordDialog";

const staffMedicalRecords = [
  {
    id: "SMR001",
    staffId: "S001",
    name: "Dr. Fatima Aliyu",
    age: 35,
    role: "Senior Physician",
    lastCheckup: "2024-05-15",
    nextCheckup: "2024-11-15",
    bloodType: "O+",
    allergies: ["Penicillin"],
    vaccinations: ["COVID-19", "Hepatitis B", "Influenza"],
    healthStatus: "Good",
    bmi: "23.5",
    bloodPressure: "120/80",
    temperature: "36.7°C",
    pulse: "72 bpm",
    weight: "62 kg",
    height: "165 cm",
    respiratoryRate: "16/min",
    oxygenSaturation: "98%",
    notes: "35-year-old physician in good health. Regular health maintenance, all parameters normal. Immunizations up to date.",
    initials: "FA",
  },
  {
    id: "SMR002",
    staffId: "S002",
    name: "Dr. John Okafor",
    age: 48,
    role: "Psychiatrist",
    lastCheckup: "2024-04-20",
    nextCheckup: "2024-10-20",
    bloodType: "A+",
    allergies: ["Latex"],
    vaccinations: ["COVID-19", "Influenza", "Tetanus"],
    healthStatus: "Good",
    bmi: "25.1",
    bloodPressure: "125/85",
    temperature: "36.8°C",
    pulse: "75 bpm",
    weight: "78 kg",
    height: "178 cm",
    respiratoryRate: "18/min",
    oxygenSaturation: "97%",
    notes: "48-year-old psychiatrist with borderline hypertension. Lifestyle modifications recommended. Regular monitoring continues.",
    initials: "JO",
  },
  {
    id: "SMR003",
    staffId: "S004",
    name: "Nurse Grace Danladi",
    age: 32,
    role: "Head Nurse",
    lastCheckup: "2024-03-10",
    nextCheckup: "2024-09-10",
    bloodType: "B+",
    allergies: ["None known"],
    vaccinations: ["COVID-19", "Hepatitis B", "Influenza", "MMR"],
    healthStatus: "Excellent",
    bmi: "22.8",
    bloodPressure: "118/75",
    temperature: "36.5°C",
    pulse: "68 bpm",
    weight: "58 kg",
    height: "162 cm",
    respiratoryRate: "15/min",
    oxygenSaturation: "99%",
    notes: "32-year-old head nurse in excellent health. All health parameters optimal. Exemplary health maintenance.",
    initials: "GD",
  },
  {
    id: "SMR004",
    staffId: "S006",
    name: "Pharmacist Maryam Umar",
    age: 39,
    role: "Chief Pharmacist",
    lastCheckup: "2024-06-01",
    nextCheckup: "2024-12-01",
    bloodType: "AB-",
    allergies: ["Sulfa drugs"],
    vaccinations: ["COVID-19", "Influenza"],
    healthStatus: "Good",
    bmi: "24.2",
    bloodPressure: "130/85",
    temperature: "36.9°C",
    pulse: "76 bpm",
    weight: "66 kg",
    height: "170 cm",
    respiratoryRate: "17/min",
    oxygenSaturation: "98%",
    notes: "39-year-old chief pharmacist in good health. Due for routine blood work and lipid profile. Sulfa drug allergy documented.",
    initials: "MU",
  },
];

const getHealthStatusColor = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "Good":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "Fair":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "Poor":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
  }
};

export const StaffMedicalRecords = () => {
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const handleViewRecord = (staff: any) => {
    setSelectedStaff(staff);
    setIsViewRecordsOpen(true);
  };

  const filteredStaff = staffMedicalRecords.filter(staff => {
    const matchesSearch = !searchQuery || 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.staffId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filterRole === "all" || staff.role.toLowerCase().includes(filterRole.toLowerCase());
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Staff Medical Records
              </h1>
              <p className="text-muted-foreground">
                {filteredStaff.length} staff members • Health monitoring & compliance
              </p>
            </div>
          </div>
          <Button onClick={() => setIsNewRecordOpen(true)} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Staff Record
          </Button>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, role, or staff ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="physician">Physician</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <Card key={staff.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-border/50 bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-sm cursor-pointer">
            <CardContent className="p-6">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-600 font-semibold">
                      {staff.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 transition-colors duration-200 truncate">
                      {staff.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">{staff.staffId}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{staff.age}y</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getHealthStatusColor(staff.healthStatus)} text-xs font-medium px-2 py-1`}>
                    {staff.healthStatus}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Building className="h-3 w-3 mr-1" />
                    Staff
                  </Badge>
                </div>
              </div>

              {/* Role and Department */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-foreground">{staff.role}</span>
                </div>
              </div>

              {/* Health Summary */}
              <div className="mb-4">
                <h5 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Health Summary</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-muted-foreground">Blood Type</span>
                    <p className="text-sm font-medium text-foreground">{staff.bloodType}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">BMI</span>
                    <p className="text-sm font-medium text-foreground">{staff.bmi}</p>
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              <div className="mb-4">
                <h5 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  Current Vitals
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/20 p-2 rounded text-center">
                    <Thermometer className="h-3 w-3 mx-auto mb-1 text-orange-500" />
                    <p className="text-xs font-medium">{staff.temperature}</p>
                    <p className="text-xs text-muted-foreground">Temp</p>
                  </div>
                  <div className="bg-muted/20 p-2 rounded text-center">
                    <Heart className="h-3 w-3 mx-auto mb-1 text-red-500" />
                    <p className="text-xs font-medium">{staff.bloodPressure}</p>
                    <p className="text-xs text-muted-foreground">BP</p>
                  </div>
                </div>
              </div>

              {/* Checkup Info */}
              <div className="mb-4">
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Last Checkup</span>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {staff.lastCheckup}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Next Due</span>
                    <p className="text-sm font-medium text-foreground">{staff.nextCheckup}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleViewRecord(staff)}
                  className="flex-1 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Record
                </Button>
                <Button size="sm" variant="ghost" className="shrink-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results State */}
      {filteredStaff.length === 0 && (
        <Card className="border-dashed border-2 border-border/50">
          <CardContent className="text-center py-12">
            <UserCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No staff records found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || filterRole !== "all"
                ? "Try adjusting your search criteria or filters."
                : "No staff medical records have been added yet."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <ViewRecordsDialog
        open={isViewRecordsOpen}
        onOpenChange={setIsViewRecordsOpen}
        patientName={selectedStaff?.name || ""}
        records={[]}
      />

      <NewRecordDialog
        open={isNewRecordOpen}
        onOpenChange={setIsNewRecordOpen}
      />
    </div>
  );
};