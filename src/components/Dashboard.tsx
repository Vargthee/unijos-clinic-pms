
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Calendar, FileText } from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "1,247",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Today's Appointments",
    value: "23",
    change: "+5%",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Active Cases",
    value: "89",
    change: "-2%",
    icon: Activity,
    color: "text-orange-600",
  },
  {
    title: "Records Updated",
    value: "156",
    change: "+8%",
    icon: FileText,
    color: "text-purple-600",
  },
];

const recentPatients = [
  { name: "Adaora Okonkwo", id: "P001234", department: "General Medicine", time: "09:30 AM" },
  { name: "Ibrahim Musa", id: "P001235", department: "Cardiology", time: "10:15 AM" },
  { name: "Blessing Eze", id: "P001236", department: "Pediatrics", time: "11:00 AM" },
  { name: "Yusuf Abdullahi", id: "P001237", department: "Orthopedics", time: "02:30 PM" },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.id} • {patient.department}</p>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {patient.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-blue-900">New Patient</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                <Calendar className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-sm font-medium text-green-900">Schedule</p>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors">
                <FileText className="h-6 w-6 text-orange-600 mb-2" />
                <p className="text-sm font-medium text-orange-900">Records</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                <Activity className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-sm font-medium text-purple-900">Reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
