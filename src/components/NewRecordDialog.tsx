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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Stethoscope, Activity } from "lucide-react";

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
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            Create New Medical Record
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information Section */}
          <Card className="border border-border/50 bg-gradient-to-br from-blue-50/30 to-blue-100/20 dark:from-blue-900/20 dark:to-blue-800/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Patient Information</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId" className="text-sm font-medium">Patient ID *</Label>
                  <Input
                    id="patientId"
                    value={formData.patientId}
                    onChange={(e) => handleInputChange("patientId", e.target.value)}
                    placeholder="P001234 or UJ/2024/XXX/0000"
                    required
                    disabled={isSubmitting}
                    className="h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recordType" className="text-sm font-medium">Record Type *</Label>
                  <Select 
                    value={formData.recordType} 
                    onValueChange={(value) => handleInputChange("recordType", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select record type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency">🚨 Emergency</SelectItem>
                      <SelectItem value="Treatment">💊 Treatment</SelectItem>
                      <SelectItem value="Consultation">👩‍⚕️ Consultation</SelectItem>
                      <SelectItem value="Follow-up">📋 Follow-up</SelectItem>
                      <SelectItem value="Counseling">🧠 Counseling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information Section */}
          <Card className="border border-border/50 bg-gradient-to-br from-green-50/30 to-green-100/20 dark:from-green-900/20 dark:to-green-800/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Medical Information</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis" className="text-sm font-medium">Primary Diagnosis *</Label>
                  <Input
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                    placeholder="Enter primary diagnosis"
                    required
                    disabled={isSubmitting}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor" className="text-sm font-medium">Attending Physician *</Label>
                  <Select 
                    value={formData.doctor} 
                    onValueChange={(value) => handleInputChange("doctor", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select attending physician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Fatima Aliyu">Dr. Fatima Aliyu - General Medicine</SelectItem>
                      <SelectItem value="Dr. John Okafor">Dr. John Okafor - Psychiatry</SelectItem>
                      <SelectItem value="Dr. Aisha Mohammed">Dr. Aisha Mohammed - Internal Medicine</SelectItem>
                      <SelectItem value="Dr. Peter Nnamdi">Dr. Peter Nnamdi - Emergency Medicine</SelectItem>
                      <SelectItem value="Dr. Grace Musa">Dr. Grace Musa - Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications" className="text-sm font-medium">Prescribed Medications</Label>
                  <Textarea
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => handleInputChange("medications", e.target.value)}
                    placeholder="List medications with dosages (one per line)&#10;Example: Paracetamol 500mg - 3 times daily"
                    rows={4}
                    disabled={isSubmitting}
                    className="text-base resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vital Signs Section */}
          <Card className="border border-border/50 bg-gradient-to-br from-red-50/30 to-red-100/20 dark:from-red-900/20 dark:to-red-800/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Vital Signs</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-xs font-medium">Age (years)</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="20"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="text-xs font-medium">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange("temperature", e.target.value)}
                    placeholder="36.5"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure" className="text-xs font-medium">Blood Pressure</Label>
                  <Input
                    id="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                    placeholder="120/80 mmHg"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pulse" className="text-xs font-medium">Pulse (bpm)</Label>
                  <Input
                    id="pulse"
                    value={formData.pulse}
                    onChange={(e) => handleInputChange("pulse", e.target.value)}
                    placeholder="72"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-xs font-medium">Weight (kg)</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="65"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-xs font-medium">Height (cm)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="170"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respiratoryRate" className="text-xs font-medium">Respiratory Rate</Label>
                  <Input
                    id="respiratoryRate"
                    value={formData.respiratoryRate}
                    onChange={(e) => handleInputChange("respiratoryRate", e.target.value)}
                    placeholder="16"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oxygenSaturation" className="text-xs font-medium">Oxygen Saturation (%)</Label>
                  <Input
                    id="oxygenSaturation"
                    value={formData.oxygenSaturation}
                    onChange={(e) => handleInputChange("oxygenSaturation", e.target.value)}
                    placeholder="98"
                    disabled={isSubmitting}
                    className="h-11 text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clinical Notes Section */}
          <Card className="border border-border/50 bg-gradient-to-br from-purple-50/30 to-purple-100/20 dark:from-purple-900/20 dark:to-purple-800/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Clinical Documentation</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">Clinical Notes & Observations</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Enter detailed clinical notes, observations, and treatment plan..."
                    rows={5}
                    disabled={isSubmitting}
                    className="text-base resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload Section */}
          <Card className="border border-border/50 bg-gradient-to-br from-orange-50/30 to-orange-100/20 dark:from-orange-900/20 dark:to-orange-800/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Supporting Documents</h3>
              </div>
              <FileUpload
                onFilesChange={setFiles}
                maxFiles={5}
                acceptedTypes={['image/*', 'application/pdf', '.doc', '.docx']}
                maxSize={10}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="h-12 text-base flex-1 hover:scale-105 transition-transform duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 h-12 text-base flex-1 hover:scale-105 transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loading size="sm" className="mr-2" />
                  Creating Record...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Create Medical Record
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};