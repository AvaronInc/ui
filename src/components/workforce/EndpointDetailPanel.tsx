
import React from 'react';
import { X, RefreshCw, FileCheck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EndpointDevice, EndpointDetails, Software } from '@/types/workforce';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface EndpointDetailPanelProps {
  device: EndpointDevice | null;
  details: EndpointDetails | null;
  onClose: () => void;
  onPushUpdate: (deviceId: string) => void;
  isAdmin: boolean;
}

const EndpointDetailPanel = ({ 
  device, 
  details, 
  onClose,
  onPushUpdate,
  isAdmin
}: EndpointDetailPanelProps) => {
  if (!device || !details) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-md border-l bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{device.name}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Device Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Assigned User:</div>
              <div>{device.assignedUser}</div>
              <div className="text-muted-foreground">OS:</div>
              <div>{`${device.os} ${device.version}`}</div>
              <div className="text-muted-foreground">Department:</div>
              <div>{device.department}</div>
              <div className="text-muted-foreground">Last Patched:</div>
              <div>{device.lastPatchDate}</div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Patch Status</h4>
              <Badge
                variant={details.updatesAvailable ? "outline" : "secondary"}
                className={details.updatesAvailable ? "bg-warning/20 text-warning" : ""}
              >
                {details.updatesAvailable ? "Updates Available" : "Up to Date"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{details.securityPatchStatus}</p>
            <p className="text-sm text-muted-foreground mb-2">Last scan: {details.lastScan}</p>
            
            {isAdmin && details.updatesAvailable && (
              <Button 
                className="mt-2 w-full"
                onClick={() => onPushUpdate(device.id)}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Push Patch Update
              </Button>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Installed Software</h4>
            <div className="rounded-md border max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Software</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.software.map((sw, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{sw.name}</TableCell>
                      <TableCell>{sw.version}</TableCell>
                      <TableCell>
                        {sw.updateAvailable ? (
                          <Badge variant="outline" className="bg-warning/20 text-warning">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-success/20 text-success">
                            Current
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {isAdmin && (
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Security Scan
              </Button>
            )}
            <Button variant="outline">
              <FileCheck className="mr-2 h-4 w-4" />
              Compliance Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointDetailPanel;
