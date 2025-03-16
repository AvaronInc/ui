
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Shield, AlertTriangle, CheckCircle, Lock, FileText, Settings, RefreshCw, Download } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';

const SecurityCompliance = () => {
  const { containers, securityScans } = useContainersData();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScans?.overallScore || '0'}/100</div>
            <Progress 
              value={securityScans?.overallScore || 0} 
              className="h-2 mt-2"
              indicatorColor={
                (securityScans?.overallScore || 0) > 80 ? 'bg-green-500' :
                (securityScans?.overallScore || 0) > 60 ? 'bg-amber-500' : 'bg-red-500'
              }
            />
            <p className="text-xs text-muted-foreground mt-2">
              {securityScans?.lastScanTime ? `Last scan: ${securityScans.lastScanTime}` : 'No scans performed yet'}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Run New Scan
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-500">{securityScans?.criticalVulnerabilities || '0'}</div>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">{securityScans?.highVulnerabilities || '0'}</div>
                <p className="text-xs text-muted-foreground">High</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">{securityScans?.mediumVulnerabilities || '0'}</div>
                <p className="text-xs text-muted-foreground">Medium</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-500">{securityScans?.lowVulnerabilities || '0'}</div>
                <p className="text-xs text-muted-foreground">Low</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Vulnerabilities
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CIS Docker</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  (securityScans?.cisDockerScore || 0) > 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {securityScans?.cisDockerScore || '0'}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">PCI DSS</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  (securityScans?.pciDssScore || 0) > 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {securityScans?.pciDssScore || '0'}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">HIPAA</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  (securityScans?.hipaaScore || 0) > 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {securityScans?.hipaaScore || '0'}%
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" /> Generate Reports
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Container Security Rules</CardTitle>
              <CardDescription>
                Define and manage security policies for your containers
              </CardDescription>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Security Policies</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          <div className="flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            <div>
                              <h4 className="text-sm font-medium">Image Scanning</h4>
                              <p className="text-xs text-muted-foreground">Security scans for images</p>
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-1">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          <div className="flex items-center">
                            <Lock className="mr-2 h-4 w-4" />
                            <div>
                              <h4 className="text-sm font-medium">Network Policies</h4>
                              <p className="text-xs text-muted-foreground">Container isolation rules</p>
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-1">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          <div className="flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <div>
                              <h4 className="text-sm font-medium">Runtime Security</h4>
                              <p className="text-xs text-muted-foreground">Runtime protection</p>
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-1">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            <div>
                              <h4 className="text-sm font-medium">Compliance</h4>
                              <p className="text-xs text-muted-foreground">Industry standards</p>
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Network Firewall</h3>
                <ToggleGroup type="single" defaultValue="strict" variant="outline">
                  <ToggleGroupItem value="disabled">Off</ToggleGroupItem>
                  <ToggleGroupItem value="permissive">Basic</ToggleGroupItem>
                  <ToggleGroupItem value="strict">Strict</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <p className="text-xs text-muted-foreground">
                Controls the network traffic between containers and external services.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Image Scanning</h3>
                <ToggleGroup type="single" defaultValue="deploy" variant="outline">
                  <ToggleGroupItem value="disabled">Off</ToggleGroupItem>
                  <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
                  <ToggleGroupItem value="deploy">On Deploy</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <p className="text-xs text-muted-foreground">
                Automatically scan container images for vulnerabilities.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Privilege Enforcement</h3>
                <ToggleGroup type="single" defaultValue="enabled" variant="outline">
                  <ToggleGroupItem value="disabled">Off</ToggleGroupItem>
                  <ToggleGroupItem value="warn">Warn Only</ToggleGroupItem>
                  <ToggleGroupItem value="enabled">Enforce</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <p className="text-xs text-muted-foreground">
                Prevents containers from running with elevated privileges.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Runtime Protection</h3>
                <ToggleGroup type="single" defaultValue="enabled" variant="outline">
                  <ToggleGroupItem value="disabled">Off</ToggleGroupItem>
                  <ToggleGroupItem value="basic">Basic</ToggleGroupItem>
                  <ToggleGroupItem value="enabled">Full</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <p className="text-xs text-muted-foreground">
                Real-time monitoring and protection of container activity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityCompliance;
