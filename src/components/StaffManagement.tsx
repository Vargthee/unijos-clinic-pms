import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCheck, Plus, Mail, Phone } from "lucide-react";

// 8 staff members matching the patient management data
const staff = [
  {
    id: "S001",
    name: "Dr. Hauwa Abdullahi",
    role: "Registrar",
    department: "Academic Registry",
    specialization: "Student Records Management",
    email: "hauwa.abdullahi@unijos.edu.ng",
    phone: "+234 801 234 5678",
    schedule: "Mon-Fri, 8AM-4PM",
    patients: 0,
    initials: "HA",
  },
  {
    id: "S002",
    name: "Mr. James Dung",
    role: "Chief Librarian",
    department: "Library Services",
    specialization: "Information Management",
    email: "james.dung@unijos.edu.ng",
    phone: "+234 802 345 6789",
    schedule: "Mon-Fri, 8AM-5PM",
    patients: 0,
    initials: "JD",
  },
  {
    id: "S003",
    name: "Mrs. Grace Yakubu",
    role: "Security Coordinator",
    department: "Security Services",
    specialization: "Campus Security",
    email: "grace.yakubu@unijos.edu.ng",
    phone: "+234 803 456 7890",
    schedule: "24/7 Shifts",
    patients: 0,
    initials: "GY",
  },
  {
    id: "S004",
    name: "Engr. Emmanuel Bulus",
    role: "ICT Director",
    department: "Information Technology",
    specialization: "Network & Systems",
    email: "emmanuel.bulus@unijos.edu.ng",
    phone: "+234 804 567 8901",
    schedule: "Mon-Fri, 8AM-5PM",
    patients: 0,
    initials: "EB",
  },
  {
    id: "S005",
    name: "Mrs. Rebecca Gyang",
    role: "Bursary Officer",
    department: "Bursary",
    specialization: "Financial Services",
    email: "rebecca.gyang@unijos.edu.ng",
    phone: "+234 805 678 9012",
    schedule: "Mon-Fri, 8AM-4PM",
    patients: 0,
    initials: "RG",
  },
  {
    id: "S006",
    name: "Mr. Daniel Kwaghe",
    role: "Estate Officer",
    department: "Estate Management",
    specialization: "Facilities Management",
    email: "daniel.kwaghe@unijos.edu.ng",
    phone: "+234 806 789 0123",
    schedule: "Mon-Fri, 7AM-4PM",
    patients: 0,
    initials: "DK",
  },
  {
    id: "S007",
    name: "Mrs. Maryam Umar",
    role: "HR Director",
    department: "Human Resources",
    specialization: "Staff Development",
    email: "maryam.umar@unijos.edu.ng",
    phone: "+234 807 890 1234",
    schedule: "Mon-Fri, 8AM-5PM",
    patients: 0,
    initials: "MU",
  },
  {
    id: "S008",
    name: "Dr. Samuel Dung",
    role: "Chief Medical Officer",
    department: "Medical Center",
    specialization: "Emergency Medicine",
    email: "samuel.dung@unijos.edu.ng",
    phone: "+234 808 901 2345",
    schedule: "24/7 On-call",
    patients: 45,
    initials: "SD",
  }
];

const getRoleColor = (role: string) => {
  if (role.includes("Dr.")) return "bg-blue-100 text-blue-800";
  if (role.includes("Director")) return "bg-purple-100 text-purple-800";
  if (role.includes("Officer") || role.includes("Coordinator")) return "bg-green-100 text-green-800";
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
                <p className="text-sm font-medium text-gray-600">Directors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.filter(s => s.role.includes("Director")).length}
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
                  {staff.filter(s => !s.role.includes("Dr.") && !s.role.includes("Director")).length}
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
