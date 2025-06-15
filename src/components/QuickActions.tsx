
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigation } from "@/hooks/useNavigation";
import { 
  UserPlus, 
  CalendarPlus, 
  FileText, 
  Bell, 
  Clock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "urgent",
    message: "Emergency patient in Room 3",
    time: "2 min ago",
    icon: AlertCircle,
  },
  {
    id: 2,
    type: "info",
    message: "Lab results ready for P001234",
    time: "15 min ago",
    icon: CheckCircle2,
  },
  {
    id: 3,
    type: "reminder",
    message: "Dr. Smith's rounds in 30 min",
    time: "25 min ago",
    icon: Clock,
  },
];

const quickActions = [
  {
    title: "Add New Patient",
    description: "Register a new patient",
    icon: UserPlus,
    color: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    action: "add-patient",
    tab: "patients" as const,
  },
  {
    title: "Schedule Appointment",
    description: "Book new appointment",
    icon: CalendarPlus,
    color: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    action: "schedule-appointment",
    tab: "appointments" as const,
  },
  {
    title: "New Medical Record",
    description: "Create patient record",
    icon: FileText,
    color: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    action: "new-record",
    tab: "records" as const,
  },
];

export const QuickActions = () => {
  const { toast } = useToast();
  const { setActiveTab } = useNavigation();

  const handleQuickAction = (action: string, title: string, tab: "patients" | "appointments" | "records") => {
    // Navigate to the appropriate tab
    setActiveTab(tab);
    
    // Show success message
    toast({
      title: `${title}`,
      description: `Navigated to ${tab} section. You can now ${action.replace('-', ' ')}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div 
                key={notification.id}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`p-1 rounded-full ${
                  notification.type === 'urgent' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                  notification.type === 'info' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                  'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  <Icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                <Badge variant={notification.type === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
                  {notification.type}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-0 hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/20 group overflow-hidden relative"
                onClick={() => handleQuickAction(action.action, action.title, action.tab)}
              >
                <div className="flex items-center w-full p-4">
                  <div className={`p-3 rounded-xl ${action.color} text-white mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {action.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
