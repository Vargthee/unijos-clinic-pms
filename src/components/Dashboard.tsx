
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import { Activity, Users, Calendar, FileText } from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "124",
    change: "+3%",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Today's Appointments",
    value: "8",
    change: "+2",
    icon: Calendar,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Active Cases",
    value: "17",
    change: "-1",
    icon: Activity,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Records Updated",
    value: "23",
    change: "+5",
    icon: FileText,
    color: "text-purple-600 dark:text-purple-400",
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
          const isPositive = stat.change.startsWith('+');
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-background/50 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {stat.change}
                  </span>{' '}
                  from last week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/30 dark:bg-muted/20 rounded-lg gap-3 hover:bg-muted/50 transition-colors duration-200">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{patient.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{patient.id} • {patient.department}</p>
                  </div>
                  <div className="text-sm font-medium text-primary flex-shrink-0 bg-primary/10 px-2 py-1 rounded">
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
