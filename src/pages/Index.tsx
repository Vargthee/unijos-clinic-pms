
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import PatientManagement from "@/components/PatientManagement";
import Appointments from "@/components/Appointments";
import ComprehensiveMedicalRecords from "@/components/ComprehensiveMedicalRecords";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { TabType } from "@/types";

const Index = () => {
  const { activeTab, setActiveTab, handleSignOut } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderContent = () => {
    const components: Record<TabType, React.ComponentType> = {
      dashboard: Dashboard,
      patients: PatientManagement,
      appointments: Appointments,
      records: ComprehensiveMedicalRecords,
    };

    const Component = components[activeTab] || Dashboard;
    
    return <Component />;
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-background transition-colors duration-200 overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto min-w-0 will-change-scroll relative">
        <div className="glass-card sticky top-0 z-10 p-2 sm:p-3 lg:p-4 backdrop-blur-md border-b border-border/20">
          <div className="flex flex-wrap justify-end gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-1 sm:gap-2 text-xs sm:text-sm transition-all duration-200 hover:scale-105 h-8 sm:h-9"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-1 sm:gap-2 text-xs sm:text-sm transition-all duration-200 hover:scale-105 h-8 sm:h-9"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="p-2 sm:p-3 lg:p-4 xl:p-6 animate-fade-in will-change-transform">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
