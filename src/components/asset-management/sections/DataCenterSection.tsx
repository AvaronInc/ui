
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ServerStack, MapPin, Thermometer, Fan, Wifi, Power, Box, HelpCircle } from 'lucide-react';

const DataCenterSection = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  const dataCenters = [
    { id: 'dc1', name: 'Data Center Alpha', location: 'Portland, OR', racks: 24, usedU: 683, totalU: 1008, power: '87%', cooling: 'Optimal', cyberNests: 8 },
    { id: 'dc2', name: 'Data Center Beta', location: 'Seattle, WA', racks: 18, usedU: 492, totalU: 756, power: '72%', cooling: 'Optimal', cyberNests: 6 },
    { id: 'dc3', name: 'CoLo Facility East', location: 'New York, NY', racks: 6, usedU: 168, totalU: 252, power: '65%', cooling: 'Optimal', cyberNests: 2 },
    { id: 'dc4', name: 'Edge Deployment 1', location: 'Austin, TX', racks: 4, usedU: 76, totalU: 168, power: '45%', cooling: 'Optimal', cyberNests: 4 },
  ];
  
  const cyberNests = [
    { id: 'nest1', name: 'NEST-PDX-01', location: 'Portland HQ', model: 'Enterprise C4', cpuCores: 32, ram: '128GB', storage: '24TB', uplink: '10Gbps', firmware: 'v3.7.2', status: 'Active' },
    { id: 'nest2', name: 'NEST-PDX-02', location: 'Portland HQ', model: 'Enterprise C4', cpuCores: 32, ram: '128GB', storage: '24TB', uplink: '10Gbps', firmware: 'v3.7.2', status: 'Active' },
    { id: 'nest3', name: 'NEST-SEA-01', location: 'Seattle Office', model: 'Standard C2', cpuCores: 16, ram: '64GB', storage: '12TB', uplink: '5Gbps', firmware: 'v3.7.1', status: 'Active' },
    { id: 'nest4', name: 'NEST-NYC-01', location: 'New York Office', model: 'Standard C2', cpuCores: 16, ram: '64GB', storage: '12TB', uplink: '2.5Gbps', firmware: 'v3.7.1', status: 'Maintenance' },
    { id: 'nest5', name: 'NEST-ATX-01', location: 'Austin Office', model: 'Standard C2', cpuCores: 16, ram: '64GB', storage: '12TB', uplink: '1Gbps', firmware: 'v3.6.9', status: 'Update Required' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-lg font-medium">Data Center & CyberNest Management</h3>
        <div className="w-full sm:w-auto max-w-xs">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="portland">Portland, OR</SelectItem>
              <SelectItem value="seattle">Seattle, WA</SelectItem>
              <SelectItem value="nyc">New York, NY</SelectItem>
              <SelectItem value="austin">Austin, TX</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="datacenters">
        <TabsList className="mb-4">
          <TabsTrigger value="datacenters">Data Centers</TabsTrigger>
          <TabsTrigger value="cybernests">CyberNests</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="datacenters" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {dataCenters.map(dc => (
              <Card key={dc.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{dc.name}</CardTitle>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {dc.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Racks:</span>
                      <span className="font-medium">{dc.racks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rack Space:</span>
                      <span className="font-medium">{dc.usedU}U / {dc.totalU}U</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power Usage:</span>
                      <span className="font-medium">{dc.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cooling Status:</span>
                      <span className="font-medium">{dc.cooling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CyberNests:</span>
                      <span className="font-medium">{dc.cyberNests}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Hardware Allocation by Rack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rack ID</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead className="hidden md:table-cell">Total U</TableHead>
                      <TableHead className="hidden md:table-cell">Used U</TableHead>
                      <TableHead className="hidden lg:table-cell">Power Draw</TableHead>
                      <TableHead className="hidden lg:table-cell">Temperature</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">RACK-PDX-01</TableCell>
                      <TableCell>Data Center Alpha</TableCell>
                      <TableCell>APC NetShelter SX</TableCell>
                      <TableCell className="hidden md:table-cell">42U</TableCell>
                      <TableCell className="hidden md:table-cell">38U</TableCell>
                      <TableCell className="hidden lg:table-cell">4.2kW</TableCell>
                      <TableCell className="hidden lg:table-cell">68°F</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">RACK-PDX-02</TableCell>
                      <TableCell>Data Center Alpha</TableCell>
                      <TableCell>APC NetShelter SX</TableCell>
                      <TableCell className="hidden md:table-cell">42U</TableCell>
                      <TableCell className="hidden md:table-cell">30U</TableCell>
                      <TableCell className="hidden lg:table-cell">3.8kW</TableCell>
                      <TableCell className="hidden lg:table-cell">67°F</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">RACK-SEA-01</TableCell>
                      <TableCell>Data Center Beta</TableCell>
                      <TableCell>Dell PowerEdge</TableCell>
                      <TableCell className="hidden md:table-cell">42U</TableCell>
                      <TableCell className="hidden md:table-cell">36U</TableCell>
                      <TableCell className="hidden lg:table-cell">3.9kW</TableCell>
                      <TableCell className="hidden lg:table-cell">70°F</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">RACK-NYC-01</TableCell>
                      <TableCell>CoLo Facility East</TableCell>
                      <TableCell>Rittal TS IT</TableCell>
                      <TableCell className="hidden md:table-cell">42U</TableCell>
                      <TableCell className="hidden md:table-cell">28U</TableCell>
                      <TableCell className="hidden lg:table-cell">2.8kW</TableCell>
                      <TableCell className="hidden lg:table-cell">72°F</TableCell>
                      <TableCell><Badge variant="warning">Maintenance</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cybernests" className="mt-0">
          <div className="border rounded-md mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nest ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead className="hidden md:table-cell">CPU Cores</TableHead>
                  <TableHead className="hidden md:table-cell">RAM</TableHead>
                  <TableHead className="hidden lg:table-cell">Storage</TableHead>
                  <TableHead className="hidden lg:table-cell">Uplink</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cyberNests.map(nest => (
                  <TableRow key={nest.id}>
                    <TableCell className="font-medium">{nest.name}</TableCell>
                    <TableCell>{nest.location}</TableCell>
                    <TableCell>{nest.model}</TableCell>
                    <TableCell className="hidden md:table-cell">{nest.cpuCores}</TableCell>
                    <TableCell className="hidden md:table-cell">{nest.ram}</TableCell>
                    <TableCell className="hidden lg:table-cell">{nest.storage}</TableCell>
                    <TableCell className="hidden lg:table-cell">{nest.uplink}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          nest.status === 'Active' ? 'default' : 
                          nest.status === 'Maintenance' ? 'warning' : 
                          'secondary'
                        }
                      >
                        {nest.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">CyberNest Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-base font-medium mb-4">NEST-PDX-01</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-blue-500" />
                        <div className="text-sm">Temperature</div>
                        <div className="ml-auto font-medium text-sm">68°F</div>
                      </div>
                      <div className="flex items-center">
                        <Fan className="h-4 w-4 mr-2 text-green-500" />
                        <div className="text-sm">Cooling</div>
                        <div className="ml-auto font-medium text-sm">Optimal</div>
                      </div>
                      <div className="flex items-center">
                        <Power className="h-4 w-4 mr-2 text-amber-500" />
                        <div className="text-sm">Power</div>
                        <div className="ml-auto font-medium text-sm">320W</div>
                      </div>
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2 text-purple-500" />
                        <div className="text-sm">Network</div>
                        <div className="ml-auto font-medium text-sm">8.7 Gbps</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Installed Applications</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Pulse VPN</Badge>
                        <Badge variant="outline">Edge AI</Badge>
                        <Badge variant="outline">Network Monitor</Badge>
                        <Badge variant="outline">SCADA Gateway</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-base font-medium mb-4">NEST-SEA-01</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-blue-500" />
                        <div className="text-sm">Temperature</div>
                        <div className="ml-auto font-medium text-sm">71°F</div>
                      </div>
                      <div className="flex items-center">
                        <Fan className="h-4 w-4 mr-2 text-green-500" />
                        <div className="text-sm">Cooling</div>
                        <div className="ml-auto font-medium text-sm">Optimal</div>
                      </div>
                      <div className="flex items-center">
                        <Power className="h-4 w-4 mr-2 text-amber-500" />
                        <div className="text-sm">Power</div>
                        <div className="ml-auto font-medium text-sm">285W</div>
                      </div>
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2 text-purple-500" />
                        <div className="text-sm">Network</div>
                        <div className="ml-auto font-medium text-sm">4.2 Gbps</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Installed Applications</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Pulse VPN</Badge>
                        <Badge variant="outline">Edge AI</Badge>
                        <Badge variant="outline">File Cache</Badge>
                        <Badge variant="outline">IPAM Client</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map" className="mt-0">
          <Card className="mb-4">
            <CardContent className="p-6">
              <div className="flex justify-center items-center h-[400px] border rounded bg-muted/30">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Interactive Location Map</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    An interactive map showing all data centers, offices, and remote locations with their associated assets would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <ServerStack className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-base">Data Centers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-muted-foreground">Total locations</div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">Portland, OR (Main)</div>
                  <div className="text-sm">Seattle, WA</div>
                  <div className="text-sm">New York, NY (CoLo)</div>
                  <div className="text-sm">Austin, TX (Edge)</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Box className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-base">Office Locations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">With IT equipment</div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">Portland HQ</div>
                  <div className="text-sm">Seattle Office</div>
                  <div className="text-sm">New York Office</div>
                  <div className="text-sm">Austin Office</div>
                  <div className="text-sm">Chicago Office</div>
                  <div className="text-sm">San Francisco Office</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-base">Remote Sites</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">With CyberNests</div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">Denver Field Office</div>
                  <div className="text-sm">Phoenix Site</div>
                  <div className="text-sm">Minneapolis Branch</div>
                  <div className="text-sm">Miami Branch</div>
                  <div className="text-sm">+ 4 more sites</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataCenterSection;
