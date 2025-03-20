
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Server, Database, UserCheck, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RealtimeLogFeedProps {
  searchQuery?: string;
  timeRange?: string;
}

const RealtimeLogFeed: React.FC<RealtimeLogFeedProps> = ({ 
  searchQuery = '', 
  timeRange = '24h' 
}) => {
  // Mock log data - in a real implementation, this would come from an API
  const logs = [
    {
      id: 'log-001',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      source: 'security',
      sourceIcon: Shield,
      level: 'critical',
      message: 'Failed administrator login attempt detected from unusual location',
      user: 'admin',
      ipAddress: '203.0.113.42',
    },
    {
      id: 'log-002',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      source: 'system',
      sourceIcon: Server,
      level: 'warning',
      message: 'High CPU usage on application server APP-03 (92% sustained)',
      user: 'system',
      ipAddress: '10.0.0.15',
    },
    {
      id: 'log-003',
      timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
      source: 'database',
      sourceIcon: Database,
      level: 'error',
      message: 'Database connection pool exhausted - increasing timeout errors',
      user: 'system',
      ipAddress: '10.0.0.22',
    },
    {
      id: 'log-004',
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      source: 'security',
      sourceIcon: Shield,
      level: 'info',
      message: 'User password changed successfully',
      user: 'sarah.johnson',
      ipAddress: '10.0.0.35',
    },
    {
      id: 'log-005',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      source: 'system',
      sourceIcon: Server,
      level: 'critical',
      message: 'SSL Certificate for api.example.com will expire in 3 days',
      user: 'system',
      ipAddress: '10.0.0.1',
    },
    {
      id: 'log-006',
      timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      source: 'audit',
      sourceIcon: UserCheck,
      level: 'warning',
      message: 'User james.smith modified firewall rule FW-221 (opened port 8080)',
      user: 'james.smith',
      ipAddress: '10.0.0.42',
    },
    {
      id: 'log-007',
      timestamp: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
      source: 'database',
      sourceIcon: Database,
      level: 'info',
      message: 'Database backup completed successfully - 2.3GB saved to storage',
      user: 'system',
      ipAddress: '10.0.0.22',
    },
  ];

  // Filter logs based on search query
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Apply time range filter (simplified mock implementation)
  let timeFilteredLogs = filteredLogs;
  
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Error</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Warning</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Info</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };
  
  const getSourceIcon = (sourceIcon: any) => {
    const Icon = sourceIcon;
    return <Icon className="h-4 w-4 text-muted-foreground" />;
  };
  
  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>User</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeFilteredLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap">
                {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getSourceIcon(log.sourceIcon)}
                  <span className="capitalize">{log.source}</span>
                </div>
              </TableCell>
              <TableCell>{getLevelBadge(log.level)}</TableCell>
              <TableCell className="max-w-sm truncate">{log.message}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.ipAddress}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {timeFilteredLogs.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                <div className="flex flex-col items-center gap-2">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                  <p>No matching logs found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className="flex justify-between pt-2">
        <div className="text-sm text-muted-foreground">
          Showing {timeFilteredLogs.length} of {logs.length} log entries
        </div>
        
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default RealtimeLogFeed;
