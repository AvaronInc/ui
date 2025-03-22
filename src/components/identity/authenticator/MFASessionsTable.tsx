
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Smartphone, 
  LogOut, 
  AlertTriangle,
  Clock, 
  CheckCircle,
  Lock
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface MFASession {
  id: string;
  userId: string;
  userName: string;
  deviceId: string;
  deviceModel: string;
  deviceType: 'Android' | 'iOS';
  loginTime: string;
  ipAddress: string;
  lastActivity: string;
  riskScore: number;
  status: 'active' | 'suspicious' | 'locked';  // Updated to include 'locked'
}

interface MFASessionsTableProps {
  sessions: MFASession[];
  isLoading: boolean;
  onTerminateSession: (sessionId: string) => void;
  onLockDevice: (sessionId: string, deviceId: string) => void;
}

export const MFASessionsTable: React.FC<MFASessionsTableProps> = ({
  sessions,
  isLoading,
  onTerminateSession,
  onLockDevice
}) => {
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case 'suspicious':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Suspicious
          </Badge>
        );
      case 'locked':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            Locked
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            Unknown
          </Badge>
        );
    }
  };

  const getRiskBadge = (score: number) => {
    if (score < 30) {
      return (
        <span className="text-xs font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
          Low
        </span>
      );
    } else if (score < 70) {
      return (
        <span className="text-xs font-medium text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
          Medium
        </span>
      );
    } else {
      return (
        <span className="text-xs font-medium text-red-700 bg-red-50 rounded-full px-2 py-0.5">
          High
        </span>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Login Time</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No active MFA sessions found
              </TableCell>
            </TableRow>
          ) : (
            sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">{session.userName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{session.deviceModel}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {session.deviceType}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{formatTimestamp(session.loginTime)}</TableCell>
                <TableCell>{formatTimestamp(session.lastActivity)}</TableCell>
                <TableCell className="font-mono text-xs">{session.ipAddress}</TableCell>
                <TableCell>{getRiskBadge(session.riskScore)}</TableCell>
                <TableCell>{getStatusBadge(session.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => onLockDevice(session.id, session.deviceId)}
                    >
                      <Lock className="h-4 w-4 text-amber-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => onTerminateSession(session.id)}
                    >
                      <LogOut className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
