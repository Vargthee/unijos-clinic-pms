
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

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
    covidVaccination: "",
    
    // Insurance & Medical Aid
    insuranceProvider: "",
    insuranceNumber: "",
    preferredDoctor: ""
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
      faculty: "", level: "", bloodType: "", address: "", emergencyContactName: "",
      emergencyContactPhone: "", emergencyContactRelationship: "", allergies: "",
      currentMedications: "", medicalHistory: "", chronicConditions: "", previousSurgeries: "",
      familyMedicalHistory: "", height: "", weight: "", bmi: "", smokingStatus: "",
      alcoholConsumption: "", exerciseFrequency: "", vaccinationStatus: "", lastTetanusShot: "",
      covidVaccination: "", insuranceProvider: "", insuranceNumber: "", preferredDoctor: ""
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
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-200">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="matricNumber" className="dark:text-gray-200">Matric Number *</Label>
                <Input
                  id="matricNumber"
                  value={formData.matricNumber}
                  onChange={(e) => handleInputChange("matricNumber", e.target.value)}
                  placeholder="UJ/2024/XXX/0000"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="dark:text-gray-200">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="dark:text-gray-200">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="08012345678"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="student@unijos.edu.ng"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="faculty" className="dark:text-gray-200">Faculty</Label>
                <Select value={formData.faculty} onValueChange={(value) => handleInputChange("faculty", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Social Sciences">Social Sciences</SelectItem>
                    <SelectItem value="Natural Sciences">Natural Sciences</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Management Sciences">Management Sciences</SelectItem>
                    <SelectItem value="Environmental Sciences">Environmental Sciences</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="Veterinary Medicine">Veterinary Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="level" className="dark:text-gray-200">Level</Label>
                <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="100L">100L</SelectItem>
                    <SelectItem value="200L">200L</SelectItem>
                    <SelectItem value="300L">300L</SelectItem>
                    <SelectItem value="400L">400L</SelectItem>
                    <SelectItem value="500L">500L</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType" className="dark:text-gray-200">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="dark:text-gray-200">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Student residential address"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
              />
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Emergency Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName" className="dark:text-gray-200">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Full name of emergency contact"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone" className="dark:text-gray-200">Emergency Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  placeholder="08012345678"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship" className="dark:text-gray-200">Relationship</Label>
                <Select value={formData.emergencyContactRelationship} onValueChange={(value) => handleInputChange("emergencyContactRelationship", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Medical Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="allergies" className="dark:text-gray-200">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="List any known allergies (food, medication, environmental)"
                  rows={3}
                  className="text-base resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMedications" className="dark:text-gray-200">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                  placeholder="List current medications and dosages"
                  rows={3}
                  className="text-base resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chronicConditions" className="dark:text-gray-200">Chronic Conditions</Label>
                <Textarea
                  id="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={(e) => handleInputChange("chronicConditions", e.target.value)}
                  placeholder="Any chronic medical conditions (diabetes, hypertension, asthma, etc.)"
                  rows={3}
                  className="text-base resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousSurgeries" className="dark:text-gray-200">Previous Surgeries</Label>
                <Textarea
                  id="previousSurgeries"
                  value={formData.previousSurgeries}
                  onChange={(e) => handleInputChange("previousSurgeries", e.target.value)}
                  placeholder="List any previous surgeries and dates"
                  rows={3}
                  className="text-base resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory" className="dark:text-gray-200">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                placeholder="Brief medical history including significant illnesses, hospitalizations"
                rows={3}
                className="text-base resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familyMedicalHistory" className="dark:text-gray-200">Family Medical History</Label>
              <Textarea
                id="familyMedicalHistory"
                value={formData.familyMedicalHistory}
                onChange={(e) => handleInputChange("familyMedicalHistory", e.target.value)}
                placeholder="Relevant family medical history (hereditary conditions, etc.)"
                rows={3}
                className="text-base resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Health Assessment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Health Assessment</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="dark:text-gray-200">Height (cm)</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => {
                    handleInputChange("height", e.target.value);
                    setTimeout(calculateBMI, 100);
                  }}
                  placeholder="170"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-11 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="dark:text-gray-200">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => {
                    handleInputChange("weight", e.target.value);
                    setTimeout(calculateBMI, 100);
                  }}
                  placeholder="65"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-11 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bmi" className="dark:text-gray-200">BMI</Label>
                <Input
                  id="bmi"
                  value={formData.bmi}
                  readOnly
                  placeholder="Auto-calculated"
                  className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300 h-11 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exerciseFrequency" className="dark:text-gray-200">Exercise Frequency</Label>
                <Select value={formData.exerciseFrequency} onValueChange={(value) => handleInputChange("exerciseFrequency", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-11 text-base">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Rarely">Rarely</SelectItem>
                    <SelectItem value="Never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smokingStatus" className="dark:text-gray-200">Smoking Status</Label>
                <Select value={formData.smokingStatus} onValueChange={(value) => handleInputChange("smokingStatus", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Never">Never</SelectItem>
                    <SelectItem value="Former">Former smoker</SelectItem>
                    <SelectItem value="Current">Current smoker</SelectItem>
                    <SelectItem value="Occasional">Occasional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alcoholConsumption" className="dark:text-gray-200">Alcohol Consumption</Label>
                <Select value={formData.alcoholConsumption} onValueChange={(value) => handleInputChange("alcoholConsumption", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select consumption level" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Never">Never</SelectItem>
                    <SelectItem value="Rarely">Rarely</SelectItem>
                    <SelectItem value="Socially">Socially</SelectItem>
                    <SelectItem value="Regularly">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Vaccination Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Vaccination Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="covidVaccination" className="dark:text-gray-200">COVID-19 Vaccination</Label>
                <Select value={formData.covidVaccination} onValueChange={(value) => handleInputChange("covidVaccination", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Fully Vaccinated">Fully Vaccinated</SelectItem>
                    <SelectItem value="Partially Vaccinated">Partially Vaccinated</SelectItem>
                    <SelectItem value="Not Vaccinated">Not Vaccinated</SelectItem>
                    <SelectItem value="Boosted">Boosted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastTetanusShot" className="dark:text-gray-200">Last Tetanus Shot</Label>
                <Input
                  id="lastTetanusShot"
                  type="date"
                  value={formData.lastTetanusShot}
                  onChange={(e) => handleInputChange("lastTetanusShot", e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vaccinationStatus" className="dark:text-gray-200">General Vaccination Status</Label>
                <Select value={formData.vaccinationStatus} onValueChange={(value) => handleInputChange("vaccinationStatus", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Up to date">Up to date</SelectItem>
                    <SelectItem value="Partially complete">Partially complete</SelectItem>
                    <SelectItem value="Needs update">Needs update</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Insurance & Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Insurance & Medical Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider" className="dark:text-gray-200">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                  placeholder="Insurance company name"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceNumber" className="dark:text-gray-200">Insurance Number</Label>
                <Input
                  id="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
                  placeholder="Policy/ID number"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDoctor" className="dark:text-gray-200">Preferred Doctor</Label>
                <Select value={formData.preferredDoctor} onValueChange={(value) => handleInputChange("preferredDoctor", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
                    <SelectValue placeholder="Select preferred doctor" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="Dr. Fatima Aliyu">Dr. Fatima Aliyu</SelectItem>
                    <SelectItem value="Dr. John Okafor">Dr. John Okafor</SelectItem>
                    <SelectItem value="Dr. Aisha Mohammed">Dr. Aisha Mohammed</SelectItem>
                    <SelectItem value="Dr. Peter Nnamdi">Dr. Peter Nnamdi</SelectItem>
                    <SelectItem value="Dr. Grace Musa">Dr. Grace Musa</SelectItem>
                    <SelectItem value="No preference">No preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

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
