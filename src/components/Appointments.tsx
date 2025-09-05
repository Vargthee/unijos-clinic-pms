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
    patientName: "Adaora Okonkwo",
    patientId: "P001234",
    doctor: "Dr. Fatima Aliyu",
    department: "General Medicine",
    date: "2025-09-05",
    time: "09:00 AM",
    status: "Confirmed",
    type: "Consultation",
    phone: "08012345678",
  },
  {
    id: "A002", 
    patientName: "Blessing Eze",
    patientId: "P001236",
    doctor: "Dr. Aisha Mohammed", 
    department: "Internal Medicine",
    date: "2025-09-05",
    time: "10:30 AM",
    status: "Confirmed",
    type: "Follow-up",
    phone: "08023456789",
  },
  {
    id: "A003",
    patientName: "Yusuf Abdullahi",
    patientId: "P001237", 
    doctor: "Dr. Grace Musa",
    department: "Cardiology",
    date: "2025-09-05",
    time: "02:00 PM", 
    status: "Scheduled",
    type: "Checkup",
    phone: "08034567890",
  },
  {
    id: "A004",
    patientName: "Fatima Aliyu",
    patientId: "P001238",
    doctor: "Dr. Hauwa Ibrahim",
    department: "Dermatology", 
    date: "2025-08-08",
    time: "11:00 AM",
    status: "Pending", 
    type: "Consultation",
    phone: "08045678901",
  },
  {
    id: "A005",
    patientName: "Chidi Okafor",
    patientId: "P001239",
    doctor: "Dr. Samuel Dung",
    department: "General Medicine",
    date: "2025-08-12",
    time: "03:30 PM",
    status: "Confirmed",
    type: "Treatment",
    phone: "08056789012",
  },
  {
    id: "A006", 
    patientName: "Amina Bello",
    patientId: "P001250",
    doctor: "Dr. Mary Gyang",
    department: "Gynecology",
    date: "2025-08-13",
    time: "09:30 AM",
    status: "Scheduled",
    type: "Consultation",
    phone: "08067890123",
  },
  {
    id: "A007",
    patientName: "David Pam",
    patientId: "P001241", 
    doctor: "Dr. Peter Bulus",
    department: "Surgery",
    date: "2025-08-14",
    time: "01:00 PM",
    status: "Confirmed",
    type: "Pre-op", 
    phone: "08078901234",
  },
  {
    id: "A008",
    patientName: "Hauwa Mohammed",
    patientId: "P001242",
    doctor: "Dr. Emmanuel Yakubu", 
    department: "Psychiatry",
    date: "2025-08-15",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Therapy",
    phone: "08089012345",
  },
  {
    id: "A009",
    patientName: "Samuel Gyang", 
    patientId: "P001243",
    doctor: "Dr. Ruth Laven",
    department: "Allergy & Immunology",
    date: "2025-08-19",
    time: "04:00 PM",
    status: "Scheduled", 
    type: "Testing",
    phone: "08090123456",
  },
  {
    id: "A010",
    patientName: "Khadijah Usman",
    patientId: "P001244",
    doctor: "Dr. Grace Musa",
    department: "Obstetrics",
    date: "2025-08-20",
    time: "08:30 AM",
    status: "Confirmed",
    type: "Prenatal",
    phone: "08001234567",
  },
  {
    id: "A011",
    patientName: "Joseph Danladi", 
    patientId: "P001245",
    doctor: "Dr. Emmanuel Yakubu",
    department: "Orthopedics",
    date: "2025-08-21",
    time: "02:30 PM",
    status: "Pending",
    type: "Follow-up",
    phone: "08012345679",
  },
  {
    id: "A012",
    patientName: "Zainab Abdullahi",
    patientId: "P001246",
    doctor: "Dr. Mary Gyang",
    department: "Dermatology", 
    date: "2025-08-22",
    time: "11:30 AM",
    status: "Scheduled",
    type: "Consultation",
    phone: "08023456780",
  },
  {
    id: "A013",
    patientName: "Dr. Hauwa Abdullahi",
    patientId: "USR001",
    doctor: "Dr. Fatima Aliyu",
    department: "General Medicine",
    date: "2025-08-26",
    time: "09:00 AM",
    status: "Confirmed",
    type: "Annual Checkup",
    phone: "08034567891",
  },
  {
    id: "A014",
    patientName: "Mr. James Dung",
    patientId: "USR002",
    doctor: "Dr. Ruth Laven",
    department: "Internal Medicine",
    date: "2025-08-27",
    time: "03:00 PM",
    status: "Scheduled", 
    type: "Routine Checkup",
    phone: "08045678902",
  },
  {
    id: "A015",
    patientName: "Mrs. Grace Yakubu",
    patientId: "USR003",
    doctor: "Dr. Peter Nnamdi",
    department: "Occupational Health", 
    date: "2025-08-28",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Work Assessment",
    phone: "08056789013",
  },
  {
    id: "A016",
    patientName: "Engr. Emmanuel Bulus",
    patientId: "USR004",
    doctor: "Dr. Samuel Dung",
    department: "Ophthalmology", 
    date: "2025-09-02",
    time: "02:15 PM",
    status: "Scheduled",
    type: "Eye Exam",
    phone: "08067891234",
  },
  {
    id: "A017",
    patientName: "Mrs. Rebecca Gyang",
    patientId: "USR005",
    doctor: "Dr. Aisha Mohammed",
    department: "Hematology", 
    date: "2025-09-03",
    time: "11:45 AM",
    status: "Confirmed",
    type: "Blood Work",
    phone: "08078912345",
  },
  {
    id: "A018",
    patientName: "Mr. Daniel Kwaghe",
    patientId: "USR006",
    doctor: "Dr. Mary Gyang",
    department: "Allergy & Immunology", 
    date: "2025-09-04",
    time: "09:15 AM",
    status: "Pending",
    type: "Allergy Test",
    phone: "08089123456",
  },
  {
    id: "A019",
    patientName: "Mrs. Maryam Umar",
    patientId: "USR007",
    doctor: "Dr. Emmanuel Yakubu",
    department: "Gastroenterology", 
    date: "2025-09-05",
    time: "01:30 PM",
    status: "Confirmed",
    type: "Consultation",
    phone: "08091234567",
  },
  {
    id: "A020",
    patientName: "Dr. Samuel Gyang",
    patientId: "USR008",
    doctor: "Dr. Fatima Aliyu",
    department: "General Medicine", 
    date: "2025-09-09",
    time: "04:15 PM",
    status: "Scheduled",
    type: "Health Screening",
    phone: "08012345890",
  },
  {
    id: "A021",
    patientName: "Dr. Grace Musa",
    patientId: "USR009",
    doctor: "Dr. Amina Hassan",
    department: "Internal Medicine", 
    date: "2025-09-10",
    time: "10:30 AM",
    status: "Confirmed",
    type: "Annual Checkup",
    phone: "08023456901",
  },
  {
    id: "A022",
    patientName: "Dr. Emmanuel Yakubu",
    patientId: "USR010",
    doctor: "Dr. Mary Gyang",
    department: "Cardiology", 
    date: "2025-09-11",
    time: "02:45 PM",
    status: "Scheduled",
    type: "Cardiac Assessment",
    phone: "08034567012",
  },
  {
    id: "A023",
    patientName: "Adaora Okonkwo",
    patientId: "P001234",
    doctor: "Dr. Grace Musa",
    department: "Cardiology", 
    date: "2025-09-16",
    time: "11:15 AM",
    status: "Pending",
    type: "Follow-up",
    phone: "08012345678",
  },
  {
    id: "A024",
    patientName: "Yusuf Abdullahi",
    patientId: "P001237",
    doctor: "Dr. Ruth Laven",
    department: "Pulmonology", 
    date: "2025-09-17",
    time: "03:45 PM",
    status: "Confirmed",
    type: "Asthma Review",
    phone: "08034567890",
  },
  {
    id: "A025",
    patientName: "Khadijah Usman",
    patientId: "P001244",
    doctor: "Dr. Grace Musa",
    department: "Obstetrics", 
    date: "2025-09-18",
    time: "09:45 AM",
    status: "Confirmed",
    type: "Prenatal Follow-up",
    phone: "08001234567",
  }
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
                Today's Schedule - {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter((apt) => {
                    const today = new Date().toISOString().split('T')[0];
                    return apt.date === today;
                  })
                  .length > 0 ? (
                    appointments
                      .filter((apt) => {
                        const today = new Date().toISOString().split('T')[0];
                        return apt.date === today;
                      })
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
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Appointments Today</h3>
                      <p className="text-muted-foreground">
                        There are no appointments scheduled for today. Check the calendar view for upcoming appointments.
                      </p>
                    </div>
                  )}
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
