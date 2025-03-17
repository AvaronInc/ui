
import React from 'react';
import { NetworkDevice } from '@/types/topology';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface DeviceOverviewProps {
  device: NetworkDevice;
  getDeviceStatusColor: (status: string) => string;
}

const DeviceOverview = ({ device, getDeviceStatusColor }: DeviceOverviewProps) => {
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{device.name}</h3>
          <p className="text-sm text-muted-foreground">{device.description}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm ${getDeviceStatusColor(device.status)}`}>
          <div className={`h-2 w-2 rounded-full ${device.status === 'online' ? 'bg-success' : device.status === 'warning' ? 'bg-warning' : 'bg-destructive'}`}></div>
          <span className="capitalize">{device.status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-muted-foreground">IP Address</p>
          <p className="font-medium">{device.ipAddress}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">MAC Address</p>
          <p className="font-medium">{device.macAddress}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Last Restart</p>
          <p className="font-medium">{formatTimestamp(device.lastRestart)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Uptime</p>
          <p className="font-medium">{device.uptime}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Location</p>
          <p className="font-medium">{device.location || 'Unknown'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Type</p>
          <p className="font-medium capitalize">{device.type}</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceOverview;
