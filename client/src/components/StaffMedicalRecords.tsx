
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Calendar, Stethoscope, AlertTriangle, Plus, FileText, Heart, Activity, Thermometer } from "lucide-react";

const staffMedicalRecords = [
  {
    id: "SMR001",
    staffId: "S001",
    name: "Dr. Fatima Aliyu",
    age: 35,
    role: "Senior Physician",
    lastCheckup: "2024-05-15",
    nextCheckup: "2024-11-15",
    bloodType: "O+",
    allergies: ["Penicillin"],
    vaccinations: ["COVID-19", "Hepatitis B", "Influenza"],
    healthStatus: "Good",
    bmi: "23.5",
    bloodPressure: "120/80",
    temperature: "36.7°C",
    pulse: "72 bpm",
    weight: "62 kg",
    height: "165 cm",
    respiratoryRate: "16/min",
    oxygenSaturation: "98%",
    notes: "35-year-old physician in good health. Regular health maintenance, all parameters normal. Immunizations up to date.",
    initials: "FA",
  },
  {
    id: "SMR002",
    staffId: "S002",
    name: "Dr. John Okafor",
    age: 48,
    role: "Psychiatrist",
    lastCheckup: "2024-04-20",
    nextCheckup: "2024-10-20",
    bloodType: "A+",
    allergies: ["Latex"],
    vaccinations: ["COVID-19", "Influenza", "Tetanus"],
    healthStatus: "Good",
    bmi: "25.1",
    bloodPressure: "125/85",
    temperature: "36.8°C",
    pulse: "75 bpm",
    weight: "78 kg",
    height: "178 cm",
    respiratoryRate: "18/min",
    oxygenSaturation: "97%",
    notes: "48-year-old psychiatrist with borderline hypertension. Lifestyle modifications recommended. Regular monitoring continues.",
    initials: "JO",
  },
  {
    id: "SMR003",
    staffId: "S004",
    name: "Nurse Grace Danladi",
    age: 32,
    role: "Head Nurse",
    lastCheckup: "2024-03-10",
    nextCheckup: "2024-09-10",
    bloodType: "B+",
    allergies: ["None known"],
    vaccinations: ["COVID-19", "Hepatitis B", "Influenza", "MMR"],
    healthStatus: "Excellent",
    bmi: "22.8",
    bloodPressure: "118/75",
    temperature: "36.5°C",
    pulse: "68 bpm",
    weight: "58 kg",
    height: "162 cm",
    respiratoryRate: "15/min",
    oxygenSaturation: "99%",
    notes: "32-year-old head nurse in excellent health. All health parameters optimal. Exemplary health maintenance.",
    initials: "GD",
  },
  {
    id: "SMR004",
    staffId: "S006",
    name: "Pharmacist Maryam Umar",
    age: 39,
    role: "Chief Pharmacist",
    lastCheckup: "2024-06-01",
    nextCheckup: "2024-12-01",
    bloodType: "AB-",
    allergies: ["Sulfa drugs"],
    vaccinations: ["COVID-19", "Influenza"],
    healthStatus: "Good",
    bmi: "24.2",
    bloodPressure: "130/85",
    temperature: "36.9°C",
    pulse: "76 bpm",
    weight: "66 kg",
    height: "170 cm",
    respiratoryRate: "17/min",
    oxygenSaturation: "98%",
    notes: "39-year-old chief pharmacist in good health. Due for routine blood work and lipid profile. Sulfa drug allergy documented.",
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
          <Stethoscope className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-foreground">Staff Medical Records</h2>
            <p className="text-muted-foreground">Health records for clinic staff members</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Record
        </Button>
      </div>

      {/* Staff Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMedicalRecords.map((staff) => (
          <Card key={staff.id} className="hover-lift cursor-pointer" onClick={() => setSelectedStaff(staff.id)}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {staff.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{staff.name}</h3>
                  <p className="text-sm text-muted-foreground">{staff.role}</p>
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

                {/* Current Vitals Preview */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    Current Vitals
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3 text-red-400" />
                      <span className="text-gray-600 dark:text-gray-400">{staff.temperature}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-blue-400" />
                      <span className="text-gray-600 dark:text-gray-400">{staff.bloodPressure}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-green-400" />
                      <span className="text-gray-600 dark:text-gray-400">{staff.pulse}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      BMI: {staff.bmi}
                    </div>
                  </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Age</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.age} years</p>
                        </div>
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
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Height</label>
                          <p className="text-gray-900 dark:text-gray-100">{staff.height}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        Current Vital Signs
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-5 w-5 text-indigo-500" />
                            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Age</p>
                          </div>
                          <p className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">{staff.age} years</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-center gap-2 mb-2">
                            <Thermometer className="h-5 w-5 text-red-500" />
                            <p className="text-sm font-medium text-red-700 dark:text-red-300">Temperature</p>
                          </div>
                          <p className="text-xl font-semibold text-red-800 dark:text-red-200">{staff.temperature}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-5 w-5 text-blue-500" />
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Blood Pressure</p>
                          </div>
                          <p className="text-xl font-semibold text-blue-800 dark:text-blue-200">{staff.bloodPressure}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="h-5 w-5 text-green-500" />
                            <p className="text-sm font-medium text-green-700 dark:text-green-300">Pulse Rate</p>
                          </div>
                          <p className="text-xl font-semibold text-green-800 dark:text-green-200">{staff.pulse}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                          <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">Weight</p>
                          <p className="text-xl font-semibold text-purple-800 dark:text-purple-200">{staff.weight}</p>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">Respiratory Rate</p>
                          <p className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">{staff.respiratoryRate}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                          <p className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">O2 Saturation</p>
                          <p className="text-xl font-semibold text-orange-800 dark:text-orange-200">{staff.oxygenSaturation}</p>
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
