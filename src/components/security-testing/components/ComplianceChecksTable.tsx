
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';

const ComplianceChecksTable: React.FC = () => {
  const complianceChecks = [
    {
      id: 1,
      framework: 'CIS',
      control: 'CIS 9.2',
      description: 'Ensure Firewall Rules Exist For All Open Ports',
      status: 'passed',
      notes: 'All open ports have corresponding firewall rules'
    },
    {
      id: 2,
      framework: 'NIST',
      control: 'AC-17',
      description: 'Remote Access',
      status: 'warning',
      notes: 'Additional authentication controls recommended'
    },
    {
      id: 3,
      framework: 'ISO 27001',
      control: 'A.13.1.1',
      description: 'Network Controls',
      status: 'failed',
      notes: 'Network segmentation insufficient in dev environment'
    },
    {
      id: 4,
      framework: 'GDPR',
      control: 'Art. 32',
      description: 'Security of Processing',
      status: 'passed',
      notes: 'Data encryption properly implemented'
    },
    {
      id: 5,
      framework: 'PCI-DSS',
      control: 'Req. 1.3',
      description: 'Prohibit Direct Public Access',
      status: 'failed',
      notes: 'External systems have direct access to card data environment'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

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
          <TableHead className="w-12"></TableHead>
          <TableHead>Framework</TableHead>
          <TableHead>Control ID</TableHead>
          <TableHead className="max-w-[300px]">Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {complianceChecks.map((check) => (
          <TableRow key={check.id}>
            <TableCell>{getStatusIcon(check.status)}</TableCell>
            <TableCell>{check.framework}</TableCell>
            <TableCell>{check.control}</TableCell>
            <TableCell className="max-w-[300px] truncate" title={check.description}>
              {check.description}
            </TableCell>
            <TableCell>{getStatusBadge(check.status)}</TableCell>
            <TableCell className="max-w-[200px] truncate" title={check.notes}>
              {check.notes}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <span>Details</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComplianceChecksTable;
