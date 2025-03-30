
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download } from 'lucide-react';

// Mock data
const securityEvents = [
  { id: 1, timestamp: '2025-03-20 08:42:15', type: 'BLOCK', source: '203.0.113.12', destination: '192.168.1.5', rule: 'SQL Injection Detection', severity: 'critical' },
  { id: 2, timestamp: '2025-03-20 09:12:37', type: 'ALERT', source: '192.168.1.105', destination: '198.51.100.28', rule: 'Unusual Outbound Traffic', severity: 'medium' },
  { id: 3, timestamp: '2025-03-20 10:03:58', type: 'ALLOW', source: '192.168.1.110', destination: '192.168.1.25', rule: 'Internal Traffic', severity: 'info' },
  { id: 4, timestamp: '2025-03-20 10:15:22', type: 'BLOCK', source: '198.51.100.73', destination: '192.168.1.10', rule: 'Brute Force Protection', severity: 'high' },
  { id: 5, timestamp: '2025-03-20 10:31:45', type: 'ALERT', source: '192.168.1.118', destination: '203.0.113.56', rule: 'Data Exfiltration Attempt', severity: 'high' },
];

interface FirewallLogsTableProps {
  onExportLogs: () => void;
}

const FirewallLogsTable: React.FC<FirewallLogsTableProps> = ({ onExportLogs }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
          
          <Button variant="outline" onClick={onExportLogs}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Rule</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={
                      event.type === 'BLOCK' ? 'destructive' : 
                      event.type === 'ALERT' ? 'default' : 
                      'outline'
                    }>
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.source}</TableCell>
                  <TableCell>{event.destination}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={event.rule}>{event.rule}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      event.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      event.severity === 'high' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                      event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      event.severity === 'low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }>
                      {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirewallLogsTable;
