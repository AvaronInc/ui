
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cpu, Clock, Map, Phone, Calendar, HardDrive, Network, Server } from "lucide-react";

interface AssetDetailPanelProps {
  selectedAsset: { id: string; name: string; } | null;
}

const AssetDetailPanel: React.FC<AssetDetailPanelProps> = ({ selectedAsset }) => {
  if (!selectedAsset) {
    return (
      <Card className="flex items-center justify-center h-full min-h-[300px] text-center p-6">
        <div>
          <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No Asset Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select an asset from the list to view detailed information
          </p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Device Details</h3>
        <p className="text-sm text-muted-foreground">
          Asset: {selectedAsset.name}
        </p>
      </div>
      <Tabs defaultValue="info">
        <TabsList className="w-full grid grid-cols-4 px-6 pt-2">
          <TabsTrigger value="info">Device Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="p-6 pt-4">
          <DeviceInfoTab />
        </TabsContent>
        
        <TabsContent value="location" className="p-6 pt-4">
          <LocationTab />
        </TabsContent>
        
        <TabsContent value="performance" className="p-6 pt-4">
          <PerformanceTab />
        </TabsContent>
        
        <TabsContent value="support" className="p-6 pt-4">
          <SupportTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const DeviceInfoTab = () => {
  return (
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
  );
};

const LocationTab = () => {
  return (
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
  );
};

const PerformanceTab = () => {
  return (
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
  );
};

const SupportTab = () => {
  return (
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
  );
};

export default AssetDetailPanel;
