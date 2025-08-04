
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Calendar, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { DashboardStats as DashboardStatsType } from "@/types";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

interface DashboardStatsProps {
  stats: DashboardStatsType;
  loading?: boolean;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statItems: StatItem[] = [
    {
      title: "Total Patients",
      value: stats.totalPatients.toString(),
      change: "+3%",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      description: "Registered patients",
    },
    {
      title: "Today's Appointments",
      value: stats.todaysAppointments.toString(),
      change: "+2",
      icon: Calendar,
      color: "text-green-600 dark:text-green-400",
      description: "Scheduled for today",
    },
    {
      title: "Active Cases",
      value: stats.activeCases.toString(),
      change: "-1",
      icon: Activity,
      color: "text-orange-600 dark:text-orange-400",
      description: "Under treatment",
    },
    {
      title: "Records Updated",
      value: stats.recordsUpdated.toString(),
      change: "+5",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      description: "Today's updates",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 will-change-transform">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith('+');
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        
        return (
          <Card 
            key={stat.title} 
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md relative overflow-hidden will-change-transform"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 relative z-10">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">
                  {stat.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground/70 truncate">
                  {stat.description}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl bg-background/50 backdrop-blur-sm ${stat.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 will-change-transform`}>
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </div>
              <div className="flex items-center text-xs sm:text-sm">
                <TrendIcon className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                <span className={`font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground hidden sm:inline">from last week</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
