import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: string;
  type: string;
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "Scheduled":
      return "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
  }
};

export const AppointmentCalendar = ({ appointments }: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Get appointments for the selected date
  const selectedDateAppointments = selectedDate 
    ? appointments.filter(apt => isSameDay(parseISO(apt.date), selectedDate))
    : [];

  // Get dates that have appointments
  const appointmentDates = appointments.map(apt => parseISO(apt.date));

  const modifiers = {
    hasAppointments: appointmentDates,
  };

  const modifiersStyles = {
    hasAppointments: {
      fontWeight: "bold",
      color: "hsl(var(--primary))",
      backgroundColor: "hsl(var(--primary) / 0.1)",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Appointment Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border w-full pointer-events-auto"
          />
        </CardContent>
      </Card>

      {/* Selected Date Appointments */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a Date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateAppointments.length > 0 ? (
            <div className="space-y-3">
              {selectedDateAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 bg-muted/30 hover:bg-muted/50 dark:bg-muted/20 dark:hover:bg-muted/40 rounded-lg border border-border transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{appointment.patientName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.patientId} • {appointment.doctor}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {appointment.department} • {appointment.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm text-foreground mb-1">
                          {appointment.time}
                        </p>
                        <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                {selectedDate ? "No appointments scheduled for this date" : "Select a date to view appointments"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};