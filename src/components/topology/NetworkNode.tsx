
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { NetworkDevice } from '@/types/topology';
import { cn } from '@/lib/utils';
import { 
  Network, 
  Router, 
  Server, 
  Monitor, 
  Printer,
  Camera,
  Laptop,
  Shield,
  Radio,
  User
} from 'lucide-react';

interface NetworkNodeProps {
  data: {
    device: NetworkDevice;
    onSelect: () => void;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-success/10 text-success border-success/30';
    case 'warning': return 'bg-warning/10 text-warning border-warning/30';
    case 'offline': return 'bg-destructive/10 text-destructive border-destructive/30';
    default: return 'bg-muted/10 text-muted-foreground border-muted/30';
  }
};

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'router': return <Router className="h-5 w-5" />;
    case 'switch': return <Network className="h-5 w-5" />;
    case 'firewall': return <Shield className="h-5 w-5" />;
    case 'server': return <Server className="h-5 w-5" />;
    case 'workstation': return <Monitor className="h-5 w-5" />;
    case 'printer': return <Printer className="h-5 w-5" />;
    case 'camera': return <Camera className="h-5 w-5" />;
    case 'iot': return <Radio className="h-5 w-5" />;
    case 'vpn': return <User className="h-5 w-5" />;
    default: return <Laptop className="h-5 w-5" />;
  }
};

const NetworkNode = ({ data }: NetworkNodeProps) => {
  const { device, onSelect } = data;
  const statusColorClass = getStatusColor(device.status);
  const DeviceIcon = getDeviceIcon(device.type);
  
  return (
    <div 
      className={cn(
        "nodrag px-3 py-2 rounded-md border shadow-sm min-w-[140px]",
        statusColorClass
      )}
      onClick={onSelect}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-center p-2 rounded-full bg-background">
          {DeviceIcon}
        </div>
        <div className="text-center">
          <p className="font-medium text-sm truncate max-w-[120px]">{device.name}</p>
          <p className="text-xs truncate max-w-[120px]">{device.ipAddress}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(NetworkNode);
