
import { memo } from "react";
import { LoadingSpinner } from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton-loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardStats from "@/components/DashboardStats";
import RecentPatientsList from "@/components/RecentPatientsList";
import { useDashboard } from "@/hooks/useDashboard";
import { AlertTriangle } from "lucide-react";
import Notifications from "@/components/Notifications";

const Dashboard = () => {
  const { stats, recentPatients, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-96" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Skeleton className="h-96" />
          </div>
          <div>
            <Skeleton className="h-96" />
          </div>
        </div>
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
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in will-change-transform">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground leading-tight">
          Welcome to University of Jos Clinic Dashboard
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
          Overview of clinic operations and recent activities
        </p>
      </div>
      
      <DashboardStats stats={stats} loading={loading} />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 will-change-transform">
        <div className="xl:col-span-2">
          <RecentPatientsList patients={recentPatients} loading={loading} />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;