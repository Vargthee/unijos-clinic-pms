
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmergencyContactSectionProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export const EmergencyContactSection = ({ formData, handleInputChange }: EmergencyContactSectionProps) => {
  return (
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
  );
};
