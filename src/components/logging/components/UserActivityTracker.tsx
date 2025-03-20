
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

const UserActivityTracker: React.FC = () => {
  // Mock data for user activity
  const activities = [
    {
      id: 'act-001',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      user: {
        name: 'James Smith',
        initials: 'JS',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      },
      action: 'modified',
      resource: 'Firewall Rule',
      resourceId: 'FW-221',
      details: 'Modified port access from 443 to include 8080',
      ipAddress: '10.0.0.42',
    },
    {
      id: 'act-002',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      user: {
        name: 'Sarah Johnson',
        initials: 'SJ',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
      action: 'created',
      resource: 'User Account',
      resourceId: 'user-329',
      details: 'Created new user account for Michael Davis',
      ipAddress: '10.0.0.35',
    },
    {
      id: 'act-003',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'Admin',
        initials: 'AD',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      },
      action: 'deleted',
      resource: 'Virtual Machine',
      resourceId: 'VM-092',
      details: 'Decommissioned development testing instance',
      ipAddress: '10.0.0.1',
    },
    {
      id: 'act-004',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'Maria Garcia',
        initials: 'MG',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      },
      action: 'accessed',
      resource: 'Database',
      resourceId: 'customers-db',
      details: 'Ran query on customer payment information',
      ipAddress: '10.0.0.29',
    },
    {
      id: 'act-005',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'Robert Chen',
        initials: 'RC',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      },
      action: 'updated',
      resource: 'System Setting',
      resourceId: 'backup-policy',
      details: 'Modified backup schedule from daily to twice daily',
      ipAddress: '10.0.0.53',
    },
  ];
  
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'created':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Created</Badge>;
      case 'modified':
      case 'updated':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Modified</Badge>;
      case 'deleted':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Deleted</Badge>;
      case 'accessed':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Accessed</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Resource</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>IP Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="whitespace-nowrap">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{activity.user.name}</span>
              </div>
            </TableCell>
            <TableCell>
              {getActionBadge(activity.action)}
            </TableCell>
            <TableCell>
              <div className="font-medium">{activity.resource}</div>
              <div className="text-xs text-muted-foreground">{activity.resourceId}</div>
            </TableCell>
            <TableCell className="max-w-md">{activity.details}</TableCell>
            <TableCell>{activity.ipAddress}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserActivityTracker;
