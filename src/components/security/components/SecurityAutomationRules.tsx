
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Play, Pause, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SecurityAutomationRules: React.FC = () => {
  const rules = [
    {
      id: 1,
      name: 'Isolate Malware-Infected Devices',
      trigger: 'Malware Detection',
      action: 'Network Isolation',
      active: true,
      severity: 'critical',
      lastTriggered: '2 hours ago'
    },
    {
      id: 2,
      name: 'Block Suspicious IP Addresses',
      trigger: 'Repeated Auth Failures',
      action: 'Firewall Rule Update',
      active: true,
      severity: 'high',
      lastTriggered: '1 day ago'
    },
    {
      id: 3,
      name: 'Reset Compromised Credentials',
      trigger: 'Credential Leak',
      action: 'Force Password Reset',
      active: true,
      severity: 'high',
      lastTriggered: '3 days ago'
    },
    {
      id: 4,
      name: 'Patch Vulnerable Systems',
      trigger: 'CVE Detection',
      action: 'Auto-Apply Patches',
      active: false,
      severity: 'medium',
      lastTriggered: '1 week ago'
    },
    {
      id: 5,
      name: 'Security Snapshot Backup',
      trigger: 'Ransomware Indicators',
      action: 'Create System Snapshot',
      active: true,
      severity: 'critical',
      lastTriggered: 'Never'
    }
  ];

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rule</TableHead>
          <TableHead>Trigger</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Last Triggered</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rules.map((rule) => (
          <TableRow key={rule.id}>
            <TableCell className="font-medium">{rule.name}</TableCell>
            <TableCell>{rule.trigger}</TableCell>
            <TableCell>{rule.action}</TableCell>
            <TableCell>{getSeverityBadge(rule.severity)}</TableCell>
            <TableCell>{rule.lastTriggered}</TableCell>
            <TableCell>
              <Switch checked={rule.active} />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  {rule.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SecurityAutomationRules;
