import React from 'react';
import { Activity, Users, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats as StatsType } from '@/types';

interface DashboardStatsProps {
  stats: StatsType | null;
  loading: boolean;
}

export const DashboardStats = ({ stats, loading }: DashboardStatsProps) => {
  const statItems = [
    {
      title: 'Total Patients',
      value: stats?.totalPatients || 0,
      icon: Users,
      description: 'Registered patients',
    },
    {
      title: "Today's Appointments",
      value: stats?.todaysAppointments || 0,
      icon: Calendar,
      description: 'Scheduled for today',
    },
    {
      title: 'Active Cases',
      value: stats?.activeCases || 0,
      icon: Activity,
      description: 'Under treatment',
    },
    {
      title: 'Records Updated',
      value: stats?.recordsUpdated || 0,
      icon: FileText,
      description: 'This week',
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              </CardTitle>
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded animate-pulse mb-1" />
              <div className="h-3 w-24 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};