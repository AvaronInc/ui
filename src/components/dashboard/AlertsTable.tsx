
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  message: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  timestamp: string;
}

interface AlertsTableProps {
  alerts: Alert[];
  className?: string;
}

const severityConfig = {
  info: {
    icon: Info,
    color: 'text-info',
    bgColor: 'bg-info/10'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  critical: {
    icon: XCircle,
    color: 'text-error',
    bgColor: 'bg-error/10'
  }
};

const statusConfig = {
  active: {
    label: 'Active',
    color: 'text-error'
  },
  acknowledged: {
    label: 'Acknowledged',
    color: 'text-warning'
  },
  resolved: {
    label: 'Resolved',
    color: 'text-success'
  }
};

export const AlertsTable = ({ alerts, className }: AlertsTableProps) => {
  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Severity</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Source</TableHead>
                <TableHead className="w-[120px] text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => {
                const severity = severityConfig[alert.severity];
                const status = statusConfig[alert.status];
                const SeverityIcon = severity.icon;
                
                return (
                  <TableRow key={alert.id} className="animate-fade-in [animation-delay:var(--delay)]" style={{ '--delay': `${alerts.indexOf(alert) * 50}ms` } as React.CSSProperties}>
                    <TableCell>
                      <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium", severity.bgColor, severity.color)}>
                        <SeverityIcon className="h-3.5 w-3.5" />
                        <span className="capitalize">{alert.severity}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{alert.message}</TableCell>
                    <TableCell>
                      <span className={cn("text-xs font-medium", status.color)}>
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{alert.source}</TableCell>
                    <TableCell className="text-xs text-right">{alert.timestamp}</TableCell>
                  </TableRow>
                );
              })}
              {alerts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No alerts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsTable;
