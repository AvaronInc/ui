import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, RefreshCw, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';

const SecurityCompliance = () => {
  const { securityScans } = useContainersData();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScans?.overallScore || 0}/100</div>
            <Progress value={securityScans?.overallScore || 0} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Last scan: {securityScans?.lastScanTime || 'Never'}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Run New Scan
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CIS Docker Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScans?.cisDockerScore || 0}%</div>
            <Progress value={securityScans?.cisDockerScore || 0} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              CIS Docker Benchmark Standards
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Scores</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs">PCI DSS</span>
                <span className="text-xs">{securityScans?.pciDssScore || 0}%</span>
              </div>
              <Progress value={securityScans?.pciDssScore || 0} className="h-1.5" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs">HIPAA</span>
                <span className="text-xs">{securityScans?.hipaaScore || 0}%</span>
              </div>
              <Progress value={securityScans?.hipaaScore || 0} className="h-1.5" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Assessment</CardTitle>
          <CardDescription>
            Security vulnerabilities detected in your container images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-red-800 dark:text-red-300">Critical</p>
                  <p className="text-2xl font-bold text-red-800 dark:text-red-300">{securityScans?.criticalVulnerabilities || 0}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-800 dark:text-amber-300">High</p>
                  <p className="text-2xl font-bold text-amber-800 dark:text-amber-300">{securityScans?.highVulnerabilities || 0}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-800 dark:text-blue-300">Medium</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{securityScans?.mediumVulnerabilities || 0}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-500" />
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-green-800 dark:text-green-300">Low</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-300">{securityScans?.lowVulnerabilities || 0}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-green-500" />
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Vulnerabilities</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="high">High</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="low">Low</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Container</TableHead>
                      <TableHead className="w-[150px]">Severity</TableHead>
                      <TableHead className="w-[250px]">Vulnerability</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">web-frontend</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Critical
                        </Badge>
                      </TableCell>
                      <TableCell>CVE-2023-1234</TableCell>
                      <TableCell className="text-sm">Remote code execution in base image</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="w-full">
                          Fix
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">api-server</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          High
                        </Badge>
                      </TableCell>
                      <TableCell>CVE-2023-5678</TableCell>
                      <TableCell className="text-sm">Privilege escalation vulnerability</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="w-full">
                          Fix
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">db-service</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          Medium
                        </Badge>
                      </TableCell>
                      <TableCell>CVE-2023-9012</TableCell>
                      <TableCell className="text-sm">Information disclosure vulnerability</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="w-full">
                          Fix
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {['critical', 'high', 'medium', 'low'].map((severity) => (
              <TabsContent key={severity} value={severity}>
                <div className="border rounded-md p-8 text-center text-muted-foreground">
                  Similar table for {severity} vulnerabilities would be displayed here.
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Container Security Policies</CardTitle>
            <CardDescription>
              Define security boundaries for your containers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h3 className="text-sm font-medium">Privileged Container Prevention</h3>
                  <p className="text-xs text-muted-foreground">Prevents containers from running with escalated privileges</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h3 className="text-sm font-medium">Host Network Access Prevention</h3>
                  <p className="text-xs text-muted-foreground">Prevents containers from accessing host network</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h3 className="text-sm font-medium">Host Path Mount Prevention</h3>
                  <p className="text-xs text-muted-foreground">Prevents containers from mounting sensitive host paths</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="text-sm font-medium">Image Pull Policy</h3>
                  <p className="text-xs text-muted-foreground">Only pull images from trusted registries</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Resources</CardTitle>
            <CardDescription>
              Documentation and best practices for container security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h3 className="text-sm font-medium">CIS Docker Benchmark</h3>
                  <p className="text-xs text-muted-foreground">Security best practices for Docker</p>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> View
                </Button>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h3 className="text-sm font-medium">NIST Container Security</h3>
                  <p className="text-xs text-muted-foreground">NIST Special Publication 800-190</p>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> View
                </Button>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h3 className="text-sm font-medium">Kubernetes Security</h3>
                  <p className="text-xs text-muted-foreground">Kubernetes security documentation</p>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> View
                </Button>
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="text-sm font-medium">Container Hardening Guide</h3>
                  <p className="text-xs text-muted-foreground">Best practices for hardening containers</p>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityCompliance;
