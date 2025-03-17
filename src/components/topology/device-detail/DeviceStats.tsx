
import React from 'react';
import { NetworkDevice } from '@/types/topology';
import { Clock } from 'lucide-react';

interface DeviceStatsProps {
  device: NetworkDevice;
}

const DeviceStats = ({ device }: DeviceStatsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">CPU Usage</h4>
        <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${Math.floor(Math.random() * 100)}%`}</span>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Memory Usage</h4>
        <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${Math.floor(Math.random() * 100)}%`}</span>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Bandwidth</h4>
        <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${(Math.random() * 10).toFixed(2)} Mbps`}</span>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Packet Loss</h4>
        <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${(Math.random() * 2).toFixed(2)}%`}</span>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Latency</h4>
        <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${Math.floor(Math.random() * 50)}ms`}</span>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Total Uptime</h4>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-sm font-semibold">{device.uptime}</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceStats;
