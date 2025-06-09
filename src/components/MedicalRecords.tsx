
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Download, Eye } from "lucide-react";

const medicalRecords = [
  {
    id: "R001",
    patientName: "Ngozi Adebayo",
    patientId: "P001242",
    recordType: "Consultation",
    diagnosis: "Malaria",
    doctor: "Dr. Fatima Aliyu",
    date: "2024-06-08",
    medications: ["Artemether-Lumefantrine", "Paracetamol"],
    notes: "Patient presented with fever, headache, and body aches. Rapid diagnostic test positive for malaria.",
    vitals: {
      temperature: "39.2°C",
      bloodPressure: "120/80 mmHg",
      pulse: "88 bpm",
      weight: "65 kg",
    },
  },
  {
    id: "R002",
    patientName: "Tunde Olawale",
    patientId: "P001243",
    recordType: "Lab Results",
    diagnosis: "Diabetes Mellitus Type 2",
    doctor: "Dr. John Okafor",
    date: "2024-06-07",
    medications: ["Metformin", "Glibenclamide"],
    notes: "HbA1c elevated at 8.5%. Patient counseled on diet and lifestyle modifications.",
    vitals: {
      temperature: "36.8°C",
      bloodPressure: "140/90 mmHg",
      pulse: "76 bpm",
      weight: "78 kg",
    },
  },
  {
    id: "R003",
    patientName: "Hauwa Ibrahim",
    patientId: "P001244",
    recordType: "Follow-up",
    diagnosis: "Hypertension",
    doctor: "Dr. Aisha Mohammed",
    date: "2024-06-06",
    medications: ["Amlodipine", "Lisinopril"],
    notes: "Blood pressure well controlled. Continue current medication regimen.",
    vitals: {
      temperature: "36.5°C",
      bloodPressure: "130/85 mmHg",
      pulse: "72 bpm",
      weight: "70 kg",
    },
  },
];

const getRecordTypeColor = (type: string) => {
  switch (type) {
    case "Consultation":
      return "bg-blue-100 text-blue-800";
    case "Lab Results":
      return "bg-purple-100 text-purple-800";
    case "Follow-up":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const MedicalRecords = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
          <p className="text-gray-600">View and manage patient medical records</p>
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
