
import React from 'react';
import { ServiceAlert, Service } from '@/types/services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface RecentAlertsTableProps {
  alerts: ServiceAlert[];
  services: Service[];
}

const RecentAlertsTable = ({ alerts, services }: RecentAlertsTableProps) => {
  // Function to get service name from ID
  const getServiceName = (id: string) => {
    const service = services.find(s => s.id === id);
    return service ? service.name : 'Unknown Service';
  };
  
  // Function to format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  // Function to get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Function to get severity icon
  const getSeverityIcon = (severity: string, resolved: boolean) => {
    if (resolved) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    
    switch (severity) {
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Status</TableHead>
          <TableHead>Alert</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell className="py-2">
              {getSeverityIcon(alert.severity, alert.resolved)}
            </TableCell>
            <TableCell className="font-medium py-2">{alert.title}</TableCell>
            <TableCell className="py-2">{getServiceName(alert.serviceId)}</TableCell>
            <TableCell className="py-2">{formatTime(alert.timestamp)}</TableCell>
            <TableCell className="py-2">{getSeverityBadge(alert.severity)}</TableCell>
            <TableCell className="text-right py-2">
              <Button variant="ghost" size="sm">
                {alert.resolved ? 'Details' : 'Resolve'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentAlertsTable;
