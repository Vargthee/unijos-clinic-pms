
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, FileText } from "lucide-react";

const mockMedicalHistory = [
  {
    id: "1",
    date: "2024-06-01",
    type: "Consultation",
    doctor: "Dr. Fatima Aliyu",
    diagnosis: "Common Cold",
    treatment: "Rest, fluids, over-the-counter medication",
    notes: "Patient reports improvement in symptoms",
  },
  {
    id: "2",
    date: "2024-05-15",
    type: "Lab Results",
    doctor: "Dr. John Okafor",
    diagnosis: "Blood Work - Normal",
    treatment: "No treatment required",
    notes: "All values within normal range",
  },
  {
    id: "3",
    date: "2024-04-20",
    type: "Follow-up",
    doctor: "Dr. Aisha Mohammed",
    diagnosis: "Hypertension Monitoring",
    treatment: "Continue current medication",
    notes: "Blood pressure well controlled",
  },
];

export const MedicalHistoryTimeline = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Medical History Timeline
        </h3>
      </div>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        <div className="space-y-6">
          {mockMedicalHistory.map((entry, index) => (
            <div key={entry.id} className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center relative z-10">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              
              <Card className="flex-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-lg">{entry.diagnosis}</CardTitle>
                    <Badge variant="outline">{entry.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {entry.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {entry.doctor}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Treatment</h4>
                    <p className="text-gray-600 dark:text-gray-400">{entry.treatment}</p>
                  </div>
                  {entry.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Notes</h4>
                      <p className="text-gray-600 dark:text-gray-400">{entry.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
