import React, { useState } from 'react';
import { Search, UserPlus, Users, Phone, Mail, MapPin, Calendar, User, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AddPatientDialog } from './AddPatientDialog';
import { getInitials } from '@/utils';

// Mock patient data that matches the medical records section
const mockPatients = [
  {
    id: '1',
    name: 'Ibrahim Musa',
    email: 'ibrahim.musa@unijos.edu.ng',
    phone: '08023456789',
    dateOfBirth: '2000-03-15',
    age: 24,
    gender: 'male' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08012345678',
    department: 'Medicine',
    level: '400L',
    studentId: 'UJ/2020/MED/0456',
    type: 'student',
    specialty: 'General Practitioner'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@unijos.edu.ng',
    phone: '08087654321',
    dateOfBirth: '1985-07-22',
    age: 39,
    gender: 'female' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08098765432',
    department: 'Pediatrics',
    type: 'staff',
    specialty: 'Pediatrician'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@unijos.edu.ng',
    phone: '08034567890',
    dateOfBirth: '2001-11-08',
    age: 23,
    gender: 'male' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08023456789',
    department: 'Engineering',
    level: '300L',
    studentId: 'UJ/2021/ENG/0234',
    type: 'student',
    specialty: 'General Practitioner'
  },
  {
    id: '4',
    name: 'Dr. Aisha Abdullahi',
    email: 'aisha.abdullahi@unijos.edu.ng',
    phone: '08045678901',
    dateOfBirth: '1980-12-03',
    age: 44,
    gender: 'female' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08034567890',
    department: 'Internal Medicine',
    type: 'staff',
    specialty: 'Cardiologist'
  },
  {
    id: '5',
    name: 'David Thompson',
    email: 'david.thompson@unijos.edu.ng',
    phone: '08056789012',
    dateOfBirth: '2002-05-18',
    age: 22,
    gender: 'male' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08045678901',
    department: 'Computer Science',
    level: '200L',
    studentId: 'UJ/2022/CSC/0567',
    type: 'student',
    specialty: 'General Practitioner'
  },
  {
    id: '6',
    name: 'Dr. Fatima Usman',
    email: 'fatima.usman@unijos.edu.ng',
    phone: '08067890123',
    dateOfBirth: '1988-09-14',
    age: 36,
    gender: 'female' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08056789012',
    department: 'Obstetrics & Gynecology',
    type: 'staff',
    specialty: 'Gynecologist'
  },
  {
    id: '7',
    name: 'Emmanuel Okoro',
    email: 'emmanuel.okoro@unijos.edu.ng',
    phone: '08078901234',
    dateOfBirth: '2001-01-25',
    age: 23,
    gender: 'male' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08067890123',
    department: 'Business Administration',
    level: '400L',
    studentId: 'UJ/2020/BUS/0789',
    type: 'student',
    specialty: 'General Practitioner'
  },
  {
    id: '8',
    name: 'Dr. James Wilson',
    email: 'james.wilson@unijos.edu.ng',
    phone: '08089012345',
    dateOfBirth: '1975-04-11',
    age: 49,
    gender: 'male' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08078901234',
    department: 'Surgery',
    type: 'staff',
    specialty: 'Surgeon'
  },
  {
    id: '9',
    name: 'Grace Adamu',
    email: 'grace.adamu@unijos.edu.ng',
    phone: '08090123456',
    dateOfBirth: '2000-08-30',
    age: 24,
    gender: 'female' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08089012345',
    department: 'Nursing',
    level: '300L',
    studentId: 'UJ/2021/NUR/0901',
    type: 'student',
    specialty: 'General Practitioner'
  },
  {
    id: '10',
    name: 'Dr. Ruth Laven',
    email: 'ruth.laven@unijos.edu.ng',
    phone: '08001234567',
    dateOfBirth: '1982-06-17',
    age: 42,
    gender: 'female' as const,
    address: 'Jos, Plateau State',
    emergencyContact: '08090123456',
    department: 'Family Medicine',
    type: 'staff',
    specialty: 'Family Medicine Specialist'
  }
];

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'students' | 'staff'>('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         patient.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'students' && patient.type === 'student') ||
                           (selectedCategory === 'staff' && patient.type === 'staff');
    
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: mockPatients.length,
    students: mockPatients.filter(p => p.type === 'student').length,
    staff: mockPatients.filter(p => p.type === 'staff').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patient Directory</h1>
          <p className="text-muted-foreground">Manage university health center patients</p>
        </div>
        <Button onClick={() => setIsAddPatientOpen(true)} className="w-full md:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <GraduationCap className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Students</p>
              <p className="text-2xl font-bold text-foreground">{stats.students}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <User className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Staff</p>
              <p className="text-2xl font-bold text-foreground">{stats.staff}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, email, phone, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={selectedCategory === 'students' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('students')}
            size="sm"
          >
            Students
          </Button>
          <Button
            variant={selectedCategory === 'staff' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('staff')}
            size="sm"
          >
            Staff
          </Button>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant={patient.type === 'student' ? 'secondary' : 'default'} className="text-xs">
                        {patient.type === 'student' ? 'Student' : 'Staff'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Age {patient.age}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="truncate">{patient.address}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>{patient.department}</span>
                </div>
                {patient.type === 'student' && patient.level && (
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{patient.level} - {patient.studentId}</span>
                  </div>
                )}
                <div className="flex items-center text-muted-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span className="truncate">
                    {patient.type === 'staff' && patient.specialty !== 'General Practitioner' 
                      ? patient.specialty 
                      : patient.specialty.replace('Dr. ', '')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">No patients found</h3>
          <p className="mt-2 text-muted-foreground">
            {searchTerm 
              ? "Try adjusting your search terms or filters." 
              : "Get started by adding your first patient."}
          </p>
        </div>
      )}

      <AddPatientDialog 
        open={isAddPatientOpen} 
        onOpenChange={setIsAddPatientOpen} 
      />
    </div>
  );
};

export default PatientManagement;
