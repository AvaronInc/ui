
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Search, Cpu, Clock, Map, Phone, Calendar, PlusCircle, HardDrive, Network, Server } from "lucide-react";

const AssetTrackingSection = () => {
  const [selectedAsset, setSelectedAsset] = useState<null | { id: string; name: string; }>(null);
  
  const mockAssets = [
    { id: "1", name: "WS-DEV-01", category: "Workstation", manufacturer: "Dell", model: "Precision 5570", serial: "SN12345678", purchaseDate: "2022-08-15", location: "HQ - Floor 2", status: "Active" },
    { id: "2", name: "SRV-DB-01", category: "Server", manufacturer: "HP", model: "ProLiant DL380", serial: "SN87654321", purchaseDate: "2021-04-10", location: "Data Center Alpha", status: "Active" },
    { id: "3", name: "SW-CORE-01", category: "Networking", manufacturer: "Cisco", model: "Catalyst 9300", serial: "SN55667788", purchaseDate: "2023-01-22", location: "Data Center Alpha", status: "Active" },
    { id: "4", name: "NEST-PDX-01", category: "CyberNest", manufacturer: "Custom", model: "Enterprise C4", serial: "SN11223344", purchaseDate: "2023-06-05", location: "Portland Office", status: "Active" },
    { id: "5", name: "LAP-MKT-05", category: "Workstation", manufacturer: "Apple", model: "MacBook Pro M1", serial: "SN99887766", purchaseDate: "2022-11-30", location: "HQ - Floor 3", status: "In Maintenance" },
    { id: "6", name: "FW-EDGE-02", category: "Networking", manufacturer: "Fortinet", model: "FortiGate 200F", serial: "SN44332211", purchaseDate: "2022-03-17", location: "Data Center Beta", status: "Active" },
    { id: "7", name: "SRV-APP-03", category: "Server", manufacturer: "Dell", model: "PowerEdge R740", serial: "SN11223355", purchaseDate: "2021-09-08", location: "Data Center Alpha", status: "Active" },
    { id: "8", name: "WS-FIN-10", category: "Workstation", manufacturer: "Lenovo", model: "ThinkPad P1", serial: "SN55443322", purchaseDate: "2021-06-14", location: "HQ - Floor 1", status: "Retired" },
  ];

  const handleAssetClick = (asset: { id: string; name: string; }) => {
    setSelectedAsset(asset);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "In Maintenance": return "warning";  
      case "Retired": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="pl-8"
            />
          </div>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Manufacturer</TableHead>
                <TableHead className="hidden md:table-cell">Model/Serial</TableHead>
                <TableHead className="hidden lg:table-cell">Purchase Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssets.map((asset) => (
                <TableRow 
                  key={asset.id}
                  className="cursor-pointer hover:bg-muted/80"
                  onClick={() => handleAssetClick(asset)}
                >
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell className="hidden md:table-cell">{asset.manufacturer}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {asset.model}
                    <div className="text-xs text-muted-foreground">SN: {asset.serial}</div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{asset.purchaseDate}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(asset.status)}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        {selectedAsset ? (
          <Card>
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Device Details</h3>
              <p className="text-sm text-muted-foreground">
                Asset: {selectedAsset.name}
              </p>
            </div>
            <Tabs defaultValue="info">
              <TabsList className="w-full justify-start p-0 px-6 pt-2">
                <TabsTrigger value="info">Device Info</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="p-6 pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Manufacturer</p>
                      <p className="text-sm">Dell</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Model</p>
                      <p className="text-sm">Precision 5570</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Serial Number</p>
                    <p className="text-sm">SN12345678</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Asset Tag</p>
                    <p className="text-sm">NPM-WS-2022-087</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Purchase Order</p>
                      <p className="text-sm">PO-2022-0567</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cost</p>
                      <p className="text-sm">$2,389.00</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Assigned Rack</p>
                    <p className="text-sm">N/A - End User Device</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="p-6 pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Location Name</p>
                    <p className="text-sm">HQ - Floor 2</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm">Development</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Assigned User</p>
                    <p className="text-sm">Alex Johnson</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Rack Position</p>
                    <p className="text-sm">N/A</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">GPS Coordinates</p>
                    <p className="text-sm">N/A</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="p-6 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <span className="text-sm">24%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <span className="text-sm">38%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "38%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <HardDrive className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="text-sm font-medium">Storage Usage</span>
                    </div>
                    <span className="text-sm">67%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "67%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Network className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-sm font-medium">Network Traffic</span>
                    </div>
                    <span className="text-sm">12.4 Mbps</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="p-6 pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Warranty Status</p>
                    <Badge variant="outline" className="mt-1">Active - 346 days remaining</Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Manufacturer Support</p>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">1-800-456-7890</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Vendor Contact</p>
                    <p className="text-sm">TechSource Inc.</p>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">1-888-555-1234</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Last Service Date</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">May 15, 2023</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Next Scheduled Maintenance</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">November 15, 2023</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        ) : (
          <Card className="flex items-center justify-center h-full min-h-[300px] text-center p-6">
            <div>
              <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Asset Selected</h3>
              <p className="text-sm text-muted-foreground">
                Select an asset from the list to view detailed information
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssetTrackingSection;
