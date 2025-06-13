import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Download, Eye, UserCheck } from "lucide-react";
import { NewRecordDialog } from "./NewRecordDialog";

const medicalRecords = [
  {
    id: "R001",
    name: "Adaora Okonkwo",
    patientId: "P001234",
    matricNumber: "UJ/2022/ENG/0234",
    recordType: "Consultation",
    diagnosis: "Stress-related headaches",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-05",
    medications: ["Paracetamol 500mg", "Diclofenac gel"],
    notes: "Student reports frequent headaches during exam period. Advised stress management techniques and adequate sleep.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "115/75 mmHg",
      pulse: "78 bpm",
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
    diagnosis: "Ankle sprain (sports injury)",
    doctor: "Dr. John Okafor",
    date: "2024-06-07",
    medications: ["Ibuprofen 400mg", "Elastic bandage", "Ice therapy"],
    notes: "Injury sustained during football practice. X-ray shows no fracture. RICE protocol recommended.",
    vitals: {
      temperature: "37.0°C",
      bloodPressure: "120/80 mmHg",
      pulse: "85 bpm",
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
    diagnosis: "Upper respiratory tract infection",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-06-08",
    medications: ["Amoxicillin 500mg", "Cough syrup", "Vitamin C"],
    notes: "Student presented with cough, runny nose, and mild fever. Likely viral infection with secondary bacterial component.",
    vitals: {
      temperature: "38.2°C",
      bloodPressure: "110/70 mmHg",
      pulse: "88 bpm",
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
    recordType: "Follow-up",
    diagnosis: "Computer vision syndrome",
    doctor: "Dr. Grace Musa",
    date: "2024-06-09",
    medications: ["Artificial tears", "Blue light glasses"],
    notes: "Extended computer use for studies causing eye strain. Recommended 20-20-20 rule and proper lighting.",
    vitals: {
      temperature: "36.5°C",
      bloodPressure: "118/78 mmHg",
      pulse: "72 bpm",
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
    recordType: "Consultation",
    diagnosis: "Dysmenorrhea (menstrual cramps)",
    doctor: "Dr. Hauwa Ibrahim",
    date: "2024-06-06",
    medications: ["Mefenamic acid", "Buscopan", "Heat therapy"],
    notes: "Severe menstrual pain affecting academic performance. Hormonal evaluation recommended if symptoms persist.",
    vitals: {
      temperature: "36.9°C",
      bloodPressure: "108/68 mmHg",
      pulse: "76 bpm",
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
    recordType: "Emergency",
    diagnosis: "Acute gastroenteritis",
    doctor: "Dr. Samuel Dung",
    date: "2024-06-04",
    medications: ["ORS sachets", "Loperamide", "Probiotics"],
    notes: "Food poisoning from campus cafeteria. Symptoms include vomiting, diarrhea, and dehydration. Improving with treatment.",
    vitals: {
      temperature: "37.8°C",
      bloodPressure: "100/65 mmHg",
      pulse: "95 bpm",
      weight: "66 kg",
    },
    faculty: "Pharmacy",
    level: "200L"
  },
  {
    id: "R007",
    name: "Amina Bello",
    patientId: "P001250",
    matricNumber: "UJ/2023/EDU/0890",
    recordType: "Counseling",
    diagnosis: "Social anxiety disorder",
    doctor: "Dr. Mary Gyang",
    date: "2024-06-03",
    medications: ["Counseling sessions", "Relaxation techniques"],
    notes: "New student experiencing difficulty adjusting to university life. Referred to counseling services for support.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "125/82 mmHg",
      pulse: "92 bpm",
      weight: "51 kg",
    },
    faculty: "Education",
    level: "100L"
  },
  {
    id: "R008",
    name: "David Pam",
    patientId: "P001251",
    matricNumber: "UJ/2021/AGR/0456",
    recordType: "Treatment",
    diagnosis: "Allergic rhinitis (hay fever)",
    doctor: "Dr. Peter Bulus",
    date: "2024-06-02",
    medications: ["Loratadine", "Nasal spray", "Allergen avoidance"],
    notes: "Seasonal allergies triggered by campus vegetation. Student advised on environmental controls and medication schedule.",
    vitals: {
      temperature: "36.6°C",
      bloodPressure: "112/72 mmHg",
      pulse: "80 bpm",
      weight: "74 kg",
    },
    faculty: "Agriculture",
    level: "300L"
  },
  {
    id: "R009",
    name: "Hauwa Mohammed",
    patientId: "P001252",
    matricNumber: "UJ/2020/ENV/0123",
    recordType: "Consultation",
    diagnosis: "Migraine headaches",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2024-06-01",
    medications: ["Sumatriptan", "Magnesium supplements", "Lifestyle modifications"],
    notes: "Frequent migraines affecting class attendance. Trigger identification and preventive measures discussed.",
    vitals: {
      temperature: "36.4°C",
      bloodPressure: "110/68 mmHg",
      pulse: "74 bpm",
      weight: "63 kg",
    },
    faculty: "Environmental Sciences",
    level: "400L"
  },
  {
    id: "R010",
    name: "Samuel Gyang",
    patientId: "P001253",
    matricNumber: "UJ/2023/MSC/0789",
    recordType: "Treatment",
    diagnosis: "Peptic ulcer disease",
    doctor: "Dr. Ruth Laven",
    date: "2024-05-30",
    medications: ["Omeprazole", "Amoxicillin", "Clarithromycin", "Dietary changes"],
    notes: "H. pylori positive. Triple therapy initiated. Student counseled on dietary modifications and stress management.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "118/75 mmHg",
      pulse: "82 bpm",
      weight: "67 kg",
    },
    faculty: "Management Sciences",
    level: "100L"
  },
  {
    id: "R011",
    name: "R Laven",
    patientId: "P001254",
    matricNumber: "UJ/2022/VET/0456",
    recordType: "Emergency",
    diagnosis: "Severe asthma exacerbation",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-05-28",
    medications: ["Salbutamol inhaler", "Prednisolone", "Montelukast"],
    notes: "Acute asthma attack triggered by dust exposure in dormitory. Emergency treatment successful. Action plan reviewed.",
    vitals: {
      temperature: "37.1°C",
      bloodPressure: "125/80 mmHg",
      pulse: "110 bpm",
      weight: "56 kg",
    },
    faculty: "Veterinary Medicine",
    level: "200L"
  },
  {
    id: "R012",
    name: "Emmanuel Yakubu",
    patientId: "P001255",
    matricNumber: "UJ/2021/ART/0234",
    recordType: "Follow-up",
    diagnosis: "Type 1 diabetes mellitus",
    doctor: "Dr. John Okafor",
    date: "2024-05-25",
    medications: ["Insulin glargine", "Insulin aspart", "Blood glucose monitor"],
    notes: "Regular diabetes management check-up. Blood sugar levels well controlled. Dietary compliance excellent.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "115/70 mmHg",
      pulse: "76 bpm",
      weight: "64 kg",
    },
    faculty: "Arts",
    level: "300L"
  },
  {
    id: "R013",
    name: "Mary Gyang",
    patientId: "P001256",
    matricNumber: "UJ/2019/MED/0678",
    recordType: "Treatment",
    diagnosis: "Iron deficiency anemia",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-05-22",
    medications: ["Iron sulfate tablets", "Vitamin C", "Folic acid"],
    notes: "Low hemoglobin levels detected during routine screening. Dietary counseling provided. Follow-up in 6 weeks.",
    vitals: {
      temperature: "36.5°C",
      bloodPressure: "108/65 mmHg",
      pulse: "88 bpm",
      weight: "54 kg",
    },
    faculty: "Medicine",
    level: "500L"
  },
  {
    id: "R014",
    name: "Peter Bulus",
    patientId: "P001257",
    matricNumber: "UJ/2023/ENG/0345",
    recordType: "Consultation",
    diagnosis: "Tension-type headaches",
    doctor: "Dr. Grace Musa",
    date: "2024-05-20",
    medications: ["Acetaminophen", "Muscle relaxants", "Stress management"],
    notes: "Frequent headaches related to study stress and poor posture. Ergonomic recommendations provided.",
    vitals: {
      temperature: "36.6°C",
      bloodPressure: "120/78 mmHg",
      pulse: "79 bpm",
      weight: "71 kg",
    },
    faculty: "Engineering",
    level: "100L"
  },
  {
    id: "R015",
    name: "Grace Danladi",
    patientId: "P001258",
    matricNumber: "UJ/2022/SSC/0567",
    recordType: "Treatment",
    diagnosis: "Urinary tract infection",
    doctor: "Dr. Hauwa Ibrahim",
    date: "2024-05-18",
    medications: ["Nitrofurantoin", "Cranberry supplements", "Increased fluid intake"],
    notes: "Recurrent UTI. Urine culture shows E. coli sensitivity. Preventive measures discussed.",
    vitals: {
      temperature: "37.3°C",
      bloodPressure: "115/72 mmHg",
      pulse: "86 bpm",
      weight: "58 kg",
    },
    faculty: "Social Sciences",
    level: "200L"
  },
  {
    id: "R016",
    name: "Daniel Kwaghe",
    patientId: "P001259",
    matricNumber: "UJ/2020/NSC/0890",
    recordType: "Emergency",
    diagnosis: "Acute appendicitis",
    doctor: "Dr. Samuel Dung",
    date: "2024-05-15",
    medications: ["Post-operative antibiotics", "Pain management", "Wound care"],
    notes: "Emergency appendectomy performed successfully. Student recovering well. Return to normal activities in 2 weeks.",
    vitals: {
      temperature: "38.1°C",
      bloodPressure: "130/85 mmHg",
      pulse: "95 bpm",
      weight: "69 kg",
    },
    faculty: "Natural Sciences",
    level: "400L"
  },
  {
    id: "R017",
    name: "Rebecca Gyang",
    patientId: "P001260",
    matricNumber: "UJ/2021/LAW/0123",
    recordType: "Counseling",
    diagnosis: "Eating disorder (anorexia nervosa)",
    doctor: "Dr. Mary Gyang",
    date: "2024-05-12",
    medications: ["Nutritional counseling", "Psychological therapy", "Vitamin supplements"],
    notes: "Significant weight loss and distorted body image. Comprehensive treatment plan involving psychiatry and nutrition.",
    vitals: {
      temperature: "36.2°C",
      bloodPressure: "95/60 mmHg",
      pulse: "105 bpm",
      weight: "45 kg",
    },
    faculty: "Law",
    level: "300L"
  },
  {
    id: "R018",
    name: "Maryam Umar",
    patientId: "P001261",
    matricNumber: "UJ/2023/PHM/0456",
    recordType: "Treatment",
    diagnosis: "Skin allergic reaction",
    doctor: "Dr. Peter Bulus",
    date: "2024-05-10",
    medications: ["Topical corticosteroids", "Antihistamines", "Moisturizers"],
    notes: "Allergic dermatitis from new detergent. Patch testing recommended. Hypoallergenic products advised.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "110/70 mmHg",
      pulse: "77 bpm",
      weight: "53 kg",
    },
    faculty: "Pharmacy",
    level: "100L"
  },
  {
    id: "R019",
    name: "Ibrahim Hassan",
    patientId: "P001262",
    matricNumber: "UJ/2022/EDU/0789",
    recordType: "Follow-up",
    diagnosis: "Hypertension (high blood pressure)",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2024-05-08",
    medications: ["Amlodipine", "Lifestyle modifications", "Low sodium diet"],
    notes: "Early-onset hypertension. Family history positive. Regular monitoring and lifestyle changes implemented.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "145/92 mmHg",
      pulse: "83 bpm",
      weight: "78 kg",
    },
    faculty: "Education",
    level: "200L"
  },
  {
    id: "R020",
    name: "Joy Dung",
    patientId: "P001263",
    matricNumber: "UJ/2019/AGR/0234",
    recordType: "Consultation",
    diagnosis: "Chronic fatigue syndrome",
    doctor: "Dr. Ruth Laven",
    date: "2024-05-05",
    medications: ["Multivitamin complex", "Graded exercise therapy", "Sleep hygiene"],
    notes: "Persistent fatigue affecting academic performance. Comprehensive evaluation completed. Gradual activity increase planned.",
    vitals: {
      temperature: "36.4°C",
      bloodPressure: "105/68 mmHg",
      pulse: "90 bpm",
      weight: "61 kg",
    },
    faculty: "Agriculture",
    level: "500L"
  }
];

const staffMedicalRecords = [
  {
    id: "SMR001",
    staffId: "S001",
    name: "Dr. Hauwa Abdullahi",
    role: "Registrar",
    department: "Academic Registry",
    unit: "Student Records",
    recordType: "Annual Checkup",
    diagnosis: "Excellent health status",
    doctor: "Dr. Samuel Dung",
    date: "2024-05-20",
    medications: ["Multivitamin supplement"],
    notes: "Routine annual health assessment. All vitals within normal range. Continue current lifestyle habits.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "118/75 mmHg",
      pulse: "72 bpm",
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
    recordType: "Treatment",
    diagnosis: "Occupational stress management",
    doctor: "Dr. Grace Musa",
    date: "2024-04-15",
    medications: ["Stress management therapy", "Relaxation techniques"],
    notes: "Mild work-related stress. Recommended stress management techniques and regular counseling sessions.",
    vitals: {
      temperature: "36.9°C",
      bloodPressure: "125/82 mmHg",
      pulse: "78 bpm",
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
    recordType: "Vaccination",
    diagnosis: "Routine immunization update",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-06-01",
    medications: ["Hepatitis B booster", "Annual flu shot"],
    notes: "Updated routine vaccinations as per hospital staff requirements. No adverse reactions observed.",
    vitals: {
      temperature: "36.6°C",
      bloodPressure: "115/70 mmHg",
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
    recordType: "Emergency",
    diagnosis: "Chemical exposure incident",
    doctor: "Dr. Peter Bulus",
    date: "2024-03-25",
    medications: ["Eye irrigation solution", "Antihistamine", "Topical steroid"],
    notes: "Minor chemical splash exposure during equipment maintenance. Eyes irrigated immediately. Full recovery achieved.",
    vitals: {
      temperature: "37.1°C",
      bloodPressure: "130/85 mmHg",
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
    recordType: "Follow-up",
    diagnosis: "Diabetes management",
    doctor: "Dr. Ruth Laven",
    date: "2024-05-05",
    medications: ["Metformin", "Blood glucose monitoring", "Dietary counseling"],
    notes: "Type 2 diabetes well controlled with medication and lifestyle modifications. Continue current regimen.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "122/78 mmHg",
      pulse: "74 bpm",
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
    diagnosis: "Back pain (occupational)",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2024-04-20",
    medications: ["Physical therapy", "Anti-inflammatory drugs", "Ergonomic training"],
    notes: "Chronic lower back pain from manual work. Physical therapy showing good results. Ergonomic improvements recommended.",
    vitals: {
      temperature: "36.5°C",
      bloodPressure: "128/80 mmHg",
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
    recordType: "Consultation",
    diagnosis: "Migraine management",
    doctor: "Dr. Mary Gyang",
    date: "2024-05-30",
    medications: ["Sumatriptan", "Preventive medications", "Trigger avoidance"],
    notes: "Frequent migraines affecting work performance. Trigger identification completed. Preventive treatment initiated.",
    vitals: {
      temperature: "36.4°C",
      bloodPressure: "120/75 mmHg",
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
    recordType: "Annual Checkup",
    diagnosis: "Good health status",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-15",
    medications: ["Cholesterol management", "Blood pressure monitoring"],
    notes: "Annual medical examination. Slightly elevated cholesterol levels. Dietary modifications recommended.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "135/88 mmHg",
      pulse: "75 bpm",
      weight: "78 kg",
    },
    bloodType: "A+",
    allergies: ["Shellfish"],
  },
  {
    id: "SMR009",
    staffId: "S009",
    name: "Mrs. Esther Bulus",
    role: "Administrative Officer",
    department: "Administration",
    unit: "General Administration",
    recordType: "Treatment",
    diagnosis: "Thyroid dysfunction",
    doctor: "Dr. John Okafor",
    date: "2024-05-28",
    medications: ["Levothyroxine", "Regular monitoring", "Dietary supplements"],
    notes: "Hypothyroidism diagnosed during routine screening. Hormone replacement therapy initiated. Good response to treatment.",
    vitals: {
      temperature: "36.3°C",
      bloodPressure: "110/70 mmHg",
      pulse: "68 bpm",
      weight: "64 kg",
    },
    bloodType: "O+",
    allergies: ["Iodine"],
  },
  {
    id: "SMR010",
    staffId: "S010",
    name: "Mr. Paul Nanbol",
    role: "Student Counselor",
    department: "Student Services",
    unit: "Counseling Center",
    recordType: "Counseling",
    diagnosis: "Burnout syndrome",
    doctor: "Dr. Grace Musa",
    date: "2024-06-10",
    medications: ["Stress reduction techniques", "Work-life balance counseling", "Relaxation therapy"],
    notes: "Experiencing counselor burnout from heavy caseload. Stress management and workload adjustment recommended.",
    vitals: {
      temperature: "36.9°C",
      bloodPressure: "140/90 mmHg",
      pulse: "82 bpm",
      weight: "73 kg",
    },
    bloodType: "B+",
    allergies: ["Pollen"],
  },
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
