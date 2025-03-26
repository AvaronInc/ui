
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import StatusBadge from '@/components/aim/system-health/StatusBadge';

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

interface RecentIncidentsProps {}

const RecentIncidents: React.FC<RecentIncidentsProps> = () => {
  // Sample mock data for incidents
  const mockIncidents = [
    { id: 1, title: 'CPU Spike', severity: 'warning', timestamp: '2023-06-15T14:30:00Z', resolved: true },
    { id: 2, title: 'Network Latency', severity: 'warning', timestamp: '2023-06-14T09:15:00Z', resolved: true },
    { id: 3, title: 'Memory Usage High', severity: 'critical', timestamp: '2023-06-10T22:45:00Z', resolved: true }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockIncidents.length === 0 ? (
            <div className="text-center text-muted-foreground py-2">
              No recent incidents reported
            </div>
          ) : (
            mockIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between py-1 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${incident.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                  <span className="font-medium text-sm">{incident.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{formatDate(incident.timestamp)}</span>
                  <StatusBadge status={incident.severity as any} />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentIncidents;
