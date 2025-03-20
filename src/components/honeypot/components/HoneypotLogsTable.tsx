
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, AlertTriangle, Info, AlertCircle, CheckCircle } from 'lucide-react';

const logs = [
  {
    id: 1,
    timestamp: '2023-12-12 14:32:45',
    ipAddress: '192.168.43.117',
    action: 'SQL Injection Attempt',
    severity: 'Critical',
    honeypot: 'Web Server',
    details: 'Attempted to inject malicious SQL into login form'
  },
  {
    id: 2,
    timestamp: '2023-12-12 14:30:12',
    ipAddress: '45.123.67.89',
    action: 'Login Attempt',
    severity: 'Warning',
    honeypot: 'SSH Server',
    details: 'Multiple failed login attempts with different credentials'
  },
  {
    id: 3,
    timestamp: '2023-12-12 14:28:56',
    ipAddress: '78.34.156.78',
    action: 'File Upload',
    severity: 'Critical',
    honeypot: 'FTP Server',
    details: 'Attempted to upload known malware payload'
  },
  {
    id: 4,
    timestamp: '2023-12-12 14:25:33',
    ipAddress: '102.45.67.89',
    action: 'Port Scan',
    severity: 'Info',
    honeypot: 'Database Server',
    details: 'Scanned multiple ports looking for open services'
  },
  {
    id: 5,
    timestamp: '2023-12-12 14:22:18',
    ipAddress: '213.98.76.54',
    action: 'Connection',
    severity: 'Low',
    honeypot: 'Web Server',
    details: 'Established connection from new IP address'
  },
  {
    id: 6,
    timestamp: '2023-12-12 14:21:04',
    ipAddress: '192.168.43.117',
    action: 'Command Injection',
    severity: 'Critical',
    honeypot: 'Web Server',
    details: 'Attempted to inject shell commands into search field'
  },
  {
    id: 7,
    timestamp: '2023-12-12 14:18:59',
    ipAddress: '45.123.67.89',
    action: 'API Probe',
    severity: 'Warning',
    honeypot: 'API Gateway',
    details: 'Testing endpoint security with malformed requests'
  }
];

export const HoneypotLogsTable: React.FC = () => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Source IP</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Honeypot</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
              <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    log.severity === 'Critical' ? 'destructive' : 
                    log.severity === 'Warning' ? 'default' : 
                    log.severity === 'Info' ? 'secondary' : 
                    'outline'
                  }
                  className="flex items-center gap-1 w-fit"
                >
                  {log.severity === 'Critical' && <AlertCircle className="h-3 w-3" />}
                  {log.severity === 'Warning' && <AlertTriangle className="h-3 w-3" />}
                  {log.severity === 'Info' && <Info className="h-3 w-3" />}
                  {log.severity === 'Low' && <CheckCircle className="h-3 w-3" />}
                  {log.severity}
                </Badge>
              </TableCell>
              <TableCell>{log.honeypot}</TableCell>
              <TableCell className="max-w-[300px] truncate">{log.details}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
