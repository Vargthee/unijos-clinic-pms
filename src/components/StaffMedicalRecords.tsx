
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Calendar, Stethoscope, AlertTriangle, Plus, FileText } from "lucide-react";

const staffMedicalRecords = [
  {
    id: "SMR001",
    staffId: "S001",
    name: "Dr. Fatima Aliyu",
    role: "Senior Physician",
    lastCheckup: "2024-05-15",
    nextCheckup: "2024-11-15",
    bloodType: "O+",
    allergies: ["Penicillin"],
    vaccinations: ["COVID-19", "Hepatitis B", "Influenza"],
    healthStatus: "Good",
    bmi: "23.5",
    bloodPressure: "120/80",
    notes: "Regular health maintenance, no concerns",
    initials: "FA",
  },
  {
    id: "SMR002",
    staffId: "S002",
    name: "Dr. John Okafor",
    role: "Psychiatrist",
    lastCheckup: "2024-04-20",
    nextCheckup: "2024-10-20",
    bloodType: "A+",
    allergies: ["Latex"],
    vaccinations: ["COVID-19", "Influenza", "Tetanus"],
    healthStatus: "Good",
    bmi: "25.1",
    bloodPressure: "125/85",
    notes: "Mild hypertension monitoring required",
    initials: "JO",
  },
  {
    id: "SMR003",
    staffId: "S004",
    name: "Nurse Grace Danladi",
    role: "Head Nurse",
    lastCheckup: "2024-03-10",
    nextCheckup: "2024-09-10",
    bloodType: "B+",
    allergies: ["None known"],
    vaccinations: ["COVID-19", "Hepatitis B", "Influenza", "MMR"],
    healthStatus: "Excellent",
    bmi: "22.8",
    bloodPressure: "118/75",
    notes: "Excellent health status, no concerns",
    initials: "GD",
  },
  {
    id: "SMR004",
    staffId: "S006",
    name: "Pharmacist Maryam Umar",
    role: "Chief Pharmacist",
    lastCheckup: "2024-06-01",
    nextCheckup: "2024-12-01",
    bloodType: "AB-",
    allergies: ["Sulfa drugs"],
    vaccinations: ["COVID-19", "Influenza"],
    healthStatus: "Good",
    bmi: "24.2",
    bloodPressure: "130/85",
    notes: "Due for routine blood work",
    initials: "MU",
  },
];

const getHealthStatusColor = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Good":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Fair":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Poor":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

export const StaffMedicalRecords = () => {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Staff Medical Records</h2>
            <p className="text-gray-600 dark:text-gray-400">Health records for clinic staff members</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Record
        </Button>
      </div>

      {/* Staff Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMedicalRecords.map((staff) => (
          <Card key={staff.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer dark:hover:shadow-2xl dark:hover:shadow-blue-500/20" onClick={() => setSelectedStaff(staff.id)}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-300">
                    {staff.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{staff.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{staff.role}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Health Status</span>
                  <Badge className={getHealthStatusColor(staff.healthStatus)}>
                    {staff.healthStatus}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Checkup</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{staff.lastCheckup}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Blood Type</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{staff.bloodType}</span>
                </div>

                {staff.allergies[0] !== "None known" && (
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm text-yellow-800 dark:text-yellow-200">
                      {staff.allergies.length} allergie(s)
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      {selectedStaff && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Detailed Medical Record
              </CardTitle>
              <Button variant="outline" onClick={() => setSelectedStaff(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {staffMedicalRecords
              .filter(staff => staff.id === selectedStaff)
              .map(staff => (
                <div key={staff.id} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Staff ID</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.staffId}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Blood Type</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.bloodType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">BMI</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.bmi}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Blood Pressure</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.bloodPressure}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Health Tracking</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Checkup</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.lastCheckup}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Checkup</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.nextCheckup}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Health Status</label>
                          <Badge className={getHealthStatusColor(staff.healthStatus)}>
                            {staff.healthStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Allergies & Vaccinations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Allergies</label>
                        <div className="flex flex-wrap gap-2">
                          {staff.allergies.map((allergy, index) => (
                            <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Vaccinations</label>
                        <div className="flex flex-wrap gap-2">
                          {staff.vaccinations.map((vaccination, index) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                              {vaccination}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notes</h4>
                    <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      {staff.notes}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
