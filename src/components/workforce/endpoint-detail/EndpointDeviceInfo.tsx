
import React from 'react';
import { Laptop } from 'lucide-react';
import { EndpointDevice } from '@/types/workforce';

interface EndpointDeviceInfoProps {
  device: EndpointDevice;
}

const EndpointDeviceInfo = ({ device }: EndpointDeviceInfoProps) => {
  return (
    <div className="flex items-start gap-3 pb-3 border-b">
      <Laptop className="h-5 w-5 text-muted-foreground mt-0.5" />
      <div>
        <p className="text-sm font-medium">{device.os} {device.version}</p>
        <p className="text-xs text-muted-foreground">Location: {device.location}</p>
        <p className="text-xs text-muted-foreground">Last Patched: {device.lastPatchDate}</p>
      </div>
    </div>
  );
};

export default EndpointDeviceInfo;
