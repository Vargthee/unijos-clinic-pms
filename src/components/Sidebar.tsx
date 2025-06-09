
import { 
  Activity, 
  Calendar, 
  FileText, 
  Home, 
  Users, 
  UserCheck,
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "patients", label: "Patient Management", icon: Users },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "records", label: "Medical Records", icon: FileText },
  { id: "staff", label: "Staff Management", icon: UserCheck },
];

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">UNIJOS Clinic</h2>
            <p className="text-sm text-gray-600">PMS/EHR System</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
