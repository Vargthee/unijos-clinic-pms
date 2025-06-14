
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPatientDialog = ({ open, onOpenChange }: AddPatientDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    matricNumber: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    faculty: "",
    level: "",
    bloodType: "",
    address: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.matricNumber || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate adding patient
    toast({
      title: "Success",
      description: "Patient record created successfully",
    });
    
    // Reset form and close dialog
    setFormData({
      name: "",
      matricNumber: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      faculty: "",
      level: "",
      bloodType: "",
      address: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">Add New Patient</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-200">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
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
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="dark:text-gray-200">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="Enter age"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender" className="dark:text-gray-200">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="08012345678"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
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
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faculty" className="dark:text-gray-200">Faculty</Label>
              <Select value={formData.faculty} onValueChange={(value) => handleInputChange("faculty", value)}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
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
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType" className="dark:text-gray-200">Blood Type</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
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
              <Label htmlFor="address" className="dark:text-gray-200">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Student address"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              Add Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
