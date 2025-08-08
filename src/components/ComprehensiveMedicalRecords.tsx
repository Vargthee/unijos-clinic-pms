import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Download, Eye, UserCheck } from "lucide-react";
import { NewRecordDialog } from "./NewRecordDialog";
import { ViewRecordsDialog } from "./ViewRecordsDialog";

// Consistent patient medical records
const medicalRecords = [
  {
    id: "R001",
    name: "Adaora Okonkwo",
    patientId: "P001234",
    age: 34,
    matricNumber: "UJ/2022/ENG/0234",
    recordType: "Treatment",
    diagnosis: "Uncomplicated malaria (P. falciparum)",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-05",
    medications: ["Artemether-Lumefantrine (Coartem)", "Paracetamol 500mg", "ORS sachets"],
    notes: "34-year-old female with uncomplicated malaria. Rapid diagnostic test positive for P. falciparum. Good response to ACT.",
    vitals: {
      age: "34 years",
      temperature: "39.2°C",
      bloodPressure: "110/70 mmHg",
      pulse: "88 bpm",
      weight: "58 kg",
      height: "165 cm",
      respiratoryRate: "20/min",
      oxygenSaturation: "97%"
    },
    faculty: "Engineering",
    level: "200L"
  },
  {
    id: "R003",
    name: "Blessing Eze",
    patientId: "P001236",
    age: 32,
    matricNumber: "UJ/2023/SSC/0123",
    recordType: "Treatment",
    diagnosis: "Gastroenteritis (acute)",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-06-08",
    medications: ["ORS sachets", "Loperamide 2mg", "Probiotics", "Zinc supplements"],
    notes: "32-year-old female with acute gastroenteritis. Likely food-borne illness. Well hydrated, no signs of severe dehydration.",
    vitals: {
      age: "32 years",
      temperature: "36.8°C",
      bloodPressure: "115/75 mmHg",
      pulse: "78 bpm",
      weight: "55 kg",
      height: "162 cm",
      respiratoryRate: "18/min",
      oxygenSaturation: "99%"
    },
    faculty: "Social Sciences",
    level: "100L"
  },
  {
    id: "R004",
    name: "Yusuf Abdullahi",
    patientId: "P001237",
    age: 36,
    matricNumber: "UJ/2021/NSC/0789",
    recordType: "Emergency",
    diagnosis: "Acute asthma exacerbation",
    doctor: "Dr. Grace Musa",
    date: "2024-06-09",
    medications: ["Salbutamol nebulizer", "Prednisolone 40mg", "Ipratropium bromide", "Peak flow meter"],
    notes: "36-year-old male with acute asthma exacerbation triggered by dust exposure. Peak flow 40% of predicted.",
    vitals: {
      age: "36 years",
      temperature: "36.9°C",
      bloodPressure: "125/80 mmHg",
      pulse: "95 bpm",
      weight: "68 kg",
      height: "175 cm",
      respiratoryRate: "28/min",
      oxygenSaturation: "92% (improved to 97% post-treatment)"
    },
    faculty: "Natural Sciences",
    level: "300L"
  }
];

const getRecordTypeColor = (type: string) => {
  switch (type) {
    case "Consultation":
      return "bg-blue-100 text-blue-800";
    case "Treatment":
      return "bg-green-100 text-green-800";
    case "Emergency":
      return "bg-red-100 text-red-800";
    case "Follow-up":
      return "bg-purple-100 text-purple-800";
    case "Counseling":
      return "bg-orange-100 text-orange-800";
    case "Vaccination":
      return "bg-indigo-100 text-indigo-800";
    case "Annual Checkup":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ComprehensiveMedicalRecords = () => {
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; patientId: string } | null>(null);

  const handleViewRecord = (record: any) => {
    setSelectedPatient({
      name: record.name,
      patientId: record.patientId
    });
    setIsViewRecordsOpen(true);
  };

  const RecordCard = ({ record }: { record: any }) => (
    <Card key={record.id} className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="truncate">{record.name}</span>
              <span className="hidden sm:inline">- {record.patientId}</span>
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getRecordTypeColor(record.recordType)}`}>
                {record.recordType}
              </span>
              <span className="text-sm text-muted-foreground">{record.date}</span>
              <span className="text-sm text-muted-foreground">{record.doctor}</span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                {record.faculty} - {record.level}
              </span>
              <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                {record.matricNumber}
              </span>
            </div>
          </div>
          <div className="flex gap-2 ml-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9"
              onClick={() => handleViewRecord(record)}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">View</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Diagnosis & Treatment</h4>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Diagnosis:</span> {record.diagnosis}</p>
              <p className="text-sm"><span className="font-medium">Medications:</span></p>
              <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                {record.medications.map((med: string, index: number) => (
                  <li key={index}>{med}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">Vital Signs</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted p-2 rounded">
                <p className="font-medium">Temperature</p>
                <p className="text-muted-foreground">{record.vitals.temperature}</p>
              </div>
              <div className="bg-muted p-2 rounded">
                <p className="font-medium">Blood Pressure</p>
                <p className="text-muted-foreground">{record.vitals.bloodPressure}</p>
              </div>
              <div className="bg-muted p-2 rounded">
                <p className="font-medium">Pulse</p>
                <p className="text-muted-foreground">{record.vitals.pulse}</p>
              </div>
              <div className="bg-muted p-2 rounded">
                <p className="font-medium">Weight</p>
                <p className="text-muted-foreground">{record.vitals.weight}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-semibold text-foreground mb-2">Clinical Notes</h4>
          <p className="text-muted-foreground text-sm bg-muted p-3 rounded">{record.notes}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Medical Records</h2>
              <p className="text-muted-foreground">University of Jos Health Records System</p>
            </div>
          </div>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
          onClick={() => setIsNewRecordOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="students">Student Records</TabsTrigger>
          <TabsTrigger value="staff">All Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-4">
          {medicalRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-4">
          {medicalRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </TabsContent>
      </Tabs>

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

export default ComprehensiveMedicalRecords;