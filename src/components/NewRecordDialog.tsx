
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface NewRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewRecordDialog = ({ open, onOpenChange }: NewRecordDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientId: "",
    recordType: "",
    diagnosis: "",
    doctor: "",
    medications: "",
    notes: "",
    temperature: "",
    bloodPressure: "",
    pulse: "",
    weight: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.diagnosis || !formData.doctor) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Medical record created successfully",
    });
    
    // Reset form and close dialog
    setFormData({
      patientId: "",
      recordType: "",
      diagnosis: "",
      doctor: "",
      medications: "",
      notes: "",
      temperature: "",
      bloodPressure: "",
      pulse: "",
      weight: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Medical Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => handleInputChange("patientId", e.target.value)}
                placeholder="P001234"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recordType">Record Type</Label>
              <Select value={formData.recordType} onValueChange={(value) => handleInputChange("recordType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Treatment">Treatment</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Counseling">Counseling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis *</Label>
            <Input
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => handleInputChange("diagnosis", e.target.value)}
              placeholder="Enter diagnosis"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor *</Label>
            <Select value={formData.doctor} onValueChange={(value) => handleInputChange("doctor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Fatima Aliyu">Dr. Fatima Aliyu</SelectItem>
                <SelectItem value="Dr. John Okafor">Dr. John Okafor</SelectItem>
                <SelectItem value="Dr. Aisha Mohammed">Dr. Aisha Mohammed</SelectItem>
                <SelectItem value="Dr. Peter Nnamdi">Dr. Peter Nnamdi</SelectItem>
                <SelectItem value="Dr. Grace Musa">Dr. Grace Musa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">Medications</Label>
            <Textarea
              id="medications"
              value={formData.medications}
              onChange={(e) => handleInputChange("medications", e.target.value)}
              placeholder="List medications (one per line)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Vital Signs</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange("temperature", e.target.value)}
                  placeholder="36.5°C"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                  placeholder="120/80 mmHg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pulse">Pulse</Label>
                <Input
                  id="pulse"
                  value={formData.pulse}
                  onChange={(e) => handleInputChange("pulse", e.target.value)}
                  placeholder="78 bpm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="65 kg"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Clinical Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Enter clinical notes and observations"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
