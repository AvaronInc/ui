
import React from 'react';
import { VPNSession } from '@/types/workforce';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Power } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface VPNSessionsTableProps {
  sessions: VPNSession[];
  onDisconnect: (sessionId: string) => void;
  isAdmin: boolean;
}

const VPNSessionsTable = ({ sessions, onDisconnect, isAdmin }: VPNSessionsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Connection Time</TableHead>
            <TableHead>Location</TableHead>
            {isAdmin && <TableHead className="w-[80px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.userName}</TableCell>
              <TableCell>{session.deviceName}</TableCell>
              <TableCell>{session.ipAddress}</TableCell>
              <TableCell>{formatDistanceToNow(new Date(session.connectionTime), { addSuffix: true })}</TableCell>
              <TableCell>{session.location}</TableCell>
              {isAdmin && (
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDisconnect(session.id)}
                    title="Disconnect"
                  >
                    <Power className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VPNSessionsTable;
