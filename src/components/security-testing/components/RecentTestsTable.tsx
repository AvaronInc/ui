
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EyeIcon, FileText } from 'lucide-react';

const RecentTestsTable: React.FC = () => {
  const recentTests = [
    { 
      id: 1, 
      name: 'Firewall Rules Penetration Test', 
      target: 'Edge Routers', 
      date: '2024-02-16 09:15', 
      duration: '32m', 
      status: 'failed',
      failures: 3,
      executions: 12
    },
    { 
      id: 2, 
      name: 'Zero Trust Authentication Test', 
      target: 'Identity Provider', 
      date: '2024-02-15 14:30', 
      duration: '45m', 
      status: 'passed',
      failures: 0,
      executions: 8
    },
    { 
      id: 3, 
      name: 'Network Segmentation Validation', 
      target: 'Internal Network', 
      date: '2024-02-15 11:20', 
      duration: '28m', 
      status: 'warning',
      failures: 1,
      executions: 15
    },
    { 
      id: 4, 
      name: 'Endpoint Security Assessment', 
      target: 'Employee Workstations', 
      date: '2024-02-14 16:40', 
      duration: '50m', 
      status: 'passed',
      failures: 0,
      executions: 18
    },
    { 
      id: 5, 
      name: 'Malware Defense Simulation', 
      target: 'File Servers', 
      date: '2024-02-14 10:05', 
      duration: '42m', 
      status: 'failed',
      failures: 4,
      executions: 10
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Failed</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Warning</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Test Name</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Results</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTests.map((test) => (
          <TableRow key={test.id}>
            <TableCell className="font-medium">{test.name}</TableCell>
            <TableCell>{test.target}</TableCell>
            <TableCell>{test.date}</TableCell>
            <TableCell>{test.duration}</TableCell>
            <TableCell>{getStatusBadge(test.status)}</TableCell>
            <TableCell>
              {test.failures > 0 ? (
                <span className="text-red-600 dark:text-red-400">{test.failures}/{test.executions} Failed</span>
              ) : (
                <span className="text-green-600 dark:text-green-400">{test.executions}/{test.executions} Passed</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentTestsTable;
