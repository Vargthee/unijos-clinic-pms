
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loading } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "./FileUpload";

interface NewRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewRecordDialog = ({ open, onOpenChange }: NewRecordDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    patientId: "",
    recordType: "",
    diagnosis: "",
    doctor: "",
    medications: "",
    notes: "",
    age: "",
    temperature: "",
    bloodPressure: "",
    pulse: "",
    weight: "",
    height: "",
    respiratoryRate: "",
    oxygenSaturation: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.diagnosis || !formData.doctor) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: `Medical record created successfully${files.length > 0 ? ` with ${files.length} file(s)` : ''}`,
      });
      
      // Reset form and close dialog
      setFormData({
        patientId: "",
        recordType: "",
        diagnosis: "",
        doctor: "",
        medications: "",
        notes: "",
        age: "",
        temperature: "",
        bloodPressure: "",
        pulse: "",
        weight: "",
        height: "",
        respiratoryRate: "",
        oxygenSaturation: ""
      });
      setFiles([]);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create medical record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">Create New Medical Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId" className="text-sm font-medium">Patient ID *</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => handleInputChange("patientId", e.target.value)}
                placeholder="P001234"
                required
                disabled={isSubmitting}
                className="h-12 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recordType" className="text-sm font-medium">Record Type</Label>
              <Select 
                value={formData.recordType} 
                onValueChange={(value) => handleInputChange("recordType", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-12 text-base">
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

          {/* Medical Info Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diagnosis" className="text-sm font-medium">Diagnosis *</Label>
              <Input
                id="diagnosis"
                value={formData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                placeholder="Enter diagnosis"
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor" className="text-sm font-medium">Doctor *</Label>
              <Select value={formData.doctor} onValueChange={(value) => handleInputChange("doctor", value)}>
                <SelectTrigger className="h-12 text-base">
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
              <Label htmlFor="medications" className="text-sm font-medium">Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange("medications", e.target.value)}
                placeholder="List medications (one per line)"
                rows={3}
                className="text-base resize-none"
              />
            </div>
          </div>

          {/* Vital Signs Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Vital Signs</Label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-xs">Age (years)</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="20"
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-xs">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange("temperature", e.target.value)}
                  placeholder="36.5"
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure" className="text-xs">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                  placeholder="120/80 mmHg"
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pulse" className="text-xs">Pulse (bpm)</Label>
                <Input
                  id="pulse"
                  value={formData.pulse}
                  onChange={(e) => handleInputChange("pulse", e.target.value)}
                  placeholder="72"
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-xs">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="65"
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-xs">Height (cm)</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="170"
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="respiratoryRate" className="text-xs">Respiratory Rate</Label>
                <Input
                  id="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={(e) => handleInputChange("respiratoryRate", e.target.value)}
                  placeholder="16"
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oxygenSaturation" className="text-xs">Oxygen Saturation (%)</Label>
                <Input
                  id="oxygenSaturation"
                  value={formData.oxygenSaturation}
                  onChange={(e) => handleInputChange("oxygenSaturation", e.target.value)}
                  placeholder="98"
                  className="h-11 text-base"
                />
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Medical Documents</Label>
            <FileUpload
              onFilesChange={setFiles}
              maxFiles={5}
              acceptedTypes={['image/*', 'application/pdf', '.doc', '.docx']}
              maxSize={10}
            />
          </div>

          {/* Clinical Notes Section */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">Clinical Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Enter clinical notes and observations"
              rows={4}
              className="text-base resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="h-12 text-base flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 h-12 text-base flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loading size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                'Create Record'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
