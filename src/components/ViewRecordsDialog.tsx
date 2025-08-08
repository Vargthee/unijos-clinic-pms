import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, FileText, Heart, Pill, Shield } from 'lucide-react';

interface ViewRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  patientId: string;
}

export function ViewRecordsDialog({
  open,
  onOpenChange,
  patientName,
  patientId,
}: ViewRecordsDialogProps) {
  // Mock data for demonstration
  const medicalRecords = {
    basicInfo: {
      age: 32,
      gender: 'Female',
      bloodType: 'O+',
      allergies: ['Penicillin', 'Shellfish'],
    },
    recentVisits: [
      {
        date: '2024-01-15',
        type: 'Regular Checkup',
        doctor: 'Dr. Smith',
        notes: 'Annual physical examination - all vitals normal',
      },
      {
        date: '2024-01-02',
        type: 'Follow-up',
        doctor: 'Dr. Johnson',
        notes: 'Blood pressure monitoring - stable',
      },
    ],
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        prescribedBy: 'Dr. Smith',
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        prescribedBy: 'Dr. Johnson',
      },
    ],
    vaccinations: [
      {
        name: 'COVID-19',
        date: '2023-09-15',
        nextDue: '2024-09-15',
      },
      {
        name: 'Flu Shot',
        date: '2023-10-01',
        nextDue: '2024-10-01',
      },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical Records - {patientName}
          </DialogTitle>
          <DialogDescription>
            Patient ID: {patientId} | Complete medical history and records
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-lg">{medicalRecords.basicInfo.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gender</p>
                  <p className="text-lg">{medicalRecords.basicInfo.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                  <p className="text-lg">{medicalRecords.basicInfo.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {medicalRecords.basicInfo.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Visits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Recent Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.recentVisits.map((visit, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{visit.type}</p>
                        <p className="text-sm text-muted-foreground">{visit.doctor}</p>
                      </div>
                      <Badge variant="outline">{visit.date}</Badge>
                    </div>
                    <p className="text-sm">{visit.notes}</p>
                    {index < medicalRecords.recentVisits.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.medications.map((medication, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {medication.dosage} - {medication.frequency}
                      </p>
                    </div>
                    <Badge variant="secondary">{medication.prescribedBy}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vaccinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Vaccination Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.vaccinations.map((vaccination, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{vaccination.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last: {vaccination.date}
                      </p>
                    </div>
                    <Badge variant="outline">Next: {vaccination.nextDue}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}