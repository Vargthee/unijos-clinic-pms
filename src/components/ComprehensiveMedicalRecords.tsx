import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  UserCheck, 
  Search,
  Filter,
  Calendar,
  User,
  Stethoscope,
  Heart,
  Activity,
  Thermometer,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { NewRecordDialog } from "./NewRecordDialog";
import { ViewRecordsDialog } from "./ViewRecordsDialog";

// Enhanced student medical records with age in vitals and accurate conditions
const medicalRecords = [
  {
    id: "R001",
    name: "Adaora Okonkwo",
    patientId: "P001234",
    age: 20,
    matricNumber: "UJ/2022/ENG/0234",
    recordType: "Treatment",
    diagnosis: "Uncomplicated malaria (P. falciparum)",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-05",
    medications: ["Artemether-Lumefantrine (Coartem)", "Paracetamol 500mg", "ORS sachets"],
    notes: "20-year-old female with uncomplicated malaria. Rapid diagnostic test positive for P. falciparum. Good response to ACT. Counseled on ITN use and prevention.",
    vitals: {
      age: "20 years",
      temperature: "39.2°C",
      bloodPressure: "110/70 mmHg",
      pulse: "88 bpm",
      weight: "58 kg",
      height: "165 cm",
      respiratoryRate: "20/min",
      oxygenSaturation: "97%"
    },
    faculty: "Engineering",
    level: "200L",
    severity: "Moderate"
  },
  {
    id: "R002",
    name: "Ibrahim Musa",
    patientId: "P001235",
    age: 22,
    matricNumber: "UJ/2020/MED/0456",
    recordType: "Emergency",
    diagnosis: "Sickle cell disease - vaso-occlusive crisis",
    doctor: "Dr. John Okafor",
    date: "2024-06-07",
    medications: ["Morphine 10mg IV", "Hydroxyurea 500mg", "Folic acid 5mg", "Normal saline IV", "Oxygen therapy"],
    notes: "22-year-old male with known SCD presenting with severe bone pain crisis. Managed with analgesics, hydration, and oxygen. Pain score reduced from 9/10 to 4/10.",
    vitals: {
      age: "22 years",
      temperature: "37.8°C",
      bloodPressure: "130/85 mmHg",
      pulse: "110 bpm",
      weight: "72 kg",
      height: "178 cm",
      respiratoryRate: "22/min",
      oxygenSaturation: "94% (on room air)"
    },
    faculty: "Medicine",
    level: "400L",
    severity: "High"
  },
  {
    id: "R003",
    name: "Blessing Eze",
    patientId: "P001236",
    age: 18,
    matricNumber: "UJ/2023/SSC/0123",
    recordType: "Treatment",
    diagnosis: "Gastroenteritis (acute)",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-06-08",
    medications: ["ORS sachets", "Loperamide 2mg", "Probiotics", "Zinc supplements"],
    notes: "18-year-old female with acute gastroenteritis. Likely food-borne illness. Well hydrated, no signs of severe dehydration. Dietary advice given.",
    vitals: {
      age: "18 years",
      temperature: "36.8°C",
      bloodPressure: "115/75 mmHg",
      pulse: "78 bpm",
      weight: "55 kg",
      height: "162 cm",
      respiratoryRate: "18/min",
      oxygenSaturation: "99%"
    },
    faculty: "Social Sciences",
    level: "100L",
    severity: "Low"
  },
  {
    id: "R004",
    name: "Yusuf Abdullahi",
    patientId: "P001237",
    age: 21,
    matricNumber: "UJ/2021/NSC/0789",
    recordType: "Emergency",
    diagnosis: "Acute asthma exacerbation",
    doctor: "Dr. Grace Musa",
    date: "2024-06-09",
    medications: ["Salbutamol nebulizer", "Prednisolone 40mg", "Ipratropium bromide", "Peak flow meter"],
    notes: "21-year-old male with acute asthma exacerbation triggered by dust exposure. Peak flow 40% of predicted. Good response to bronchodilators. Asthma action plan reviewed.",
    vitals: {
      age: "21 years",
      temperature: "36.9°C",
      bloodPressure: "125/80 mmHg",
      pulse: "95 bpm",
      weight: "68 kg",
      height: "175 cm",
      respiratoryRate: "28/min",
      oxygenSaturation: "92% (improved to 97% post-treatment)"
    },
    faculty: "Natural Sciences",
    level: "300L",
    severity: "Moderate"
  },
  {
    id: "R005",
    name: "Fatima Aliyu",
    patientId: "P001238",
    age: 23,
    matricNumber: "UJ/2019/LAW/0345",
    recordType: "Treatment",
    diagnosis: "Iron deficiency anemia",
    doctor: "Dr. Hauwa Ibrahim",
    date: "2024-06-06",
    medications: ["Ferrous sulfate 200mg", "Vitamin C 500mg", "Folic acid 5mg", "Tranexamic acid"],
    notes: "23-year-old female with iron deficiency anemia (Hb: 7.8g/dL). Associated with menorrhagia. Iron supplementation started. Gynecological consultation arranged.",
    vitals: {
      age: "23 years",
      temperature: "36.5°C",
      bloodPressure: "100/65 mmHg",
      pulse: "105 bpm",
      weight: "62 kg",
      height: "168 cm",
      respiratoryRate: "20/min",
      oxygenSaturation: "98%"
    },
    faculty: "Law",
    level: "500L",
    severity: "Moderate"
  }
];

// Enhanced staff medical records
const staffMedicalRecords = [
  {
    id: "SMR001",
    staffId: "S001",
    name: "Dr. Hauwa Abdullahi",
    age: 45,
    role: "Registrar",
    department: "Academic Registry",
    unit: "Student Records",
    recordType: "Treatment",
    diagnosis: "Hypertension (essential) - well controlled",
    doctor: "Dr. Samuel Dung",
    date: "2024-05-20",
    medications: ["Lisinopril 10mg", "Amlodipine 5mg", "Lifestyle modifications"],
    notes: "45-year-old female with well-controlled essential hypertension. Regular monitoring shows good BP control. Lifestyle modifications effective.",
    vitals: {
      age: "45 years",
      temperature: "36.7°C",
      bloodPressure: "125/82 mmHg",
      pulse: "75 bpm",
      weight: "62 kg",
      height: "164 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%"
    },
    bloodType: "O+",
    allergies: ["None known"],
    severity: "Low"
  },
  {
    id: "SMR002",
    staffId: "S002",
    name: "Mr. James Dung",
    age: 52,
    role: "Chief Librarian",
    department: "Library Services",
    unit: "Main Library",
    recordType: "Follow-up",
    diagnosis: "Type 2 diabetes mellitus - well controlled",
    doctor: "Dr. Grace Musa",
    date: "2024-04-15",
    medications: ["Metformin 500mg BD", "Glimepiride 2mg", "Dietary counseling"],
    notes: "52-year-old male with well-controlled T2DM. HbA1c: 6.8%. Good compliance with medications and diet. Regular monitoring continues.",
    vitals: {
      age: "52 years",
      temperature: "36.8°C",
      bloodPressure: "130/85 mmHg",
      pulse: "72 bpm",
      weight: "75 kg",
      height: "176 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "97%"
    },
    bloodType: "A+",
    allergies: ["None known"],
    severity: "Low"
  }
];

const getRecordTypeColor = (type: string) => {
  switch (type) {
    case "Consultation":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800";
    case "Treatment":
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800";
    case "Emergency":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800";
    case "Follow-up":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Low":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
    case "Moderate":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
    case "High":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700";
  }
};

export const ComprehensiveMedicalRecords = () => {
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; patientId: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const handleViewRecord = (record: any, isStaff: boolean) => {
    setSelectedPatient({
      name: record.name,
      patientId: isStaff ? record.staffId : record.patientId
    });
    setIsViewRecordsOpen(true);
  };

  const RecordCard = ({ record, isStaff = false }) => {
    const filteredBySearch = searchQuery === "" || 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isStaff ? record.staffId : record.patientId).toLowerCase().includes(searchQuery.toLowerCase());

    const filteredByDepartment = selectedDepartment === "all" || 
      record.department === selectedDepartment ||
      record.faculty === selectedDepartment;

    if (!filteredBySearch || !filteredByDepartment) return null;

    return (
      <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-sm bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm overflow-hidden">
        {/* Status Bar */}
        <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/30"></div>
        
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                {isStaff ? (
                  <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                  {record.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {isStaff ? record.staffId : record.patientId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge className={`text-xs px-2 py-1 border ${getRecordTypeColor(record.recordType)}`}>
                {record.recordType}
              </Badge>
              <Badge className={`text-xs px-2 py-1 border ${getSeverityColor(record.severity)}`}>
                {record.severity}
              </Badge>
            </div>
          </div>

          {/* Patient/Staff Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{record.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground truncate">{record.doctor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isStaff ? (
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-muted-foreground truncate">
                  {isStaff ? record.department : record.faculty}
                </span>
              </div>
              {!isStaff && (
                <Badge variant="secondary" className="text-xs">
                  {record.level}
                </Badge>
              )}
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Diagnosis</span>
            </div>
            <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
          </div>

          {/* Vital Signs Preview */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded text-center">
              <Thermometer className="h-3 w-3 text-red-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-red-700 dark:text-red-300">{record.vitals.temperature}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded text-center">
              <Activity className="h-3 w-3 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-blue-700 dark:text-blue-300">{record.vitals.bloodPressure}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded text-center">
              <Heart className="h-3 w-3 text-green-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-green-700 dark:text-green-300">{record.vitals.pulse}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded text-center">
              <User className="h-3 w-3 text-purple-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-purple-700 dark:text-purple-300">{record.vitals.age}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleViewRecord(record, isStaff)}
              className="flex-1 h-9 border-border/50 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 px-3 border-border/50 hover:bg-accent/50"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const departments = [...new Set([
    ...medicalRecords.map(r => r.faculty),
    ...staffMedicalRecords.map(r => r.department)
  ])];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">Comprehensive health records system</p>
        </div>
        <Button 
          className="btn-primary shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => setIsNewRecordOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Record
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
                placeholder="Search records by name, diagnosis, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px] h-11 bg-background/50 border-border/50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
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
              <Button variant="outline" className="h-11 px-4 border-border/50 hover:bg-accent/50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/30 dark:bg-muted/20">
          <TabsTrigger value="students" className="h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <GraduationCap className="h-4 w-4 mr-2" />
            Student Records
          </TabsTrigger>
          <TabsTrigger value="staff" className="h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Briefcase className="h-4 w-4 mr-2" />
            Staff Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {medicalRecords.map((record, index) => (
              <div key={record.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <RecordCard record={record} isStaff={false} />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="staff" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {staffMedicalRecords.map((record, index) => (
              <div key={record.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <RecordCard record={record} isStaff={true} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <NewRecordDialog 
        open={isNewRecordOpen} 
        onOpenChange={setIsNewRecordOpen} 
      />

      <ViewRecordsDialog
        open={isViewRecordsOpen}
        onOpenChange={setIsViewRecordsOpen}
        patientName={selectedPatient?.name || ""}
        patientId={selectedPatient?.patientId || ""}
      />
    </div>
  );
};