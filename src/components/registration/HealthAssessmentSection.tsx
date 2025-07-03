
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HealthAssessmentSectionProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  calculateBMI: () => void;
}

export const HealthAssessmentSection = ({ formData, handleInputChange, calculateBMI }: HealthAssessmentSectionProps) => {
  return (
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
  );
};
