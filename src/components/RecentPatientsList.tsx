import React from 'react';
import { User, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types';
import { getInitials } from '@/utils';

interface RecentPatientsListProps {
  patients: Patient[];
  loading: boolean;
}

export const RecentPatientsList = ({ patients, loading }: RecentPatientsListProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Patients</CardTitle>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {patients.slice(0, 5).map((patient) => (
          <div key={patient.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(patient.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{patient.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Mail className="mr-1 h-3 w-3" />
                  <span className="truncate max-w-[120px]">{patient.email}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Phone className="mr-1 h-3 w-3" />
                  <span>{patient.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge variant="outline" className="text-xs">
                Age {patient.age}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>Recently active</span>
              </div>
            </div>
          </div>
        ))}
        {patients.length === 0 && (
          <div className="text-center py-8">
            <User className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No recent patients</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};