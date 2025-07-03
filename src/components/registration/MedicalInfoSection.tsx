
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MedicalInfoSectionProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export const MedicalInfoSection = ({ formData, handleInputChange }: MedicalInfoSectionProps) => {
  return (
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
  );
};
