
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SecurityEvent } from '@/types/security';
import { formatDistanceToNow } from 'date-fns';

interface RecentEventsTableProps {
  events: SecurityEvent[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };
  
  const getEventTypeText = (eventType: string) => {
    switch (eventType) {
      case 'intrusion':
        return 'Intrusion Attempt';
      case 'malware':
        return 'Malware Detected';
      case 'unauthorized_access':
        return 'Unauthorized Access';
      case 'system_error':
        return 'System Error';
      case 'policy_violation':
        return 'Policy Violation';
      default:
        return eventType.replace('_', ' ');
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Type</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{getEventTypeText(event.eventType)}</TableCell>
            <TableCell>{getSeverityBadge(event.severity)}</TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell className="max-w-[200px] truncate">{event.affectedDevice}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</TableCell>
            <TableCell>{event.actionTaken || 'No action taken'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentEventsTable;
