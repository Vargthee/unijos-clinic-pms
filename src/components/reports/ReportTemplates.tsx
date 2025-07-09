import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Activity, Calendar, TrendingUp, FileText } from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'patient' | 'medical' | 'staff' | 'financial' | 'appointment';
}

const templates: ReportTemplate[] = [
  {
    id: "TMPL001",
    name: "Patient Demographics Report",
    description: "Age groups, gender distribution, and geographic data",
    type: "patient"
  },
  {
    id: "TMPL002", 
    name: "Medical Conditions Summary",
    description: "Most common diagnoses and treatment outcomes",
    type: "medical"
  },
  {
    id: "TMPL003",
    name: "Staff Performance Metrics",
    description: "Workload, patient satisfaction, and efficiency metrics",
    type: "staff"
  },
  {
    id: "TMPL004",
    name: "Financial Analysis",
    description: "Revenue, expenses, and cost per patient analysis",
    type: "financial"
  },
  {
    id: "TMPL005",
    name: "Appointment Analytics",
    description: "Booking patterns, cancellations, and no-show analysis",
    type: "appointment"
  }
];

interface ReportTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export const ReportTemplates = ({ onSelectTemplate }: ReportTemplatesProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "patient":
        return <Users className="h-4 w-4" />;
      case "staff":
        return <Activity className="h-4 w-4" />;
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "financial":
        return <TrendingUp className="h-4 w-4" />;
      case "medical":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getTypeIcon(template.type)}
              {template.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{template.description}</p>
            <Button 
              onClick={() => onSelectTemplate(template.id)}
              className="w-full"
            >
              Use Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};