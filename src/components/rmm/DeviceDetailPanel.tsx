
import React, { useState } from 'react';
import { Device } from '@/types/rmm';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/context/ThemeContext';
import { DeviceHeader, DeviceQuickActions, DeviceMetrics, DeviceAlerts } from './device-detail';

interface DeviceDetailPanelProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceDetailPanel = ({ device, isOpen, onClose }: DeviceDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState('metrics');
  const { isDarkMode } = useTheme();
  
  if (!device) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full md:max-w-xl overflow-y-auto">
        <DeviceHeader device={device} />
        
        <DeviceQuickActions 
          deviceName={device.name} 
          deviceStatus={device.status} 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4">
            <DeviceMetrics 
              cpuData={device.metrics.cpu}
              memoryData={device.metrics.memory}
              networkData={device.metrics.network}
              isDarkMode={isDarkMode}
            />
          </TabsContent>
          
          <TabsContent value="alerts">
            <DeviceAlerts alerts={device.alerts} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default DeviceDetailPanel;
