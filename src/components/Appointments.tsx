
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";
import { ScheduleAppointmentDialog } from "./ScheduleAppointmentDialog";
import { EditAppointmentDialog } from "./EditAppointmentDialog";
import { useToast } from "@/hooks/use-toast";

const appointments = [
  {
    id: "A001",
    patientName: "Chinedu Okeke",
    patientId: "P001238",
    doctor: "Dr. Fatima Aliyu",
    department: "General Medicine",
    date: "2024-06-09",
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
    date: "2024-06-09",
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
    date: "2024-06-09",
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
    date: "2024-06-10",
    time: "11:00 AM",
    status: "Scheduled",
    type: "Consultation",
    phone: "08045678901",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Scheduled":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const Appointments = () => {
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appointments</h2>
          <p className="text-muted-foreground">Manage patient appointments and scheduling</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 hover-scale"
          onClick={() => setIsScheduleOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      {/* Today's Schedule */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Schedule - June 9, 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments
              .filter((apt) => apt.date === "2024-06-09")
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-muted/50 hover:bg-muted/80 rounded-lg border border-border hover-scale transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{appointment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.patientId} • {appointment.department}
                      </p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">{appointment.time}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
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
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* All Appointments */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                  <tr key={appointment.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200">
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
        </CardContent>
      </Card>

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
