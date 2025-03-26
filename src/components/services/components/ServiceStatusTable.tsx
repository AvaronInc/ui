
import React, { useState } from 'react';
import { Service } from '@/types/services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  Power,
  X,
  RefreshCw,
  Shield
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ServiceStatusTableProps {
  services: Service[];
}

const ServiceStatusTable = ({ services }: ServiceStatusTableProps) => {
  const isMobile = useIsMobile();
  const [serviceDetail, setServiceDetail] = useState<Service | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">Healthy</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">Warning</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">Critical</Badge>;
      case 'offline':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700">Offline</Badge>;
      case 'deploying':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">Deploying</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'offline':
        return <Power className="h-5 w-5 text-gray-500" />;
      case 'deploying':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleShowDetails = (service: Service) => {
    setServiceDetail(service);
    setShowDetailDialog(true);
  };
  
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead className={isMobile ? "hidden sm:table-cell" : ""}>Type</TableHead>
              <TableHead className={isMobile ? "hidden sm:table-cell" : ""}>Uptime</TableHead>
              <TableHead className={isMobile ? "hidden lg:table-cell" : ""}>Version</TableHead>
              <TableHead className={isMobile ? "hidden md:table-cell" : ""}>Instances</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="py-2">
                  {getStatusIcon(service.status)}
                </TableCell>
                <TableCell className="font-medium py-2">{service.name}</TableCell>
                <TableCell className={`capitalize py-2 ${isMobile ? "hidden sm:table-cell" : ""}`}>{service.type.replace('_', ' ')}</TableCell>
                <TableCell className={`py-2 ${isMobile ? "hidden sm:table-cell" : ""}`}>{service.uptime}</TableCell>
                <TableCell className={`py-2 ${isMobile ? "hidden lg:table-cell" : ""}`}>{service.version}</TableCell>
                <TableCell className={`py-2 ${isMobile ? "hidden md:table-cell" : ""}`}>{service.instances}</TableCell>
                <TableCell className="text-right py-2">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleShowDetails(service)}
                    >
                      {isMobile ? "View" : "Details"}
                    </Button>
                    <Button variant="ghost" size="sm" className={isMobile ? "hidden sm:inline-flex" : ""}>Restart</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {serviceDetail && getStatusIcon(serviceDetail.status)}
              {serviceDetail?.name} Details
            </DialogTitle>
            <DialogDescription>
              Detailed information and management options for this service
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            {serviceDetail && (
              <div className="space-y-6 py-2">
                {/* Overview Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Service Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <div className="mt-1">{getStatusBadge(serviceDetail.status)}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Type</p>
                        <p className="capitalize">{serviceDetail.type.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Version</p>
                        <p>{serviceDetail.version}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                        <p>{serviceDetail.uptime}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Instances</p>
                        <p>{serviceDetail.instances}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                        <p>{new Date(serviceDetail.lastUpdated).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{serviceDetail.description}</p>
                  </CardContent>
                </Card>

                {/* Resource Usage Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Resource Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">CPU</span>
                          <span className="text-sm font-medium">{serviceDetail.resources.cpu}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              serviceDetail.resources.cpu > 80 ? 'bg-red-500' : 
                              serviceDetail.resources.cpu > 60 ? 'bg-amber-500' : 'bg-primary'
                            }`}
                            style={{ width: `${serviceDetail.resources.cpu}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Memory</span>
                          <span className="text-sm font-medium">{serviceDetail.resources.memory}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              serviceDetail.resources.memory > 80 ? 'bg-red-500' : 
                              serviceDetail.resources.memory > 60 ? 'bg-amber-500' : 'bg-primary'
                            }`}
                            style={{ width: `${serviceDetail.resources.memory}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Network</span>
                          <span className="text-sm font-medium">{serviceDetail.resources.network}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              serviceDetail.resources.network > 80 ? 'bg-red-500' : 
                              serviceDetail.resources.network > 60 ? 'bg-amber-500' : 'bg-primary'
                            }`}
                            style={{ width: `${serviceDetail.resources.network}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Storage</span>
                          <span className="text-sm font-medium">{serviceDetail.resources.storage}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              serviceDetail.resources.storage > 80 ? 'bg-red-500' : 
                              serviceDetail.resources.storage > 60 ? 'bg-amber-500' : 'bg-primary'
                            }`}
                            style={{ width: `${serviceDetail.resources.storage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Endpoints Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Service Endpoints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {serviceDetail.endpoints.map((endpoint, index) => (
                        <li key={index} className="flex items-center">
                          <Badge variant="outline" className="mr-2">endpoint</Badge>
                          <code className="bg-muted px-2 py-1 rounded">{endpoint}</code>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Security Status */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Security Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <Badge 
                          variant="outline" 
                          className={`
                            ${serviceDetail.securityStatus === 'secure' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800' : 
                              serviceDetail.securityStatus === 'vulnerable' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' : 
                              'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800'
                            } capitalize
                          `}
                        >
                          {serviceDetail.securityStatus}
                        </Badge>
                      </div>
                      
                      {serviceDetail.lastIncident && (
                        <div className="mt-2 p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium mb-1">Last Security Incident:</div>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="text-sm">
                              <span className="font-medium">Time:</span>{' '}
                              {new Date(serviceDetail.lastIncident.time).toLocaleString()}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Type:</span>{' '}
                              {serviceDetail.lastIncident.type}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Description:</span>{' '}
                              {serviceDetail.lastIncident.description}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Status:</span>{' '}
                              <Badge variant={serviceDetail.lastIncident.resolved ? "outline" : "destructive"} className="ml-1">
                                {serviceDetail.lastIncident.resolved ? "Resolved" : "Unresolved"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </ScrollArea>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto" variant="outline" onClick={() => setShowDetailDialog(false)}>
              Close
            </Button>
            <Button className="w-full sm:w-auto" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Restart Service
            </Button>
            <Button className="w-full sm:w-auto">
              View Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceStatusTable;
