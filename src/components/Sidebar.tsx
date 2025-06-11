
import { 
  Calendar, 
  FileText, 
  Users, 
  Home,
  UserPlus
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
    <Card className="sidebar w-64 sm:w-72 lg:w-80 h-screen border-r border-border bg-sidebar">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
            <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-bold text-sidebar-foreground">UNIJOS Clinic</h1>
            <p className="text-xs text-sidebar-foreground/70">Health Management</p>
          </div>
        </div>
        
        <nav className="space-y-1 sm:space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-200 text-xs sm:text-sm ${
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};
