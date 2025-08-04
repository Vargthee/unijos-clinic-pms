
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Phone, MoreHorizontal } from "lucide-react";
import { Patient } from "@/types";
import { getInitials } from "@/utils";

interface RecentPatientsListProps {
  patients: Patient[];
  loading?: boolean;
}

const RecentPatientsList = ({ patients }: RecentPatientsListProps) => {
  return (
    <Card className="border border-border/50 bg-card/80 backdrop-blur-md will-change-transform">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Patients
        </CardTitle>
        <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient, index) => (
            <div 
              key={patient.id} 
              className="group flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 dark:from-muted/20 dark:to-muted/5 rounded-xl hover:from-muted/50 hover:to-muted/20 dark:hover:from-muted/30 dark:hover:to-muted/10 transition-all duration-300 hover:shadow-md border border-transparent hover:border-border/50 will-change-transform"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 will-change-transform">
                    <span className="text-sm font-semibold text-primary">
                      {getInitials(patient.name)}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                      {patient.name}
                    </p>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      patient.gender === 'male' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                      patient.gender === 'female' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
                    }`}>
                      {patient.gender}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{patient.id}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{patient.phone}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 will-change-transform"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPatientsList;
