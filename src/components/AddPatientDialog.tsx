
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { BasicInfoSection } from "./registration/BasicInfoSection";
import { EmergencyContactSection } from "./registration/EmergencyContactSection";
import { MedicalInfoSection } from "./registration/MedicalInfoSection";
import { HealthAssessmentSection } from "./registration/HealthAssessmentSection";
import { VaccinationSection } from "./registration/VaccinationSection";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPatientDialog = ({ open, onOpenChange }: AddPatientDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    matricNumber: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    faculty: "",
    level: "",
    bloodType: "",
    genotype: "",
    address: "",
    
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    
    // Medical Information
    allergies: "",
    currentMedications: "",
    medicalHistory: "",
    chronicConditions: "",
    previousSurgeries: "",
    familyMedicalHistory: "",
    
    // Health Assessment
    height: "",
    weight: "",
    bmi: "",
    smokingStatus: "",
    alcoholConsumption: "",
    exerciseFrequency: "",
    
    // Vaccination Status
    vaccinationStatus: "",
    lastTetanusShot: "",
    covidVaccination: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.matricNumber || !formData.email || !formData.emergencyContactName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including emergency contact",
        variant: "destructive",
      });
      return;
    }

    // Simulate adding patient
    toast({
      title: "Success",
      description: "Student medical record created successfully with comprehensive health profile",
    });
    
    // Reset form and close dialog
    setFormData({
      name: "", matricNumber: "", age: "", dateOfBirth: "", gender: "", phone: "", email: "",
      faculty: "", level: "", bloodType: "", genotype: "", address: "", emergencyContactName: "",
      emergencyContactPhone: "", emergencyContactRelationship: "", allergies: "",
      currentMedications: "", medicalHistory: "", chronicConditions: "", previousSurgeries: "",
      familyMedicalHistory: "", height: "", weight: "", bmi: "", smokingStatus: "",
      alcoholConsumption: "", exerciseFrequency: "", vaccinationStatus: "", lastTetanusShot: "",
      covidVaccination: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate BMI when height and weight change
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightM = parseFloat(formData.height) / 100;
      const weightKg = parseFloat(formData.weight);
      const bmi = (weightKg / (heightM * heightM)).toFixed(1);
      handleInputChange("bmi", bmi);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl dark:text-gray-100">Register New Student - Comprehensive Medical Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />
          <Separator className="dark:bg-gray-600" />
          
          <EmergencyContactSection formData={formData} handleInputChange={handleInputChange} />
          <Separator className="dark:bg-gray-600" />
          
          <MedicalInfoSection formData={formData} handleInputChange={handleInputChange} />
          <Separator className="dark:bg-gray-600" />
          
          <HealthAssessmentSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
            calculateBMI={calculateBMI}
          />
          <Separator className="dark:bg-gray-600" />
          
          <VaccinationSection formData={formData} handleInputChange={handleInputChange} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t dark:border-gray-600">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 h-12 text-base flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 h-12 text-base flex-1"
            >
              Register Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
