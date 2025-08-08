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
          type: "Treatment",
          diagnosis: "Uncomplicated malaria (P. falciparum)",
          doctor: "Dr. Fatima Aliyu",
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
          notes: "34-year-old female with uncomplicated malaria. Rapid diagnostic test positive for P. falciparum. Good response to ACT.",
          icon: Heart
        }
      ],
      "P001236": [ // Blessing Eze
        {
          id: "R003",
          date: "2024-06-08",
          type: "Treatment",
          diagnosis: "Gastroenteritis (acute)",
          doctor: "Dr. Aisha Mohammed",
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
          notes: "32-year-old female with acute gastroenteritis. Likely food-borne illness. Well hydrated, no signs of severe dehydration.",
          icon: Eye
        }
      ],
      "P001237": [ // Yusuf Abdullahi
        {
          id: "R004",
          date: "2024-06-09",
          type: "Emergency",
          diagnosis: "Acute asthma exacerbation",
          doctor: "Dr. Grace Musa",
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
          notes: "36-year-old male with acute asthma exacerbation triggered by dust exposure. Peak flow 40% of predicted.",
          icon: Brain
        }
      ]
    };

    return recordsMap[patientId] || [
      {
        id: "R999",
        date: "2024-06-01",
        type: "Consultation",
        diagnosis: "General health consultation",
        doctor: "Dr. Sijuwade Adedotun",
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
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Medical Records - {patientName} ({patientId})
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {records.map((record) => {
            const IconComponent = record.icon;
            return (
              <Card key={record.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                      <div>
                        <Badge className={getRecordTypeColor(record.type)}>
                          {record.type}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{record.doctor}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Diagnosis & Treatment</h4>
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded border">
                          <p className="font-medium text-sm mb-1">Diagnosis:</p>
                          <p className="text-sm">{record.diagnosis}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-2">Clinical Notes:</p>
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Vital Signs</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded border">
                          <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Age
                          </p>
                          <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">{record.vitals.age}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border">
                          <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Temperature</p>
                          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{record.vitals.temperature}</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border">
                          <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">Blood Pressure</p>
                          <p className="text-lg font-bold text-red-800 dark:text-red-200">{record.vitals.bloodPressure}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border">
                          <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Pulse Rate</p>
                          <p className="text-lg font-bold text-green-800 dark:text-green-200">{record.vitals.pulse}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border">
                          <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">Weight</p>
                          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{record.vitals.weight}</p>
                        </div>
                        {record.vitals.height && (
                          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border">
                            <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">Height</p>
                            <p className="text-lg font-bold text-orange-800 dark:text-orange-200">{record.vitals.height}</p>
                          </div>
                        )}
                        {record.vitals.respiratoryRate && (
                          <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded border">
                            <p className="text-xs font-medium text-teal-700 dark:text-teal-300 mb-1">Respiratory Rate</p>
                            <p className="text-lg font-bold text-teal-800 dark:text-teal-200">{record.vitals.respiratoryRate}</p>
                          </div>
                        )}
                        {record.vitals.oxygenSaturation && (
                          <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded border">
                            <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300 mb-1">O2 Saturation</p>
                            <p className="text-lg font-bold text-cyan-800 dark:text-cyan-200">{record.vitals.oxygenSaturation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};