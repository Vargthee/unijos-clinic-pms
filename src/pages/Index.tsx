import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientManagement } from "@/components/PatientManagement";
import { Appointments } from "@/components/Appointments";
import { ComprehensiveMedicalRecords } from "@/components/ComprehensiveMedicalRecords";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/signin");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "patients":
        return <PatientManagement />;
      case "appointments":
        return <Appointments />;
      case "records":
        return <ComprehensiveMedicalRecords />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Dark
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
