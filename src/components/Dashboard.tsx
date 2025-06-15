
import { LoadingSpinner } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentPatientsList } from "@/components/RecentPatientsList";
import { useDashboard } from "@/hooks/useDashboard";
import { AlertTriangle } from "lucide-react";

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
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 gap-6">
        <RecentPatientsList patients={recentPatients} />
      </div>
    </div>
  );
};
