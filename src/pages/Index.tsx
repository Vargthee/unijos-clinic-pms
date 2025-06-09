
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientManagement } from "@/components/PatientManagement";
import { Appointments } from "@/components/Appointments";
import { MedicalRecords } from "@/components/MedicalRecords";
import { StaffManagement } from "@/components/StaffManagement";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                University of Jos Clinic - PMS/EHR
              </h1>
              <p className="text-gray-600">
                Comprehensive Patient Management & Electronic Health Records System
              </p>
            </header>
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
