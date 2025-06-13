import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Download, Eye, UserCheck } from "lucide-react";
import { NewRecordDialog } from "./NewRecordDialog";

// 12 student medical records with diverse Nigerian medical conditions
const medicalRecords = [
  {
    id: "R001",
    name: "Adaora Okonkwo",
    patientId: "P001234",
    matricNumber: "UJ/2022/ENG/0234",
    recordType: "Treatment",
    diagnosis: "Malaria fever with complications",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-05",
    medications: ["Artemether-Lumefantrine", "Paracetamol", "ORS"],
    notes: "Severe malaria with high parasitemia. Patient responded well to ACT treatment. Advised on prevention measures.",
    vitals: {
      temperature: "39.2°C",
      bloodPressure: "110/70 mmHg",
      pulse: "88 bpm",
      weight: "58 kg",
    },
    faculty: "Engineering",
    level: "200L"
  },
  {
    id: "R002",
    name: "Ibrahim Musa",
    patientId: "P001235",
    matricNumber: "UJ/2020/MED/0456",
    recordType: "Emergency",
    diagnosis: "Sickle cell crisis management",
    doctor: "Dr. John Okafor",
    date: "2024-06-07",
    medications: ["Morphine IV", "Hydroxyurea", "Folic acid", "IV fluids"],
    notes: "Severe vaso-occlusive crisis. Pain managed with opioids. Hydration and oxygen therapy provided.",
    vitals: {
      temperature: "37.8°C",
      bloodPressure: "130/85 mmHg",
      pulse: "110 bpm",
      weight: "72 kg",
    },
    faculty: "Medicine",
    level: "400L"
  },
  {
    id: "R003",
    name: "Blessing Eze",
    patientId: "P001236",
    matricNumber: "UJ/2023/SSC/0123",
    recordType: "Treatment",
    diagnosis: "Peptic ulcer disease",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-06-08",
    medications: ["Omeprazole", "Clarithromycin", "Amoxicillin"],
    notes: "H. pylori positive peptic ulcer. Triple therapy initiated. Patient advised on dietary modifications.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "115/75 mmHg",
      pulse: "78 bpm",
      weight: "55 kg",
    },
    faculty: "Social Sciences",
    level: "100L"
  },
  {
    id: "R004",
    name: "Yusuf Abdullahi",
    patientId: "P001237",
    matricNumber: "UJ/2021/NSC/0789",
    recordType: "Emergency",
    diagnosis: "Bronchial asthma exacerbation",
    doctor: "Dr. Grace Musa",
    date: "2024-06-09",
    medications: ["Salbutamol inhaler", "Prednisolone", "Montelukast"],
    notes: "Acute asthma attack triggered by harmattan dust. Emergency nebulization successful. Action plan reviewed.",
    vitals: {
      temperature: "36.9°C",
      bloodPressure: "125/80 mmHg",
      pulse: "95 bpm",
      weight: "68 kg",
    },
    faculty: "Natural Sciences",
    level: "300L"
  },
  {
    id: "R005",
    name: "Fatima Aliyu",
    patientId: "P001238",
    matricNumber: "UJ/2019/LAW/0345",
    recordType: "Treatment",
    diagnosis: "Iron deficiency anemia",
    doctor: "Dr. Hauwa Ibrahim",
    date: "2024-06-06",
    medications: ["Ferrous sulfate", "Vitamin C", "Folic acid"],
    notes: "Severe iron deficiency anemia due to heavy menstrual bleeding. Iron therapy started. Gynecological referral made.",
    vitals: {
      temperature: "36.5°C",
      bloodPressure: "100/65 mmHg",
      pulse: "105 bpm",
      weight: "62 kg",
    },
    faculty: "Law",
    level: "500L"
  },
  {
    id: "R006",
    name: "Chidi Okafor",
    patientId: "P001239",
    matricNumber: "UJ/2022/PHM/0567",
    recordType: "Follow-up",
    diagnosis: "Hepatitis B infection",
    doctor: "Dr. Samuel Dung",
    date: "2024-06-04",
    medications: ["Tenofovir", "Hepatoprotective drugs"],
    notes: "Chronic hepatitis B infection. Viral load monitored. Patient counseled on transmission prevention.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "120/78 mmHg",
      pulse: "76 bpm",
      weight: "66 kg",
    },
    faculty: "Pharmacy",
    level: "200L"
  },
  {
    id: "R007",
    name: "Amina Bello",
    patientId: "P001240",
    matricNumber: "UJ/2023/EDU/0890",
    recordType: "Treatment",
    diagnosis: "Urinary tract infection (UTI)",
    doctor: "Dr. Mary Gyang",
    date: "2024-06-10",
    medications: ["Ciprofloxacin", "Cranberry extract", "Increased fluid intake"],
    notes: "Recurrent UTI with E. coli bacteria. Antibiotic sensitivity test done. Hygiene education provided.",
    vitals: {
      temperature: "37.5°C",
      bloodPressure: "112/70 mmHg",
      pulse: "82 bpm",
      weight: "51 kg",
    },
    faculty: "Education",
    level: "100L"
  },
  {
    id: "R008",
    name: "David Pam",
    patientId: "P001241",
    matricNumber: "UJ/2021/AGR/0456",
    recordType: "Emergency",
    diagnosis: "Meningitis (recovering)",
    doctor: "Dr. Peter Bulus",
    date: "2024-06-11",
    medications: ["Ceftriaxone IV", "Dexamethasone", "Anticonvulsants"],
    notes: "Bacterial meningitis successfully treated. Neurological examination normal. Follow-up scheduled.",
    vitals: {
      temperature: "37.2°C",
      bloodPressure: "118/75 mmHg",
      pulse: "85 bpm",
      weight: "74 kg",
    },
    faculty: "Agriculture",
    level: "300L"
  },
  {
    id: "R009",
    name: "Hauwa Mohammed",
    patientId: "P001242",
    matricNumber: "UJ/2020/ENV/0123",
    recordType: "Follow-up",
    diagnosis: "Rheumatic heart disease",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2024-06-12",
    medications: ["Penicillin prophylaxis", "ACE inhibitors", "Diuretics"],
    notes: "Stable rheumatic heart disease. Echo shows mild mitral regurgitation. Regular cardiology follow-up needed.",
    vitals: {
      temperature: "36.6°C",
      bloodPressure: "125/82 mmHg",
      pulse: "88 bpm",
      weight: "63 kg",
    },
    faculty: "Environmental Sciences",
    level: "400L"
  },
  {
    id: "R010",
    name: "Samuel Gyang",
    patientId: "P001243",
    matricNumber: "UJ/2023/MSC/0789",
    recordType: "Treatment",
    diagnosis: "Tuberculosis (on treatment)",
    doctor: "Dr. Ruth Laven",
    date: "2024-06-13",
    medications: ["RHZE combination", "Pyridoxine", "DOT supervision"],
    notes: "Pulmonary tuberculosis on intensive phase. Sputum conversion expected. Contact tracing completed.",
    vitals: {
      temperature: "37.3°C",
      bloodPressure: "115/70 mmHg",
      pulse: "92 bpm",
      weight: "67 kg",
    },
    faculty: "Management Sciences",
    level: "100L"
  },
  {
    id: "R011",
    name: "Ruth Laven",
    patientId: "P001244",
    matricNumber: "UJ/2022/VET/0456",
    recordType: "Treatment",
    diagnosis: "Thyroid disorder (hyperthyroidism)",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-14",
    medications: ["Carbimazole", "Propranolol", "Thyroid monitoring"],
    notes: "Hyperthyroidism with enlarged thyroid gland. Anti-thyroid medication started. Regular monitoring required.",
    vitals: {
      temperature: "37.1°C",
      bloodPressure: "135/88 mmHg",
      pulse: "115 bpm",
      weight: "56 kg",
    },
    faculty: "Veterinary Medicine",
    level: "200L"
  },
  {
    id: "R012",
    name: "Emmanuel Yakubu",
    patientId: "P001245",
    matricNumber: "UJ/2021/ART/0234",
    recordType: "Follow-up",
    diagnosis: "Chronic kidney disease (early stage)",
    doctor: "Dr. John Okafor",
    date: "2024-06-15",
    medications: ["ACE inhibitors", "Calcium supplements", "Dietary restrictions"],
    notes: "Early stage CKD secondary to hypertension. Blood pressure control achieved. Nephrology referral made.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "140/90 mmHg",
      pulse: "78 bpm",
      weight: "64 kg",
    },
    faculty: "Arts",
    level: "300L"
  }
];

// 8 staff medical records with diverse conditions
const staffMedicalRecords = [
  {
    id: "SMR001",
    staffId: "S001",
    name: "Dr. Hauwa Abdullahi",
    role: "Registrar",
    department: "Academic Registry",
    unit: "Student Records",
    recordType: "Treatment",
    diagnosis: "Cervical spondylosis",
    doctor: "Dr. Samuel Dung",
    date: "2024-05-20",
    medications: ["NSAIDs", "Muscle relaxants", "Physiotherapy"],
    notes: "Work-related neck strain from prolonged computer use. Ergonomic workplace assessment recommended.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "128/85 mmHg",
      pulse: "75 bpm",
      weight: "62 kg",
    },
    bloodType: "O+",
    allergies: ["None known"],
  },
  {
    id: "SMR002",
    staffId: "S002",
    name: "Mr. James Dung",
    role: "Chief Librarian",
    department: "Library Services",
    unit: "Main Library",
    recordType: "Follow-up",
    diagnosis: "Benign prostatic hyperplasia",
    doctor: "Dr. Grace Musa",
    date: "2024-04-15",
    medications: ["Alpha blockers", "Saw palmetto", "Regular monitoring"],
    notes: "Enlarged prostate with mild urinary symptoms. Conservative management effective. PSA normal.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "135/88 mmHg",
      pulse: "72 bpm",
      weight: "75 kg",
    },
    bloodType: "A+",
    allergies: ["Dust mites"],
  },
  {
    id: "SMR003",
    staffId: "S003",
    name: "Mrs. Grace Yakubu",
    role: "Security Coordinator",
    department: "Security Services",
    unit: "Campus Security",
    recordType: "Treatment",
    diagnosis: "Fibromyalgia syndrome",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-06-01",
    medications: ["Pregabalin", "Duloxetine", "Exercise therapy"],
    notes: "Chronic widespread pain with tender points. Multidisciplinary approach initiated for pain management.",
    vitals: {
      temperature: "36.5°C",
      bloodPressure: "120/75 mmHg",
      pulse: "68 bpm",
      weight: "58 kg",
    },
    bloodType: "B+",
    allergies: ["None known"],
  },
  {
    id: "SMR004",
    staffId: "S004",
    name: "Engr. Emmanuel Bulus",
    role: "ICT Director",
    department: "Information Technology",
    unit: "ICT Center",
    recordType: "Consultation",
    diagnosis: "Chronic fatigue syndrome",
    doctor: "Dr. Peter Bulus",
    date: "2024-03-25",
    medications: ["Graded exercise therapy", "Sleep hygiene", "Stress management"],
    notes: "Persistent fatigue lasting over 6 months. No underlying organic cause found. Supportive management plan.",
    vitals: {
      temperature: "36.9°C",
      bloodPressure: "122/78 mmHg",
      pulse: "85 bpm",
      weight: "65 kg",
    },
    bloodType: "AB+",
    allergies: ["Chemical fumes"],
  },
  {
    id: "SMR005",
    staffId: "S005",
    name: "Mrs. Rebecca Gyang",
    role: "Bursary Officer",
    department: "Bursary",
    unit: "Financial Services",
    recordType: "Treatment",
    diagnosis: "Polycystic ovary syndrome (PCOS)",
    doctor: "Dr. Ruth Laven",
    date: "2024-05-05",
    medications: ["Metformin", "Oral contraceptives", "Lifestyle modification"],
    notes: "PCOS with irregular menstruation and insulin resistance. Hormonal therapy and weight management advised.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "125/80 mmHg",
      pulse: "78 bpm",
      weight: "68 kg",
    },
    bloodType: "O-",
    allergies: ["Sulfa drugs"],
  },
  {
    id: "SMR006",
    staffId: "S006",
    name: "Mr. Daniel Kwaghe",
    role: "Estate Officer",
    department: "Estate Management",
    unit: "Facilities",
    recordType: "Treatment",
    diagnosis: "Osteoarthritis of the knee",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2024-04-20",
    medications: ["Glucosamine", "NSAIDs", "Physiotherapy", "Weight management"],
    notes: "Degenerative joint disease affecting both knees. Conservative management with good response to therapy.",
    vitals: {
      temperature: "36.6°C",
      bloodPressure: "132/85 mmHg",
      pulse: "76 bpm",
      weight: "82 kg",
    },
    bloodType: "A-",
    allergies: ["Latex"],
  },
  {
    id: "SMR007",
    staffId: "S007",
    name: "Mrs. Maryam Umar",
    role: "HR Director",
    department: "Human Resources",
    unit: "Staff Development",
    recordType: "Treatment",
    diagnosis: "Gallbladder stones (cholelithiasis)",
    doctor: "Dr. Mary Gyang",
    date: "2024-05-30",
    medications: ["Ursodeoxycholic acid", "Dietary modification", "Pain management"],
    notes: "Multiple gallbladder stones detected on ultrasound. Conservative management trialed before surgical option.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "118/74 mmHg",
      pulse: "72 bpm",
      weight: "59 kg",
    },
    bloodType: "B-",
    allergies: ["Bright lights"],
  },
  {
    id: "SMR008",
    staffId: "S008",
    name: "Dr. Samuel Dung",
    role: "Chief Medical Officer",
    department: "Medical Center",
    unit: "Emergency Medicine",
    recordType: "Follow-up",
    diagnosis: "Gout arthritis",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-15",
    medications: ["Allopurinol", "Colchicine", "Dietary restrictions"],
    notes: "Recurrent gout attacks affecting first metatarsophalangeal joint. Uric acid levels well controlled.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "138/92 mmHg",
      pulse: "75 bpm",
      weight: "78 kg",
    },
    bloodType: "A+",
    allergies: ["Shellfish"],
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
            <Button variant="outline" size="sm" className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3">
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
        <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
          <TabsTrigger value="students" className="text-xs sm:text-sm">Student Records</TabsTrigger>
          <TabsTrigger value="staff" className="text-xs sm:text-sm">Staff Records</TabsTrigger>
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
    </div>
  );
};
