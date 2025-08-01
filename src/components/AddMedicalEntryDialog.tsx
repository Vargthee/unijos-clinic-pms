
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "./FileUpload";

interface AddMedicalEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
}

export const AddMedicalEntryDialog = ({ open, onOpenChange, patientName }: AddMedicalEntryDialogProps) => {
  const [formData, setFormData] = useState({
    type: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    temperature: "",
    bloodPressure: "",
    pulse: "",
    weight: "",
    height: "",
    respiratoryRate: "",
    oxygenSaturation: ""
  });
  const [files, setFiles] = useState<File[]>([]);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Medical Entry Added",
      description: `New medical entry has been added for ${patientName}${files.length > 0 ? ` with ${files.length} file(s)` : ''}`,
    });
    onOpenChange(false);
    setFormData({
      type: "",
      diagnosis: "",
      treatment: "",
      notes: "",
      temperature: "",
      bloodPressure: "",
      pulse: "",
      weight: "",
      height: "",
      respiratoryRate: "",
      oxygenSaturation: ""
    });
    setFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">Add Medical Entry - {patientName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type" className="text-sm font-medium">Visit Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="treatment">Treatment</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="counseling">Counseling</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="diagnosis" className="text-sm font-medium">Diagnosis</Label>
              <Input
                id="diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                placeholder="Enter diagnosis"
                required
                className="h-12 text-base"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="treatment" className="text-sm font-medium">Treatment</Label>
            <Input
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({...formData, treatment: e.target.value})}
              placeholder="Enter treatment plan"
              required
              className="h-12 text-base"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-medium">Clinical Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Enter detailed clinical notes"
              rows={3}
              className="text-base resize-none"
            />
          </div>

          {/* Vital Signs Section */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 text-sm">Vital Signs</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="age" className="text-xs">Age (years)</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  placeholder="20"
                  className="h-11 text-base"
                />
              </div>
              <div>
                <Label htmlFor="temperature" className="text-xs">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                  placeholder="36.5"
                  className="h-11 text-base"
                />
              </div>
              <div>
                <Label htmlFor="bloodPressure" className="text-xs">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                  placeholder="120/80"
                  className="h-11 text-base"
                />
              </div>
              <div>
                <Label htmlFor="pulse" className="text-xs">Pulse (bpm)</Label>
                <Input
                  id="pulse"
                  value={formData.pulse}
                  onChange={(e) => setFormData({...formData, pulse: e.target.value})}
                  placeholder="72"
                  className="h-11 text-base"
                />
              </div>
              <div>
                <Label htmlFor="weight" className="text-xs">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  placeholder="65"
                  className="h-11 text-base"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-xs">Height (cm)</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  placeholder="170"
                  className="h-11 text-base"
                />
              </div>
              <div>
                <Label htmlFor="respiratoryRate" className="text-xs">Respiratory Rate</Label>
                <Input
                  id="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={(e) => setFormData({...formData, respiratoryRate: e.target.value})}
                  placeholder="16"
                  className="h-11 text-base"
                />
              </div>
              <div>
                <Label htmlFor="oxygenSaturation" className="text-xs">Oxygen Saturation (%)</Label>
                <Input
                  id="oxygenSaturation"
                  value={formData.oxygenSaturation}
                  onChange={(e) => setFormData({...formData, oxygenSaturation: e.target.value})}
                  placeholder="98"
                  className="h-11 text-base"
                />
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="border-t pt-4">
            <Label className="text-sm font-medium">Medical Documents</Label>
            <div className="mt-2">
              <FileUpload
                onFilesChange={setFiles}
                maxFiles={5}
                acceptedTypes={['image/*', 'application/pdf', '.doc', '.docx']}
                maxSize={10}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              type="submit" 
              className="h-12 text-base flex-1 order-2 sm:order-1"
            >
              Add Entry
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="h-12 text-base flex-1 order-1 sm:order-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
