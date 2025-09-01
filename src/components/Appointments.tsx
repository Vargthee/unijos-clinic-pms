import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, CalendarDays } from "lucide-react";
import { ScheduleAppointmentDialog } from "./ScheduleAppointmentDialog";
import { EditAppointmentDialog } from "./EditAppointmentDialog";
import { AppointmentCalendar } from "./AppointmentCalendar";
import { useToast } from "@/hooks/use-toast";

const appointments = [
  {
    id: "A001",
    patientName: "Chinedu Okeke",
    patientId: "P001238",
    doctor: "Dr. Fatima Aliyu",
    department: "General Medicine",
    date: "2025-06-15",
    time: "09:00 AM",
    status: "Confirmed",
    type: "Consultation",
    phone: "08012345678",
  },
  {
    id: "A002",
    patientName: "Amina Hassan",
    patientId: "P001239",
    doctor: "Dr. John Okafor",
    department: "Mental Health",
    date: "2025-06-15",
    time: "10:30 AM",
    status: "Pending",
    type: "Check-up",
    phone: "08023456789",
  },
  {
    id: "A003",
    patientName: "Emeka Okoye",
    patientId: "P001240",
    doctor: "Dr. Aisha Mohammed",
    department: "Cardiology",
    date: "2025-06-15",
    time: "02:00 PM",
    status: "Confirmed",
    type: "Follow-up",
    phone: "08034567890",
  },
  {
    id: "A004",
    patientName: "Khadija Usman",
    patientId: "P001241",
    doctor: "Dr. Peter Nnamdi",
    department: "Orthopedics",
    date: "2025-06-16",
    time: "11:00 AM",
    status: "Scheduled",
    type: "Consultation",
    phone: "08045678901",
  },
];

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

const Appointments = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const { toast } = useToast();

  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsEditOpen(true);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    toast({
      title: "Appointment Cancelled",
      description: `Appointment ${appointmentId} has been cancelled successfully.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appointments</h2>
          <p className="text-muted-foreground">Manage patient appointments and scheduling</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 hover-scale w-full sm:w-auto"
          onClick={() => setIsScheduleOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar View</span>
            <span className="sm:hidden">Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Today's Schedule</span>
            <span className="sm:hidden">Today</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">All Appointments</span>
            <span className="sm:hidden">All</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <AppointmentCalendar appointments={appointments} />
        </TabsContent>

        <TabsContent value="today" className="mt-6">

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Schedule - June 15, 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter((apt) => apt.date === "2025-06-15")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 dark:bg-muted/20 dark:hover:bg-muted/40 rounded-lg border border-border hover-scale transition-all duration-200 gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex-shrink-0">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-foreground truncate">{appointment.patientName}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {appointment.patientId} • {appointment.department}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">{appointment.doctor}</p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col sm:text-right items-center sm:items-end gap-3 sm:gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{appointment.time}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover-scale"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-6">

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Patient</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Doctor</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Department</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date & Time</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b border-border/50 hover:bg-muted/30 dark:hover:bg-muted/20 transition-colors duration-200">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-foreground">{appointment.patientName}</p>
                              <p className="text-sm text-muted-foreground">{appointment.patientId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-foreground">{appointment.doctor}</td>
                          <td className="py-3 px-4 text-foreground">{appointment.department}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-foreground">{appointment.date}</p>
                              <p className="text-sm text-muted-foreground">{appointment.time}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-foreground">{appointment.type}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="hover-scale"
                                onClick={() => handleEditAppointment(appointment)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="hover-scale"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="hover-lift">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-foreground">{appointment.patientName}</h4>
                              <p className="text-sm text-muted-foreground">{appointment.patientId}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Doctor</p>
                              <p className="font-medium text-foreground">{appointment.doctor}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Department</p>
                              <p className="font-medium text-foreground">{appointment.department}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Date</p>
                              <p className="font-medium text-foreground">{appointment.date}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Time</p>
                              <p className="font-medium text-foreground">{appointment.time}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="hover-scale flex-1"
                              onClick={() => handleEditAppointment(appointment)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="hover-scale flex-1"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ScheduleAppointmentDialog 
        open={isScheduleOpen} 
        onOpenChange={setIsScheduleOpen}
        patientName="New Patient"
      />

      <EditAppointmentDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen}
        appointment={selectedAppointment || {
          id: "",
          patientName: "",
          doctor: "",
          date: "",
          time: "",
          type: "",
          status: ""
        }}
      />
    </div>
  );
};

export default Appointments;
