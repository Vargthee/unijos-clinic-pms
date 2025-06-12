
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Medical Entry Added",
      description: `New medical entry has been added for ${patientName}`,
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
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical Entry - {patientName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Visit Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
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
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Input
                id="diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                placeholder="Enter diagnosis"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="treatment">Treatment</Label>
            <Input
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({...formData, treatment: e.target.value})}
              placeholder="Enter treatment plan"
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Clinical Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Enter detailed clinical notes"
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Vital Signs</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                  placeholder="36.5"
                />
              </div>
              <div>
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                  placeholder="120/80"
                />
              </div>
              <div>
                <Label htmlFor="pulse">Pulse (bpm)</Label>
                <Input
                  id="pulse"
                  value={formData.pulse}
                  onChange={(e) => setFormData({...formData, pulse: e.target.value})}
                  placeholder="72"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  placeholder="65"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  placeholder="170"
                />
              </div>
              <div>
                <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                <Input
                  id="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={(e) => setFormData({...formData, respiratoryRate: e.target.value})}
                  placeholder="16"
                />
              </div>
              <div>
                <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
                <Input
                  id="oxygenSaturation"
                  value={formData.oxygenSaturation}
                  onChange={(e) => setFormData({...formData, oxygenSaturation: e.target.value})}
                  placeholder="98"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Add Entry</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
