
import React from 'react';
import { Wifi } from 'lucide-react';
import { NetworkDevice } from '@/types/topology';

interface DeviceConnectionsProps {
  device: NetworkDevice;
}

const DeviceConnections = ({ device }: DeviceConnectionsProps) => {
  const connections = device.connections || [];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Active Connections</h4>
      {connections.length === 0 ? (
        <p className="text-sm text-muted-foreground">No active connections</p>
      ) : (
        <div className="grid gap-2">
          {connections.map((connectedDeviceId) => (
            <div key={connectedDeviceId} className="border rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Wifi className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">{connectedDeviceId}</span>
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-foreground">
                Active
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceConnections;
