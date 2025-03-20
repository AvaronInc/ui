
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Copy, Trash2, ArrowRight } from 'lucide-react';

const automationRules = [
  {
    id: 1,
    name: 'Block Repeated SQL Injection',
    trigger: 'SQL Injection detected >= 3 times from same IP',
    action: 'Block IP at firewall for 24 hours',
    status: 'Active',
    lastTriggered: '2023-12-12 09:47',
    timesTriggered: 17
  },
  {
    id: 2,
    name: 'Alert on Zero-Day Exploit',
    trigger: 'Unknown attack pattern detected',
    action: 'Create high priority incident, notify security team',
    status: 'Active',
    lastTriggered: '2023-12-10 14:23',
    timesTriggered: 3
  },
  {
    id: 3,
    name: 'Log Potential Recon Activity',
    trigger: 'Port scan detected on honeypot',
    action: 'Log activity, add source IP to watchlist',
    status: 'Inactive',
    lastTriggered: 'Never',
    timesTriggered: 0
  },
  {
    id: 4,
    name: 'Isolate Compromised Honeypot',
    trigger: 'Honeypot shows signs of compromise',
    action: 'Isolate honeypot, capture memory dump, notify team',
    status: 'Active',
    lastTriggered: 'Never',
    timesTriggered: 0
  },
  {
    id: 5,
    name: 'Report Brute Force Attack',
    trigger: 'Login attempts > 10 in 1 minute',
    action: 'Generate report, block IP for 1 hour',
    status: 'Active',
    lastTriggered: '2023-12-11 22:16',
    timesTriggered: 42
  }
];

export const AutomationRules: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Automation Rules</h3>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Rule
        </Button>
      </div>
      
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Trigger</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Triggered</TableHead>
              <TableHead>Count</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {automationRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{rule.trigger}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{rule.action}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch checked={rule.status === 'Active'} />
                    <Badge variant={rule.status === 'Active' ? 'default' : 'secondary'}>
                      {rule.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{rule.lastTriggered}</TableCell>
                <TableCell>{rule.timesTriggered}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
