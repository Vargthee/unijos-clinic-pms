
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Stethoscope, Calendar, User } from "lucide-react";

interface ViewRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  patientId: string;
}

export const ViewRecordsDialog = ({ open, onOpenChange, patientName, patientId }: ViewRecordsDialogProps) => {
  // Sample medical records data
  const records = [
    {
      id: "R001",
      date: "2024-06-05",
      type: "Consultation",
      diagnosis: "Stress-related headaches",
      doctor: "Dr. Fatima Aliyu",
      vitals: {
        temperature: "36.8°C",
        bloodPressure: "115/75 mmHg",
        pulse: "78 bpm",
        weight: "58 kg",
      }
    },
    {
      id: "R002",
      date: "2024-05-20",
      type: "Check-up",
      diagnosis: "General health assessment",
      doctor: "Dr. John Okafor",
      vitals: {
        temperature: "36.6°C",
        bloodPressure: "118/76 mmHg",
        pulse: "75 bpm",
        weight: "57 kg",
      }
    }
  ];

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case "Consultation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Check-up":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Medical Records - {patientName}
            <span className="text-sm text-muted-foreground">({patientId})</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="border border-border/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getRecordTypeColor(record.type)}>
                      {record.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{record.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {record.doctor}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Diagnosis</h4>
                    <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Vital Signs
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-muted p-2 rounded">
                        <p className="font-medium">Temperature</p>
                        <p className="text-muted-foreground">{record.vitals.temperature}</p>
                      </div>
                      <div className="bg-muted p-2 rounded">
                        <p className="font-medium">BP</p>
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
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
