
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export const BasicInfoSection = ({ formData, handleInputChange }: BasicInfoSectionProps) => {
  return (
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        <div className="space-y-2">
          <Label htmlFor="genotype" className="dark:text-gray-200">Genotype</Label>
          <Select value={formData.genotype} onValueChange={(value) => handleInputChange("genotype", value)}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-12 text-base">
              <SelectValue placeholder="Select genotype" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="AA">AA</SelectItem>
              <SelectItem value="AS">AS</SelectItem>
              <SelectItem value="AC">AC</SelectItem>
              <SelectItem value="SS">SS</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="CC">CC</SelectItem>
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
  );
};
