import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Stethoscope, Calendar, User, Heart, Brain, Eye } from "lucide-react";

interface ViewRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  patientId: string;
}

export const ViewRecordsDialog = ({ open, onOpenChange, patientName, patientId }: ViewRecordsDialogProps) => {
  // Different medical records for different patients - updated to reflect 10 student records
  const getPatientRecords = (patientId: string) => {
    const recordsMap: Record<string, any[]> = {
      "P001234": [ // Adaora Okonkwo
        {
          id: "R001",
          date: "2024-06-05",
          type: "Emergency",
          diagnosis: "Severe malaria with cerebral complications",
          doctor: "Dr. Fatima Aliyu",
          vitals: { temperature: "40.1°C", bloodPressure: "90/60 mmHg", pulse: "120 bpm", weight: "58 kg" },
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
          vitals: { temperature: "37.8°C", bloodPressure: "130/85 mmHg", pulse: "95 bpm", weight: "61 kg" },
          notes: "Severe bone pain in extremities. Managed with strong analgesics and IV hydration therapy.",
          icon: Stethoscope
        }
      ],
      "P001236": [ // Blessing Eze
        {
          id: "R003",
          date: "2024-06-08",
          type: "Follow-up",
          diagnosis: "Typhoid fever - severe case",
          doctor: "Dr. Aisha Mohammed",
          vitals: { temperature: "39.2°C", bloodPressure: "110/70 mmHg", pulse: "88 bpm", weight: "52 kg" },
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
          vitals: { temperature: "36.8°C", bloodPressure: "125/80 mmHg", pulse: "102 bpm", weight: "65 kg" },
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
          vitals: { temperature: "36.5°C", bloodPressure: "100/65 mmHg", pulse: "78 bpm", weight: "55 kg" },
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
          vitals: { temperature: "36.7°C", bloodPressure: "120/75 mmHg", pulse: "70 bpm", weight: "68 kg" },
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
          vitals: { temperature: "37.5°C", bloodPressure: "112/70 mmHg", pulse: "82 bpm", weight: "51 kg" },
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
          vitals: { temperature: "37.2°C", bloodPressure: "118/75 mmHg", pulse: "85 bpm", weight: "74 kg" },
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
          vitals: { temperature: "36.6°C", bloodPressure: "125/82 mmHg", pulse: "88 bpm", weight: "63 kg" },
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
          vitals: { temperature: "37.3°C", bloodPressure: "115/70 mmHg", pulse: "92 bpm", weight: "67 kg" },
          notes: "Pulmonary tuberculosis on intensive phase. Sputum conversion expected. Contact tracing completed.",
          icon: Stethoscope
        }
      ],
      "S001": [ // Dr. Fatima Aliyu (Staff)
        {
          id: "R011",
          date: "2024-06-01",
          type: "Check-up",
          diagnosis: "Annual health screening - normal",
          doctor: "Dr. John Okafor",
          vitals: { temperature: "36.6°C", bloodPressure: "118/72 mmHg", pulse: "68 bpm", weight: "62 kg" },
          notes: "Routine health check for staff member. All parameters within normal limits. Immunization status up to date.",
          icon: Eye
        }
      ],
      "S002": [ // Prof. John Okafor (Staff)
        {
          id: "R012",
          date: "2024-05-15",
          type: "Treatment",
          diagnosis: "Essential hypertension",
          doctor: "Dr. Aisha Mohammed",
          vitals: { temperature: "36.4°C", bloodPressure: "145/92 mmHg", pulse: "75 bpm", weight: "78 kg" },
          notes: "Blood pressure control with ACE inhibitors. Lifestyle modification counseling. Regular monitoring advised.",
          icon: Heart
        }
      ]
    };

    return recordsMap[patientId] || [
      {
        id: "R999",
        date: "2024-06-01",
        type: "Consultation",
        diagnosis: "General health consultation",
        doctor: "Dr. General Practitioner",
        vitals: { temperature: "36.5°C", bloodPressure: "120/80 mmHg", pulse: "72 bpm", weight: "65 kg" },
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
        <DialogHeader className="pb-6 border-b dark:border-gray-700">
          <DialogTitle className="flex items-center gap-3 dark:text-gray-100 text-xl">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <span className="block text-xl font-bold">Medical Records</span>
              <span className="text-lg font-normal text-muted-foreground dark:text-gray-400">
                {patientName} ({patientId})
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-6">
          {records.map((record) => {
            const IconComponent = record.icon;
            return (
              <Card key={record.id} className="border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200 dark:bg-gray-900 dark:border-gray-700">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20">
                        <IconComponent className="h-6 w-6 text-primary flex-shrink-0" />
                      </div>
                      <div>
                        <Badge className={getRecordTypeColor(record.type)}>
                          {record.type}
                        </Badge>
                        <p className="text-base text-muted-foreground dark:text-gray-400 mt-2 font-medium">{record.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-base text-muted-foreground dark:text-gray-400 bg-muted/30 dark:bg-gray-800/30 px-4 py-2 rounded-lg">
                      <User className="h-5 w-5" />
                      <span className="font-medium">{record.doctor}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h4 className="font-bold text-foreground dark:text-gray-100 mb-4 text-xl flex items-center gap-3">
                        <Stethoscope className="h-5 w-5 text-primary" />
                        Diagnosis & Treatment
                      </h4>
                      <div className="space-y-5">
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-5 rounded-xl border border-primary/20">
                          <p className="font-semibold text-sm text-primary dark:text-primary-foreground mb-2 uppercase tracking-wide">Primary Diagnosis</p>
                          <p className="text-foreground dark:text-gray-100 font-bold text-lg">{record.diagnosis}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-base text-muted-foreground dark:text-gray-400 mb-3 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Clinical Notes & Treatment Plan
                          </p>
                          <p className="text-base text-muted-foreground dark:text-gray-300 leading-relaxed bg-muted/50 dark:bg-gray-800/50 p-4 rounded-xl border border-border/30">
                            {record.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-foreground dark:text-gray-100 mb-4 text-xl flex items-center gap-3">
                        <Heart className="h-5 w-5 text-red-500" />
                        Vital Signs
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700 shadow-sm">
                          <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">Temperature</p>
                          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{record.vitals.temperature}</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 p-4 rounded-xl border border-red-200 dark:border-red-700 shadow-sm">
                          <p className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wider mb-1">Blood Pressure</p>
                          <p className="text-2xl font-bold text-red-800 dark:text-red-200">{record.vitals.bloodPressure}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border border-green-200 dark:border-green-700 shadow-sm">
                          <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wider mb-1">Pulse Rate</p>
                          <p className="text-2xl font-bold text-green-800 dark:text-green-200">{record.vitals.pulse}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700 shadow-sm">
                          <p className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-1">Weight</p>
                          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{record.vitals.weight}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-end pt-8 border-t dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            className="hover:bg-muted dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 px-8 py-3 text-base font-medium"
          >
            Close Records
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
