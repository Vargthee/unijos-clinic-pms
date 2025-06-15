
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Phone, Mail } from "lucide-react";
import { Patient } from "@/types";
import { getInitials, truncateText } from "@/utils";

interface RecentPatientsListProps {
  patients: Patient[];
}

export const RecentPatientsList = ({ patients }: RecentPatientsListProps) => {
  return (
    <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Patients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {patients.map((patient) => (
            <div 
              key={patient.id} 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/30 dark:bg-muted/20 rounded-lg gap-3 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">
                    {getInitials(patient.name)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">
                    {patient.name}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {patient.id}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {truncateText(patient.email, 20)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {patient.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-primary flex-shrink-0 bg-primary/10 px-2 py-1 rounded">
                {patient.gender}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
