
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemService } from '@/types/services';
import { Textarea } from "@/components/ui/textarea";
import { Play, Square, RotateCcw, Clock, Cpu, HardDrive, Network, FileText, Link2, AlertTriangle } from 'lucide-react';
import ResourceUsageCharts from './ResourceUsageCharts';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface SystemServiceDetailProps {
  service: SystemService;
  onRefresh: () => void;
}

const SystemServiceDetail: React.FC<SystemServiceDetailProps> = ({ service, onRefresh }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Helper function to get badge variant based on health status
  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case 'ok':
        return 'default'; // Changed from 'success' to 'default'
      case 'degraded':
        return 'warning';
      case 'critical':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Helper function to get badge variant based on status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'running':
        return 'default';
      case 'stopped':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Mock function for service actions (start, stop, restart)
  const handleServiceAction = (action: 'start' | 'stop' | 'restart') => {
    console.log(`${action} service: ${service.id}`);
    // In a real application, this would call an API to perform the action
    setTimeout(onRefresh, 500); // Refresh after action completes
  };

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
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <CardTitle className="text-xl">{service.name}</CardTitle>
          <Badge variant={getStatusBadgeVariant(service.status)} className="capitalize">
            {service.status}
          </Badge>
          <Badge variant={getHealthBadgeVariant(service.health)} className="capitalize">
            {service.health}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {service.type}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={service.status === 'running'}
                className="flex items-center gap-1"
              >
                <Play className="h-4 w-4" />
                <span>Start</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Start Service</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to start the {service.name} service?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleServiceAction('start')}>Start</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={service.status !== 'running'}
                className="flex items-center gap-1"
              >
                <Square className="h-4 w-4" />
                <span>Stop</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Stop Service</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to stop the {service.name} service? This may disrupt dependent services.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleServiceAction('stop')}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Stop
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={service.status !== 'running'}
                className="flex items-center gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Restart</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restart Service</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to restart the {service.name} service? This will cause a brief disruption of service.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleServiceAction('restart')}>Restart</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-none border-b justify-start px-4">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1">
              <HardDrive className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-1">
              <Network className="h-4 w-4" />
              <span>Network</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Logs</span>
            </TabsTrigger>
            <TabsTrigger value="dependencies" className="flex items-center gap-1">
              <Link2 className="h-4 w-4" />
              <span>Dependencies</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Service Details
                </h3>
                <div className="bg-muted/50 p-3 rounded-md space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">UUID</div>
                    <div className="text-sm font-medium">{service.uuid}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="text-sm font-medium">{service.uptime}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Last Restart</div>
                    <div className="text-sm font-medium">{new Date(service.lastRestart).toLocaleString()}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Service Type</div>
                    <div className="text-sm font-medium capitalize">{service.type}</div>
                  </div>
                  
                  {service.containerImage && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Container Image</div>
                      <div className="text-sm font-medium">{service.containerImage}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  Resource Usage
                </h3>
                <div className="bg-muted/50 p-3 rounded-md space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">CPU Usage</span>
                      <span className="text-sm font-medium">{service.cpuUsage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          service.cpuUsage > 80 ? 'bg-destructive' : 
                          service.cpuUsage > 60 ? 'bg-warning' : 'bg-success'
                        }`} 
                        style={{ width: `${service.cpuUsage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Memory Usage</span>
                      <span className="text-sm font-medium">{service.memoryUsage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          service.memoryUsage > 80 ? 'bg-destructive' : 
                          service.memoryUsage > 60 ? 'bg-warning' : 'bg-success'
                        }`} 
                        style={{ width: `${service.memoryUsage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm text-muted-foreground">Assigned CPU</div>
                    <div className="text-sm font-medium">{service.assignedResources.cpuCores} cores</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Assigned Memory</div>
                    <div className="text-sm font-medium">{service.assignedResources.ram} MB</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
            
            {service.health === 'degraded' || service.health === 'critical' ? (
              <div className="bg-warning/20 border border-warning p-3 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Service Attention Required</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This service is not operating optimally and may require maintenance. 
                    {service.health === 'critical' && ' Urgent action is recommended to prevent service disruption.'}
                  </p>
                </div>
              </div>
            ) : null}
          </TabsContent>
          
          <TabsContent value="resources" className="p-4">
            <ResourceUsageCharts service={service} />
          </TabsContent>
          
          <TabsContent value="network" className="p-4 space-y-4">
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
          </TabsContent>
          
          <TabsContent value="logs" className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Service Logs</h3>
              <Button variant="outline" size="sm">Export Logs</Button>
            </div>
            
            <ScrollArea className="h-[400px] border rounded-md">
              <div className="p-2 font-mono text-xs">
                {service.logEntries.map((entry, index) => (
                  <div 
                    key={index} 
                    className={`py-1 px-2 rounded mb-1 ${
                      entry.level === 'error' ? 'bg-destructive/10 text-destructive' :
                      entry.level === 'warning' ? 'bg-warning/10 text-warning' :
                      entry.level === 'debug' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-muted/50'
                    }`}
                  >
                    <span className="mr-2 opacity-80">[{new Date(entry.timestamp).toLocaleTimeString()}]</span>
                    <span className="uppercase mr-2 text-[10px] font-bold">{entry.level}</span>
                    <span>{entry.message}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Execute Command</h3>
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Enter command to execute on service..." 
                  className="font-mono text-sm"
                />
                <Button className="flex-shrink-0 mt-auto">Execute</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Note: Commands are executed within the service context. Use with caution.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="dependencies" className="p-4 space-y-4">
            <h3 className="text-sm font-medium">Service Dependencies</h3>
            {service.dependencies.length > 0 ? (
              <div className="bg-muted/50 p-3 rounded-md">
                <ul className="space-y-2">
                  {service.dependencies.map((dep, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-sm">{dep}</span>
                      <Badge variant="outline">Required</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">This service has no dependencies</p>
            )}
            
            <h3 className="text-sm font-medium">Dependent Services</h3>
            <p className="text-sm text-muted-foreground">
              Information about services that depend on this service would be displayed here.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemServiceDetail;
