
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCheck, Plus, Mail, Phone } from "lucide-react";

const staff = [
  {
    id: "S001",
    name: "Dr. Fatima Aliyu",
    role: "Senior Physician",
    department: "General Medicine",
    specialization: "Internal Medicine",
    email: "fatima.aliyu@unijos.edu.ng",
    phone: "08012345678",
    schedule: "Mon-Fri, 8AM-4PM",
    patients: 45,
    initials: "FA",
  },
  {
    id: "S002",
    name: "Dr. John Okafor",
    role: "Psychiatrist",
    department: "Mental Health",
    specialization: "Student Counseling & Mental Health",
    email: "john.okafor@unijos.edu.ng",
    phone: "08023456789",
    schedule: "Mon-Fri, 9AM-5PM",
    patients: 32,
    initials: "JO",
  },
  {
    id: "S003",
    name: "Dr. Aisha Mohammed",
    role: "Cardiologist",
    department: "Cardiology",
    specialization: "Heart Disease",
    email: "aisha.mohammed@unijos.edu.ng",
    phone: "08034567890",
    schedule: "Tue-Sat, 8AM-4PM",
    patients: 28,
    initials: "AM",
  },
  {
    id: "S004",
    name: "Nurse Grace Danladi",
    role: "Head Nurse",
    department: "Nursing",
    specialization: "General Nursing",
    email: "grace.danladi@unijos.edu.ng",
    phone: "08045678901",
    schedule: "Mon-Fri, 7AM-3PM",
    patients: 0,
    initials: "GD",
  },
  {
    id: "S005",
    name: "Dr. Peter Nnamdi",
    role: "Orthopedic Surgeon",
    department: "Orthopedics",
    specialization: "Bone & Joint Surgery",
    email: "peter.nnamdi@unijos.edu.ng",
    phone: "08056789012",
    schedule: "Mon-Thu, 10AM-6PM",
    patients: 19,
    initials: "PN",
  },
  {
    id: "S006",
    name: "Pharmacist Maryam Umar",
    role: "Chief Pharmacist",
    department: "Pharmacy",
    specialization: "Drug Dispensing",
    email: "maryam.umar@unijos.edu.ng",
    phone: "08067890123",
    schedule: "Mon-Fri, 8AM-5PM",
    patients: 0,
    initials: "MU",
  },
];

const getRoleColor = (role: string) => {
  if (role.includes("Dr.")) return "bg-blue-100 text-blue-800";
  if (role.includes("Nurse")) return "bg-green-100 text-green-800";
  if (role.includes("Pharmacist")) return "bg-purple-100 text-purple-800";
  return "bg-gray-100 text-gray-800";
};

export const StaffManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
          <p className="text-gray-600">Manage clinic staff and their schedules</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Staff Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{staff.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Doctors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.filter(s => s.role.includes("Dr.")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Nurses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.filter(s => s.role.includes("Nurse")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Other Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.filter(s => !s.role.includes("Dr.") && !s.role.includes("Nurse")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Department:</span> {member.department}</p>
                    <p><span className="font-medium">Specialization:</span> {member.specialization}</p>
                    <p><span className="font-medium">Schedule:</span> {member.schedule}</p>
                    {member.patients > 0 && (
                      <p><span className="font-medium">Active Patients:</span> {member.patients}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
