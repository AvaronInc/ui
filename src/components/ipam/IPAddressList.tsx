
import React from 'react';
import { IPAddress } from '@/types/ipam';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Circle, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface IPAddressListProps {
  ipAddresses: IPAddress[];
  onIPSelect: (ip: IPAddress) => void;
  selectedIP: IPAddress | null;
}

export const IPAddressList = ({ 
  ipAddresses, 
  onIPSelect,
  selectedIP 
}: IPAddressListProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'available':
        return "text-success";
      case 'in-use':
        return "text-warning";
      case 'conflict':
        return "text-destructive";
      default:
        return "";
    }
  };

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'available':
        return "bg-success/10 text-success";
      case 'in-use':
        return "bg-warning/10 text-warning";
      case 'conflict':
        return "bg-destructive/10 text-destructive";
      default:
        return "";
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Device Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned User</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ipAddresses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">
                  No IP addresses found
                </TableCell>
              </TableRow>
            ) : (
              ipAddresses.map((ip) => (
                <TableRow 
                  key={ip.id} 
                  className={cn(
                    "cursor-pointer hover:bg-muted/50",
                    selectedIP?.id === ip.id && "bg-muted"
                  )}
                  onClick={() => onIPSelect(ip)}
                >
                  <TableCell className="font-medium">{ip.address}</TableCell>
                  <TableCell>{ip.deviceName || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-1.5 rounded-md inline-flex items-center",
                        getStatusBadgeStyles(ip.status)
                      )}>
                        <Circle className="h-2 w-2 fill-current" />
                      </div>
                      <span className={cn(
                        "capitalize",
                        getStatusStyles(ip.status)
                      )}>
                        {ip.status.replace('-', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ip.assignedUser ? (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{ip.assignedUser}</span>
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{formatTime(ip.lastUpdated)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IPAddressList;
