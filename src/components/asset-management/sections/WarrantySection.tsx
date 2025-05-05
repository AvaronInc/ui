
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Search, AlertCircle, Calendar, Clock, Download, Upload, FileText, Settings } from 'lucide-react';

const WarrantySection = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="warranty">
        <TabsList className="mb-4">
          <TabsTrigger value="warranty">Warranty Tracking</TabsTrigger>
          <TabsTrigger value="licenses">Software Licenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="warranty" className="mt-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Warranty Tracking System</h3>
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search warranties..." className="pl-8" />
              </div>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                <CardTitle className="text-lg">Warranties Expiring Soon</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Coverage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">SRV-DB-01</TableCell>
                      <TableCell>Server</TableCell>
                      <TableCell>HP Enterprise</TableCell>
                      <TableCell className="hidden md:table-cell">2021-04-10</TableCell>
                      <TableCell>2023-11-30</TableCell>
                      <TableCell className="hidden lg:table-cell">Next-Business-Day</TableCell>
                      <TableCell><Badge variant="warning">Expiring (14 days)</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Renew</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SW-CORE-01</TableCell>
                      <TableCell>Switch</TableCell>
                      <TableCell>Cisco</TableCell>
                      <TableCell className="hidden md:table-cell">2020-08-15</TableCell>
                      <TableCell>2023-12-15</TableCell>
                      <TableCell className="hidden lg:table-cell">SmartNet 24/7</TableCell>
                      <TableCell><Badge variant="warning">Expiring (29 days)</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Renew</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">FW-EDGE-02</TableCell>
                      <TableCell>Firewall</TableCell>
                      <TableCell>Fortinet</TableCell>
                      <TableCell className="hidden md:table-cell">2021-03-17</TableCell>
                      <TableCell>2024-01-17</TableCell>
                      <TableCell className="hidden lg:table-cell">FortiCare 24/7</TableCell>
                      <TableCell><Badge variant="warning">Expiring (62 days)</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Renew</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">All Warranties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Coverage Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">SRV-DB-01</TableCell>
                      <TableCell>Server</TableCell>
                      <TableCell>HP Enterprise</TableCell>
                      <TableCell className="hidden md:table-cell">2021-04-10</TableCell>
                      <TableCell>2023-11-30</TableCell>
                      <TableCell className="hidden lg:table-cell">NBD, Parts & Labor</TableCell>
                      <TableCell><Badge variant="warning">Expiring Soon</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SRV-APP-03</TableCell>
                      <TableCell>Server</TableCell>
                      <TableCell>Dell</TableCell>
                      <TableCell className="hidden md:table-cell">2021-09-08</TableCell>
                      <TableCell>2024-09-08</TableCell>
                      <TableCell className="hidden lg:table-cell">ProSupport 4hr, Parts & Labor</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SW-CORE-01</TableCell>
                      <TableCell>Switch</TableCell>
                      <TableCell>Cisco</TableCell>
                      <TableCell className="hidden md:table-cell">2020-08-15</TableCell>
                      <TableCell>2023-12-15</TableCell>
                      <TableCell className="hidden lg:table-cell">SmartNet 24/7</TableCell>
                      <TableCell><Badge variant="warning">Expiring Soon</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Vertex-PDX-01</TableCell>
                      <TableCell>Avaron Vertex</TableCell>
                      <TableCell>Network Pulse</TableCell>
                      <TableCell className="hidden md:table-cell">2023-06-05</TableCell>
                      <TableCell>2026-06-05</TableCell>
                      <TableCell className="hidden lg:table-cell">Premium, 4hr On-Site</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">FW-EDGE-02</TableCell>
                      <TableCell>Firewall</TableCell>
                      <TableCell>Fortinet</TableCell>
                      <TableCell className="hidden md:table-cell">2021-03-17</TableCell>
                      <TableCell>2024-01-17</TableCell>
                      <TableCell className="hidden lg:table-cell">FortiCare 24/7</TableCell>
                      <TableCell><Badge variant="warning">Expiring Soon</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="licenses" className="mt-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Software & Licensing Inventory</h3>
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search licenses..." className="pl-8" />
              </div>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                <CardTitle className="text-lg">Licenses Requiring Renewal</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Software</TableHead>
                      <TableHead>License Type</TableHead>
                      <TableHead className="hidden md:table-cell">Assets</TableHead>
                      <TableHead className="hidden md:table-cell">Owner</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Windows Server 2022</TableCell>
                      <TableCell>Datacenter</TableCell>
                      <TableCell className="hidden md:table-cell">16 servers</TableCell>
                      <TableCell className="hidden md:table-cell">IT Department</TableCell>
                      <TableCell>2023-11-28</TableCell>
                      <TableCell className="hidden lg:table-cell">$12,800/year</TableCell>
                      <TableCell><Badge variant="warning">Expiring (12 days)</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Renew</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">VMware vSphere</TableCell>
                      <TableCell>Enterprise Plus</TableCell>
                      <TableCell className="hidden md:table-cell">8 hosts</TableCell>
                      <TableCell className="hidden md:table-cell">IT Department</TableCell>
                      <TableCell>2023-12-15</TableCell>
                      <TableCell className="hidden lg:table-cell">$24,000/year</TableCell>
                      <TableCell><Badge variant="warning">Expiring (29 days)</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Renew</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Adobe Creative Cloud</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell className="hidden md:table-cell">12 users</TableCell>
                      <TableCell className="hidden md:table-cell">Marketing</TableCell>
                      <TableCell>2023-12-31</TableCell>
                      <TableCell className="hidden lg:table-cell">$6,600/year</TableCell>
                      <TableCell><Badge variant="warning">Expiring (45 days)</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Renew</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Software License Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Software</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                      <TableHead>Purchased</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead className="hidden lg:table-cell">Vendor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Windows Server 2022</TableCell>
                      <TableCell>Datacenter</TableCell>
                      <TableCell className="hidden md:table-cell">16 servers</TableCell>
                      <TableCell>2022-11-28</TableCell>
                      <TableCell>2023-11-28</TableCell>
                      <TableCell className="hidden lg:table-cell">Microsoft</TableCell>
                      <TableCell><Badge variant="warning">Expiring Soon</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Microsoft 365</TableCell>
                      <TableCell>E3</TableCell>
                      <TableCell className="hidden md:table-cell">150 users</TableCell>
                      <TableCell>2023-07-01</TableCell>
                      <TableCell>2024-07-01</TableCell>
                      <TableCell className="hidden lg:table-cell">Microsoft</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">VMware vSphere</TableCell>
                      <TableCell>Enterprise Plus</TableCell>
                      <TableCell className="hidden md:table-cell">8 hosts</TableCell>
                      <TableCell>2022-12-15</TableCell>
                      <TableCell>2023-12-15</TableCell>
                      <TableCell className="hidden lg:table-cell">VMware</TableCell>
                      <TableCell><Badge variant="warning">Expiring Soon</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Adobe Creative Cloud</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell className="hidden md:table-cell">12 users</TableCell>
                      <TableCell>2022-12-31</TableCell>
                      <TableCell>2023-12-31</TableCell>
                      <TableCell className="hidden lg:table-cell">Adobe</TableCell>
                      <TableCell><Badge variant="warning">Expiring Soon</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Atlassian Jira</TableCell>
                      <TableCell>Cloud Premium</TableCell>
                      <TableCell className="hidden md:table-cell">75 users</TableCell>
                      <TableCell>2023-05-15</TableCell>
                      <TableCell>2024-05-15</TableCell>
                      <TableCell className="hidden lg:table-cell">Atlassian</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarrantySection;
