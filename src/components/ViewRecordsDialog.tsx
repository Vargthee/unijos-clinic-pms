import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Stethoscope, Calendar, User, Heart, Brain, Eye, Clock } from "lucide-react";

interface ViewRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  patientId: string;
}

export const ViewRecordsDialog = ({ open, onOpenChange, patientName, patientId }: ViewRecordsDialogProps) => {
  const getPatientRecords = (patientId: string) => {
    const recordsMap: Record<string, any[]> = {
      "P001234": [ // Adaora Okonkwo
        {
          id: "R001",
          date: "2024-06-05",
          type: "Emergency",
          diagnosis: "Severe malaria with cerebral complications",
          doctor: "Dr. Fatima Aliyu",
          vitals: { age: "20 years", temperature: "40.1°C", bloodPressure: "90/60 mmHg", pulse: "120 bpm", weight: "58 kg", height: "165 cm", respiratoryRate: "20/min", oxygenSaturation: "97%" },
          notes: "Patient presented with high fever, altered consciousness, and convulsions. Rapid diagnostic test positive for P. falciparum.",
          icon: Heart
        }
      ],
      "P001235": [ // Ibrahim Musa
        {
          id: "R002",
          date: "2024-06-07",
          type: "Treatment",
          diagnosis: "Sickle cell vaso-occlusive crisis",
          doctor: "Dr. John Okafor",
          vitals: { 
            age: "22 years", 
            temperature: "37.8°C", 
            bloodPressure: "130/85 mmHg", 
            pulse: "95 bpm", 
            weight: "61 kg", 
            height: "178 cm", 
            respiratoryRate: "22/min", 
            oxygenSaturation: "94%" 
          },
          notes: "22-year-old male with known sickle cell disease presenting with severe vaso-occlusive crisis. Pain score 9/10 in bilateral lower extremities. Managed with morphine 10mg IV, hydroxyurea 500mg, IV hydration with normal saline, and oxygen therapy. Pain reduced to 4/10 after treatment. Patient counseled on crisis prevention and hydration importance.",
          icon: Stethoscope
        },
        {
          id: "R002B",
          date: "2024-05-15",
          type: "Follow-up",
          diagnosis: "Sickle cell disease - routine monitoring",
          doctor: "Dr. John Okafor",
          vitals: { 
            age: "22 years", 
            temperature: "36.8°C", 
            bloodPressure: "125/80 mmHg", 
            pulse: "78 bpm", 
            weight: "62 kg", 
            height: "178 cm", 
            respiratoryRate: "18/min", 
            oxygenSaturation: "97%" 
          },
          notes: "Routine follow-up for sickle cell disease. Patient reports good adherence to hydroxyurea therapy. No recent pain crises. Hemoglobin level stable at 9.2 g/dL. Folic acid supplementation continued. Next appointment in 3 months.",
          icon: Heart
        },
        {
          id: "R002C",
          date: "2024-04-10",
          type: "Emergency",
          diagnosis: "Acute chest syndrome secondary to sickle cell disease",
          doctor: "Dr. Grace Musa",
          vitals: { 
            age: "22 years", 
            temperature: "38.5°C", 
            bloodPressure: "140/90 mmHg", 
            pulse: "110 bpm", 
            weight: "61 kg", 
            height: "178 cm", 
            respiratoryRate: "26/min", 
            oxygenSaturation: "89%" 
          },
          notes: "Emergency presentation with chest pain, fever, and shortness of breath. Chest X-ray showed bilateral infiltrates. Treated with oxygen therapy, antibiotics (ceftriaxone), bronchodilators, and exchange transfusion. Significant improvement after 48 hours.",
          icon: Brain
        }
      ],
      "P001236": [ // Blessing Eze
        {
          id: "R003",
          date: "2024-06-08",
          type: "Follow-up",
          diagnosis: "Typhoid fever - severe case",
          doctor: "Dr. Aisha Mohammed",
          vitals: { age: "18 years", temperature: "39.2°C", bloodPressure: "110/70 mmHg", pulse: "88 bpm", weight: "52 kg", height: "162 cm", respiratoryRate: "18/min", oxygenSaturation: "99%" },
          notes: "Rose spots visible on trunk. Blood culture positive for Salmonella Typhi. Started on IV antibiotics.",
          icon: Eye
        }
      ],
      "P001237": [ // Yusuf Abdullahi
        {
          id: "R004",
          date: "2024-06-09",
          type: "Consultation",
          diagnosis: "Acute bronchial asthma exacerbation",
          doctor: "Dr. Grace Musa",
          vitals: { age: "21 years", temperature: "36.8°C", bloodPressure: "125/80 mmHg", pulse: "102 bpm", weight: "65 kg", height: "175 cm", respiratoryRate: "28/min", oxygenSaturation: "92%" },
          notes: "Wheezing and shortness of breath. Peak flow reduced to 60% of predicted. Nebulizer treatment given.",
          icon: Brain
        }
      ],
      "P001238": [ // Fatima Aliyu (Student)
        {
          id: "R005",
          date: "2024-06-06",
          type: "Treatment",
          diagnosis: "Iron deficiency anemia",
          doctor: "Dr. Hauwa Ibrahim",
          vitals: { age: "23 years", temperature: "36.5°C", bloodPressure: "100/65 mmHg", pulse: "78 bpm", weight: "55 kg", height: "168 cm", respiratoryRate: "20/min", oxygenSaturation: "98%" },
          notes: "Hemoglobin level at 8.2 g/dL. Started on oral iron supplementation. Dietary counseling provided.",
          icon: Heart
        }
      ],
      "P001239": [ // Chidi Okafor
        {
          id: "R006",
          date: "2024-06-04",
          type: "Follow-up",
          diagnosis: "Chronic Hepatitis B infection",
          doctor: "Dr. Samuel Dung",
          vitals: { age: "24 years", temperature: "36.7°C", bloodPressure: "120/75 mmHg", pulse: "70 bpm", weight: "68 kg" },
          notes: "HBsAg positive, viral load monitoring. Liver function tests within normal limits. Continue antiviral therapy.",
          icon: Stethoscope
        }
      ],
      "P001240": [ // Amina Bello
        {
          id: "R007",
          date: "2024-06-10",
          type: "Treatment",
          diagnosis: "Urinary tract infection (UTI)",
          doctor: "Dr. Mary Gyang",
          vitals: { age: "19 years", temperature: "37.5°C", bloodPressure: "112/70 mmHg", pulse: "82 bpm", weight: "51 kg" },
          notes: "Recurrent UTI with E. coli bacteria. Antibiotic sensitivity test done. Hygiene education provided.",
          icon: Eye
        }
      ],
      "P001241": [ // David Pam
        {
          id: "R008",
          date: "2024-06-11",
          type: "Emergency",
          diagnosis: "Meningitis (recovering)",
          doctor: "Dr. Peter Bulus",
          vitals: { age: "20 years", temperature: "37.2°C", bloodPressure: "118/75 mmHg", pulse: "85 bpm", weight: "74 kg" },
          notes: "Bacterial meningitis successfully treated. Neurological examination normal. Follow-up scheduled.",
          icon: Brain
        }
      ],
      "P001242": [ // Hauwa Mohammed
        {
          id: "R009",
          date: "2024-06-12",
          type: "Follow-up",
          diagnosis: "Rheumatic heart disease",
          doctor: "Dr. Emmanuel Yakubu",
          vitals: { age: "22 years", temperature: "36.6°C", bloodPressure: "125/82 mmHg", pulse: "88 bpm", weight: "63 kg" },
          notes: "Stable rheumatic heart disease. Echo shows mild mitral regurgitation. Regular cardiology follow-up needed.",
          icon: Heart
        }
      ],
      "P001243": [ // Samuel Gyang
        {
          id: "R010",
          date: "2024-06-13",
          type: "Treatment",
          diagnosis: "Tuberculosis (on treatment)",
          doctor: "Dr. Ruth Laven",
          vitals: { age: "21 years", temperature: "37.3°C", bloodPressure: "115/70 mmHg", pulse: "92 bpm", weight: "67 kg" },
          notes: "Pulmonary tuberculosis on intensive phase. Sputum conversion expected. Contact tracing completed.",
          icon: Stethoscope
        }
      ],
      "S001": [ // Dr. Hauwa Abdullahi (Staff)
        {
          id: "R011",
          date: "2024-06-01",
          type: "Check-up",
          diagnosis: "Annual health screening - normal",
          doctor: "Dr. John Okafor",
          vitals: { age: "49 years", temperature: "36.6°C", bloodPressure: "118/72 mmHg", pulse: "68 bpm", weight: "62 kg" },
          currentVitals: { age: "49 years", temperature: "36.7°C", bloodPressure: "120/75 mmHg", pulse: "70 bpm", weight: "62 kg", oxygenSaturation: "98%", respiratoryRate: "16 breaths/min" },
          notes: "Routine health check for staff member. All parameters within normal limits. Immunization status up to date.",
          icon: Eye
        }
      ],
      "S002": [ // Mr. James Dung (Staff)
        {
          id: "R012",
          date: "2024-05-15",
          type: "Treatment",
          diagnosis: "Essential hypertension",
          doctor: "Dr. Aisha Mohammed",
          vitals: { age: "52 years", temperature: "36.4°C", bloodPressure: "145/92 mmHg", pulse: "75 bpm", weight: "78 kg" },
          currentVitals: { age: "52 years", temperature: "36.5°C", bloodPressure: "138/85 mmHg", pulse: "72 bpm", weight: "78 kg", oxygenSaturation: "97%", respiratoryRate: "18 breaths/min" },
          notes: "Blood pressure control with ACE inhibitors. Lifestyle modification counseling. Regular monitoring advised.",
          icon: Heart
        }
      ],
      "S003": [ // Mrs. Grace Yakubu (Staff)
        {
          id: "R013",
          date: "2024-05-20",
          type: "Check-up",
          diagnosis: "Security health assessment - good",
          doctor: "Dr. Fatima Aliyu",
          vitals: { age: "45 years", temperature: "36.8°C", bloodPressure: "125/80 mmHg", pulse: "75 bpm", weight: "65 kg" },
          currentVitals: { age: "45 years", temperature: "36.6°C", bloodPressure: "122/78 mmHg", pulse: "72 bpm", weight: "65 kg", oxygenSaturation: "98%", respiratoryRate: "15 breaths/min" },
          notes: "Regular fitness assessments for security personnel. All vitals within normal range.",
          icon: Stethoscope
        }
      ],
      "S004": [ // Engr. Emmanuel Bulus (Staff)
        {
          id: "R014",
          date: "2024-05-10",
          type: "Consultation",
          diagnosis: "Work-related stress management",
          doctor: "Dr. John Okafor",
          vitals: { age: "48 years", temperature: "36.9°C", bloodPressure: "130/85 mmHg", pulse: "82 bpm", weight: "75 kg" },
          currentVitals: { age: "48 years", temperature: "36.7°C", bloodPressure: "125/82 mmHg", pulse: "78 bpm", weight: "75 kg", oxygenSaturation: "97%", respiratoryRate: "17 breaths/min" },
          notes: "Stress management counseling. Regular exercise and work-life balance recommended.",
          icon: Brain
        }
      ],
      "S005": [ // Mrs. Rebecca Gyang (Staff)
        {
          id: "R015",
          date: "2024-05-05",
          type: "Treatment",
          diagnosis: "Respiratory allergy management",
          doctor: "Dr. Mary Gyang",
          vitals: { age: "42 years", temperature: "36.5°C", bloodPressure: "115/70 mmHg", pulse: "68 bpm", weight: "58 kg" },
          currentVitals: { age: "42 years", temperature: "36.4°C", bloodPressure: "112/68 mmHg", pulse: "65 bpm", weight: "58 kg", oxygenSaturation: "99%", respiratoryRate: "14 breaths/min" },
          notes: "Allergy medications effective. Environmental modifications recommended.",
          icon: Heart
        }
      ],
      "S006": [ // Mr. Daniel Kwaghe (Staff)
        {
          id: "R016",
          date: "2024-04-20",
          type: "Treatment",
          diagnosis: "Back pain management",
          doctor: "Dr. Peter Bulus",
          vitals: { age: "38 years", temperature: "36.7°C", bloodPressure: "128/80 mmHg", pulse: "74 bpm", weight: "72 kg" },
          currentVitals: { age: "38 years", temperature: "36.6°C", bloodPressure: "125/78 mmHg", pulse: "71 bpm", weight: "72 kg", oxygenSaturation: "98%", respiratoryRate: "16 breaths/min" },
          notes: "Physiotherapy sessions ongoing. Ergonomic workplace adjustments made.",
          icon: Stethoscope
        }
      ],
      "S007": [ // Mrs. Maryam Umar (Staff)
        {
          id: "R017",
          date: "2024-05-30",
          type: "Treatment",
          diagnosis: "Migraine management",
          doctor: "Dr. Emmanuel Yakubu",
          vitals: { age: "35 years", temperature: "36.4°C", bloodPressure: "110/70 mmHg", pulse: "66 bpm", weight: "60 kg" },
          currentVitals: { age: "35 years", temperature: "36.3°C", bloodPressure: "108/68 mmHg", pulse: "64 bpm", weight: "60 kg", oxygenSaturation: "99%", respiratoryRate: "15 breaths/min" },
          notes: "Light sensitivity managed with environmental controls. Stress reduction techniques effective.",
          icon: Brain
        }
      ],
      "S008": [ // Dr. Samuel Dung (Staff)
        {
          id: "R018",
          date: "2024-06-01",
          type: "Follow-up",
          diagnosis: "Post-surgery recovery monitoring",
          doctor: "Dr. Ruth Laven",
          vitals: { age: "46 years", temperature: "36.8°C", bloodPressure: "120/75 mmHg", pulse: "70 bpm", weight: "68 kg" },
          currentVitals: { age: "46 years", temperature: "36.7°C", bloodPressure: "118/72 mmHg", pulse: "68 bpm", weight: "68 kg", oxygenSaturation: "98%", respiratoryRate: "16 breaths/min" },
          notes: "Recovery progressing well. Return to full duties approved.",
          icon: Heart
        }
      ],
      "UNIJOS/REG/001": [ // Dr. Hauwa Abdullahi (University Staff)
        {
          id: "R019",
          date: "2024-05-20",
          type: "Check-up",
          diagnosis: "Annual health screening - good health",
          doctor: "Dr. Fatima Aliyu",
          vitals: { age: "49 years", temperature: "36.8°C", bloodPressure: "125/80 mmHg", pulse: "75 bpm", weight: "65 kg" },
          currentVitals: { age: "49 years", temperature: "36.7°C", bloodPressure: "120/78 mmHg", pulse: "72 bpm", weight: "65 kg", oxygenSaturation: "98%", respiratoryRate: "16 breaths/min" },
          notes: "Lifestyle modification, blood pressure monitoring. Hypertension (mild)",
          icon: Stethoscope
        }
      ]
    };

    return recordsMap[patientId] || [
      {
        id: "R999",
        date: "2024-06-01",
        type: "Consultation",
        diagnosis: "General health consultation",
        doctor: "General Practitioner",
        vitals: { age: "25 years", temperature: "36.5°C", bloodPressure: "120/80 mmHg", pulse: "72 bpm", weight: "65 kg" },
        notes: "Routine consultation. No specific complaints. General health advice given.",
        icon: Stethoscope
      }
    ];
  };

  const records = getPatientRecords(patientId);

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case "Consultation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Treatment":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Follow-up":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Check-up":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-3 sm:p-6">
        <DialogHeader className="border-b border-gray-200 dark:border-gray-800 pb-3 sm:pb-4">
          <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-900 dark:text-gray-100">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl font-semibold">Medical Records</span>
              <span className="text-sm sm:text-base text-muted-foreground">
                {patientName} ({patientId})
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-4">
          {records.map((record) => {
            const IconComponent = record.icon;
            return (
              <Card key={record.id} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <div>
                        <Badge className={getRecordTypeColor(record.type)}>
                          {record.type}
                        </Badge>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate max-w-[150px] sm:max-w-none">{record.doctor}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Diagnosis & Treatment</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-2 sm:p-3 rounded border border-gray-200 dark:border-gray-700">
                          <p className="font-medium text-xs sm:text-sm mb-1 text-gray-900 dark:text-gray-100">Diagnosis:</p>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{record.diagnosis}</p>
                        </div>
                        <div>
                          <p className="font-medium text-xs sm:text-sm mb-2 text-gray-900 dark:text-gray-100">Clinical Notes:</p>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{record.notes}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Vital Signs</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 sm:p-3 rounded border border-indigo-200 dark:border-indigo-800">
                          <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Age
                          </p>
                          <p className="text-sm sm:text-lg font-bold text-indigo-800 dark:text-indigo-200">{record.vitals.age}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded border border-blue-200 dark:border-blue-800">
                          <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Temperature</p>
                          <p className="text-sm sm:text-lg font-bold text-blue-800 dark:text-blue-200">{record.vitals.temperature}</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded border border-red-200 dark:border-red-800">
                          <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">Blood Pressure</p>
                          <p className="text-sm sm:text-lg font-bold text-red-800 dark:text-red-200">{record.vitals.bloodPressure}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 rounded border border-green-200 dark:border-green-800">
                          <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Pulse Rate</p>
                          <p className="text-sm sm:text-lg font-bold text-green-800 dark:text-green-200">{record.vitals.pulse}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-2 sm:p-3 rounded border border-purple-200 dark:border-purple-800">
                          <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">Weight</p>
                          <p className="text-sm sm:text-lg font-bold text-purple-800 dark:text-purple-200">{record.vitals.weight}</p>
                        </div>
                        {record.vitals.height && (
                          <div className="bg-orange-50 dark:bg-orange-900/20 p-2 sm:p-3 rounded border border-orange-200 dark:border-orange-800">
                            <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">Height</p>
                            <p className="text-sm sm:text-lg font-bold text-orange-800 dark:text-orange-200">{record.vitals.height}</p>
                          </div>
                        )}
                        {record.vitals.respiratoryRate && (
                          <div className="bg-teal-50 dark:bg-teal-900/20 p-2 sm:p-3 rounded border border-teal-200 dark:border-teal-800">
                            <p className="text-xs font-medium text-teal-700 dark:text-teal-300 mb-1">Respiratory Rate</p>
                            <p className="text-sm sm:text-lg font-bold text-teal-800 dark:text-teal-200">{record.vitals.respiratoryRate}</p>
                          </div>
                        )}
                        {record.vitals.oxygenSaturation && (
                          <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 sm:p-3 rounded border border-cyan-200 dark:border-cyan-800">
                            <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300 mb-1">O2 Saturation</p>
                            <p className="text-sm sm:text-lg font-bold text-cyan-800 dark:text-cyan-200">{record.vitals.oxygenSaturation}</p>
                          </div>
                        )}
                      </div>
                      
                      {record.currentVitals && (
                        <div className="mt-4 sm:mt-6">
                          <h5 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">Current Vitals</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded border border-indigo-200 dark:border-indigo-800">
                              <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">Age</p>
                              <p className="text-sm sm:text-lg font-bold text-indigo-800 dark:text-indigo-200">{record.currentVitals.age}</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                              <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Temperature</p>
                              <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{record.currentVitals.temperature}</p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                              <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">Blood Pressure</p>
                              <p className="text-lg font-bold text-red-800 dark:text-red-200">{record.currentVitals.bloodPressure}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                              <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Pulse Rate</p>
                              <p className="text-lg font-bold text-green-800 dark:text-green-200">{record.currentVitals.pulse}</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                              <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">Weight</p>
                              <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{record.currentVitals.weight}</p>
                            </div>
                            {record.currentVitals.height && (
                              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                                <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">Height</p>
                                <p className="text-lg font-bold text-orange-800 dark:text-orange-200">{record.currentVitals.height}</p>
                              </div>
                            )}
                            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded border border-cyan-200 dark:border-cyan-800">
                              <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300 mb-1">O2 Saturation</p>
                              <p className="text-lg font-bold text-cyan-800 dark:text-cyan-200">{record.currentVitals.oxygenSaturation}</p>
                            </div>
                            <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded border border-teal-200 dark:border-teal-800">
                              <p className="text-xs font-medium text-teal-700 dark:text-teal-300 mb-1">Respiratory Rate</p>
                              <p className="text-lg font-bold text-teal-800 dark:text-teal-200">{record.currentVitals.respiratoryRate}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800 mt-4 sm:mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
