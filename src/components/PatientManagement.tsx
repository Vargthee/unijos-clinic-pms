
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Eye } from "lucide-react";

const patients = [
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    age: 28,
    gender: "Female",
    phone: "08012345678",
    email: "adaora.okonkwo@email.com",
    address: "Jos North, Plateau State",
    bloodType: "O+",
    lastVisit: "2024-06-05",
    condition: "Hypertension",
  },
  {
    id: "P001235",
    name: "Ibrahim Musa",
    age: 45,
    gender: "Male",
    phone: "08023456789",
    email: "ibrahim.musa@email.com",
    address: "Jos South, Plateau State",
    bloodType: "A+",
    lastVisit: "2024-06-07",
    condition: "Diabetes",
  },
  {
    id: "P001236",
    name: "Blessing Eze",
    age: 12,
    gender: "Female",
    phone: "08034567890",
    email: "blessing.eze@email.com",
    address: "Rayfield, Jos",
    bloodType: "B+",
    lastVisit: "2024-06-08",
    condition: "Asthma",
  },
  {
    id: "P001237",
    name: "Yusuf Abdullahi",
    age: 35,
    gender: "Male",
    phone: "08045678901",
    email: "yusuf.abdullahi@email.com",
    address: "Bukuru, Jos",
    bloodType: "AB+",
    lastVisit: "2024-06-09",
    condition: "Back Pain",
  },
];

export const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Patient ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Age/Gender</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Blood Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Visit</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Condition</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{patient.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-600">{patient.address}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{patient.age} / {patient.gender}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm">{patient.phone}</p>
                        <p className="text-sm text-gray-600">{patient.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                        {patient.bloodType}
                      </span>
                    </td>
                    <td className="py-3 px-4">{patient.lastVisit}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                        {patient.condition}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
