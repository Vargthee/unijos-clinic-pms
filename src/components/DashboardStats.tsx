
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Calendar, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { DashboardStats as DashboardStatsType } from "@/types";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statItems: StatItem[] = [
    {
      title: "Total Patients",
      value: stats.totalPatients.toString(),
      change: "+3%",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Today's Appointments",
      value: stats.todaysAppointments.toString(),
      change: "+2",
      icon: Calendar,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Active Cases",
      value: stats.activeCases.toString(),
      change: "-1",
      icon: Activity,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Records Updated",
      value: stats.recordsUpdated.toString(),
      change: "+5",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statItems.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith('+');
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        
        return (
          <Card 
            key={stat.title} 
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 bg-card/80 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-background/50 ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendIcon className={`h-3 w-3 mr-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                <span className={isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {stat.change}
                </span>
                <span className="ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
