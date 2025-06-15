
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
    return <LoadingSpinner text="Loading dashboard..." />;
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to University of Jos Clinic Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of clinic operations and recent activities
        </p>
      </div>
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentPatientsList patients={recentPatients} />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
    </div>
  );
};
