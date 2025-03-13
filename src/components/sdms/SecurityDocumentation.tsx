
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SecurityIssue } from '@/types/sdms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

// Mock security issues
const mockSecurityIssues: SecurityIssue[] = [
  {
    id: 'sec-1',
    title: 'Open SSH Port on Web Server',
    severity: 'medium',
    description: 'SSH port (22) is open on public-facing web server and accessible from the internet.',
    affectedDevices: ['srv-web-01'],
    recommendation: 'Limit SSH access to internal network only or implement a bastion host.',
    openPorts: [22]
  },
  {
    id: 'sec-2',
    title: 'Outdated SSL Certificate',
    severity: 'high',
    description: 'SSL certificate for api.example.com expires in 5 days.',
    affectedDevices: ['srv-api-01'],
    recommendation: 'Renew SSL certificate immediately.',
  },
  {
    id: 'sec-3',
    title: 'Firewall Misconfiguration',
    severity: 'critical',
    description: 'Firewall rule allows unrestricted access to database server from external networks.',
    affectedDevices: ['fw-01'],
    recommendation: 'Update firewall rule to restrict access to trusted networks only.',
    firewallRule: 'ALLOW ANY ANY -> 10.0.1.11 3306'
  },
  {
    id: 'sec-4',
    title: 'Default Credentials',
    severity: 'high',
    description: 'Network printer using default administrator credentials.',
    affectedDevices: ['printer-01'],
    recommendation: 'Change default credentials to strong, unique password.',
  },
  {
    id: 'sec-5',
    title: 'Unpatched Router Firmware',
    severity: 'medium',
    description: 'Router firmware has known vulnerabilities (CVE-2023-1234).',
    affectedDevices: ['rt-02'],
    recommendation: 'Update router firmware to latest version.'
  }
];

const SecurityDocumentation = () => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Critical</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const secureBadgeCount = 42;
  const warnBadgeCount = 5;
  const criticalBadgeCount = 1;
  
  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">Security Documentation & Risk Assessment</div>
      <p className="text-muted-foreground">
        AI-generated security analysis and documentation with identified risks and recommendations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secure Components</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{secureBadgeCount}</div>
            <CardDescription className="mt-2">
              Network components with no detected issues
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warnBadgeCount}</div>
            <CardDescription className="mt-2">
              Components with medium or high severity issues
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalBadgeCount}</div>
            <CardDescription className="mt-2">
              Components with critical security vulnerabilities
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Security Issues & Recommendations</span>
          </CardTitle>
          <CardDescription>
            AI-detected security concerns and recommended fixes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Affected Devices</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSecurityIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">
                    {issue.title}
                    <div className="text-xs text-muted-foreground mt-1">{issue.description}</div>
                  </TableCell>
                  <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                  <TableCell>{issue.affectedDevices.join(', ')}</TableCell>
                  <TableCell>{issue.recommendation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Download Full Report</Button>
          <Button>Generate Fix Suggestions</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecurityDocumentation;
