
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientManagement } from "@/components/PatientManagement";
import { Appointments } from "@/components/Appointments";
import { MedicalRecords } from "@/components/MedicalRecords";
import { StaffManagement } from "@/components/StaffManagement";
import { MedicalHistoryTimeline } from "@/components/MedicalHistoryTimeline";
import { PrescriptionManagement } from "@/components/PrescriptionManagement";
import { VaccinationRecords } from "@/components/VaccinationRecords";
import { MentalHealthScreening } from "@/components/MentalHealthScreening";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Menu } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "patients":
        return <PatientManagement />;
      case "appointments":
        return <Appointments />;
      case "records":
        return <MedicalRecords />;
      case "staff":
        return <StaffManagement />;
      case "medical-history":
        return <MedicalHistoryTimeline />;
      case "prescriptions":
        return <PrescriptionManagement />;
      case "vaccinations":
        return <VaccinationRecords />;
      case "mental-health":
        return <MentalHealthScreening />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden fixed top-4 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} fixed lg:relative z-50 lg:z-auto`}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <main className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <div className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              <header className="mb-6 lg:mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="ml-12 lg:ml-0">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      University of Jos Clinic - PMS/EHR
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                      Comprehensive Patient Management & Electronic Health Records System
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex-shrink-0"
                  >
                    {theme === 'light' ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </header>
              <div className="w-full overflow-x-hidden">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
