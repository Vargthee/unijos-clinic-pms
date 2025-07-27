
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientManagement } from "@/components/PatientManagement";
import { Appointments } from "@/components/Appointments";
import { ComprehensiveMedicalRecords } from "@/components/ComprehensiveMedicalRecords";

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
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto min-w-0">
        <div className="glass-card sticky top-0 z-10 p-2 sm:p-4">
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-1 sm:gap-2 text-xs sm:text-sm"
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
        <div className="p-2 sm:p-4 lg:p-6 xl:p-8 animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
