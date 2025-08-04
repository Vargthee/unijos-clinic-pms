import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Bell,
  UserPlus,
  Activity,
  Stethoscope,
  ClipboardList,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', name: 'Patient Management', icon: Users },
  { id: 'appointments', name: 'Appointments', icon: Calendar },
  { id: 'records', name: 'Medical Records', icon: FileText },
  { id: 'staff-records', name: 'Staff Records', icon: ClipboardList },
  { id: 'mental-health', name: 'Mental Health', icon: Activity },
  { id: 'prescriptions', name: 'Prescriptions', icon: Stethoscope },
  { id: 'vaccinations', name: 'Vaccinations', icon: Shield },
];

const SidebarContent = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold">HealthCenter</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
              {item.id === 'appointments' && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  3
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="border-t p-3">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Settings */}
      <div className="border-t p-3">
        <button
          onClick={() => onTabChange('settings')}
          className={cn(
            'flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            activeTab === 'settings'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </button>
      </div>
    </div>
  );
};

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col min-h-0 border-r bg-background">
          <SidebarContent activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent activeTab={activeTab} onTabChange={onTabChange} />
        </SheetContent>
      </Sheet>
    </>
  );
};