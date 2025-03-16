
import React from 'react';
import { EndpointDevice, EndpointDetails, Software } from '@/types/workforce';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Laptop, User, ShieldCheck, AlertTriangle, RefreshCw, Download, Clock, CheckCircle, XCircle } from 'lucide-react';

interface EndpointDetailPanelProps {
  device: EndpointDevice | null;
  details: EndpointDetails | null;
  onClose: () => void;
  onPushUpdate: (deviceId: string) => void;
  isAdmin: boolean;
}

const getSoftwareStatusIcon = (updateAvailable: boolean) => {
  return updateAvailable ? 
    <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 flex items-center gap-1">
      <Download className="h-3 w-3" /> Update
    </Badge> : 
    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
      <CheckCircle className="h-3 w-3" /> Updated
    </Badge>;
};

const getComplianceIcon = (status: string) => {
  if (status.includes('Compliant')) {
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  } else if (status.includes('Critical')) {
    return <XCircle className="h-4 w-4 text-red-500" />;
  } else {
    return <AlertTriangle className="h-4 w-4 text-amber-500" />;
  }
};

const EndpointDetailPanel = ({ 
  device, 
  details, 
  onClose, 
  onPushUpdate,
  isAdmin
}: EndpointDetailPanelProps) => {
  if (!device || !details) return null;
  
  const needsUpdate = details.updatesAvailable;
  
  return (
    <Sheet open={!!device} onOpenChange={onClose}>
      <SheetContent className="max-w-4xl overflow-y-auto">
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
        
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">{device.assignedUser}</p>
                <p className="text-xs text-muted-foreground">Department: {device.department}</p>
                <p className="text-xs text-muted-foreground">Role: {device.role}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pb-3 border-b">
              <Laptop className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">{device.os} {device.version}</p>
                <p className="text-xs text-muted-foreground">Location: {device.location}</p>
                <p className="text-xs text-muted-foreground">Last Patched: {device.lastPatchDate}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                Security Status
              </h3>
              <div className="flex items-center">
                {getComplianceIcon(details.complianceStatus)}
                <span className="text-sm ml-1">{details.complianceStatus}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Security Score</span>
                  <span className={device.status === 'up_to_date' ? 'text-green-500' : device.status === 'needs_patch' ? 'text-amber-500' : 'text-red-500'}>
                    {device.status === 'up_to_date' ? '92%' : device.status === 'needs_patch' ? '78%' : '45%'}
                  </span>
                </div>
                <Progress value={device.status === 'up_to_date' ? 92 : device.status === 'needs_patch' ? 78 : 45} className="h-2" />
              </div>
              
              <div className="text-xs text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>Patch Status</span>
                  <span>{details.securityPatchStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Security Scan</span>
                  <span>{details.lastScan}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="software">
            <TabsList className="mb-4">
              <TabsTrigger value="software">Installed Software</TabsTrigger>
              <TabsTrigger value="updates">Pending Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="software">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Software</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Publisher</TableHead>
                      <TableHead>Install Date</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.software.map(app => (
                      <TableRow key={`${app.name}-${app.version}`}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>{app.version}</TableCell>
                        <TableCell>{app.publisher}</TableCell>
                        <TableCell>{app.installDate}</TableCell>
                        <TableCell className="text-right">{getSoftwareStatusIcon(app.updateAvailable)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="updates">
              {needsUpdate ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Software</TableHead>
                        <TableHead>Current Version</TableHead>
                        <TableHead>Update Type</TableHead>
                        <TableHead className="text-right">Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {details.software.filter(s => s.updateAvailable).map(app => (
                        <TableRow key={`${app.name}-${app.version}-update`}>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{app.version}</TableCell>
                          <TableCell>
                            {app.name.includes('Chrome') || app.name.includes('Office') ? 
                              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                Security
                              </Badge> : 
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                Feature
                              </Badge>
                            }
                          </TableCell>
                          <TableCell className="text-right">
                            {app.name.includes('Chrome') || app.name.includes('Office') ? 
                              <Badge className="bg-red-500">High</Badge> : 
                              <Badge className="bg-blue-500">Normal</Badge>
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                  <h3 className="text-lg font-medium">All software up to date</h3>
                  <p className="text-sm text-muted-foreground mt-1">This device has all the latest updates installed</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {isAdmin && needsUpdate && (
            <Button 
              onClick={() => onPushUpdate(device.id)}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" /> 
              Push Updates
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EndpointDetailPanel;
