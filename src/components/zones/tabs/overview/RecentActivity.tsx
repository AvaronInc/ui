
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

interface RecentActivityProps {}

const RecentActivity: React.FC<RecentActivityProps> = () => {
  // Sample mock data for activities
  const mockActivities = [
    { id: 1, action: 'Service Restart', user: 'system', timestamp: '2023-06-15T16:22:00Z' },
    { id: 2, action: 'Config Update', user: 'Sarah Johnson', timestamp: '2023-06-15T11:05:00Z' },
    { id: 3, action: 'Security Scan', user: 'Alex Chen', timestamp: '2023-06-14T19:30:00Z' }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 py-1 border-b last:border-0">
              <div className="bg-secondary h-8 w-8 rounded-full flex items-center justify-center">
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium text-sm">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</div>
                </div>
                <div className="text-xs text-muted-foreground">by {activity.user}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
