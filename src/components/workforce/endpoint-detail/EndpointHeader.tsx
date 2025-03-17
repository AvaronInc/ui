
import React from 'react';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Laptop } from 'lucide-react';
import { EndpointDevice } from '@/types/workforce';

interface EndpointHeaderProps {
  device: EndpointDevice;
}

const EndpointHeader = ({ device }: EndpointHeaderProps) => {
  return (
    <SheetHeader>
      <SheetTitle className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <Laptop className="h-5 w-5" />
          {device.name}
        </span>
        <Badge variant={device.status === 'up_to_date' ? 'outline' : 'secondary'} className={
          device.status === 'up_to_date' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
            : device.status === 'needs_patch'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        }>
          {device.status === 'up_to_date' ? 'Up-to-date' : device.status === 'needs_patch' ? 'Needs Patch' : 'Security Issue'}
        </Badge>
      </SheetTitle>
      <SheetDescription>
        Detailed information about this endpoint device
      </SheetDescription>
    </SheetHeader>
  );
};

export default EndpointHeader;
