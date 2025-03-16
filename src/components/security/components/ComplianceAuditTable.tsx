
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const ComplianceAuditTable: React.FC = () => {
  const auditData = [
    {
      id: 1,
      framework: 'SOC 2',
      control: 'Access Control',
      status: 'compliant',
      lastAudit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      nextAudit: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      assignee: 'Security Team'
    },
    {
      id: 2,
      framework: 'ISO 27001',
      control: 'Risk Assessment',
      status: 'partial',
      lastAudit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      nextAudit: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      assignee: 'Risk Management'
    },
    {
      id: 3,
      framework: 'NIST 800-53',
      control: 'Configuration Management',
      status: 'non-compliant',
      lastAudit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      nextAudit: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      assignee: 'IT Operations'
    },
    {
      id: 4,
      framework: 'HIPAA',
      control: 'Data Protection',
      status: 'compliant',
      lastAudit: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      nextAudit: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      assignee: 'Security Team'
    },
    {
      id: 5,
      framework: 'GDPR',
      control: 'User Consent',
      status: 'partial',
      lastAudit: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      nextAudit: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      assignee: 'Legal & Compliance'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Compliant</Badge>;
      case 'partial':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Partial</Badge>;
      case 'non-compliant':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Framework</TableHead>
          <TableHead>Control</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Audit</TableHead>
          <TableHead>Next Audit</TableHead>
          <TableHead>Assignee</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {auditData.map((audit) => (
          <TableRow key={audit.id}>
            <TableCell className="font-medium">{audit.framework}</TableCell>
            <TableCell>{audit.control}</TableCell>
            <TableCell>{getStatusBadge(audit.status)}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(audit.lastAudit), { addSuffix: true })}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(audit.nextAudit), { addSuffix: true })}</TableCell>
            <TableCell>{audit.assignee}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComplianceAuditTable;
