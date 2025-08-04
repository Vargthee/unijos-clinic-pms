
import { memo } from "react";
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

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <Card className="sidebar w-full lg:w-60 xl:w-64 h-auto lg:h-screen border-r border-border bg-sidebar/95 backdrop-blur-md flex-shrink-0 will-change-transform">
      <div className="p-2 sm:p-3 lg:p-4 xl:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6 xl:mb-8">
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold text-sidebar-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight">
              University of Jos Health
            </h1>
            <p className="text-xs sm:text-xs lg:text-sm text-sidebar-foreground/70 font-medium">Medical Center</p>
          </div>
        </div>
        
        <nav className="grid grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-1.5 lg:gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-2 xl:gap-3 px-2 sm:px-3 lg:px-3 xl:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg lg:rounded-xl text-left transition-all duration-200 sm:duration-300 text-xs sm:text-sm font-medium group will-change-transform ${
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md sm:shadow-lg scale-102 sm:scale-105 ring-1 sm:ring-2 ring-primary/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:scale-101 sm:hover:scale-102 hover:shadow-sm sm:hover:shadow-md"
                }`}
              >
                <Icon className={`h-4 w-4 sm:h-4 sm:w-4 lg:h-5 lg:w-5 flex-shrink-0 transition-transform duration-200 sm:duration-300 ${
                  activeTab === item.id ? 'scale-105 sm:scale-110' : 'group-hover:scale-102 sm:group-hover:scale-105'
                }`} />
                <span className="text-center lg:text-left truncate text-xs sm:text-xs lg:text-sm leading-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};

export default Sidebar;
