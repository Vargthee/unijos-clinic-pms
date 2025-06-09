
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Phone } from "lucide-react";

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
    department: "Pediatrics",
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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600">Manage patient appointments and scheduling</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
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
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">
                        {appointment.patientId} • {appointment.department}
                      </p>
                      <p className="text-sm text-gray-600">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{appointment.time}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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
      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Doctor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">{appointment.patientId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{appointment.doctor}</td>
                    <td className="py-3 px-4">{appointment.department}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{appointment.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
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
    </div>
  );
};
