
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Schedule Appointment",
    description: "Book new appointment",
    icon: CalendarPlus,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "New Medical Record",
    description: "Create patient record",
    icon: FileText,
    color: "bg-purple-500 hover:bg-purple-600",
  },
];

export const QuickActions = () => {
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
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:scale-[1.02] transition-all duration-200"
              >
                <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
