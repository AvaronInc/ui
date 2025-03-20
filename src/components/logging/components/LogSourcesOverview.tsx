
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LogSourcesOverview: React.FC = () => {
  // Mock data for log sources
  const logSources = [
    {
      id: 'src-001',
      name: 'Perimeter Firewall',
      type: 'security',
      enabled: true,
      retentionDays: 90,
      level: 'warning',
      count: 1243,
    },
    {
      id: 'src-002',
      name: 'Core Switch',
      type: 'network',
      enabled: true,
      retentionDays: 60,
      level: 'info',
      count: 5672,
    },
    {
      id: 'src-003',
      name: 'Domain Controller',
      type: 'system',
      enabled: true,
      retentionDays: 180,
      level: 'warning',
      count: 3219,
    },
    {
      id: 'src-004',
      name: 'ERP Application',
      type: 'application',
      enabled: true,
      retentionDays: 90,
      level: 'error',
      count: 487,
    },
    {
      id: 'src-005',
      name: 'Customer Database',
      type: 'database',
      enabled: true,
      retentionDays: 365,
      level: 'warning',
      count: 2106,
    },
  ];
  
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'debug':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">Debug</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Info</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Warning</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Error</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Log Source</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Verbosity Level</TableHead>
          <TableHead>Retention</TableHead>
          <TableHead>Event Count</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logSources.map((source) => (
          <TableRow key={source.id}>
            <TableCell className="font-medium">{source.name}</TableCell>
            <TableCell>
              <Badge variant="outline" className="capitalize">{source.type}</Badge>
            </TableCell>
            <TableCell>
              <Select defaultValue={source.level}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{source.retentionDays} days</TableCell>
            <TableCell>{source.count.toLocaleString()}</TableCell>
            <TableCell>
              <Switch checked={source.enabled} />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LogSourcesOverview;
