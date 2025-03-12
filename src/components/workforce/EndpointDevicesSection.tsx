
import React from 'react';
import { EndpointDevice } from '@/types/workforce';
import { Button } from '@/components/ui/button';
import EndpointDevicesList from '@/components/workforce/EndpointDevicesList';

interface EndpointDevicesSectionProps {
  groupBy: string;
  groupedDevices: Record<string, EndpointDevice[]>;
  filteredDevices: EndpointDevice[];
  onSelectDevice: (deviceId: string) => void;
  onClearFilters: () => void;
}

const EndpointDevicesSection = ({ 
  groupBy, 
  groupedDevices, 
  filteredDevices, 
  onSelectDevice,
  onClearFilters
}: EndpointDevicesSectionProps) => {
  if (groupBy && Object.keys(groupedDevices).length > 0) {
    return (
      <div className="space-y-6">
        {Object.entries(groupedDevices).map(([group, devices]) => (
          <div key={group} className="space-y-2">
            <h3 className="text-lg font-medium">{groupBy === 'role' ? group.charAt(0).toUpperCase() + group.slice(1) : group}</h3>
            <EndpointDevicesList 
              devices={devices}
              onSelectDevice={onSelectDevice}
            />
          </div>
        ))}
      </div>
    );
  }
  
  if (filteredDevices.length > 0) {
    return (
      <EndpointDevicesList 
        devices={filteredDevices}
        onSelectDevice={onSelectDevice}
      />
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <p className="text-muted-foreground">No devices match your filters.</p>
      <Button 
        variant="link" 
        onClick={onClearFilters}
        className="mt-2"
      >
        Clear filters
      </Button>
    </div>
  );
};

export default EndpointDevicesSection;
