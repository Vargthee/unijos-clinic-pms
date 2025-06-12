
import { 
  Calendar, 
  FileText, 
  Users, 
  Home,
  Stethoscope
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
    <Card className="sidebar w-64 sm:w-72 lg:w-80 h-screen border-r border-border bg-sidebar/95 backdrop-blur-sm">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-sidebar-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              UNIJOS Clinic
            </h1>
            <p className="text-xs sm:text-sm text-sidebar-foreground/70 font-medium">Health Management</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm font-medium group ${
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md scale-105"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:scale-102"
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                  activeTab === item.id ? 'scale-110' : 'group-hover:scale-105'
                }`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};
