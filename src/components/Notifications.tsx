
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notifications = [
  {
    title: "Appointment reminder: John Doe at 2:00 PM",
    time: "10 mins ago",
  },
  {
    title: "New lab results for Jane Smith are available.",
    time: "1 hour ago",
  },
  {
    title: "Refill prescription for Michael Johnson.",
    time: "3 hours ago",
  },
  {
    title: "Follow-up with Adaora Okonkwo.",
    time: "Yesterday",
  },
];

export const Notifications = () => {
  return (
    <Card className="border border-border/50 bg-card/80 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications & Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
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
