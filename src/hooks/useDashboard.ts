
import { useState, useEffect } from 'react';
import { DashboardStats, Patient } from '@/types';

const mockStats: DashboardStats = {
  totalPatients: 124,
  todaysAppointments: 8,
  activeCases: 17,
  recordsUpdated: 23,
};

const mockRecentPatients: Patient[] = [
  {
    id: "P001234",
    name: "Adaora Okonkwo",
    email: "adaora@email.com",
    phone: "+234-123-456-7890",
    dateOfBirth: "1990-05-15",
    age: 34,
    gender: "female",
    address: "123 University Road, Jos",
    emergencyContact: "+234-987-654-3210",
  },
  {
    id: "P001236",
    name: "Blessing Eze",
    email: "blessing@email.com",
    phone: "+234-123-456-7892",
    dateOfBirth: "1992-12-10",
    age: 32,
    gender: "female",
    address: "789 Student Avenue, Jos",
    emergencyContact: "+234-987-654-3212",
  },
  {
    id: "P001237",
    name: "Yusuf Abdullahi",
    email: "yusuf@email.com",
    phone: "+234-123-456-7893",
    dateOfBirth: "1988-03-18",
    age: 36,
    gender: "male",
    address: "321 Campus Drive, Jos",
    emergencyContact: "+234-987-654-3213",
  },
];

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // No artificial delay - instant data loading
        
        setStats(mockStats);
        setRecentPatients(mockRecentPatients);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    recentPatients,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      // Trigger refetch logic here
    }
  };
};
