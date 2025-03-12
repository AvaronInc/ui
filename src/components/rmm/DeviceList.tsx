
import React from 'react';
import { Device } from '@/types/rmm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Check, AlertTriangle, X, Monitor, Server, Laptop, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeviceListProps {
  devices: Device[];
  onDeviceSelect: (device: Device) => void;
}

const deviceTypeIcons = {
  server: Server,
  workstation: Monitor,
  laptop: Laptop,
  network: Network,
  other: Monitor
};

export const DeviceList = ({ devices, onDeviceSelect }: DeviceListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Check className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'offline':
        return <X className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const formatLastCheckIn = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };
  
  const getPerformanceScoreClass = (score: number) => {
    if (score === 0) return 'text-destructive';
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Check-in</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">
                  No devices found
                </TableCell>
              </TableRow>
            ) : (
              devices.map((device) => {
                const DeviceIcon = deviceTypeIcons[device.type] || Monitor;
                
                return (
                  <TableRow key={device.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell onClick={() => onDeviceSelect(device)}>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded-md",
                          device.status === 'online' ? 'bg-success/10 text-success' :
                          device.status === 'warning' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        )}>
                          <DeviceIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{device.name}</div>
                          <div className="text-xs text-muted-foreground">{device.ip} • {device.os}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell onClick={() => onDeviceSelect(device)}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(device.status)}
                        <span className="capitalize">{device.status}</span>
                      </div>
                    </TableCell>
                    <TableCell onClick={() => onDeviceSelect(device)}>
                      {formatLastCheckIn(device.lastCheckIn)}
                    </TableCell>
                    <TableCell onClick={() => onDeviceSelect(device)}>
                      <div className={cn(
                        "font-medium",
                        getPerformanceScoreClass(device.performanceScore)
                      )}>
                        {device.status === 'offline' ? 'N/A' : `${device.performanceScore}%`}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeviceSelect(device);
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeviceList;
