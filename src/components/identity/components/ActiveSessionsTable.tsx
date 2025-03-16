
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogOut, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Session {
  userId: string;
  username: string;
  fullName: string;
  ipAddress: string;
  deviceInfo: string;
  loginTime: string;
  location: string;
  riskScore: number;
}

interface ActiveSessionsTableProps {
  sessions: Session[];
}

const ActiveSessionsTable: React.FC<ActiveSessionsTableProps> = ({ sessions }) => {
  const getRiskBadge = (score: number) => {
    if (score < 30) {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          Low
        </Badge>
      );
    } else if (score < 70) {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Medium
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          High
        </Badge>
      );
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Login Time</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
              No active sessions
            </TableCell>
          </TableRow>
        ) : (
          sessions.map((session, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{session.fullName}</TableCell>
              <TableCell>{session.ipAddress}</TableCell>
              <TableCell>{session.deviceInfo}</TableCell>
              <TableCell>{session.location}</TableCell>
              <TableCell>{formatDistanceToNow(new Date(session.loginTime), { addSuffix: true })}</TableCell>
              <TableCell>{getRiskBadge(session.riskScore)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Force logout">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ActiveSessionsTable;
