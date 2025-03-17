
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { NetworkDevice } from '@/types/topology';
import { getMockNetworkLogs } from '@/data/topologyData';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DeviceOverview, 
  QuickActions, 
  NetworkLogs, 
  DeviceConnections, 
  DeviceStats 
} from './device-detail';

interface DeviceDetailPanelProps {
  device: NetworkDevice;
  open: boolean;
  onClose: () => void;
}

const DeviceDetailPanel = ({ device, open, onClose }: DeviceDetailPanelProps) => {
  // Fetch device logs
  const { data: deviceLogs = [] } = useQuery({
    queryKey: ['deviceLogs', device.id],
    queryFn: () => getMockNetworkLogs(device.id),
    enabled: open,
  });

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  // Handle quick actions
  const handleRestartDevice = () => {
    console.log(`Restarting device: ${device.id}`);
  };

  const handleRunDiagnostics = () => {
    console.log(`Running diagnostics on device: ${device.id}`);
  };

  const handleOpenTicket = () => {
    console.log(`Opening ticket for device: ${device.id}`);
  };

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full md:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Device Details</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Device Overview */}
          <DeviceOverview 
            device={device}
            getDeviceStatusColor={getDeviceStatusColor}
          />

          {/* Quick Actions */}
          <QuickActions 
            deviceStatus={device.status}
            onRestartDevice={handleRestartDevice}
            onRunDiagnostics={handleRunDiagnostics}
            onOpenTicket={handleOpenTicket}
          />
          
          {/* Device Details Tabs */}
          <Tabs defaultValue="logs">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="logs">Network Logs</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="logs" className="space-y-4 mt-4">
              <NetworkLogs 
                logs={deviceLogs}
                getLogLevelColor={getLogLevelColor}
              />
            </TabsContent>
            
            <TabsContent value="connections" className="space-y-4 mt-4">
              <DeviceConnections connections={device.connections} />
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-4 mt-4">
              <DeviceStats device={device} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DeviceDetailPanel;
