
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, PowerOff, Settings, Trash2 } from 'lucide-react';

const honeypots = [
  {
    id: 1,
    name: 'Web Server Honeypot',
    type: 'Web Application',
    ipAddress: '10.0.3.45',
    segment: 'DMZ',
    status: 'Active',
    attacksToday: 23,
    deployedDate: '2023-11-15'
  },
  {
    id: 2,
    name: 'Database Honeypot',
    type: 'Database Server',
    ipAddress: '10.0.3.46',
    segment: 'DMZ',
    status: 'Active',
    attacksToday: 17,
    deployedDate: '2023-11-15'
  },
  {
    id: 3,
    name: 'FTP Honeypot',
    type: 'File Server',
    ipAddress: '10.0.3.47',
    segment: 'Services',
    status: 'Active',
    attacksToday: 8,
    deployedDate: '2023-11-16'
  },
  {
    id: 4,
    name: 'SMTP Honeypot',
    type: 'Mail Server',
    ipAddress: '10.0.3.48',
    segment: 'Services',
    status: 'Inactive',
    attacksToday: 0,
    deployedDate: '2023-11-17'
  },
  {
    id: 5,
    name: 'SSH Honeypot',
    type: 'Linux Server',
    ipAddress: '10.0.3.49',
    segment: 'Resources',
    status: 'Active',
    attacksToday: 31,
    deployedDate: '2023-11-17'
  }
];

export const HoneypotInstancesTable: React.FC = () => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Attacks Today</TableHead>
            <TableHead>Deployed Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {honeypots.map((honeypot) => (
            <TableRow key={honeypot.id}>
              <TableCell className="font-medium">{honeypot.name}</TableCell>
              <TableCell>{honeypot.type}</TableCell>
              <TableCell>{honeypot.ipAddress}</TableCell>
              <TableCell>
                <Badge variant="outline">{honeypot.segment}</Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={honeypot.status === 'Active' ? 'default' : 'secondary'}
                >
                  {honeypot.status}
                </Badge>
              </TableCell>
              <TableCell>{honeypot.attacksToday}</TableCell>
              <TableCell>{honeypot.deployedDate}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <PowerOff className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
