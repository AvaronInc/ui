
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Shield, AlertTriangle, Server, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';

const TopAlertsPanel: React.FC = () => {
  // Mock data for top alerts
  const alerts = [
    {
      id: 'alert-001',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      severity: 'critical',
      category: 'security',
      icon: Shield,
      title: 'Multiple Failed Authentication Attempts',
      description: '23 failed login attempts for administrator account from unknown IP 203.0.113.42',
      compliance: 'PCI-DSS 10.2.4, 10.2.5'
    },
    {
      id: 'alert-002',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      severity: 'high',
      category: 'system',
      icon: Server,
      title: 'Critical System Resources',
      description: 'Database server DB-01 has reached 92% memory utilization, multiple query timeouts reported',
      compliance: 'ISO-27001 A.12.1'
    },
    {
      id: 'alert-003',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      severity: 'high',
      category: 'security',
      icon: Lock,
      title: 'SSL Certificate Expiry',
      description: 'SSL Certificate for api.example.com will expire in 3 days, renewal required',
      compliance: 'SOC2 CC6.1'
    },
    {
      id: 'alert-004',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      severity: 'medium',
      category: 'compliance',
      icon: AlertTriangle,
      title: 'Unauthorized Configuration Change',
      description: 'User james.smith modified firewall rule FW-221 without change request approval',
      compliance: 'NIST 800-53 CM-3'
    }
  ];
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };
  
  const getCategoryIcon = (icon: any) => {
    const Icon = icon;
    return <Icon className="h-4 w-4" />;
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Alert</TableHead>
          <TableHead>Compliance</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell className="whitespace-nowrap">
              {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
            </TableCell>
            <TableCell>
              {getSeverityBadge(alert.severity)}
            </TableCell>
            <TableCell>
              <div className="flex items-start gap-2">
                <div className="mt-0.5">{getCategoryIcon(alert.icon)}</div>
                <div>
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-xs text-muted-foreground">{alert.description}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-xs font-mono bg-muted p-1 rounded">
                {alert.compliance}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="ghost">
                <ExternalLink className="h-4 w-4 mr-1" />
                Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopAlertsPanel;
