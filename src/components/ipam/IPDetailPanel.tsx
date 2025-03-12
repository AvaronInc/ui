
import React from 'react';
import { IPAddress } from '@/types/ipam';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Info, 
  User, 
  HardDrive, 
  Clock, 
  Network,
  Calendar
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface IPDetailPanelProps {
  ip: IPAddress | null;
  onClose: () => void;
}

export const IPDetailPanel = ({ ip, onClose }: IPDetailPanelProps) => {
  if (!ip) {
    return (
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle>IP Details</CardTitle>
          <CardDescription>Select an IP address to view details</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const getStatusColor = (status: string) => {
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
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            IP Details
          </div>
        </CardTitle>
        <CardDescription className="text-lg font-medium">{ip.address}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span>Status:</span>
            </div>
            <span className={cn(
              "capitalize font-medium text-sm",
              getStatusColor(ip.status)
            )}>
              {ip.status.replace('-', ' ')}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Network className="h-4 w-4 text-muted-foreground" />
              <span>Subnet:</span>
            </div>
            <span className="text-sm">{ip.subnet}</span>
          </div>
          
          {ip.deviceName && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span>Device:</span>
              </div>
              <span className="text-sm">{ip.deviceName}</span>
            </div>
          )}
          
          {ip.assignedUser && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Assigned to:</span>
              </div>
              <span className="text-sm">{ip.assignedUser}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Last Updated:</span>
            </div>
            <span className="text-sm">{formatDate(ip.lastUpdated)}</span>
          </div>
          
          {ip.description && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm mb-1">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span>Description:</span>
              </div>
              <p className="text-sm text-muted-foreground">{ip.description}</p>
            </div>
          )}
        </div>
        
        {ip.history && ip.history.length > 0 && (
          <div>
            <Separator className="my-2" />
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Network History
            </h4>
            <div className="space-y-3">
              {ip.history.map(entry => (
                <div key={entry.id} className="border-l-2 border-muted pl-3 py-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs capitalize">{entry.action}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(entry.date)}</span>
                  </div>
                  <p className="text-sm">{entry.details}</p>
                  <div className="text-xs text-muted-foreground">By: {entry.user}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IPDetailPanel;
