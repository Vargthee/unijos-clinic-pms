import { Card, CardContent } from "@/components/ui/card";
import { FileText, TrendingUp, Download, Users } from "lucide-react";

export const ReportAnalytics = () => {
  const analyticsData = [
    {
      title: "Total Reports",
      value: "127",
      icon: FileText,
      color: "blue"
    },
    {
      title: "This Month", 
      value: "23",
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "Downloads",
      value: "1,234",
      icon: Download,
      color: "yellow"
    },
    {
      title: "Active Users",
      value: "45", 
      icon: Users,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500/10 text-blue-500";
      case "green":
        return "bg-green-500/10 text-green-500";
      case "yellow":
        return "bg-yellow-500/10 text-yellow-500";
      case "purple":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {analyticsData.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${getColorClasses(item.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};