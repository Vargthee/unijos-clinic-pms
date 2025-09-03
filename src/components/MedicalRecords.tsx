import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Download, Eye, UserCheck } from "lucide-react";
import { NewRecordDialog } from "./NewRecordDialog";
import { ViewRecordsDialog } from "./ViewRecordsDialog";

// 10 student medical records with diverse Nigerian medical conditions
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
    date: "2025-01-05",
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
    level: "200L"
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
    date: "2025-01-08",
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
    level: "100L"
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
    date: "2025-01-09",
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
    level: "300L"
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
    date: "2025-01-06",
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
    level: "500L"
  },
  {
    id: "R006",
    name: "Chidi Okafor",
    patientId: "P001239",
    age: 20,
    matricNumber: "UJ/2022/PHM/0567",
    recordType: "Follow-up",
    diagnosis: "Upper respiratory tract infection",
    doctor: "Dr. Samuel Dung",
    date: "2025-01-04",
    medications: ["Amoxicillin 500mg", "Loratadine 10mg", "Throat lozenges", "Steam inhalation"],
    notes: "20-year-old male with viral upper respiratory tract infection. Mild bacterial superinfection suspected. Symptomatic treatment with antibiotics for 5 days.",
    vitals: {
      age: "20 years",
      temperature: "36.7°C",
      bloodPressure: "120/78 mmHg",
      pulse: "76 bpm",
      weight: "66 kg",
      height: "172 cm",
      respiratoryRate: "18/min",
      oxygenSaturation: "98%"
    },
    faculty: "Pharmacy",
    level: "200L"
  },
  {
    id: "R007",
    name: "Amina Bello",
    patientId: "P001240",
    age: 19,
    matricNumber: "UJ/2023/EDU/0890",
    recordType: "Treatment",
    diagnosis: "Urinary tract infection (UTI)",
    doctor: "Dr. Mary Gyang",
    date: "2025-06-10",
    medications: ["Ciprofloxacin 500mg", "Cranberry extract", "Increased fluid intake", "Paracetamol for pain"],
    notes: "19-year-old female with uncomplicated UTI. Urine culture positive for E. coli. Sensitive to ciprofloxacin. Hygiene counseling and prevention strategies discussed.",
    vitals: {
      age: "19 years",
      temperature: "37.5°C",
      bloodPressure: "112/70 mmHg",
      pulse: "82 bpm",
      weight: "51 kg",
      height: "160 cm",
      respiratoryRate: "18/min",
      oxygenSaturation: "99%"
    },
    faculty: "Education",
    level: "100L"
  },
  {
    id: "R008",
    name: "David Pam",
    patientId: "P001241",
    age: 21,
    matricNumber: "UJ/2021/AGR/0456",
    recordType: "Emergency",
    diagnosis: "Acute appendicitis (post-operative)",
    doctor: "Dr. Peter Bulus",
    date: "2025-06-11",
    medications: ["Ceftriaxone 1g IV", "Metronidazole 500mg", "Tramadol 50mg", "IV fluids"],
    notes: "21-year-old male post-appendectomy (laparoscopic). Uncomplicated acute appendicitis. Post-operative recovery excellent. Wound healing well, no complications.",
    vitals: {
      age: "21 years",
      temperature: "37.2°C",
      bloodPressure: "118/75 mmHg",
      pulse: "85 bpm",
      weight: "74 kg",
      height: "180 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%"
    },
    faculty: "Agriculture",
    level: "300L"
  },
  {
    id: "R009",
    name: "Hauwa Mohammed",
    patientId: "P001242",
    age: 22,
    matricNumber: "UJ/2020/ENV/0123",
    recordType: "Follow-up",
    diagnosis: "Anxiety disorder (generalized)",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2025-06-12",
    medications: ["Sertraline 50mg", "Propranolol 10mg PRN", "Relaxation techniques", "Counseling sessions"],
    notes: "22-year-old female with generalized anxiety disorder. Academic stress-related. Good response to SSRI therapy. Regular counseling sessions scheduled.",
    vitals: {
      age: "22 years",
      temperature: "36.6°C",
      bloodPressure: "125/82 mmHg",
      pulse: "88 bpm",
      weight: "63 kg",
      height: "166 cm",
      respiratoryRate: "18/min",
      oxygenSaturation: "99%"
    },
    faculty: "Environmental Sciences",
    level: "400L"
  },
  {
    id: "R010",
    name: "Samuel Gyang",
    patientId: "P001243",
    age: 18,
    matricNumber: "UJ/2023/MSC/0789",
    recordType: "Treatment",
    diagnosis: "Allergic rhinitis (seasonal)",
    doctor: "Dr. Ruth Laven",
    date: "2025-06-13",
    medications: ["Loratadine 10mg", "Fluticasone nasal spray", "Saline nasal rinse", "Antihistamine eye drops"],
    notes: "18-year-old male with seasonal allergic rhinitis. Symptoms worsen during harmattan season. Good response to antihistamines and topical steroids.",
    vitals: {
      age: "18 years",
      temperature: "37.3°C",
      bloodPressure: "115/70 mmHg",
      pulse: "92 bpm",
      weight: "67 kg",
      height: "174 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%"
    },
    faculty: "Management Sciences",
    level: "100L"
  }
];

// 8 staff medical records with diverse conditions
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
    date: "2025-05-20",
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
    date: "2025-04-15",
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
  },
  {
    id: "SMR003",
    staffId: "S003",
    name: "Mrs. Grace Yakubu",
    age: 38,
    role: "Security Coordinator",
    department: "Security Services",
    unit: "Campus Security",
    recordType: "Treatment",
    diagnosis: "Musculoskeletal strain (occupational)",
    doctor: "Dr. Aisha Mohammed",
    date: "2025-06-01",
    medications: ["Ibuprofen 400mg", "Muscle relaxants", "Physiotherapy", "Ergonomic assessment"],
    notes: "38-year-old female with work-related musculoskeletal strain. Long hours of standing and walking. Physiotherapy and workplace modifications recommended.",
    vitals: {
      age: "38 years",
      temperature: "36.5°C",
      bloodPressure: "120/75 mmHg",
      pulse: "68 bpm",
      weight: "58 kg",
      height: "163 cm",
      respiratoryRate: "15/min",
      oxygenSaturation: "99%"
    },
    bloodType: "B+",
    allergies: ["None known"],
  },
  {
    id: "SMR004",
    staffId: "S004",
    name: "Engr. Emmanuel Bulus",
    age: 41,
    role: "ICT Director",
    department: "Information Technology",
    unit: "ICT Center",
    recordType: "Consultation",
    diagnosis: "Computer vision syndrome",
    doctor: "Dr. Peter Bulus",
    date: "2025-03-25",
    medications: ["Artificial tears", "Blue light glasses", "Eye exercises", "Screen break reminders"],
    notes: "41-year-old male with computer vision syndrome. Prolonged screen exposure causing eye strain, dry eyes, and headaches. Ergonomic adjustments recommended.",
    vitals: {
      age: "41 years",
      temperature: "36.9°C",
      bloodPressure: "122/78 mmHg",
      pulse: "85 bpm",
      weight: "65 kg",
      height: "171 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%"
    },
    bloodType: "AB+",
    allergies: ["None known"],
  },
  {
    id: "SMR005",
    staffId: "S005",
    name: "Mrs. Rebecca Gyang",
    age: 35,
    role: "Bursary Officer",
    department: "Bursary",
    unit: "Financial Services",
    recordType: "Treatment",
    diagnosis: "Migraine headaches",
    doctor: "Dr. Ruth Laven",
    date: "2025-05-05",
    medications: ["Sumatriptan 50mg", "Propranolol 40mg", "Lifestyle modifications", "Stress management"],
    notes: "35-year-old female with episodic migraine headaches. Work-related stress triggers identified. Good response to triptans. Preventive therapy initiated.",
    vitals: {
      age: "35 years",
      temperature: "36.8°C",
      bloodPressure: "125/80 mmHg",
      pulse: "78 bpm",
      weight: "68 kg",
      height: "167 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "99%"
    },
    bloodType: "O-",
    allergies: ["None known"],
  },
  {
    id: "SMR006",
    staffId: "S006",
    name: "Mr. Daniel Kwaghe",
    age: 48,
    role: "Estate Officer",
    department: "Estate Management",
    unit: "Facilities",
    recordType: "Treatment",
    diagnosis: "Lower back pain (mechanical)",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2025-04-20",
    medications: ["Diclofenac gel", "Paracetamol 1g", "Physiotherapy", "Core strengthening exercises"],
    notes: "48-year-old male with mechanical lower back pain. Work-related lifting and bending. Good response to physiotherapy and ergonomic modifications.",
    vitals: {
      age: "48 years",
      temperature: "36.6°C",
      bloodPressure: "132/85 mmHg",
      pulse: "76 bpm",
      weight: "82 kg",
      height: "177 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%"
    },
    bloodType: "A-",
    allergies: ["None known"],
  },
  {
    id: "SMR007",
    staffId: "S007",
    name: "Mrs. Maryam Umar",
    age: 42,
    role: "HR Director",
    department: "Human Resources",
    unit: "Staff Development",
    recordType: "Treatment",
    diagnosis: "Peptic ulcer disease (H. pylori positive)",
    doctor: "Dr. Mary Gyang",
    date: "2025-05-30",
    medications: ["Omeprazole 20mg", "Clarithromycin 500mg", "Amoxicillin 1g", "Probiotics"],
    notes: "42-year-old female with H. pylori positive peptic ulcer. Triple therapy initiated. Stress management and dietary modifications advised.",
    vitals: {
      age: "42 years",
      temperature: "36.7°C",
      bloodPressure: "118/74 mmHg",
      pulse: "72 bpm",
      weight: "59 kg",
      height: "165 cm",
      respiratoryRate: "15/min",
      oxygenSaturation: "99%"
    },
    bloodType: "B-",
    allergies: ["None known"],
  },
  {
    id: "SMR008",
    staffId: "S008",
    name: "Dr. Samuel Dung",
    age: 55,
    role: "Chief Medical Officer",
    department: "Medical Center",
    unit: "Emergency Medicine",
    recordType: "Follow-up",
    diagnosis: "Benign prostatic hyperplasia (BPH)",
    doctor: "Dr. Fatima Aliyu",
    date: "2025-06-15",
    medications: ["Tamsulosin 0.4mg", "Finasteride 5mg", "Regular monitoring"],
    notes: "55-year-old male with benign prostatic hyperplasia. Mild to moderate urinary symptoms. Good response to alpha-blockers. PSA levels normal.",
    vitals: {
      age: "55 years",
      temperature: "36.8°C",
      bloodPressure: "138/92 mmHg",
      pulse: "75 bpm",
      weight: "78 kg",
      height: "175 cm",
      respiratoryRate: "16/min",
      oxygenSaturation: "97%"
    },
    bloodType: "A+",
    allergies: ["None known"],
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

export const MedicalRecords = () => {
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isViewRecordsOpen, setIsViewRecordsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; patientId: string } | null>(null);

  const handleViewRecord = (record: any, isStaff: boolean) => {
    setSelectedPatient({
      name: record.name,
      patientId: isStaff ? record.staffId : record.patientId
    });
    setIsViewRecordsOpen(true);
  };

  const RecordCard = ({ record, isStaff = false }) => (
    <Card key={record.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              {isStaff ? <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" /> : <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />}
              <span className="truncate">{record.name}</span>
              {!isStaff && <span className="hidden sm:inline">- {record.patientId}</span>}
              {isStaff && <span className="hidden sm:inline">- {record.staffId}</span>}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getRecordTypeColor(record.recordType)}`}>
                {record.recordType}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">{record.date}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{record.doctor}</span>
              {!isStaff && (
                <>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {record.faculty} - {record.level}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                    {record.matricNumber}
                  </span>
                </>
              )}
              {isStaff && (
                <>
                  <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded">
                    {record.department}
                  </span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded">
                    {record.unit}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 ml-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
              onClick={() => handleViewRecord(record, isStaff)}
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline ml-1">View</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline ml-1">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Diagnosis & Treatment</h4>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Diagnosis:</span> {record.diagnosis}</p>
              <p className="text-sm"><span className="font-medium">Medications:</span></p>
              <ul className="list-disc list-inside ml-4 text-xs sm:text-sm text-muted-foreground space-y-1">
                {record.medications.map((med, index) => (
                  <li key={index}>{med}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Vital Signs</h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
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
          <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Clinical Notes</h4>
          <p className="text-muted-foreground text-xs sm:text-sm bg-muted p-3 rounded">{record.notes}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/placeholder.svg" 
              alt="University of Jos Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Medical Records</h2>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">University of Jos Health Records System</p>
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
        <TabsList className="grid w-full grid-cols-2 mb-4 h-10 p-1 bg-muted rounded-lg">
          <TabsTrigger 
            value="students" 
            className="text-sm font-medium px-3 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
          >
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Student Records</span>
            <span className="sm:hidden">Students</span>
          </TabsTrigger>
          <TabsTrigger 
            value="staff" 
            className="text-sm font-medium px-3 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Staff Records</span>
            <span className="sm:hidden">Staff</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-3 sm:space-y-4">
          {medicalRecords.map((record) => (
            <RecordCard key={record.id} record={record} isStaff={false} />
          ))}
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-3 sm:space-y-4">
          {staffMedicalRecords.map((record) => (
            <RecordCard key={record.id} record={record} isStaff={true} />
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
