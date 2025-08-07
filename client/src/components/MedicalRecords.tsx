import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Clock,
  ChevronRight,
  FileX,
  Users,
  GraduationCap,
  Shield,
  AlertTriangle,
  TrendingUp,
  Thermometer
} from "lucide-react";
import { NewRecordDialog } from "./NewRecordDialog";
import { ViewRecordsDialog } from "./ViewRecordsDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Enhanced medical records with better organization
const medicalRecords = [
  {
    id: "R001",
    name: "Adaora Okonkwo",
    patientId: "P001234",
    age: 20,
    matricNumber: "UJ/2022/ENG/0234",
    recordType: "Emergency",
    diagnosis: "Severe malaria with complications",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-05",
    priority: "High",
    status: "Active",
    medications: ["Artemether-Lumefantrine", "IV Fluids", "Paracetamol"],
    notes: "Patient responded well to treatment. Fever subsided after 48 hours.",
    vitals: {
      temperature: "39.2°C",
      bloodPressure: "110/70 mmHg",
      pulse: "88 bpm",
      weight: "58 kg"
    },
    faculty: "Engineering",
    level: "200L",
    lastUpdated: "2 hours ago"
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
    priority: "Medium",
    status: "Recovering",
    medications: ["ORS sachets", "Probiotics", "Zinc supplements"],
    notes: "Symptoms improving. Continue hydration therapy.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "115/75 mmHg",
      pulse: "78 bpm",
      weight: "55 kg"
    },
    faculty: "Social Sciences",
    level: "100L",
    lastUpdated: "1 day ago"
  },
  {
    id: "R004",
    name: "Yusuf Abdullahi",
    patientId: "P001237",
    age: 21,
    matricNumber: "UJ/2021/NSC/0789",
    recordType: "Follow-up",
    diagnosis: "Asthma management",
    doctor: "Dr. Grace Musa",
    date: "2024-06-09",
    priority: "Medium",
    status: "Stable",
    medications: ["Salbutamol inhaler", "Prednisolone"],
    notes: "Peak flow improved. Continue current medication regimen.",
    vitals: {
      temperature: "36.9°C",
      bloodPressure: "125/80 mmHg",
      pulse: "95 bpm",
      weight: "68 kg"
    },
    faculty: "Natural Sciences",
    level: "300L",
    lastUpdated: "3 days ago"
  }
];

const staffMedicalRecords = [
  {
    id: "SMR001",
    staffId: "S001",
    name: "Dr. Hauwa Abdullahi",
    age: 45,
    role: "Registrar",
    department: "Academic Registry",
    recordType: "Check-up",
    diagnosis: "Annual health screening - normal",
    doctor: "Dr. Samuel Dung",
    date: "2024-05-20",
    priority: "Low",
    status: "Completed",
    medications: ["Multivitamins", "Calcium supplements"],
    notes: "All health parameters within normal limits.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "125/80 mmHg",
      pulse: "75 bpm",
      weight: "62 kg"
    },
    lastUpdated: "1 week ago"
  }
];

const getRecordTypeColor = (type: string) => {
  const colors = {
    "Consultation": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    "Treatment": "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
    "Emergency": "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
    "Follow-up": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
    "Check-up": "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
    "Counseling": "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800"
  };
  return colors[type] || "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
};

const getPriorityColor = (priority: string) => {
  const colors = {
    "High": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    "Medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "Low": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  };
  return colors[priority] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
};

const getStatusColor = (status: string) => {
  const colors = {
    "Active": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Recovering": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "Stable": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "Completed": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  };
  return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
};

export const MedicalRecords = () => {
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; patientId: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const handleViewRecord = (record: any, isStaff: boolean) => {
    setSelectedPatient({
      name: record.name,
      patientId: isStaff ? record.staffId : record.patientId
    });
    setIsViewRecordsOpen(true);
  };

  const filterRecords = (records: any[]) => {
    return records.filter(record => {
      const matchesSearch = !searchQuery || 
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === "all" || record.recordType === filterType;
      const matchesPriority = filterPriority === "all" || record.priority === filterPriority;
      
      return matchesSearch && matchesType && matchesPriority;
    });
  };

  const RecordCard = ({ record, isStaff = false }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-border/50 bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-sm">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                {record.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                {record.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">
                  {isStaff ? record.staffId : record.patientId}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {record.age}y
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge className={`${getPriorityColor(record.priority)} text-xs font-medium px-2 py-1`}>
              {record.priority}
            </Badge>
            <span className="text-xs text-muted-foreground">{record.lastUpdated}</span>
          </div>
        </div>

        {/* Record Type and Status */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className={`${getRecordTypeColor(record.recordType)} text-xs font-medium`}>
            {record.recordType}
          </Badge>
          <Badge className={`${getStatusColor(record.status)} text-xs font-medium`}>
            {record.status}
          </Badge>
          {isStaff && (
            <Badge variant="secondary" className="text-xs">
              <UserCheck className="h-3 w-3 mr-1" />
              Staff
            </Badge>
          )}
          {!isStaff && (
            <Badge variant="secondary" className="text-xs">
              <GraduationCap className="h-3 w-3 mr-1" />
              Student
            </Badge>
          )}
        </div>

        {/* Diagnosis */}
        <div className="mb-4">
          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-primary" />
            Diagnosis
          </h4>
          <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            {record.diagnosis}
          </p>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Doctor</h5>
            <p className="text-sm font-medium text-foreground">{record.doctor}</p>
          </div>
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Date</h5>
            <p className="text-sm font-medium text-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              {record.date}
            </p>
          </div>
          {!isStaff && (
            <>
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Faculty</h5>
                <p className="text-sm font-medium text-foreground">{record.faculty}</p>
              </div>
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Level</h5>
                <p className="text-sm font-medium text-foreground">{record.level}</p>
              </div>
            </>
          )}
          {isStaff && (
            <>
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Role</h5>
                <p className="text-sm font-medium text-foreground">{record.role}</p>
              </div>
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Department</h5>
                <p className="text-sm font-medium text-foreground">{record.department}</p>
              </div>
            </>
          )}
        </div>

        {/* Vital Signs */}
        {record.vitals && (
          <div className="mb-4">
            <h5 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Vital Signs
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-muted/20 p-2 rounded text-center">
                <Thermometer className="h-3 w-3 mx-auto mb-1 text-orange-500" />
                <p className="text-xs font-medium">{record.vitals.temperature}</p>
                <p className="text-xs text-muted-foreground">Temp</p>
              </div>
              <div className="bg-muted/20 p-2 rounded text-center">
                <Heart className="h-3 w-3 mx-auto mb-1 text-red-500" />
                <p className="text-xs font-medium">{record.vitals.bloodPressure}</p>
                <p className="text-xs text-muted-foreground">BP</p>
              </div>
              <div className="bg-muted/20 p-2 rounded text-center">
                <Activity className="h-3 w-3 mx-auto mb-1 text-blue-500" />
                <p className="text-xs font-medium">{record.vitals.pulse}</p>
                <p className="text-xs text-muted-foreground">Pulse</p>
              </div>
              <div className="bg-muted/20 p-2 rounded text-center">
                <User className="h-3 w-3 mx-auto mb-1 text-green-500" />
                <p className="text-xs font-medium">{record.vitals.weight}</p>
                <p className="text-xs text-muted-foreground">Weight</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleViewRecord(record, isStaff)}
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button size="sm" variant="ghost" className="shrink-0">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const filteredStudentRecords = filterRecords(medicalRecords);
  const filteredStaffRecords = filterRecords(staffMedicalRecords);
  const totalRecords = filteredStudentRecords.length + filteredStaffRecords.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Medical Records Overview
              </h1>
              <p className="text-muted-foreground">
                {totalRecords} records found • Both students and staff
              </p>
            </div>
          </div>
          <Button onClick={() => setIsNewRecordOpen(true)} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, diagnosis, or doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Treatment">Treatment</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Records Display */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Records ({totalRecords})
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Students ({filteredStudentRecords.length})
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Staff ({filteredStaffRecords.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6">
            {/* Student Records Section */}
            {filteredStudentRecords.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Student Records</h2>
                  <Badge variant="secondary">{filteredStudentRecords.length}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredStudentRecords.map((record) => (
                    <RecordCard key={record.id} record={record} isStaff={false} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Staff Records Section */}
            {filteredStaffRecords.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Staff Records</h2>
                  <Badge variant="secondary">{filteredStaffRecords.length}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredStaffRecords.map((record) => (
                    <RecordCard key={record.id} record={record} isStaff={true} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          {filteredStudentRecords.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudentRecords.map((record) => (
                <RecordCard key={record.id} record={record} isStaff={false} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="text-center py-12">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No student records found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || filterType !== "all" || filterPriority !== "all"
                    ? "Try adjusting your search criteria or filters."
                    : "No student medical records have been added yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          {filteredStaffRecords.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStaffRecords.map((record) => (
                <RecordCard key={record.id} record={record} isStaff={true} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="text-center py-12">
                <UserCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No staff records found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || filterType !== "all" || filterPriority !== "all"
                    ? "Try adjusting your search criteria or filters."
                    : "No staff medical records have been added yet."}
                </p>
              </CardContent>
            </Card>
          )}
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
        records={[]}
      />
    </div>
  );
};
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-3 hover:scale-105 transition-transform duration-200"
                onClick={() => handleViewRecord(record, isStaff)}
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-3 hover:scale-105 transition-transform duration-200"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              Updated {record.lastUpdated}
            </span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={`${getRecordTypeColor(record.recordType)} border font-medium`}>
            {record.recordType}
          </Badge>
          {record.priority && (
            <Badge className={getPriorityColor(record.priority)}>
              {record.priority} Priority
            </Badge>
          )}
          {record.status && (
            <Badge className={getStatusColor(record.status)}>
              {record.status}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {new Date(record.date).toLocaleDateString()}
          </Badge>
        </div>

        {/* Academic/Professional Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {!isStaff ? (
            <>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Faculty</p>
                <p className="text-sm font-medium text-foreground">{record.faculty}</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Level</p>
                <p className="text-sm font-medium text-foreground">{record.level}</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Department</p>
                <p className="text-sm font-medium text-foreground">{record.department}</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Role</p>
                <p className="text-sm font-medium text-foreground">{record.role}</p>
              </div>
            </>
          )}
        </div>

        {/* Medical Information */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/10 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Diagnosis</h4>
            </div>
            <p className="text-blue-800 dark:text-blue-200 font-medium">{record.diagnosis}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Treated by {record.doctor}
            </p>
          </div>

          {/* Quick Vitals */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center border border-red-200/50 dark:border-red-800/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Activity className="h-3 w-3 text-red-600 dark:text-red-400" />
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">Temp</span>
              </div>
              <p className="text-sm font-bold text-red-800 dark:text-red-200">{record.vitals.temperature}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">BP</span>
              </div>
              <p className="text-sm font-bold text-blue-800 dark:text-blue-200">{record.vitals.bloodPressure}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center border border-green-200/50 dark:border-green-800/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Activity className="h-3 w-3 text-green-600 dark:text-green-400" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Pulse</span>
              </div>
              <p className="text-sm font-bold text-green-800 dark:text-green-200">{record.vitals.pulse}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center border border-purple-200/50 dark:border-purple-800/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <User className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Weight</span>
              </div>
              <p className="text-sm font-bold text-purple-800 dark:text-purple-200">{record.vitals.weight}</p>
            </div>
          </div>

          {/* Medications Preview */}
          <div className="bg-muted/20 p-3 rounded-lg">
            <h5 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Current Medications
            </h5>
            <div className="flex flex-wrap gap-1">
              {record.medications.slice(0, 3).map((med, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {med}
                </Badge>
              ))}
              {record.medications.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{record.medications.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button 
            variant="ghost" 
            className="w-full justify-between hover:bg-primary/5 group/btn"
            onClick={() => handleViewRecord(record, isStaff)}
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View Complete Record
            </span>
            <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const filteredStudentRecords = filterRecords(medicalRecords);
  const filteredStaffRecords = filterRecords(staffMedicalRecords);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Medical Records</h1>
              <p className="text-muted-foreground">Comprehensive health records management</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="hover:scale-105 transition-transform duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
            onClick={() => setIsNewRecordOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <Card className="border border-border/50 bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by patient name, diagnosis, or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-background/80 border-border/50 focus:border-primary/50 transition-all duration-200"
              />
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-11 bg-background/80 border-border/50">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Treatment">Treatment</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="h-11 bg-background/80 border-border/50">
                    <Activity className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High Priority</SelectItem>
                    <SelectItem value="Medium">Medium Priority</SelectItem>
                    <SelectItem value="Low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {(searchQuery || filterType !== "all" || filterPriority !== "all") && (
        <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg border border-border/30">
          <div className="text-sm text-muted-foreground">
            Showing {filteredStudentRecords.length + filteredStaffRecords.length} result(s)
            {searchQuery && ` for "${searchQuery}"`}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setFilterType("all");
              setFilterPriority("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Enhanced Tabs */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-muted/50">
          <TabsTrigger value="students" className="text-sm font-medium h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <User className="h-4 w-4 mr-2" />
            Student Records ({filteredStudentRecords.length})
          </TabsTrigger>
          <TabsTrigger value="staff" className="text-sm font-medium h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <UserCheck className="h-4 w-4 mr-2" />
            Staff Records ({filteredStaffRecords.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-4">
          {filteredStudentRecords.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudentRecords.map((record, index) => (
                <div 
                  key={record.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in"
                >
                  <RecordCard record={record} isStaff={false} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="text-center py-12">
                <FileX className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2 text-foreground">No student records found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || filterType !== "all" || filterPriority !== "all"
                    ? "Try adjusting your search criteria or filters."
                    : "No student medical records have been created yet."}
                </p>
                {(!searchQuery && filterType === "all" && filterPriority === "all") && (
                  <Button 
                    onClick={() => setIsNewRecordOpen(true)}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Record
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-4">
          {filteredStaffRecords.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStaffRecords.map((record, index) => (
                <div 
                  key={record.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in"
                >
                  <RecordCard record={record} isStaff={true} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="text-center py-12">
                <FileX className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2 text-foreground">No staff records found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || filterType !== "all" || filterPriority !== "all"
                    ? "Try adjusting your search criteria or filters."
                    : "No staff medical records have been created yet."}
                </p>
                {(!searchQuery && filterType === "all" && filterPriority === "all") && (
                  <Button 
                    onClick={() => setIsNewRecordOpen(true)}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Record
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{medicalRecords.length}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Student Records</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4 text-center">
            <UserCheck className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{staffMedicalRecords.length}</p>
            <p className="text-xs text-purple-600 dark:text-purple-400">Staff Records</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border-green-200 dark:border-green-800">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">
              {medicalRecords.filter(r => r.status === "Active").length}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">Active Cases</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600 dark:text-orange-400" />
            <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
              {medicalRecords.filter(r => r.recordType === "Emergency").length}
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400">Emergency Cases</p>
          </CardContent>
        </Card>
      </div>

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