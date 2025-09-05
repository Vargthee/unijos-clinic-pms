import { memo, useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, User, Calendar, Stethoscope } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { getCachedData, createSearchIndex, searchWithIndex } from "@/utils/dataCache";

// Optimized lightweight medical records data structure
interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  type: 'Student' | 'Staff';
  lastVisit: string;
  status: string;
  department: string;
  faculty: string;
  attendingPhysician: string;
  bloodType: string;
}

// Generate sample records efficiently
const generateMedicalRecords = (): MedicalRecord[] => {
  return getCachedData('medicalRecords', () => [
    {
      id: "MR001",
      patientId: "P001234",
      patientName: "Adaora Okonkwo",
      type: "Student" as const,
      lastVisit: "2025-01-05",
      status: "Good",
      department: "Computer Engineering",
      faculty: "Engineering",
      attendingPhysician: "Dr. Fatima Aliyu",
      bloodType: "O+"
    },
    {
      id: "MR002",
      patientId: "P001236",
      patientName: "Blessing Eze",
      type: "Student" as const,
      lastVisit: "2025-01-08",
      status: "Good",
      department: "Psychology",
      faculty: "Social Sciences",
      attendingPhysician: "Dr. Aisha Mohammed",
      bloodType: "B+"
    },
    {
      id: "MR003",
      patientId: "P001237",
      patientName: "Yusuf Abdullahi",
      type: "Student" as const,
      lastVisit: "2025-01-09",
      status: "Good",
      department: "Computer Science",
      faculty: "Natural Sciences",
      attendingPhysician: "Dr. Grace Musa",
      bloodType: "AB+"
    },
    {
      id: "MR004",
      patientId: "USR001",
      patientName: "Dr. Hauwa Abdullahi",
      type: "Staff" as const,
      lastVisit: "2025-01-20",
      status: "Good",
      department: "Academic Registry",
      faculty: "Administration",
      attendingPhysician: "Dr. Fatima Aliyu",
      bloodType: "O+"
    }
  ]);
};

const MedicalRecordCard = memo(({ record }: { record: MedicalRecord }) => (
  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:scale-[1.01] will-change-transform">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              {record.patientName}
            </h3>
            <p className="text-sm text-muted-foreground">{record.patientId}</p>
          </div>
        </div>
        <Badge variant={record.type === 'Student' ? 'default' : 'secondary'}>
          {record.type}
        </Badge>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Department:</span>
          <span className="font-medium">{record.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Visit:</span>
          <span className="font-medium">{record.lastVisit}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <span className={`font-medium ${
            record.status === 'Good' ? 'text-green-600' :
            record.status === 'Stable' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {record.status}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
));

MedicalRecordCard.displayName = "MedicalRecordCard";

const OptimizedMedicalRecords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const records = generateMedicalRecords();
  
  const searchIndex = useMemo(() => {
    return getCachedData('medicalRecordsSearchIndex', () => 
      createSearchIndex(records, ['patientName', 'patientId', 'department', 'faculty', 'attendingPhysician'])
    );
  }, [records]);
  
  const filteredRecords = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return records;
    return searchWithIndex(records, searchIndex, debouncedSearchQuery);
  }, [records, searchIndex, debouncedSearchQuery]);

  return (
    <div className="space-y-6 will-change-scroll">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Medical Records</h2>
          <p className="text-muted-foreground">
            Overview of patient medical records
          </p>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 sm:w-80"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((record) => (
          <MedicalRecordCard key={record.id} record={record} />
        ))}
      </div>
      
      {filteredRecords.length === 0 && debouncedSearchQuery && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No medical records found</p>
        </div>
      )}
    </div>
  );
};

export default memo(OptimizedMedicalRecords);