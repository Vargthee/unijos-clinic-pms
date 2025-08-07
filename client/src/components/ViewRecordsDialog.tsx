import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ViewRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  records: any[];
}

export function ViewRecordsDialog({ 
  open, 
  onOpenChange, 
  patientName, 
  records 
}: ViewRecordsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Medical Records - {patientName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="space-y-4">
            {records.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No medical records found for this patient.
              </p>
            ) : (
              records.map((record, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{record.title || `Record ${index + 1}`}</h4>
                    <span className="text-sm text-muted-foreground">
                      {record.date || new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{record.description || "No description available"}</p>
                  {record.diagnosis && (
                    <div>
                      <strong>Diagnosis:</strong> {record.diagnosis}
                    </div>
                  )}
                  {record.treatment && (
                    <div>
                      <strong>Treatment:</strong> {record.treatment}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewRecordsDialog;