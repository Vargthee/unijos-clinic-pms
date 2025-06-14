
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
  // Different medical records for different patients
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
      "S001": [ // Dr. Fatima Aliyu (Staff)
        {
          id: "R007",
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
          id: "R008",
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 dark:text-gray-100">
            <FileText className="h-5 w-5 text-primary" />
            Medical Records - {patientName}
            <span className="text-sm text-muted-foreground dark:text-gray-400">({patientId})</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {records.map((record) => {
            const IconComponent = record.icon;
            return (
              <Card key={record.id} className="border border-border/50 hover-lift dark:bg-gray-900 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getRecordTypeColor(record.type)}>
                        {record.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground dark:text-gray-400">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                      <User className="h-4 w-4" />
                      {record.doctor}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-gray-100 mb-2 flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-primary" />
                        Diagnosis
                      </h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300 mb-3">{record.diagnosis}</p>
                      <h5 className="font-medium text-foreground dark:text-gray-200 mb-1">Notes</h5>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">{record.notes}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-gray-100 mb-2 flex items-center gap-2">
                        <Stethoscope className="h-4 w-4" />
                        Vital Signs
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-muted dark:bg-gray-700 p-2 rounded">
                          <p className="font-medium dark:text-gray-200">Temperature</p>
                          <p className="text-muted-foreground dark:text-gray-400">{record.vitals.temperature}</p>
                        </div>
                        <div className="bg-muted dark:bg-gray-700 p-2 rounded">
                          <p className="font-medium dark:text-gray-200">BP</p>
                          <p className="text-muted-foreground dark:text-gray-400">{record.vitals.bloodPressure}</p>
                        </div>
                        <div className="bg-muted dark:bg-gray-700 p-2 rounded">
                          <p className="font-medium dark:text-gray-200">Pulse</p>
                          <p className="text-muted-foreground dark:text-gray-400">{record.vitals.pulse}</p>
                        </div>
                        <div className="bg-muted dark:bg-gray-700 p-2 rounded">
                          <p className="font-medium dark:text-gray-200">Weight</p>
                          <p className="text-muted-foreground dark:text-gray-400">{record.vitals.weight}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="hover-scale dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
