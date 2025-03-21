
import React from 'react';
import { Network } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { SystemService } from '@/types/services';

interface NetworkTabProps {
  service: SystemService;
}

const NetworkTab: React.FC<NetworkTabProps> = ({ service }) => {
  // Format bytes to human-readable format
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Network Interfaces</h3>
          <div className="bg-muted/50 p-3 rounded-md">
            <ul className="space-y-2">
              {service.assignedResources.networkInterfaces.map((iface, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm">{iface}</span>
                  <Badge variant="outline">Active</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Network I/O</h3>
          <div className="bg-muted/50 p-3 rounded-md space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Received</div>
                <div className="text-sm font-medium">{formatBytes(service.networkIO.received * 1024)}/s</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Transmitted</div>
                <div className="text-sm font-medium">{formatBytes(service.networkIO.transmitted * 1024)}/s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {service.diskIO && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Disk I/O</h3>
          <div className="bg-muted/50 p-3 rounded-md space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Read</div>
                <div className="text-sm font-medium">{formatBytes(service.diskIO.read * 1024)}/s</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Write</div>
                <div className="text-sm font-medium">{formatBytes(service.diskIO.write * 1024)}/s</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTab;
