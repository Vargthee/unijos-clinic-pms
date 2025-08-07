import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicalRecords } from "./MedicalRecords";
import { MedicalHistoryTimeline } from "./MedicalHistoryTimeline";
import { PrescriptionManagement } from "./PrescriptionManagement";
import { VaccinationRecords } from "./VaccinationRecords";
import { MentalHealthScreening } from "./MentalHealthScreening";
import { StaffMedicalRecords } from "./StaffMedicalRecords";
import { 
  FileText, 
  Clock, 
  Pill, 
  Shield, 
  Brain, 
  UserCheck,
  Activity,
  TrendingUp
} from "lucide-react";

const ComprehensiveMedicalRecords = () => {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  const tabItems = [
    {
      id: "overview",
      label: "Overview",
      icon: FileText,
      component: MedicalRecords,
      description: "All medical records"
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: Clock,
      component: MedicalHistoryTimeline,
      description: "Medical history timeline"
    },
    {
      id: "prescriptions",
      label: "Prescriptions",
      icon: Pill,
      component: PrescriptionManagement,
      description: "Medication management"
    },
    {
      id: "vaccinations",
      label: "Vaccinations",
      icon: Shield,
      component: VaccinationRecords,
      description: "Immunization records"
    },
    {
      id: "mental-health",
      label: "Mental Health",
      icon: Brain,
      component: MentalHealthScreening,
      description: "Psychological assessments"
    },
    {
      id: "staff-records",
      label: "Staff Health",
      icon: UserCheck,
      component: StaffMedicalRecords,
      description: "Staff medical records"
    }
  ];

  const renderActiveComponent = () => {
    const activeTab = tabItems.find(tab => tab.id === activeSubTab);
    if (!activeTab) return <MedicalRecords />;
    
    const Component = activeTab.component;
    return <Component />;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enhanced Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Medical Records System
            </h1>
            <p className="text-muted-foreground">
              Comprehensive health information management
            </p>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-2">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSubTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-background/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
                    <div className="text-center">
                      <p className="text-xs font-medium">{tab.label}</p>
                      <p className="text-xs opacity-70 hidden lg:block">{tab.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Area */}
      <div className="animate-fade-in">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default ComprehensiveMedicalRecords;