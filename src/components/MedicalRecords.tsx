
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Download, Eye } from "lucide-react";

const medicalRecords = [
  {
    id: "R001",
    patientName: "Adaora Okonkwo",
    patientId: "P001234",
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
    patientName: "Ibrahim Musa",
    patientId: "P001235",
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
    patientName: "Blessing Eze",
    patientId: "P001236",
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
    patientName: "Yusuf Abdullahi",
    patientId: "P001237",
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
    patientName: "Fatima Aliyu",
    patientId: "P001238",
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
    patientName: "Chidi Okafor",
    patientId: "P001239",
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
    patientName: "Hauwa Mohammed",
    patientId: "P001240",
    recordType: "Counseling",
    diagnosis: "Academic anxiety disorder",
    doctor: "Dr. Mary Gyang",
    date: "2024-06-03",
    medications: ["Counseling sessions", "Relaxation techniques"],
    notes: "Final year student experiencing severe anxiety about thesis defense. Referred to counseling services.",
    vitals: {
      temperature: "36.7°C",
      bloodPressure: "125/82 mmHg",
      pulse: "92 bpm",
      weight: "59 kg",
    },
    faculty: "Education",
    level: "600L"
  },
  {
    id: "R008",
    patientName: "Daniel Kwaghe",
    patientId: "P001241",
    recordType: "Treatment",
    diagnosis: "Common cold",
    doctor: "Dr. Peter Bulus",
    date: "2024-06-02",
    medications: ["Paracetamol", "Vitamin C", "Nasal decongestant"],
    notes: "Mild cold symptoms. Student advised to rest and maintain good hygiene to prevent spread.",
    vitals: {
      temperature: "37.2°C",
      bloodPressure: "112/72 mmHg",
      pulse: "80 bpm",
      weight: "70 kg",
    },
    faculty: "Agriculture",
    level: "100L"
  },
  {
    id: "R009",
    patientName: "Grace Dung",
    patientId: "P001242",
    recordType: "Consultation",
    diagnosis: "Insomnia (sleep disorder)",
    doctor: "Dr. Emmanuel Yakubu",
    date: "2024-06-01",
    medications: ["Sleep hygiene counseling", "Melatonin (if needed)"],
    notes: "Student reports difficulty sleeping due to academic stress and irregular study schedule. Sleep hygiene education provided.",
    vitals: {
      temperature: "36.6°C",
      bloodPressure: "115/70 mmHg",
      pulse: "74 bpm",
      weight: "57 kg",
    },
    faculty: "Arts",
    level: "400L"
  },
  {
    id: "R010",
    patientName: "Samuel Gyang",
    patientId: "P001243",
    recordType: "Treatment",
    diagnosis: "Malaria (Plasmodium falciparum)",
    doctor: "Dr. Ruth Laven",
    date: "2024-05-30",
    medications: ["Artemether-Lumefantrine", "Paracetamol", "ORS"],
    notes: "Rapid diagnostic test positive for malaria. Student responded well to antimalarial treatment. Follow-up in one week.",
    vitals: {
      temperature: "39.1°C",
      bloodPressure: "110/75 mmHg",
      pulse: "98 bpm",
      weight: "75 kg",
    },
    faculty: "Veterinary Medicine",
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
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const MedicalRecords = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/placeholder.svg" 
              alt="University of Jos Logo" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
              <p className="text-gray-600">University of Jos Student Health Records System</p>
            </div>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {medicalRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    {record.patientName} - {record.patientId}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRecordTypeColor(record.recordType)}`}>
                      {record.recordType}
                    </span>
                    <span className="text-sm text-gray-600">{record.date}</span>
                    <span className="text-sm text-gray-600">{record.doctor}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {record.faculty} - {record.level}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Diagnosis & Treatment</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Diagnosis:</span> {record.diagnosis}</p>
                    <p><span className="font-medium">Medications:</span></p>
                    <ul className="list-disc list-inside ml-4 text-sm text-gray-600">
                      {record.medications.map((med, index) => (
                        <li key={index}>{med}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vital Signs</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-medium">Temperature</p>
                      <p className="text-gray-600">{record.vitals.temperature}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-medium">Blood Pressure</p>
                      <p className="text-gray-600">{record.vitals.bloodPressure}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-medium">Pulse</p>
                      <p className="text-gray-600">{record.vitals.pulse}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-medium">Weight</p>
                      <p className="text-gray-600">{record.vitals.weight}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Clinical Notes</h4>
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{record.notes}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
