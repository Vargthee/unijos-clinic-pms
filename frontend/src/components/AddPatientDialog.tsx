
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
import { PatientCreate } from "../types";
import apiService from "../services/api";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddPatientDialog = ({ open, onOpenChange, onSuccess }: AddPatientDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    matricNumber: "",
    staffId: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    patientType: "",
    phone: "",
    email: "",
    faculty: "",
    department: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || (!formData.matricNumber && !formData.staffId) || !formData.email || !formData.emergencyContactName || !formData.dateOfBirth || !formData.gender || !formData.patientType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate phone numbers
    if (!apiService.validateNigerianPhone(formData.phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid Nigerian phone number",
        variant: "destructive",
      });
      return;
    }

    if (!apiService.validateNigerianPhone(formData.emergencyContactPhone)) {
      toast({
        title: "Error",
        description: "Please enter a valid emergency contact phone number",
        variant: "destructive",
      });
      return;
    }

    // Validate email
    if (!apiService.validateEmail(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Validate matric number for students
    if (formData.patientType === "Student" && formData.matricNumber && !apiService.validateMatricNumber(formData.matricNumber)) {
      toast({
        title: "Error",
        description: "Please enter a valid University of Jos matric number (e.g., UJ/2023/ENG/0123)",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Prepare patient data
      const patientData: PatientCreate = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        patient_type: formData.patientType as 'Student' | 'Staff',
        address: formData.address,
        emergency_contact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
          relationship: formData.emergencyContactRelationship
        },
        
        // Optional fields
        blood_type: formData.bloodType as any,
        genotype: formData.genotype || undefined,
        allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [],
        chronic_conditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(c => c.trim()) : [],
        current_medications: formData.currentMedications ? formData.currentMedications.split(',').map(m => m.trim()) : [],
        medical_history: formData.medicalHistory ? formData.medicalHistory.split(',').map(h => h.trim()) : [],
        family_medical_history: formData.familyMedicalHistory || undefined,
        
        faculty: formData.faculty || undefined,
        department: formData.department || undefined,
        level: formData.level || undefined,
        matric_number: formData.matricNumber || undefined,
        staff_id: formData.staffId || undefined,
        
        height_cm: formData.height ? parseFloat(formData.height) : undefined,
        weight_kg: formData.weight ? parseFloat(formData.weight) : undefined,
        smoking_status: formData.smokingStatus || undefined,
        alcohol_consumption: formData.alcoholConsumption || undefined,
        exercise_frequency: formData.exerciseFrequency || undefined,
        
        vaccination_status: formData.vaccinationStatus || undefined,
        last_tetanus_shot: formData.lastTetanusShot || undefined,
        covid_vaccination: formData.covidVaccination || undefined
      };

      // Create patient
      const createdPatient = await apiService.createPatient(patientData);
      
      // Show success message with warnings if any
      let successMessage = "Patient medical record created successfully with comprehensive health profile";
      if (createdPatient.warnings && createdPatient.warnings.length > 0) {
        successMessage += `. Note: ${createdPatient.warnings.length} warning(s) detected - please review.`;
      }
      
      toast({
        title: "Success",
        description: successMessage,
        variant: createdPatient.warnings && createdPatient.warnings.length > 0 ? "destructive" : "default",
      });
      
      // Reset form and close dialog
      resetForm();
      onOpenChange(false);
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error('Error creating patient:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create patient record",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", matricNumber: "", staffId: "", age: "", dateOfBirth: "", gender: "", patientType: "",
      phone: "", email: "", faculty: "", department: "", level: "", bloodType: "", genotype: "", address: "",
      emergencyContactName: "", emergencyContactPhone: "", emergencyContactRelationship: "",
      allergies: "", currentMedications: "", medicalHistory: "", chronicConditions: "", 
      previousSurgeries: "", familyMedicalHistory: "", height: "", weight: "", bmi: "", 
      smokingStatus: "", alcoholConsumption: "", exerciseFrequency: "", vaccinationStatus: "", 
      lastTetanusShot: "", covidVaccination: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate age when date of birth changes
      if (field === 'dateOfBirth' && value) {
        const age = apiService.calculateAge(value);
        newData.age = age.toString();
      }
      
      // Auto-calculate BMI when height or weight changes
      if ((field === 'height' || field === 'weight') && newData.height && newData.weight) {
        const bmi = apiService.calculateBMI(parseFloat(newData.height), parseFloat(newData.weight));
        newData.bmi = bmi.toString();
      }
      
      return newData;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl dark:text-gray-100">
            Register New {formData.patientType || 'Patient'} - Comprehensive Medical Profile
          </DialogTitle>
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
            calculateBMI={() => {
              if (formData.height && formData.weight) {
                const bmi = apiService.calculateBMI(parseFloat(formData.height), parseFloat(formData.weight));
                handleInputChange("bmi", bmi.toString());
              }
            }}
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
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 h-12 text-base flex-1"
              disabled={loading}
            >
              {loading ? "Creating..." : `Register ${formData.patientType || 'Patient'}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
