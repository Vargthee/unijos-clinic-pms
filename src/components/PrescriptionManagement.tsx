
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Pill, AlertTriangle } from "lucide-react";

const mockPrescriptions = [
  {
    id: "1",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    prescribedBy: "Dr. Fatima Aliyu",
    prescribedDate: "2024-06-01",
    status: "Active",
    interactions: [],
  },
  {
    id: "2",
    medication: "Ibuprofen",
    dosage: "400mg",
    frequency: "Every 6 hours as needed",
    duration: "7 days",
    prescribedBy: "Dr. John Okafor",
    prescribedDate: "2024-05-28",
    status: "Completed",
    interactions: ["May interact with Lisinopril - monitor blood pressure"],
  },
];

export const PrescriptionManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Prescription Management
          </h3>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Prescription
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Prescription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medication">Medication</Label>
                <Input
                  id="medication"
                  value={newPrescription.medication}
                  onChange={(e) => setNewPrescription(prev => ({ ...prev, medication: e.target.value }))}
                  placeholder="Enter medication name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={newPrescription.dosage}
                  onChange={(e) => setNewPrescription(prev => ({ ...prev, dosage: e.target.value }))}
                  placeholder="e.g., 10mg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  value={newPrescription.frequency}
                  onChange={(e) => setNewPrescription(prev => ({ ...prev, frequency: e.target.value }))}
                  placeholder="e.g., Once daily"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newPrescription.duration}
                  onChange={(e) => setNewPrescription(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 30 days"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={newPrescription.instructions}
                onChange={(e) => setNewPrescription(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="Any special instructions for the patient"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Prescription</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {mockPrescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {prescription.medication}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {prescription.dosage} - {prescription.frequency}
                  </p>
                </div>
                <Badge className={getStatusColor(prescription.status)}>
                  {prescription.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                  <p className="text-gray-600 dark:text-gray-400">{prescription.duration}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prescribed by:</span>
                  <p className="text-gray-600 dark:text-gray-400">{prescription.prescribedBy}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date:</span>
                  <p className="text-gray-600 dark:text-gray-400">{prescription.prescribedDate}</p>
                </div>
              </div>

              {prescription.interactions.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                        Drug Interactions
                      </h5>
                      {prescription.interactions.map((interaction, index) => (
                        <p key={index} className="text-yellow-700 dark:text-yellow-300 text-sm">
                          {interaction}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
