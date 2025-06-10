
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Eye } from "lucide-react";
import { AddPatientDialog } from "./AddPatientDialog";

const patients = [
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    matricNumber: "UJ/2022/ENG/0234",
    age: 20,
    gender: "Female",
    phone: "08012345678",
    email: "adaora.okonkwo@unijos.edu.ng",
    address: "Student Hostel, University of Jos",
    bloodType: "O+",
    lastVisit: "2024-06-05",
    condition: "Stress-related headaches",
    faculty: "Engineering",
    level: "200L"
  },
  {
    id: "P001235",
    name: "Ibrahim Musa",
    matricNumber: "UJ/2020/MED/0456",
    age: 22,
    gender: "Male",
    phone: "08023456789",
    email: "ibrahim.musa@unijos.edu.ng",
    address: "Off-campus, Jos",
    bloodType: "A+",
    lastVisit: "2024-06-07",
    condition: "Sports injury (ankle sprain)",
    faculty: "Medicine",
    level: "400L"
  },
  {
    id: "P001236",
    name: "Blessing Eze",
    matricNumber: "UJ/2023/SSC/0123",
    age: 19,
    gender: "Female",
    phone: "08034567890",
    email: "blessing.eze@unijos.edu.ng",
    address: "Student Hostel, University of Jos",
    bloodType: "B+",
    lastVisit: "2024-06-08",
    condition: "Respiratory infection",
    faculty: "Social Sciences",
    level: "100L"
  },
  {
    id: "P001237",
    name: "Yusuf Abdullahi",
    matricNumber: "UJ/2021/NSC/0789",
    age: 21,
    gender: "Male",
    phone: "08045678901",
    email: "yusuf.abdullahi@unijos.edu.ng",
    address: "Off-campus, Jos",
    bloodType: "AB+",
    lastVisit: "2024-06-09",
    condition: "Eye strain from studying",
    faculty: "Natural Sciences",
    level: "300L"
  },
  {
    id: "P001238",
    name: "Fatima Aliyu",
    matricNumber: "UJ/2019/LAW/0345",
    age: 23,
    gender: "Female",
    phone: "08056789012",
    email: "fatima.aliyu@unijos.edu.ng",
    address: "Student Hostel, University of Jos",
    bloodType: "O-",
    lastVisit: "2024-06-06",
    condition: "Menstrual cramps",
    faculty: "Law",
    level: "500L"
  },
  {
    id: "P001239",
    name: "Chidi Okafor",
    matricNumber: "UJ/2022/PHM/0567",
    age: 20,
    gender: "Male",
    phone: "08067890123",
    email: "chidi.okafor@unijos.edu.ng",
    address: "Off-campus, Jos",
    bloodType: "A-",
    lastVisit: "2024-06-04",
    condition: "Food poisoning",
    faculty: "Pharmacy",
    level: "200L"
  },
  {
    id: "P001240",
    name: "Hauwa Mohammed",
    matricNumber: "UJ/2019/EDU/0234",
    age: 24,
    gender: "Female",
    phone: "08078901234",
    email: "hauwa.mohammed@unijos.edu.ng",
    address: "Student Hostel, University of Jos",
    bloodType: "B-",
    lastVisit: "2024-06-03",
    condition: "Academic anxiety",
    faculty: "Education",
    level: "500L"
  },
  {
    id: "P001241",
    name: "Daniel Kwaghe",
    matricNumber: "UJ/2023/AGR/0678",
    age: 19,
    gender: "Male",
    phone: "08089012345",
    email: "daniel.kwaghe@unijos.edu.ng",
    address: "Student Hostel, University of Jos",
    bloodType: "AB-",
    lastVisit: "2024-06-02",
    condition: "Common cold",
    faculty: "Agriculture",
    level: "100L"
  },
  {
    id: "P001242",
    name: "Grace Dung",
    matricNumber: "UJ/2020/ART/0890",
    age: 22,
    gender: "Female",
    phone: "08090123456",
    email: "grace.dung@unijos.edu.ng",
    address: "Off-campus, Jos",
    bloodType: "O+",
    lastVisit: "2024-06-01",
    condition: "Sleep disorder",
    faculty: "Arts",
    level: "400L"
  },
  {
    id: "P001243",
    name: "Samuel Gyang",
    matricNumber: "UJ/2021/VET/0345",
    age: 21,
    gender: "Male",
    phone: "08001234567",
    email: "samuel.gyang@unijos.edu.ng",
    address: "Student Hostel, University of Jos",
    bloodType: "A+",
    lastVisit: "2024-05-30",
    condition: "Malaria",
    faculty: "Veterinary Medicine",
    level: "300L"
  },
  {
    id: "P001244",
    name: "Mary Yakubu",
    matricNumber: "UJ/2022/ENV/0567",
    age: 20,
    gender: "Female",
    phone: "08012345670",
    email: "mary.yakubu@unijos.edu.ng",
    address: "Off-campus, Jos",
    bloodType: "B+",
    lastVisit: "2024-05-29",
    condition: "Skin allergies",
    faculty: "Environmental Sciences",
    level: "200L"
  },
  {
    id: "P001245",
    name: "John Bulus",
    matricNumber: "UJ/2019/MGT/0789",
    age: 23,
    gender: "Male",
    phone: "08023456701",
    email: "john.bulus@unijos.edu.ng",
    address: "Student Hostel, University of Jos",
    bloodType: "O-",
    lastVisit: "2024-05-28",
    condition: "High blood pressure",
    faculty: "Management Sciences",
    level: "500L"
  }
];

export const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/placeholder.svg" 
              alt="University of Jos Logo" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
              <p className="text-gray-600">University of Jos Student Health Records</p>
            </div>
          </div>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddPatientOpen(true)}
        >
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
              placeholder="Search patients by name, ID, matric number, or faculty..."
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
          <CardTitle>Student Patient Records ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Patient ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Matric Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Age/Gender</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Faculty/Level</th>
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
                    <td className="py-3 px-4 font-medium text-green-600">{patient.matricNumber}</td>
                    <td className="py-3 px-4">{patient.age} / {patient.gender}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{patient.faculty}</p>
                        <p className="text-sm text-gray-600">{patient.level}</p>
                      </div>
                    </td>
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

      <AddPatientDialog 
        open={isAddPatientOpen} 
        onOpenChange={setIsAddPatientOpen} 
      />
    </div>
  );
};
