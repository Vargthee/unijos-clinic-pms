
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VaccinationSectionProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export const VaccinationSection = ({ formData, handleInputChange }: VaccinationSectionProps) => {
  return (
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
  );
};
