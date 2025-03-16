
import React from 'react';
import { IPAddress } from '@/types/ipam';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, RefreshCw, ArrowRight, Check, XCircle, Server, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConflictDetectionProps {
  ipAddresses: IPAddress[];
  onResolveConflict: (ip: IPAddress) => void;
}

const ConflictDetection: React.FC<ConflictDetectionProps> = ({ 
  ipAddresses,
  onResolveConflict
}) => {
  // In a real application, this would likely be fetched from an API
  const totalScanned = 254;
  const lastScan = new Date().toISOString();
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conflict Status Overview */}
        <Card className={cn(
          "lg:col-span-2",
          ipAddresses.length > 0 ? "border-l-8 border-l-destructive" : "border-l-8 border-l-success"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {ipAddresses.length > 0 ? (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              ) : (
                <Check className="h-5 w-5 text-success" />
              )}
              IP Conflict Status
            </CardTitle>
            <CardDescription>
              {ipAddresses.length > 0 
                ? `${ipAddresses.length} IP address conflicts detected` 
                : 'No IP address conflicts detected'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Total Conflicts</div>
                <div className="text-2xl font-bold">{ipAddresses.length}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Devices Affected</div>
                <div className="text-2xl font-bold">
                  {new Set(ipAddresses.map(ip => ip.deviceName).filter(Boolean)).size}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Last Network Scan</div>
                <div className="text-2xl font-bold">{formatDate(lastScan).split(',')[0]}</div>
                <div className="text-xs text-muted-foreground">{formatDate(lastScan).split(',')[1]}</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Scan Coverage</div>
              <div className="bg-muted rounded-full h-2.5 mb-1">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{totalScanned} IP addresses scanned</span>
                <span>100% complete</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button variant="outline" className="w-full sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Scan Network
            </Button>
            {ipAddresses.length > 0 && (
              <Button className="w-full sm:w-auto">
                <ArrowRight className="h-4 w-4 mr-2" />
                Resolve All Conflicts
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Auto-Resolution Policies */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Policies</CardTitle>
            <CardDescription>
              Automated conflict resolution settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Auto-resolution</span>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Priority devices</span>
                </div>
                <Badge variant="outline">3 configured</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Alert threshold</span>
                </div>
                <Badge variant="outline">Immediate</Badge>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="text-sm font-medium mb-2">Resolution Strategy</div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Current strategy: <span className="font-medium">Prioritize by device importance</span></p>
                <p className="text-xs">Other devices will be automatically released when conflicts occur with priority devices.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Configure Policies</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Conflict List */}
      <Card>
        <CardHeader>
          <CardTitle>IP Address Conflicts</CardTitle>
          <CardDescription>
            Detailed list of all detected IP conflicts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ipAddresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-lg font-medium mb-1">No IP Conflicts Detected</h3>
              <p className="text-muted-foreground max-w-md">
                Your network is currently operating without any detected IP address conflicts. 
                Regular scans help maintain this healthy state.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Conflicting Devices</TableHead>
                    <TableHead>Last Detected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipAddresses.map((ip) => (
                    <TableRow key={ip.id}>
                      <TableCell className="font-medium">{ip.address}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-muted-foreground" />
                            <span>{ip.deviceName || 'Unknown Device'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-muted-foreground" />
                            <span>Other device</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(ip.lastUpdated)}</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <AlertTriangle className="h-3 w-3" />
                          Active Conflict
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onResolveConflict(ip)}
                          className="w-full"
                        >
                          Resolve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
        {ipAddresses.length > 0 && (
          <CardFooter className="text-xs text-muted-foreground border-t pt-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="mb-1">
                  IP address conflicts can lead to network connectivity issues and service disruptions. 
                  It's recommended to resolve them promptly.
                </p>
                <p>
                  Common causes: Duplicate static IP assignments, DHCP server misconfiguration, 
                  or devices with hardcoded IP addresses.
                </p>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ConflictDetection;
