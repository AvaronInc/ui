
import React from 'react';
import { User } from 'lucide-react';
import { EndpointDevice } from '@/types/workforce';

interface EndpointUserInfoProps {
  device: EndpointDevice;
}

const EndpointUserInfo = ({ device }: EndpointUserInfoProps) => {
  return (
    <div className="flex items-start gap-3 pb-3 border-b">
      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
      <div>
        <p className="text-sm font-medium">{device.assignedUser}</p>
        <p className="text-xs text-muted-foreground">Department: {device.department}</p>
        <p className="text-xs text-muted-foreground">Role: {device.role}</p>
      </div>
    </div>
  );
};

export default EndpointUserInfo;
