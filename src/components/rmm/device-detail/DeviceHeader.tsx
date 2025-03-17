
import React from 'react';
import { Device } from '@/types/rmm';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeviceHeaderProps {
  device: Device;
}

const DeviceHeader = ({ device }: DeviceHeaderProps) => {
  const formatLastCheckIn = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  const statusChip = (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
      device.status === 'online' ? 'bg-success/10 text-success' :
      device.status === 'warning' ? 'bg-warning/10 text-warning' :
      'bg-destructive/10 text-destructive'
    }`}>
      {device.status === 'online' ? <CheckCircle className="h-3.5 w-3.5" /> :
      device.status === 'warning' ? <AlertTriangle className="h-3.5 w-3.5" /> :
      <XCircle className="h-3.5 w-3.5" />}
      <span className="capitalize">{device.status}</span>
    </div>
  );

  return (
    <SheetHeader className="space-y-3">
      <SheetTitle className="flex items-center justify-between">
        <span>{device.name}</span>
        {statusChip}
      </SheetTitle>
      <SheetDescription>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">IP Address:</div>
          <div>{device.ip}</div>
          <div className="text-muted-foreground">Operating System:</div>
          <div>{device.os}</div>
          <div className="text-muted-foreground">Location:</div>
          <div>{device.location}</div>
          <div className="text-muted-foreground">Last Check-in:</div>
          <div>{formatLastCheckIn(device.lastCheckIn)}</div>
        </div>
      </SheetDescription>
    </SheetHeader>
  );
};

export default DeviceHeader;
