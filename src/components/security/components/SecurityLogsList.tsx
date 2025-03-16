
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Laptop, Shield, Database, Globe, Server, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SecurityLogsListProps {
  searchQuery?: string;
}

const SecurityLogsList: React.FC<SecurityLogsListProps> = ({ searchQuery = '' }) => {
  const logs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      source: 'firewall',
      sourceIcon: Shield,
      severity: 'high',
      message: 'Blocked connection attempt from suspicious IP 203.0.113.42',
      device: 'Edge Firewall',
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      source: 'endpoint',
      sourceIcon: Laptop,
      severity: 'critical',
      message: 'Malware detected: Trojan.Emotet variant found in /tmp/update.exe',
      device: 'Workstation DEV-12',
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      source: 'server',
      sourceIcon: Server,
      severity: 'medium',
      message: 'Failed login attempts exceeded threshold for user admin',
      device: 'AUTH-SERVER-01',
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      source: 'database',
      sourceIcon: Database,
      severity: 'medium',
      message: 'Unusual database query pattern detected from application service',
      device: 'DB-CLUSTER-MAIN',
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      source: 'network',
      sourceIcon: Globe,
      severity: 'high',
      message: 'Port scan detected from internal IP 192.168.1.105',
      device: 'IDS Sensor 3',
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      source: 'endpoint',
      sourceIcon: Laptop,
      severity: 'low',
      message: 'USB device connected: Unknown vendor device',
      device: 'Workstation HR-05',
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
      source: 'server',
      sourceIcon: Server,
      severity: 'critical',
      message: 'Critical system file modified: /etc/passwd',
      device: 'WEB-SERVER-02',
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
      source: 'firewall',
      sourceIcon: Shield,
      severity: 'high',
      message: 'Multiple authentication failures from IP range 10.0.0.0/24',
      device: 'Internal Firewall',
    }
  ];

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const getSourceIcon = (sourceIcon: any) => {
    const Icon = sourceIcon;
    return <Icon className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Device</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredLogs.map((log) => (
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
            <TableCell>{getSeverityBadge(log.severity)}</TableCell>
            <TableCell className="max-w-md truncate">{log.message}</TableCell>
            <TableCell>{log.device}</TableCell>
          </TableRow>
        ))}
        {filteredLogs.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                <p>No matching logs found</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SecurityLogsList;
