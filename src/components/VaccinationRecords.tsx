
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, Calendar } from "lucide-react";

const mockVaccinations = [
  {
    id: "1",
    vaccine: "COVID-19 (Pfizer)",
    date: "2024-03-15",
    nextDue: "2024-09-15",
    batchNumber: "EW0182",
    administeredBy: "Dr. Fatima Aliyu",
    status: "Complete",
    site: "Left arm",
  },
  {
    id: "2",
    vaccine: "Hepatitis B",
    date: "2024-01-10",
    nextDue: "2025-01-10",
    batchNumber: "HB7834",
    administeredBy: "Dr. John Okafor",
    status: "Complete",
    site: "Right arm",
  },
  {
    id: "3",
    vaccine: "Tetanus",
    date: "2023-06-20",
    nextDue: "2033-06-20",
    batchNumber: "TT9876",
    administeredBy: "Dr. Grace Musa",
    status: "Complete",
    site: "Left arm",
  },
];

const upcomingVaccinations = [
  {
    vaccine: "COVID-19 Booster",
    dueDate: "2024-09-15",
    priority: "High",
  },
  {
    vaccine: "Influenza",
    dueDate: "2024-10-01",
    priority: "Medium",
  },
];

export const VaccinationRecords = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Vaccination & Immunization Records
          </h3>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vaccination
        </Button>
      </div>

      {/* Upcoming Vaccinations */}
      {upcomingVaccinations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Upcoming Vaccinations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingVaccinations.map((vaccination, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {vaccination.vaccine}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Due: {vaccination.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(vaccination.priority)}>
                      {vaccination.priority} Priority
                    </Badge>
                    <Button size="sm">Schedule</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vaccination History */}
      <Card>
        <CardHeader>
          <CardTitle>Vaccination History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Vaccine</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date Given</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Next Due</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Administered By</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockVaccinations.map((vaccination) => (
                  <tr key={vaccination.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {vaccination.vaccine}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Batch: {vaccination.batchNumber}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {vaccination.date}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {vaccination.nextDue}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {vaccination.administeredBy}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(vaccination.status)}>
                        {vaccination.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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
