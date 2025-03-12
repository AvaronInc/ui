
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SecurityEvent } from '@/types/security';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface SecurityEventsTableProps {
  events: SecurityEvent[];
  onSelectEvent: (event: SecurityEvent) => void;
}

const severityColors = {
  critical: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  high: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
  medium: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  low: 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
};

const SecurityEventsTable = ({ events, onSelectEvent }: SecurityEventsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Event Type</TableHead>
          <TableHead>Affected Device</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow
            key={event.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onSelectEvent(event)}
          >
            <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
            <TableCell className="capitalize">
              {event.eventType.replace('_', ' ')}
            </TableCell>
            <TableCell>{event.affectedDevice}</TableCell>
            <TableCell>
              <Badge variant="outline" className={cn(severityColors[event.severity])}>
                {event.severity}
              </Badge>
            </TableCell>
            <TableCell>{event.actionTaken || 'No action taken'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SecurityEventsTable;
