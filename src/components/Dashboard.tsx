
import { memo } from "react";
import { LoadingSpinner } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentPatientsList } from "@/components/RecentPatientsList";
import { useDashboard } from "@/hooks/useDashboard";
import { AlertTriangle } from "lucide-react";
import { Notifications } from "@/components/Notifications";

export const Dashboard = () => {
  const { stats, recentPatients, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!stats) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>No dashboard data available</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in will-change-transform">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
          Welcome to University of Jos Clinic Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Overview of clinic operations and recent activities
        </p>
      </div>
      
      <DashboardStats stats={stats} loading={loading} />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 will-change-transform">
        <div className="xl:col-span-2">
          <RecentPatientsList patients={recentPatients} loading={loading} />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
    </div>
  );

}