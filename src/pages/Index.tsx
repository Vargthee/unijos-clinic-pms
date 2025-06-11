
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientManagement } from "@/components/PatientManagement";
import { Appointments } from "@/components/Appointments";
import { MedicalRecords } from "@/components/MedicalRecords";
import { StaffManagement } from "@/components/StaffManagement";
import { StaffMedicalRecords } from "@/components/StaffMedicalRecords";
import { MedicalHistoryTimeline } from "@/components/MedicalHistoryTimeline";
import { PrescriptionManagement } from "@/components/PrescriptionManagement";
import { VaccinationRecords } from "@/components/VaccinationRecords";
import { MentalHealthScreening } from "@/components/MentalHealthScreening";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";

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
      case "staff-medical":
        return <StaffMedicalRecords />;
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
      <div className="min-h-screen flex w-full bg-background">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden fixed top-3 left-3 z-50 bg-card border border-border shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} fixed lg:relative z-50 lg:z-auto`}>
          <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }} />
        </div>
        
        <main className="flex-1 flex flex-col min-h-screen">
          <div className="flex-1 p-3 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              <header className="mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-start sm:items-center justify-between mb-4 flex-col sm:flex-row gap-3 sm:gap-0">
                  <div className="ml-12 sm:ml-14 lg:ml-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                      University of Jos Clinic - PMS/EHR
                    </h1>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                      Comprehensive Patient Management & Electronic Health Records System
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex-shrink-0 self-start sm:self-center"
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
