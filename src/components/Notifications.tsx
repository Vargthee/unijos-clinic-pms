import React from 'react';
import { Bell, Calendar, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'alert' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Ibrahim Musa has an appointment at 2:00 PM today',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Vaccination Due',
    message: 'Grace Adamu - COVID-19 booster vaccination due',
    time: '4 hours ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'alert',
    title: 'Emergency Contact',
    message: 'High priority: Student reported severe allergic reaction',
    time: '6 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Record Updated',
    message: 'Medical record updated for Emmanuel Okoro',
    time: '1 day ago',
    isRead: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'appointment':
      return Calendar;
    case 'reminder':
      return Bell;
    case 'alert':
      return AlertTriangle;
    case 'info':
      return FileText;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'appointment':
      return 'blue';
    case 'reminder':
      return 'yellow';
    case 'alert':
      return 'red';
    case 'info':
      return 'green';
    default:
      return 'gray';
  }
};

export const Notifications = () => {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 p-4 pt-0">
            {mockNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                    !notification.isRead ? 'bg-muted/30 border-primary/20' : 'border-border'
                  }`}
                >
                  <div className={`mt-1 p-1 rounded-full ${
                    notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                    notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-600' :
                    notification.type === 'appointment' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.isRead && (
                        <div className="h-2 w-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <div className="p-4 pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};