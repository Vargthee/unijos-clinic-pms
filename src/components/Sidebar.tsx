
import { 
  Calendar, 
  FileText, 
  Users, 
  Home,
  Stethoscope,
  TrendingUp
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "patients", label: "Patient Management", icon: Users },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "records", label: "Medical Records", icon: FileText },
];

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <Card className="sidebar w-full lg:w-64 xl:w-72 h-auto lg:h-screen border-r border-border bg-sidebar/95 backdrop-blur-sm flex-shrink-0">
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 lg:mb-8">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-sidebar-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent truncate">
              UNIJOS Health
            </h1>
            <p className="text-xs lg:text-sm text-sidebar-foreground/70 font-medium truncate">Medical Center</p>
          </div>
        </div>
        
        <nav className="grid grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-2 sm:px-3 lg:px-4 py-2 sm:py-3 rounded-lg lg:rounded-xl text-left transition-all duration-200 text-xs sm:text-sm font-medium group ${
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md scale-105"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:scale-102"
                }`}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform duration-200 ${
                  activeTab === item.id ? 'scale-110' : 'group-hover:scale-105'
                }`} />
                <span className="text-center lg:text-left truncate text-xs lg:text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};
