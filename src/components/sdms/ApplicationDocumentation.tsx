
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ApplicationService } from '@/types/sdms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Globe, Server, Cloud } from 'lucide-react';

// Mock application services
const mockApplications: ApplicationService[] = [
  {
    id: 'app-1',
    name: 'Company Website',
    type: 'web',
    status: 'active',
    url: 'https://company.example.com',
    sslDetails: {
      issuer: 'Let\'s Encrypt',
      validUntil: '2024-12-31',
      status: 'valid'
    },
    dependencies: ['app-4', 'app-5'],
    cloudProvider: null
  },
  {
    id: 'app-2',
    name: 'Customer Portal',
    type: 'web',
    status: 'active',
    url: 'https://portal.example.com',
    sslDetails: {
      issuer: 'DigiCert',
      validUntil: '2024-10-15',
      status: 'valid'
    },
    dependencies: ['app-3', 'app-4', 'app-5'],
    cloudProvider: 'aws'
  },
  {
    id: 'app-3',
    name: 'Authentication Service',
    type: 'service',
    status: 'active',
    dependencies: ['app-5'],
    cloudProvider: 'aws'
  },
  {
    id: 'app-4',
    name: 'Content API',
    type: 'api',
    status: 'warning',
    url: 'https://api.example.com',
    sslDetails: {
      issuer: 'Let\'s Encrypt',
      validUntil: '2024-02-28',
      status: 'expiring'
    },
    dependencies: ['app-5'],
    cloudProvider: 'aws'
  },
  {
    id: 'app-5',
    name: 'Main Database',
    type: 'database',
    status: 'active',
    dependencies: [],
    cloudProvider: null
  }
];

const ApplicationDocumentation = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe className="h-4 w-4" />;
      case 'api':
        return <Server className="h-4 w-4" />;
      case 'database':
        return <Database className="h-4 w-4" />;
      case 'service':
      case 'cloud':
        return <Cloud className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Inactive</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Warning</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCloudBadge = (provider: string | null) => {
    if (!provider) return null;
    
    switch (provider) {
      case 'aws':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">AWS</Badge>;
      case 'azure':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Azure</Badge>;
      case 'gcp':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">GCP</Badge>;
      default:
        return <Badge variant="outline">{provider}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">Application & Service Documentation</div>
      <p className="text-muted-foreground">
        AI-generated documentation of all applications and services in your environment.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Applications & Services</CardTitle>
          <CardDescription>
            Complete mapping of all applications, services, and their dependencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>URL & SSL</TableHead>
                <TableHead>Cloud</TableHead>
                <TableHead>Dependencies</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {getTypeIcon(app.type)}
                    {app.name}
                  </TableCell>
                  <TableCell className="capitalize">{app.type}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>
                    {app.url ? (
                      <div>
                        <div className="text-sm">{app.url}</div>
                        {app.sslDetails && (
                          <div className="text-xs text-muted-foreground mt-1">
                            SSL: {app.sslDetails.issuer} (Valid until: {new Date(app.sslDetails.validUntil).toLocaleDateString()})
                            {app.sslDetails.status === 'expiring' && (
                              <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                Expiring Soon
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getCloudBadge(app.cloudProvider) || <span className="text-muted-foreground">On-Premise</span>}
                  </TableCell>
                  <TableCell>
                    {app.dependencies.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {app.dependencies.map(depId => {
                          const dep = mockApplications.find(a => a.id === depId);
                          return (
                            <Badge key={depId} variant="outline">
                              {dep?.name || depId}
                            </Badge>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Dependency Graph</Button>
          <Button>Generate Documentation</Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Web Applications</CardTitle>
            <CardDescription>
              Summary of web-facing applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Count:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SSL Secured:</span>
                <span className="font-medium">2/2 (100%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expiring Certificates:</span>
                <span className="font-medium text-yellow-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cloud Hosted:</span>
                <span className="font-medium">1/2 (50%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cloud Integration</CardTitle>
            <CardDescription>
              Cloud service utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">AWS Services:</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                  3 Applications
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Azure Services:</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  0 Applications
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Google Cloud:</span>
                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                  0 Applications
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">On-Premise:</span>
                <span className="font-medium">2 Applications</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDocumentation;
