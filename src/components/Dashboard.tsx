
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import { Activity, Users, Calendar, FileText } from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "487",
    change: "+8%",
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
  { name: "Ibrahim Musa", id: "P001235", department: "Mental Health", time: "10:15 AM" },
  { name: "Blessing Eze", id: "P001236", department: "General Medicine", time: "11:00 AM" },
  { name: "Yusuf Abdullahi", id: "P001237", department: "Orthopedics", time: "02:30 PM" },
];

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
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
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{patient.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{patient.id} • {patient.department}</p>
                  </div>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {patient.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
