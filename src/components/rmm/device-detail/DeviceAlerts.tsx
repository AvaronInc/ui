
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DeviceAlert } from '@/types/rmm';
import { Info, Activity, ServerCrash } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface DeviceAlertsProps {
  alerts: DeviceAlert[];
}

const DeviceAlerts = ({ alerts }: DeviceAlertsProps) => {
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ServerCrash className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <Activity className="h-5 w-5 text-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-info" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {alerts.map((alert: DeviceAlert) => (
            <li key={alert.id} className="flex gap-3 items-start">
              <div className="mt-0.5">
                {getAlertIcon(alert.severity)}
              </div>
              <div>
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(parseISO(alert.timestamp), { addSuffix: true })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DeviceAlerts;
