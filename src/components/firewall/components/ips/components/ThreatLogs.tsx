
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, AlertTriangle, Download, Eye, FileText, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ThreatLogsProps {
  disabled: boolean;
}

const ThreatLogs = ({ disabled }: ThreatLogsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severity, setSeverity] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  
  // Mock log data
  const threatLogs = [
    {
      id: 1,
      timestamp: '2023-08-12 08:45:22',
      source: '192.168.1.45',
      destination: '10.0.0.5',
      severity: 'high',
      message: 'Attempted SQL injection attack detected in HTTP request',
      rule: 'SQL-INJECTION-1234',
      action: 'blocked'
    },
    {
      id: 2,
      timestamp: '2023-08-12 07:30:15',
      source: '203.0.113.42',
      destination: '10.0.0.3',
      severity: 'medium',
      message: 'Suspicious login pattern detected - multiple failed attempts',
      rule: 'BRUTE-FORCE-4567',
      action: 'logged'
    },
    {
      id: 3,
      timestamp: '2023-08-12 05:12:08',
      source: '10.0.2.15',
      destination: '8.8.8.8',
      severity: 'medium',
      message: 'Unusual DNS request pattern detected',
      rule: 'DNS-TUNNEL-7890',
      action: 'blocked'
    },
    {
      id: 4,
      timestamp: '2023-08-11 23:58:41',
      source: '172.16.5.20',
      destination: '10.0.0.1',
      severity: 'critical',
      message: 'Potential ransomware command and control traffic',
      rule: 'RANSOMWARE-C2-0123',
      action: 'blocked'
    },
    {
      id: 5,
      timestamp: '2023-08-11 22:17:33',
      source: '192.168.3.101',
      destination: '10.0.0.254',
      severity: 'low',
      message: 'Potential port scanning activity detected',
      rule: 'PORT-SCAN-3456',
      action: 'logged'
    },
  ];
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400">Critical</Badge>;
      case 'high':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'blocked':
        return <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">Blocked</Badge>;
      case 'logged':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400">Logged</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Threat Log Analysis
              </CardTitle>
              <CardDescription>
                View and analyze detection events and security logs
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={disabled}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" disabled={disabled}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search threats..."
                disabled={disabled}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                disabled={disabled}
                value={severity}
                onValueChange={setSeverity}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                disabled={disabled}
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            {disabled ? (
              <div className="text-center py-12 text-muted-foreground">
                Enable IPS/IDS to view threat logs
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left text-xs font-medium text-muted-foreground p-2">Timestamp</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-2">Source</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-2">Destination</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-2">Severity</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-2">Message</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {threatLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-muted/50">
                        <td className="p-2 text-xs">{log.timestamp}</td>
                        <td className="p-2 text-xs font-mono">{log.source}</td>
                        <td className="p-2 text-xs font-mono">{log.destination}</td>
                        <td className="p-2">{getSeverityBadge(log.severity)}</td>
                        <td className="p-2 text-xs">
                          <div className="max-w-xs truncate">{log.message}</div>
                          <div className="text-xs text-muted-foreground">Rule ID: {log.rule}</div>
                        </td>
                        <td className="p-2">{getActionBadge(log.action)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            Showing 5 of 1,243 logs
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={disabled || true}>Previous</Button>
            <Button variant="outline" size="sm" disabled={disabled}>Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThreatLogs;
