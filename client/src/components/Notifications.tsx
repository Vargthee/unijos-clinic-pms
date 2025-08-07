
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

// Updated notifications with real patient names from the records/dashboard
const notifications = [
  {
    title: "Appointment reminder: Adaora Okonkwo at 2:00 PM",
    time: "10 mins ago",
  },
  {
    title: "New lab results for Blessing Eze are available.",
    time: "1 hour ago",
  },
  {
    title: "Follow-up with Yusuf Abdullahi.",
    time: "Yesterday",
  },
];

const Notifications = () => {
  return (
    <Card className="border border-border/50 bg-card/80 backdrop-blur-md h-full will-change-transform">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications & Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] will-change-transform"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-2 bg-primary/10 rounded-full flex-shrink-0 hover:bg-primary/20 transition-colors duration-200">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Notifications;
