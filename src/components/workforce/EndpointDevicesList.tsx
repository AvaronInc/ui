
import React from 'react';
import { EndpointDevice, PatchStatus } from '@/types/workforce';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface EndpointDevicesListProps {
  devices: EndpointDevice[];
  onSelectDevice: (deviceId: string) => void;
}

const statusConfig: Record<PatchStatus, { label: string, color: string }> = {
  'up_to_date': { label: 'Up-to-date', color: 'bg-success text-success-foreground' },
  'needs_patch': { label: 'Needs Patch', color: 'bg-warning text-warning-foreground' },
  'security_issue': { label: 'Security Issue', color: 'bg-destructive text-destructive-foreground' }
};

const EndpointDevicesList = ({ devices, onSelectDevice }: EndpointDevicesListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device Name</TableHead>
            <TableHead>Assigned User</TableHead>
            <TableHead>OS & Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Patched</TableHead>
            <TableHead className="w-[80px]">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">{device.name}</TableCell>
              <TableCell>{device.assignedUser}</TableCell>
              <TableCell>{`${device.os} ${device.version}`}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusConfig[device.status].color}>
                  {statusConfig[device.status].label}
                </Badge>
              </TableCell>
              <TableCell>{device.lastPatchDate}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onSelectDevice(device.id)}
                  title="View Details"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EndpointDevicesList;
